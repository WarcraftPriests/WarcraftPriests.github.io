/*
 * Decides what kind of chart should be used 
 * and when a chart update should happen
 */
function updateChart(currTalentBtn, currSimsBtn, currConsumablesBtn, currEnchantsBtn, currFightStyleBtn, chartId, metaData, maxEntries) {
  if (currSimsBtn == 'weights') {
    parseCSV(currSimsBtn, currFightStyleBtn, currTalentBtn, chartId, metaData);
  } else {
    createChart(currSimsBtn, currFightStyleBtn, currTalentBtn, chartId, metaData, maxEntries);
  }
}

/*
 * Collects all data need for a chart an then create it
 */
function createChart(simsBtn, fightStyle, talentChoice, chartId, metaData, maxEntries) {
  jQuery.getJSON(determineJsonUrl(simsBtn, AppState.getBaseUrl(), fightStyle, talentChoice),
    function (data) {
      if (metaData) {
        renderChartUpdatedText(updateDataInnerHtml + data[jsonLastUpdated]);
        var simTalent = getConfigValue(AppState.getConfigData()[builds], talentChoice);
        var header = determineChartName(simTalent.name,
          simsBtn.charAt(0).toUpperCase() + simsBtn.slice(1),
          fightStyle);
        renderChartHeader(header);
        renderChartDescription(determineChartDescription(simsBtn));
      }
        
      buildData(data, simsBtn, chartId, maxEntries);
    }.bind(this)
  ).fail(function(xhr, status) {
    handleJsonFailure(xhr, status);
  });
}

/*
 * Choose which chart to show
 */
function buildData(data, simsBtn, chartId, maxEntries) {
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
function updateSize(chart, chartId, size, maxEntries) {
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
function determineChartName(firstTalent, fullSimType, fightStyle) {
  var simType = '';
  simType = fullSimType.replaceAll('-', ' ');
  simType = simType.replaceAll('_', ' ');

  if (fullSimType.toLowerCase() == 'talents_top') {
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
function determineChartDescription(fullSimType) {
  fullSimType = fullSimType.replaceAll('_', '-');
  var descr = AppState.getConfigData()['sims'][fullSimType]['description'];
  return descr;
}

/*
 * Determines the url for the github repo to get the needed sim results
 */
function determineJsonUrl(simsBtn, baseurl, fightStyle, talentChoice) {
  talentChoice = normalizeBuildKey(talentChoice);
  simsBtn = normalizeSimResultKey(simsBtn);
  fightStyle = normalizeFightStyleForResults(fightStyle, AppState.getConfigData()[dungeonType]);

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
