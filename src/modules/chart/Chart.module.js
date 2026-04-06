import { AppState } from '../../services/state/AppState.module.js';
import {
  getValue,
  getConfigValue,
  ChartType,
  ChartPadding,
  IcyVeinsGuideBySim,
  FightStyles,
  FightStyleCouncil
} from '../../utils/Converter.module.js';
import {
  normalizeBuildKey,
  normalizeSimResultKey,
  normalizeFightStyleForResults
} from '../../utils/Normalizers.module.js';
import {
  renderChartHeader,
  renderChartDescription,
  renderGuideLink,
  renderChartUpdatedText
} from '../../utils/DomRenderHelper.module.js';
import {
  jsonLastUpdated,
  jsonExtension,
  simResultPath,
  slash,
  underscore,
  dash,
  space,
  px,
  updateDataInnerHtml,
  builds,
  talents,
  talentsTop,
  dungeonType
} from '../../utils/Constants.module.js';
import {
  buildChartDataSingleBar,
  buildDataForPercentageChart,
  buildChartDataMultipleBar,
  buildChartDataDot
} from './helpers/DataHelper.module.js';

const MAX_CHART_CACHE_ENTRIES = 60;
const MAX_PERSISTED_CACHE_ENTRIES = 20;
const PREFETCH_CONCURRENCY = 1;
const SESSION_STORAGE_CACHE_KEY = 'wcp:chartDataCache:v1';
const CACHE_TTL_MS = 5 * 60 * 1000;
const REVALIDATE_COOLDOWN_MS = 30 * 1000;

const chartDataCacheByUrl = new Map();
const prefetchRequestsByUrl = new Map();
const queuedPrefetchUrlSet = new Set();
const queuedPrefetchUrls = [];
const lastRevalidateAtByUrl = new Map();
let latestChartRequestId = 0;
let activeChartRequest = null;
let activePrefetchCount = 0;

function isPerfLoggingEnabled() {
  return typeof window !== 'undefined' && window.__WCP_CHART_PERF === true;
}

function logChartPerf(metricName, details) {
  if (!isPerfLoggingEnabled()) {
    return;
  }

  var payload = details || {};
  console.log('[chart-perf] ' + metricName, payload);
}

function persistChartCacheToSession() {
  if (typeof sessionStorage === 'undefined') {
    return;
  }

  try {
    var persistedEntries = Array.from(chartDataCacheByUrl.entries()).slice(-MAX_PERSISTED_CACHE_ENTRIES);
    sessionStorage.setItem(SESSION_STORAGE_CACHE_KEY, JSON.stringify(persistedEntries));
  } catch (error) {
    // ignore storage failures (quota/private mode)
  }
}

function getCacheEntryLastUpdated(cacheEntry) {
  if (!cacheEntry || !cacheEntry.data) {
    return null;
  }

  return cacheEntry.data[jsonLastUpdated] || null;
}

function isCacheEntryFresh(cacheEntry) {
  if (!cacheEntry || !cacheEntry.cachedAt) {
    return false;
  }

  return (Date.now() - cacheEntry.cachedAt) <= CACHE_TTL_MS;
}

function shouldRunRevalidation(url) {
  var lastRevalidateAt = lastRevalidateAtByUrl.get(url) || 0;
  if ((Date.now() - lastRevalidateAt) < REVALIDATE_COOLDOWN_MS) {
    return false;
  }

  lastRevalidateAtByUrl.set(url, Date.now());
  return true;
}

function restoreChartCacheFromSession() {
  if (typeof sessionStorage === 'undefined') {
    return;
  }

  try {
    var rawValue = sessionStorage.getItem(SESSION_STORAGE_CACHE_KEY);
    if (!rawValue) {
      return;
    }

    var entries = JSON.parse(rawValue);
    if (!Array.isArray(entries)) {
      return;
    }

    var restoredEntries = 0;
    entries.forEach(function(entry) {
      if (Array.isArray(entry) && entry.length === 2 && typeof entry[0] === 'string') {
        var entryValue = entry[1];
        if (entryValue && typeof entryValue === 'object' && entryValue.data) {
          cacheChartData(entry[0], entryValue.data, {
            skipPersist: true,
            cachedAt: entryValue.cachedAt
          });
        } else {
          // Backward compatibility with old [url, data] storage shape.
          cacheChartData(entry[0], entryValue, { skipPersist: true });
        }
        restoredEntries += 1;
      }
    });

    if (restoredEntries > 0) {
      persistChartCacheToSession();
    }
  } catch (error) {
    // ignore corrupted storage state
  }
}

function cacheChartData(url, data, options) {
  if (!url) {
    return;
  }

  var skipPersist = options && options.skipPersist === true;
  var cachedAt = (options && options.cachedAt) || Date.now();

  if (chartDataCacheByUrl.has(url)) {
    chartDataCacheByUrl.delete(url);
  }

  chartDataCacheByUrl.set(url, {
    data: data,
    cachedAt: cachedAt
  });

  while (chartDataCacheByUrl.size > MAX_CHART_CACHE_ENTRIES) {
    var oldestCacheKey = chartDataCacheByUrl.keys().next().value;
    chartDataCacheByUrl.delete(oldestCacheKey);
  }

  if (!skipPersist) {
    persistChartCacheToSession();
  }
}

function getCachedChartData(url) {
  if (!chartDataCacheByUrl.has(url)) {
    return null;
  }

  var cachedData = chartDataCacheByUrl.get(url);
  chartDataCacheByUrl.delete(url);
  chartDataCacheByUrl.set(url, cachedData);
  return cachedData;
}

function revalidateCachedChartData(jsonUrl, cachedEntry, requestId, simsBtn, fightStyle, talentChoice, chartId, metaData, maxEntries, requestStart) {
  if (!shouldRunRevalidation(jsonUrl)) {
    return;
  }

  var expectedLastUpdated = getCacheEntryLastUpdated(cachedEntry);
  var probeRequest = prefetchRequestsByUrl.get(jsonUrl);
  if (!probeRequest) {
    probeRequest = jQuery.getJSON(jsonUrl);
  }

  probeRequest.done(function(data) {
    cacheChartData(jsonUrl, data);

    if (requestId !== latestChartRequestId) {
      return;
    }

    var incomingLastUpdated = data[jsonLastUpdated] || null;
    if (expectedLastUpdated && incomingLastUpdated && expectedLastUpdated === incomingLastUpdated) {
      if (requestStart) {
        logChartPerf('revalidate-noop', {
          url: jsonUrl,
          ms: Math.round(performance.now() - requestStart)
        });
      }
      return;
    }

    applyChartData(data, simsBtn, fightStyle, talentChoice, chartId, metaData, maxEntries);
    if (requestStart) {
      logChartPerf('revalidate-refresh', {
        url: jsonUrl,
        ms: Math.round(performance.now() - requestStart)
      });
    }
  });
}

function shouldPrefetch() {
  if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
    return false;
  }

  if (typeof navigator === 'undefined') {
    return true;
  }

  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!connection) {
    return true;
  }

  if (connection.saveData) {
    return false;
  }

  var effectiveType = (connection.effectiveType || '').toLowerCase();
  if (effectiveType === 'slow-2g' || effectiveType === '2g') {
    return false;
  }

  return true;
}

function pumpPrefetchQueue() {
  while (activePrefetchCount < PREFETCH_CONCURRENCY && queuedPrefetchUrls.length > 0) {
    let nextUrl = queuedPrefetchUrls.shift();
    queuedPrefetchUrlSet.delete(nextUrl);

    if (!nextUrl || chartDataCacheByUrl.has(nextUrl) || prefetchRequestsByUrl.has(nextUrl)) {
      continue;
    }

    activePrefetchCount += 1;

    let prefetchRequest = jQuery.getJSON(nextUrl, function(data) {
      cacheChartData(nextUrl, data);
    });

    prefetchRequestsByUrl.set(nextUrl, prefetchRequest);

    prefetchRequest.always(function() {
      prefetchRequestsByUrl.delete(nextUrl);
      activePrefetchCount = Math.max(0, activePrefetchCount - 1);
      pumpPrefetchQueue();
    });
  }
}

function getAvailableFightStylesForPrefetch() {
  var configData = AppState.getConfigData() || {};
  var currentCouncilFightStyle = FightStyleCouncil[configData.councilTargets];
  var councilFightStyles = Object.values(FightStyleCouncil);

  return Object.keys(FightStyles).filter(function(style) {
    return !(councilFightStyles.includes(style) && style !== currentCouncilFightStyle);
  });
}

function getAdjacentTalentChoices(talentChoice) {
  var buildConfig = (AppState.getConfigData() || {})[builds] || {};
  var normalizedTalentChoices = Object.keys(buildConfig).map(function(key) {
    return key.replaceAll(dash, underscore);
  });
  var currentIndex = normalizedTalentChoices.indexOf(talentChoice);
  var adjacentTalents = [];

  if (currentIndex > 0) {
    adjacentTalents.push(normalizedTalentChoices[currentIndex - 1]);
  }
  if (currentIndex !== -1 && currentIndex < normalizedTalentChoices.length - 1) {
    adjacentTalents.push(normalizedTalentChoices[currentIndex + 1]);
  }

  return adjacentTalents;
}

function queueJsonPrefetch(url) {
  if (!shouldPrefetch() || !url || chartDataCacheByUrl.has(url) || prefetchRequestsByUrl.has(url) || queuedPrefetchUrlSet.has(url)) {
    return;
  }

  queuedPrefetchUrlSet.add(url);
  queuedPrefetchUrls.push(url);
  pumpPrefetchQueue();
}

function prefetchLikelyNextDatasets(simsBtn, fightStyle, talentChoice) {
  if (simsBtn == 'weights' || !shouldPrefetch()) {
    return;
  }

  var prefetchUrls = new Set();
  var baseUrl = AppState.getBaseUrl();
  var adjacentTalents = getAdjacentTalentChoices(talentChoice);

  adjacentTalents.forEach(function(adjacentTalent) {
    prefetchUrls.add(determineJsonUrl(simsBtn, baseUrl, fightStyle, adjacentTalent));
  });

  var preferredStyles = ['Composite', 'Single', 'Dungeons'];
  var alternateFightStyles = getAvailableFightStylesForPrefetch().filter(function(style) {
    return style !== fightStyle;
  });

  alternateFightStyles.sort(function(a, b) {
    var rankA = preferredStyles.indexOf(a);
    var rankB = preferredStyles.indexOf(b);
    rankA = rankA === -1 ? 99 : rankA;
    rankB = rankB === -1 ? 99 : rankB;

    if (rankA !== rankB) {
      return rankA - rankB;
    }

    return a.localeCompare(b);
  });

  if (alternateFightStyles.length > 0) {
    prefetchUrls.add(determineJsonUrl(simsBtn, baseUrl, alternateFightStyles[0], talentChoice));
  }

  Array.from(prefetchUrls).slice(0, 3).forEach(queueJsonPrefetch);
}

function setChartLoadingState(chartId, isLoading) {
  var chartRoot = document.getElementById(chartId);
  if (!chartRoot || !chartRoot.classList) {
    return;
  }

  if (isLoading) {
    chartRoot.classList.add('is-loading');
  } else {
    chartRoot.classList.remove('is-loading');
  }
}

function applyChartData(data, simsBtn, fightStyle, talentChoice, chartId, metaData, maxEntries) {
  var renderStart = (typeof performance !== 'undefined' && performance.now) ? performance.now() : 0;

  if (metaData) {
    renderChartUpdatedText(updateDataInnerHtml + data[jsonLastUpdated]);
    var simTalent = getConfigValue(AppState.getConfigData()[builds], talentChoice);
    var header = determineChartName(simTalent.name,
      simsBtn.charAt(0).toUpperCase() + simsBtn.slice(1),
      fightStyle);
    renderChartHeader(header);
    renderChartDescription(determineChartDescription(simsBtn));
    renderGuideLink(determineGuideLink(simsBtn, fightStyle));
  }

  buildData(data, simsBtn, chartId, maxEntries);

  if (renderStart) {
    var renderDuration = performance.now() - renderStart;
    logChartPerf('render', {
      chartId: chartId,
      simsBtn: simsBtn,
      fightStyle: fightStyle,
      talentChoice: talentChoice,
      ms: Math.round(renderDuration)
    });
  }
}

restoreChartCacheFromSession();

// parseCSV is from Csv.js - accessed as global for now
// handleJsonFailure is from Main.js - accessed as global for now

function getDungeonFallbackJsonUrl(simsBtn, fightStyle, talentChoice) {
  if (!fightStyle || !String(fightStyle).toLowerCase().includes('dungeons')) {
    return null;
  }
  var configuredType = AppState.getConfigData()[dungeonType];
  var fallbackType = configuredType === 'route' ? 'slice' : configuredType === 'slice' ? 'route' : null;
  if (!fallbackType) {
    return null;
  }
  return determineJsonUrl(simsBtn, AppState.getBaseUrl(), fightStyle, talentChoice, fallbackType);
}

/*
 * Decides what kind of chart should be used 
 * and when a chart update should happen
 */
export function updateChart(currTalentBtn, currSimsBtn, currConsumablesBtn, currEnchantsBtn, currFightStyleBtn, chartId, metaData, maxEntries) {
  if (currSimsBtn == 'weights') {
    parseCSV(currSimsBtn, currFightStyleBtn, currTalentBtn, chartId, metaData);
  } else {
    createChart(currSimsBtn, currFightStyleBtn, currTalentBtn, chartId, metaData, maxEntries);
  }
}

/*
 * Collects all data need for a chart an then create it
 */
export function createChart(simsBtn, fightStyle, talentChoice, chartId, metaData, maxEntries) {
  var jsonUrl = determineJsonUrl(simsBtn, AppState.getBaseUrl(), fightStyle, talentChoice);
  var requestId = ++latestChartRequestId;
  var requestStart = (typeof performance !== 'undefined' && performance.now) ? performance.now() : 0;

  if (activeChartRequest && typeof activeChartRequest.abort === 'function') {
    activeChartRequest.abort();
    activeChartRequest = null;
  }

  setChartLoadingState(chartId, true);

  var cachedData = getCachedChartData(jsonUrl);
  if (cachedData) {
    if (requestId === latestChartRequestId) {
      applyChartData(cachedData.data, simsBtn, fightStyle, talentChoice, chartId, metaData, maxEntries);
      setChartLoadingState(chartId, false);
      prefetchLikelyNextDatasets(simsBtn, fightStyle, talentChoice);

      if (isCacheEntryFresh(cachedData)) {
        if (requestStart) {
          logChartPerf('cache-hit', {
            url: jsonUrl,
            ms: Math.round(performance.now() - requestStart)
          });
        }
      } else {
        if (requestStart) {
          logChartPerf('cache-stale-hit', {
            url: jsonUrl,
            ms: Math.round(performance.now() - requestStart)
          });
        }

        revalidateCachedChartData(
          jsonUrl,
          cachedData,
          requestId,
          simsBtn,
          fightStyle,
          talentChoice,
          chartId,
          metaData,
          maxEntries,
          requestStart
        );
      }
    }
    return;
  }

  var prefetchRequest = prefetchRequestsByUrl.get(jsonUrl);
  if (prefetchRequest) {
    prefetchRequest.done(function(data) {
      if (requestId !== latestChartRequestId) {
        return;
      }

      cacheChartData(jsonUrl, data);
      applyChartData(data, simsBtn, fightStyle, talentChoice, chartId, metaData, maxEntries);
      setChartLoadingState(chartId, false);
      prefetchLikelyNextDatasets(simsBtn, fightStyle, talentChoice);
      if (requestStart) {
        logChartPerf('prefetch-reuse', {
          url: jsonUrl,
          ms: Math.round(performance.now() - requestStart)
        });
      }
    }).fail(function(xhr, status) {
      if (status === 'abort' || requestId !== latestChartRequestId) {
        return;
      }
      var fallbackUrl = getDungeonFallbackJsonUrl(simsBtn, fightStyle, talentChoice);
      if (fallbackUrl) {
        jQuery.getJSON(fallbackUrl, function(data) {
          cacheChartData(fallbackUrl, data);
          if (requestId !== latestChartRequestId) { return; }
          applyChartData(data, simsBtn, fightStyle, talentChoice, chartId, metaData, maxEntries);
          setChartLoadingState(chartId, false);
          prefetchLikelyNextDatasets(simsBtn, fightStyle, talentChoice);
        }).fail(function(xhr2, status2) {
          setChartLoadingState(chartId, false);
          handleJsonFailure(xhr2, status2);
        });
        return;
      }
      setChartLoadingState(chartId, false);
      handleJsonFailure(xhr, status);
    });

    return;
  }

  var request = jQuery.getJSON(jsonUrl, function(data) {
    cacheChartData(jsonUrl, data);

    if (requestId !== latestChartRequestId) {
      return;
    }

    applyChartData(data, simsBtn, fightStyle, talentChoice, chartId, metaData, maxEntries);
    setChartLoadingState(chartId, false);
    prefetchLikelyNextDatasets(simsBtn, fightStyle, talentChoice);
    if (requestStart) {
      logChartPerf('network-fetch', {
        url: jsonUrl,
        ms: Math.round(performance.now() - requestStart)
      });
    }
  }.bind(this));

  activeChartRequest = request;

  request.fail(function(xhr, status) {
    if (status === 'abort' || requestId !== latestChartRequestId) {
      return;
    }
    var fallbackUrl = getDungeonFallbackJsonUrl(simsBtn, fightStyle, talentChoice);
    if (fallbackUrl) {
      var fallbackRequest = jQuery.getJSON(fallbackUrl, function(data) {
        cacheChartData(fallbackUrl, data);
        if (requestId !== latestChartRequestId) { return; }
        applyChartData(data, simsBtn, fightStyle, talentChoice, chartId, metaData, maxEntries);
        setChartLoadingState(chartId, false);
        prefetchLikelyNextDatasets(simsBtn, fightStyle, talentChoice);
      }).fail(function(xhr2, status2) {
        setChartLoadingState(chartId, false);
        handleJsonFailure(xhr2, status2);
      });
      activeChartRequest = fallbackRequest;
      return;
    }
    setChartLoadingState(chartId, false);
    handleJsonFailure(xhr, status);
  }).always(function() {
    if (activeChartRequest === request) {
      activeChartRequest = null;
    }
  });
}

/*
 * Choose which chart to show
 */
export function buildData(data, simsBtn, chartId, maxEntries) {
  var chart = getValue(ChartType, simsBtn);
  if (chart == 'multiple') {
    buildChartDataMultipleBar(data, simsBtn, chartId, maxEntries);
  } else if (chart == 'percentage') {
    buildDataForPercentageChart(data, simsBtn, chartId, maxEntries);
  } else if (chart == 'dot') {
    buildChartDataDot(data, chartId);
  } else {
    buildChartDataSingleBar(data, false, getValue(ChartPadding, simsBtn), simsBtn, chartId, maxEntries);
  }
}

/*
 * Updates the size of the div for the chart for the real data
 */
export function updateSize(chart, chartId, size, maxEntries) {
  var realSize = 0;

  if (maxEntries != null && maxEntries != undefined) {
    realSize = maxEntries;
  } else {
    realSize = size;
  }

  document.getElementById(chartId).style.height = 200 + realSize * 30 + px; // Size the chart by our data.
  // resize without animation to avoid invalid intermediate heights
  chart.setSize(
    document.getElementById(chartId).style.width,
    document.getElementById(chartId).style.height,
    false // disable animation
  );

  // redraw happens automatically when setSize is called with animation
  // disabled, but keep the explicit call just in case.
  chart.redraw();
  try {
    $WowheadPower.refreshLinks();
  } catch (error) {
    console.log(error);
  }
}

/*
 * Determine the chart name for the current chart, for the used parameters
 */
export function determineChartName(firstTalent, fullSimType, fightStyle) {
  var simType = '';
  simType = (fullSimType || '').replaceAll('-', ' ');
  simType = simType.replaceAll('_', ' ');
  simType = simType
    .split(' ')
    .filter(function(word) { return word !== ''; })
    .map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');

  if ((fullSimType || '').toLowerCase() == 'talents_top') {
    return simType
              + space + dash + space
              + fightStyle;
  } else {
    return firstTalent 
              + space + dash + space
              + simType 
              + space + dash + space 
              + fightStyle;
  }
}

/*
 * Determines the description of the chart from the config.yml
 */
export function determineChartDescription(fullSimType) {
  fullSimType = fullSimType.replaceAll('_', '-');
  var descr = AppState.getConfigData()['sims'][fullSimType]['description'];
  return descr;
}

export function determineGuideLink(simType, fightStyle) {
  var normalizedSimType = (simType || '').replaceAll('-', '_').toLowerCase();
  var normalizedFightStyle = (fightStyle || '').toLowerCase();

  if (normalizedFightStyle === 'dungeons') {
    return {
      label: 'Mythic+ Tips',
      url: 'https://www.icy-veins.com/wow/shadow-priest-pve-dps-mythic-plus-tips'
    };
  }

  return IcyVeinsGuideBySim[normalizedSimType] || IcyVeinsGuideBySim.default;
}

/*
 * Determines the url for the github repo to get the needed sim results
 */
export function determineJsonUrl(simsBtn, baseurl, fightStyle, talentChoice, overrideDungeonType) {
  talentChoice = normalizeBuildKey(talentChoice);
  simsBtn = normalizeSimResultKey(simsBtn);
  var dungeonTypeValue = overrideDungeonType !== undefined ? overrideDungeonType : AppState.getConfigData()[dungeonType];
  fightStyle = normalizeFightStyleForResults(fightStyle, dungeonTypeValue);

  if (simsBtn == talents || simsBtn == talentsTop) {
    return baseurl + slash + simsBtn + simResultPath + fightStyle + jsonExtension;
  } else {
    return baseurl + slash + simsBtn + simResultPath + fightStyle + underscore + talentChoice + jsonExtension;
  }
}

/*
 * Handles the failure of an json call to github, most a wrong combination of
 * talent, simType, convenant and fightStyle.
 * So no data could be fetched
 */
function handleJsonFailure(xhr, status) {
  console.log('The JSON chart failed to load, please let Publik know via discord Publik#5576');
  console.log(status);
}

