/*
 * Prepare data for single bar chart
 */
function buildChartDataSingleBar(data, showInLegend, xPadding, simsBtn, chartId, maxEntries) {
  var chartForSingle = new Highcharts.Chart( getSingleBarDefinition( 
                                                buildWowheadTooltips( data, true, simsBtn, showInLegend),
                                                data,
                                                getValue(LegendTitles, simsBtn),
                                                dpsIncrease,
                                                showInLegend,
                                                xPadding,
                                                chartId, 
                                                maxEntries))
  while (chartForSingle.series.length > 0) {
    chartForSingle.series[0].remove(false);
  }
  let result = [];
  var currName = data.name.split("-").pop();
  currName = currName.replace(/\s/g, '');
  for (sortedData of data[jsonSortedDataKeys]) {
    let dps = data[jsonData][sortedData][jsonDPS];
    let baselineDPS = data[jsonData][jsonBase][jsonDPS];
    if (baselineDPS == null) 
      baselineDPS = 0;
    
    if(dps >= 0) {
      var percentage = (dps / baselineDPS) * 100 - 100;
      if(percentage < 0) {
        result.push({y: 0, color: getColor(sortedData, currName)});
      } else {
        result.push({y: percentage, color: getColor(sortedData, currName)});
      }
    }
  }

  chartForSingle.addSeries({
    data: result,
    name: DPS,
    showInLegend: showInLegend,
  },false);
  updateSize(chartForSingle, chartId, result.length, maxEntries);
}

/*
 * Prepare data for percentage bar chart
 */
function buildDataForPercentageChart(data, simsBtn, chartId, maxEntries) {
  var chartForPercentage = new Highcharts.Chart( getChartDefinitionPercentage( 
                                                      buildWowheadTooltips(data, false, simsBtn), 
                                                      data,
                                                      getValue(LegendTitles, simsBtn),
                                                      dpsIncrease,
                                                      chartId,
                                                      maxEntries));

  while (chartForPercentage.series.length > 0) {
    chartForPercentage.series[0].remove(false);
  }

  for (currStep of data[jsonSimulatedSteps]) {
    let currResult = [];  
    
    for (sortedData of data[jsonSortedDataKeys]) {
      let dps = data[jsonData][sortedData.trim()][currStep];
      let baselineDPS = data[jsonData][jsonBase];
      if (baselineDPS == null) 
        baselineDPS = 0;
  
      if(dps >= 0) {
        var percentage = (dps / baselineDPS.DPS) * 100 - 100;
        if(percentage < 0) {
          currResult.push(0);
        } else {
          currResult.push(percentage);
        }
      } else {
        currResult.push(0);
      }
      
    }
    chartForPercentage.addSeries({
      data: currResult,
      name: currStep,
      showInLegend: true,
    }, false);
  }
  updateSize(chartForPercentage, chartId, data[jsonSortedDataKeys].length, maxEntries);
}

/*
 * Prepare data for multiple bar chart
 */
function buildChartDataMultipleBar(data, simsBtn, chartId, maxEntries) {
  var chartForMultipleBar = new Highcharts.Chart(getMultipleBarChartDefinition(
                                                      buildWowheadTooltipsMultipleBar( data, simsBtn), 
                                                      data,
                                                      getValue(LegendTitles, simsBtn),
                                                      dpsIncrease,
                                                      chartId,
                                                      maxEntries));
  while (chartForMultipleBar.series.length > 0) {
    chartForMultipleBar.series[0].remove(false);
  }
  var minResults = [];
  var maxResults = [];

  for(i = 0; i <= AggregateConduits.length -1; i++) {
    minResults = [];
    maxResults = [];

    for(currFight in data[jsonData]) {
      var minValue = ((data[jsonData][currFight][AggregateConduits[i]]["min"]) * 100);
      var maxValue = ((data[jsonData][currFight][AggregateConduits[i]]["max"]) * 100) - ((data[jsonData][currFight][AggregateConduits[i]]["min"])) * 100;
      minResults.push(minValue);
      maxResults.push(maxValue);
    }

    chartForMultipleBar.addSeries({
      color: getCovenantChoiceColor(AggregateConduits[i] + "_max"),
      data: maxResults,
      name: getValue(Conduits, AggregateConduits[i]) + " max",
      stack: AggregateConduits[i],
      showInLegend: true,
      }, false);
    
      chartForMultipleBar.addSeries({
      color: getCovenantChoiceColor(AggregateConduits[i] + "_min"),
      data: minResults,
      name: getValue(Conduits, AggregateConduits[i]) + " min",
      stack: AggregateConduits[i],
      showInLegend: true,
    }, false);
  }
  chartForMultipleBar.redraw();
  updateSize(chartForMultipleBar, chartId, AggregateConduits.length, maxEntries);
}

/*
 * Prepare data for dot chart
 */
function buildChartDataDot(githubData, chartId) {
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

  
  let light_color = "#eeeeee"
  let maxDPSPrefix = githubData[jsonSortedDataKeys][0];
  let minDPSPrefix = githubData[jsonSortedDataKeys][githubData[jsonSortedDataKeys].length -1];
  let maximalDps = githubData[jsonData][maxDPSPrefix][jsonDPS];
  let minimalDps = githubData[jsonData][minDPSPrefix][jsonDPS];
  
  let series = {
    name: Intl.NumberFormat().format(maximalDps) + " DPS",
    color: "#FF0000",
    data: []
  };

  for (sortedData of githubData[jsonSortedDataKeys]) {
    let entry = githubData[jsonData][sortedData][jsonDPS];
    let color_set = create_color(
      entry,
      minimalDps,
      maximalDps
    );
    let line_width = 1;
    let line_color = "#232227";

    let radius = 2 + 3 * (entry - minimalDps) / (maximalDps - minimalDps);
    if (maximalDps === entry) {
      line_width = 3;
      radius = 8;
      line_color = light_color;
    }

    let dataLabel = undefined;
    if(sortedData.includes("10")) {
      dataLabel = {
        enabled: true,
        allowOverlap: true,
      };
      
      if(sortedData.split(underscore)[0].includes("10")){
        dataLabel.format = "Mastery";
        dataLabel.verticalAlign = "top";
      } else if(sortedData.split("_")[1].includes("10")) {
        dataLabel.format = "Versatility";
        dataLabel.verticalAlign = "top";
      } else if(sortedData.split("_")[2].includes("10")) {
        dataLabel.format = "Haste";
      } else if(sortedData.split("_")[3].includes("10")) {
        dataLabel.format = "Crit";
        dataLabel.verticalAlign = "top";
      }
    }

    statMastery = ((parseInt(sortedData.split("_")[0].replace(/[^.\d]/g, ''))) * configData["stats"]["steps"] ) + configData["stats"]["base"] / configData["stats"]["include"].length;
    statVers = ((parseInt(sortedData.split("_")[1].replace(/[^.\d]/g, ''))) * configData["stats"]["steps"] ) + configData["stats"]["base"] / configData["stats"]["include"].length;
    statHaste = ((parseInt(sortedData.split("_")[2].replace(/[^.\d]/g, ''))) * configData["stats"]["steps"] ) + configData["stats"]["base"] / configData["stats"]["include"].length;
    statCrit = ((parseInt(sortedData.split("_")[3].replace(/[^.\d]/g, ''))) * configData["stats"]["steps"] ) + configData["stats"]["base"] / configData["stats"]["include"].length;
    sumStatValues = configData["stats"]["total"];

    series.data.push({
      x: Math.sqrt(3) / 2 * (parseInt(sortedData.split("_")[0].replace(/[^.\d]/g, '')) + 1 / 3 * parseInt(sortedData.split("_")[1].replace(/[^.\d]/g, ''))),
      y: Math.sqrt(2 / 3) * parseInt(sortedData.split("_")[1].replace(/[^.\d]/g, '')),
      z: parseInt(sortedData.split("_")[2].replace(/[^.\d]/g, '')) + 0.5 * parseInt(sortedData.split("_")[0].replace(/[^.\d]/g, '')) + 0.5 * parseInt(sortedData.split("_")[1].replace(/[^.\d]/g, '')),
      name: sortedData,
      color: "rgb(" + color_set[0] + "," + color_set[1] + "," + color_set[2] + ")",

      dps: entry,
      dpsMax: maximalDps,
      dpsMin: minimalDps,
      dpsBase: githubData[jsonData][jsonBase][jsonDPS],
      statMastery: statMastery,
      statVers: statVers,
      statHaste: statHaste,
      statCrit: statCrit,
      statMasteryPercent: Math.round(( 100 / sumStatValues ) * (((parseInt(sortedData.split("_")[0].replace(/[^.\d]/g, ''))) * configData["stats"]["steps"] ) + configData["stats"]["base"] / configData["stats"]["include"].length)),
      statVersPercent: Math.round(( 100 /sumStatValues ) * (((parseInt(sortedData.split("_")[1].replace(/[^.\d]/g, ''))) * configData["stats"]["steps"] ) + configData["stats"]["base"] / configData["stats"]["include"].length)),
      statHastePercent: Math.round(( 100 /sumStatValues ) * (((parseInt(sortedData.split("_")[2].replace(/[^.\d]/g, ''))) * configData["stats"]["steps"] ) + configData["stats"]["base"] / configData["stats"]["include"].length)),
      statCritPercent: Math.round(( 100 /sumStatValues ) * (((parseInt(sortedData.split("_")[3].replace(/[^.\d]/g, ''))) * configData["stats"]["steps"] ) + configData["stats"]["base"] / configData["stats"]["include"].length)),
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
  chartForStats.addSeries({ name: Intl.NumberFormat().format(minimalDps) + " DPS", color: "#00FFFF" }, false);
  chartForStats.redraw();
}