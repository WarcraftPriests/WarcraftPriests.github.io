import { AppState } from '../../../services/state/AppState.module.js';
import { getValue, LegendTitles } from '../../../utils/Converter.module.js';
import {
  jsonSortedDataKeys,
  jsonSimulatedSteps,
  jsonData,
  jsonBase,
  jsonDPS,
  jsonIds,
  dpsIncrease,
  DPS,
  trinketCombos
} from '../../../utils/Constants.module.js';
import { create_color } from './ColorHelper.module.js';
import {
  clearChartSeries,
  buildSingleBarSeriesData,
  buildNumericPercentageSeries,
  buildStepPercentageSeries,
  areStepsNumeric,
  getSortedNumericLevels,
  buildNumericMultiBarSeries,
  isMinMaxSeriesPayload,
  buildMinMaxMultiBarSeries
} from './SeriesHelper.module.js';
import {
  buildWowheadTooltips,
  buildWowheadTooltipsMultipleBar
} from './WowheadHelper.module.js';
import {
  getSingleBarDefinition,
  getChartDefinitionPercentage,
  getMultipleBarChartDefinition,
  getDefaultDotDefinition
} from '../definitions/Definitions.module.js';

function applyChartSize(chart, chartId, size, maxEntries) {
  var realSize = 0;
  var rowHeight = 30;

  if (maxEntries != null && maxEntries != undefined) {
    realSize = maxEntries;
  } else {
    realSize = size;
  }

  var isMobile = typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(max-width: 600px)').matches;
  var currentSimsBtn = AppState.getCurrSimsBtn ? AppState.getCurrSimsBtn() : '';
  if (isMobile && currentSimsBtn === trinketCombos) {
    // Trinket combos are rendered as two lines per label on mobile.
    rowHeight = 44;
  }

  document.getElementById(chartId).style.height = 200 + realSize * rowHeight + 'px';
  chart.setSize(
    document.getElementById(chartId).style.width,
    document.getElementById(chartId).style.height,
    false
  );
  chart.redraw();
  try {
    $WowheadPower.refreshLinks();
  } catch (error) {
    console.log(error);
  }
}

/*
 * Prepare data for single bar chart
 */
export function buildChartDataSingleBar(data, showInLegend, xPadding, simsBtn, chartId, maxEntries) {
  var chartForSingle = new Highcharts.Chart(getSingleBarDefinition( 
    buildWowheadTooltips(data, true, simsBtn, showInLegend),
    data,
    getValue(LegendTitles, simsBtn),
    dpsIncrease,
    showInLegend,
    xPadding,
    chartId, 
    maxEntries));
  clearChartSeries(chartForSingle);
  var currName = data.name.split(' - ').pop();
  currName = currName.replace(/\s/g, '');
  let result = buildSingleBarSeriesData(data, 100, currName);

  chartForSingle.addSeries({
    data: result,
    name: DPS,
    showInLegend: showInLegend,
  }, false);
  applyChartSize(chartForSingle, chartId, result.length, maxEntries);
}

/*
 * Prepare data for percentage bar chart
 */
export function buildDataForPercentageChart(data, simsBtn, chartId, maxEntries) {
  var chartForPercentage = new Highcharts.Chart(getChartDefinitionPercentage( 
    buildWowheadTooltips(data, false, simsBtn), 
    data,
    getValue(LegendTitles, simsBtn),
    dpsIncrease,
    chartId,
    maxEntries));

  clearChartSeries(chartForPercentage);

  // if the step names are purely numeric we'll treat them as item
  // levels and stack the _incremental_ percent increases rather than
  // plotting the absolute percent relative to baseline. this avoids
  // negative bar heights caused by downward steps and mirrors the
  // behavior users expect for trinket/legendary ilvl charts.
  var steps = data[jsonSimulatedSteps] || [];
  var numericSteps = areStepsNumeric(steps);

  if (numericSteps) {
    var levels = getSortedNumericLevels(steps);
    var seriesArray = buildNumericPercentageSeries(data, levels);
    
    // add in reverse order so lowest level appears leftmost on horizontal bar
    seriesArray.reverse();
    seriesArray.forEach(function(series) {
      chartForPercentage.addSeries({
        data: series.data,
        name: series.name,
        showInLegend: true,
      }, false);
    });

    applyChartSize(chartForPercentage, chartId, data[jsonSortedDataKeys].length, maxEntries);
  } else {
    // fallback to original behaviour for non-numeric steps
    var fallbackSeries = buildStepPercentageSeries(data, steps);
    fallbackSeries.forEach(function(series) {
      chartForPercentage.addSeries({
        data: series.data,
        name: series.name,
        showInLegend: true,
      }, false);
    });
    applyChartSize(chartForPercentage, chartId, data[jsonSortedDataKeys].length, maxEntries);
  }
}

/*
 * Prepare data for multiple bar chart
 */
export function buildChartDataMultipleBar(data, simsBtn, chartId, maxEntries) {
  var chartForMultipleBar = new Highcharts.Chart(getMultipleBarChartDefinition(
    buildWowheadTooltipsMultipleBar(data, simsBtn), 
    data,
    getValue(LegendTitles, simsBtn),
    dpsIncrease,
    chartId,
    maxEntries));
  clearChartSeries(chartForMultipleBar);

  // determine whether the payload is the old min/max conduit format or a
  // simple mapping of numeric keys (item levels) to values.
  var sample = data[jsonData];
  var isMinMax = isMinMaxSeriesPayload(sample);

  if (isMinMax) {
    var minMaxSeries = buildMinMaxMultiBarSeries(data);
    minMaxSeries.forEach(function(series) {
      chartForMultipleBar.addSeries({
        color: series.color,
        data: series.data,
        name: series.name,
        stack: series.stack,
        showInLegend: true,
      }, false);
    });

    chartForMultipleBar.redraw();
    applyChartSize(chartForMultipleBar, chartId, minMaxSeries.length / 2, maxEntries);

  } else {
    // numeric-key format: treat each top‑level key in the nested object as an
    // item level (or other incremental step) and stack the deltas.
    var sample = data[jsonData];
    var fights = Object.keys(sample).filter(f => f !== jsonBase); // exclude 'Base'
    var levelSet = new Set();
    fights.forEach(function(f) {
      Object.keys(sample[f]).forEach(function(l) { levelSet.add(l); });
    });
    var levels = getSortedNumericLevels(Array.from(levelSet));

    // build one series per level, where the first series is the absolute
    // value and each subsequent series is the difference from the previous
    // level.  convert to percent increase over base DPS to match the
    // conduit behavior and keep bars on-scale.
    var numericSeries = buildNumericMultiBarSeries(data, fights, levels);
    numericSeries.forEach(function(series) {
      chartForMultipleBar.addSeries({
        name: series.name,
        color: series.color,
        data: series.data,
        stack: 'levels',
        showInLegend: true,
      }, false);
    });

    chartForMultipleBar.redraw();
    applyChartSize(chartForMultipleBar, chartId, fights.length, maxEntries);
  }
}

/*
 * Prepare data for dot chart
 */
export function buildChartDataDot(githubData, chartId) {
  let critLabel = false;
  let versLabel = false;
  let hasteLabel = false;
  let masteryLabel = false;

  var chartForStats = new Highcharts.Chart(getDefaultDotDefinition(chartId));
  (function (H) {
    function dragStart(eStart) {
      eStart = chartForStats.pointer.normalize(eStart);

      var posX = eStart.chartX,
        posY = eStart.chartY,
        alpha = chartForStats.options.chart.options3d.alpha,
        beta = chartForStats.options.chart.options3d.beta,
        sensitivity = 5; // lower is more sensitive

      function drag(e) {
        e = chartForStats.pointer.normalize(e);

        chartForStats.update({
          chart: {
            options3d: {
              alpha: alpha + (e.chartY - posY) / sensitivity,
              beta: beta + (posX - e.chartX) / sensitivity
            }
          }
        }, undefined, undefined, false);
      }
      chartForStats.unbindDragMouse = H.addEvent(document, 'mousemove', drag);
      chartForStats.unbindDragTouch = H.addEvent(document, 'touchmove', drag);
      H.addEvent(document, 'mouseup', chartForStats.unbindDragMouse);
      H.addEvent(document, 'touchend', chartForStats.unbindDragTouch);
    }
    H.addEvent(chartForStats.container, 'mousedown', dragStart);
    H.addEvent(chartForStats.container, 'touchstart', dragStart);
  }(Highcharts));

  
  let light_color = '#eeeeee';
  let maxDPSPrefix = githubData[jsonSortedDataKeys][0];
  let minDPSPrefix = githubData[jsonSortedDataKeys][githubData[jsonSortedDataKeys].length - 1];
  let maximalDps = githubData[jsonData][maxDPSPrefix][jsonDPS];
  let minimalDps = githubData[jsonData][minDPSPrefix][jsonDPS];
  
  let series = {
    name: Intl.NumberFormat().format(maximalDps) + ' DPS',
    color: '#FF0000',
    data: []
  };

  for (const sortedData of githubData[jsonSortedDataKeys]) {
    let entry = githubData[jsonData][sortedData][jsonDPS];
    let color_set = create_color(
      entry,
      minimalDps,
      maximalDps
    );
    let line_width = 1;
    let line_color = '#232227';

    let radius = 2 + 3 * (entry - minimalDps) / (maximalDps - minimalDps);
    if (maximalDps === entry) {
      line_width = 3;
      radius = 8;
      line_color = light_color;
    }

    let dataLabel = undefined;
 
    if (sortedData.includes('10')) {
      if (sortedData.split('_')[0].includes('10')
          && !masteryLabel) {
        dataLabel = {
          enabled: true,
          allowOverlap: true,
        };
        dataLabel.format = 'Mastery';
        dataLabel.verticalAlign = 'top';
        masteryLabel = true;
      } else if (sortedData.split('_')[1].includes('10')
          && !versLabel) {
        dataLabel = {
          enabled: true,
          allowOverlap: true,
        };  
        dataLabel.format = 'Versatility';
        dataLabel.verticalAlign = 'top';
        versLabel = true;
      } else if (sortedData.split('_')[2].includes('10')
          && !hasteLabel) {
        dataLabel = {
          enabled: true,
          allowOverlap: true,
        };
        dataLabel.format = 'Haste';
        hasteLabel = true;
      } else if (sortedData.split('_')[3].includes('10')
          && !critLabel) {
        dataLabel = {
          enabled: true,
          allowOverlap: true,
        };
        dataLabel.format = 'Crit';
        dataLabel.verticalAlign = 'top';
        critLabel = true;
      }
    }

    const statMastery = ((parseInt(sortedData.split('_')[0].replace(/[^.\d]/g, ''))) * AppState.getConfigData()['stats']['steps']) + AppState.getConfigData()['stats']['base'] / AppState.getConfigData()['stats']['include'].length;
    const statVers = ((parseInt(sortedData.split('_')[1].replace(/[^.\d]/g, ''))) * AppState.getConfigData()['stats']['steps']) + AppState.getConfigData()['stats']['base'] / AppState.getConfigData()['stats']['include'].length;
    const statHaste = ((parseInt(sortedData.split('_')[2].replace(/[^.\d]/g, ''))) * AppState.getConfigData()['stats']['steps']) + AppState.getConfigData()['stats']['base'] / AppState.getConfigData()['stats']['include'].length;
    const statCrit = ((parseInt(sortedData.split('_')[3].replace(/[^.\d]/g, ''))) * AppState.getConfigData()['stats']['steps']) + AppState.getConfigData()['stats']['base'] / AppState.getConfigData()['stats']['include'].length;
    const sumStatValues = AppState.getConfigData()['stats']['total'];

    series.data.push({
      x: Math.sqrt(3) / 2 * (parseInt(sortedData.split('_')[0].replace(/[^.\d]/g, '')) + 1 / 3 * parseInt(sortedData.split('_')[1].replace(/[^.\d]/g, ''))),
      y: Math.sqrt(2 / 3) * parseInt(sortedData.split('_')[1].replace(/[^.\d]/g, '')),
      z: parseInt(sortedData.split('_')[2].replace(/[^.\d]/g, '')) + 0.5 * parseInt(sortedData.split('_')[0].replace(/[^.\d]/g, '')) + 0.5 * parseInt(sortedData.split('_')[1].replace(/[^.\d]/g, '')),
      name: sortedData,
      color: 'rgb(' + color_set[0] + ',' + color_set[1] + ',' + color_set[2] + ')',

      dps: entry,
      dpsMax: maximalDps,
      dpsMin: minimalDps,
      dpsBase: githubData[jsonData][jsonBase][jsonDPS],
      statMastery: statMastery,
      statVers: statVers,
      statHaste: statHaste,
      statCrit: statCrit,
      statMasteryPercent: Math.round((100 / sumStatValues) * (((parseInt(sortedData.split('_')[0].replace(/[^.\d]/g, ''))) * AppState.getConfigData()['stats']['steps']) + AppState.getConfigData()['stats']['base'] / AppState.getConfigData()['stats']['include'].length)),
      statVersPercent: Math.round((100 / sumStatValues) * (((parseInt(sortedData.split('_')[1].replace(/[^.\d]/g, ''))) * AppState.getConfigData()['stats']['steps']) + AppState.getConfigData()['stats']['base'] / AppState.getConfigData()['stats']['include'].length)),
      statHastePercent: Math.round((100 / sumStatValues) * (((parseInt(sortedData.split('_')[2].replace(/[^.\d]/g, ''))) * AppState.getConfigData()['stats']['steps']) + AppState.getConfigData()['stats']['base'] / AppState.getConfigData()['stats']['include'].length)),
      statCritPercent: Math.round((100 / sumStatValues) * (((parseInt(sortedData.split('_')[3].replace(/[^.\d]/g, ''))) * AppState.getConfigData()['stats']['steps']) + AppState.getConfigData()['stats']['base'] / AppState.getConfigData()['stats']['include'].length)),
      marker: {
        radius: radius,
        lineColor: line_color,
        lineWidth: line_width
      },
      dataLabels: dataLabel,
    });
  }

  
  while (chartForStats.series[0]) {
    chartForStats.series[0].remove(false);
  }

  chartForStats.addSeries(series, false);
  chartForStats.addSeries({ name: Intl.NumberFormat().format(minimalDps) + ' DPS', color: '#00FFFF' }, false);
  chartForStats.redraw();
}