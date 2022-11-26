/*
 * Decides what kind of chart should be used 
 * and when a chart update should happen
 */
function updateChart(currTalentBtn, currSimsBtn, currConsumablesBtn, currEnchantsBtn, currFightStyleBtn, chartId, metaData, maxEntries) {
  if(maxEntries != null || maxEntries != undefined) {
    maxEntries = maxEntries - 1;
  }
  
  if(currSimsBtn == "weights") {
    parseCSV(currSimsBtn, currFightStyleBtn, currTalentBtn, chartId, metaData);
  } else {
    createChart(currSimsBtn, currFightStyleBtn, currTalentBtn, chartId, metaData, maxEntries);
  }
}

/*
 * Collects all data need for a chart an then create it
 */
function createChart( simsBtn, fightStyle, talentChoice, chartId, metaData, maxEntries) {
  jQuery.getJSON( determineJsonUrl(simsBtn, baseUrl, fightStyle, talentChoice),
      function (data) {
        if(metaData) {
          document.getElementById("updateData").innerHTML = updateDataInnerHtml + data[jsonLastUpdated];
          var header = determineChartName( getValue(SimTalents, talentChoice), 
                                           simsBtn.charAt(0).toUpperCase() + simsBtn.slice(1), 
                                           fightStyle);
          document.getElementById('header').innerHTML = "<h3 style='color:#ffffff'>" + header + "</h3>";
          document.getElementById('description').innerHTML = determineChartDescription(simsBtn);
        }
        
        buildData(data, simsBtn, chartId, maxEntries);
      }.bind(this)
    ).fail(function(xhr, status) {
      handleJsonFailure(xhr, status)
    });
}

/*
 * Choose which chart to show
 */
function buildData(data, simsBtn, chartId, maxEntries) {
  var chart = getValue(ChartType, simsBtn);
  if(chart == "multiple") {
    buildChartDataMultipleBar(data, simsBtn, chartId, maxEntries)
  } else if(chart == "percentage") {
    buildDataForPercentageChart(data, simsBtn, chartId, maxEntries);
  } else if(chart == "dot") {
    buildChartDataDot(data, chartId);
  } else {
    buildChartDataSingleBar(data, false, getValue(ChartPadding, simsBtn), simsBtn, chartId, maxEntries)
  }
}

/*
 * Updates the size of the div for the chart for the real data
 */
function updateSize(chart, chartId, size, maxEntries) {
  var realSize = 0;

  if(maxEntries != null || maxEntries != undefined) {
    realSize = maxEntries;
  } else {
    realSize = size;
  }

  document.getElementById(chartId).style.height = 200 + realSize * 30 + px; // Size the chart by our data.
  chart.setSize( 
    document.getElementById(chartId).style.width,
    document.getElementById(chartId).style.height
  );

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
  var simType = "";
  simType = fullSimType.replaceAll("-", " ");
  simType = simType.replaceAll("_", " ");

  if(fullSimType.toLowerCase() == "talent_builds") {
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
  fullSimType = fullSimType.replaceAll("_", "-");
  var descr = configData["sims"][fullSimType]["description"];
  return descr;
}

/*
 * Determines the url for the github repo to get the needed sim results
 */
function determineJsonUrl(simsBtn, baseurl, fightStyle, talentChoice) {
  /*
   * Special cases!
   */
  if(talentChoice.includes(underscore)) {
    talentChoice = talentChoice.replaceAll(underscore, dash);
  }

  if(simsBtn.includes(underscore)) {
    simsBtn = simsBtn.replaceAll(underscore, dash);
  }

  if(fightStyle.includes("twoset")) {
    fightStyle = "2T";
  } else if(fightStyle.includes("fourset")) {
    fightStyle = "4T";
  }

  if(simsBtn == talents){
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
  console.log("The JSON chart failed to load, please let DJ/espo know via discord Djriff#0001/espo#6663");
  console.log(status);
}
