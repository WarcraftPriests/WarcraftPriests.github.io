/*
 * Decides what kind of chart should be used 
 * and when a chart update should happen
 */
function updateChart(currTalentBtn, currSimsBtn, currCovenantBtn, currConsumablesBtn, currEnchantsBtn, currFightStyleBtn, chartId, metaData) {
  if(currSimsBtn == "weights") {
    parseCSV(currSimsBtn, currFightStyleBtn, currTalentBtn, chartId, metaData);
  } else {
    createChart(currSimsBtn, currFightStyleBtn, currTalentBtn, currCovenantBtn, chartId, metaData);
  }
}

/*
 * Collects all data need for a chart an then create it
 */
function createChart( simsBtn, fightStyle, talentChoice, covenantType, chartId, metaData) {
  jQuery.getJSON( determineJsonUrl(simsBtn, baseUrl, fightStyle, talentChoice, covenantType),
      function (data) {
        if(metaData) {
          document.getElementById("updateData").innerHTML = updateDataInnerHtml + data[jsonLastUpdated];
          var header = determineChartName( covenantType, 
                                           getValue(SimTalents, talentChoice), 
                                           simsBtn.charAt(0).toUpperCase() + simsBtn.slice(1), 
                                           fightStyle);
          document.getElementById('header').innerHTML = "<h3 style='color:#ffffff'>" + header + "</h3>";
          document.getElementById('description').innerHTML = determineChartDescription(simsBtn);
        }
        
        buildData(data, simsBtn, chartId);
      }.bind(this)
    ).fail(function(xhr, status) {
      handleJsonFailure(xhr, status)
    });
}

/*
 * Choose which chart to show
 */
function buildData(data, simsBtn, chartId) {
  var chart = getValue(ChartType, simsBtn);
  if(chart == "multiple") {
    buildChartDataMultipleBar(data, simsBtn, chartId)
  } else if(chart == "percentage") {
    buildDataForPercentageChart(data, simsBtn, chartId);
  } else if(chart == "dot") {
    buildChartDataDot(data, chartId);
  } else {
    buildChartDataSingleBar(data, false, getValue(ChartPadding, simsBtn), simsBtn, chartId)
  }
}

/*
 * Updates the size of the div for the chart for the real data
 */
function updateSize(chart, chartId, size) {
  document.getElementById(chartId).style.height = 200 + size * 30 + px; // Size the chart by our data.
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
function determineChartName(covenantType, firstTalent, fullSimType, fightStyle) {
  var simType = "";
  simType = fullSimType.replace("-", " ");
  simType = simType.replace("_", " ");

  if(fullSimType.toLowerCase() == covenantsChoice) {
    return coventantsChoiceChartName;
  } 
  if (covenantType === empty || covenantType == null) {
    return firstTalent 
              + space + dash + space
              + simType
              + space + dash + space
              + fightStyle;
  } else {
    return firstTalent 
              + space + dash + space
              + simType 
              + space + dash + space 
              + getValue(Conduits, covenantType)
              + space + dash + space 
              + fightStyle;
  }
}

/*
 * Determines the description of the chart from the config.yml
 */
function determineChartDescription(fullSimType) {
  fullSimType = fullSimType.replace("_", "-");
  var descr = configData["sims"][fullSimType]["description"];
  return descr;
}

/*
 * Determines the url for the github repo to get the needed sim results
 */
function determineJsonUrl(simsBtn, baseurl, fightStyle, talentChoice, covenantType) {
  /*
   * Special cases!
   */
  if(talentChoice.includes(underscore)) {
    talentChoice = talentChoice.replace(underscore, dash);
  }

  if(simsBtn.includes(underscore)) {
    simsBtn = simsBtn.replace(underscore, dash);
  }

  if(simsBtn == talents){
    return baseurl + slash + simsBtn + simResultPath + fightStyle + jsonExtension;
  } else if(simsBtn == "covenant-choice") {
    return baseurl + slash + simsBtn + simResultPath + "Aggregate" + jsonExtension;
  } else if(configData["sims"][simsBtn]["covenant"]["lookup"]) {
    return baseurl + slash + simsBtn + simResultPath + fightStyle + underscore + talentChoice + underscore + covenantType + jsonExtension;
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