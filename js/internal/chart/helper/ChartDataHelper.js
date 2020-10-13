/*
 * Use the data from the json request and sort them for the single bar
 * setup
 */
function buildChartDataSingleBar(data, chartId, chart) {
  while (chart.series.length > 0) {
    chart.series[0].remove(false);
  }
  let result = [];
  for (sortedData of data[jsonSortedDataKeys]) {
    let dps = data[jsonData][sortedData][jsonDPS];
    let baselineDPS = data[jsonData][jsonBase][jsonDPS];
    if (baselineDPS == null) 
      baselineDPS = 0;
    
    if(dps >= 0) {
      var percentage = (dps / baselineDPS) * 100 - 100;
      if(percentage < 0) {
        result.push({y: 0, color: getCovenantColor(sortedData)});
      } else {
        result.push({y: percentage, color: getCovenantColor(sortedData)});
      }
    }
  }
  chart.addSeries({
    data: result,
    name: DPS,
    showInLegend: true,
  },false);
  updateSize(chart, chartId, result.length);
}

/*
 * Use the data from the json request and sort them for the single bar
 * setup
 */
function buildDataForStackedChart(data, chartId, chart) {
  while (chart.series.length > 0) {
    chart.series[0].remove(false);
  }
  let baselineDPS = data[jsonData][jsonBase][jsonDPS];
  var tempResult = [];
  var store = new Map();

  for(trinket of data[jsonSortedDataKeys]) {
    tempResult = [];
    for(i = data[jsonSimulatedSteps].length - 1; i >= 0; i--) {
      var testDps = data[jsonData][trinket][data[jsonSimulatedSteps][i]];
      tempResult.push(testDps -baselineDPS);
    }
    store.set(trinket, tempResult);
  }
  
  var result = [];
  for(i = 0; i <= data[jsonSimulatedSteps].length - 1; i++) {
    result = [];
    currStep = data[jsonSimulatedSteps][i];
    for(trinket of data[jsonSortedDataKeys]) {
      trinketDpsData = store.get(trinket);
      result.push(trinketDpsData[(data[jsonSimulatedSteps].length - 1)- i]);
    }
    chart.addSeries({
      data: result,
      name: currStep,
      showInLegend: true
    }, false);
  }
  updateSize(chart, chartId, data[jsonSortedDataKeys].length);
}
  
/*
 * Use the data from the json request and sort them for the stacked bar
 * setup
 */
function buildDataForPercentageChart(data, chartId, chart) {
  while (chart.series.length > 0) {
    chart.series[0].remove(false);
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
      }
    }
    chart.addSeries({
      data: currResult,
      name: currStep,
      showInLegend: true,
    }, false);
  }
  updateSize(chart, chartId, data[jsonSortedDataKeys].length);
}

/*
 * Use the data from the json request and sort them for the stacked bar
 * setup
 */
function buildChartDataMultipleBar(data, chartId, chart, fightStyle) {
  while (chart.series.length > 0) {
    chart.series[0].remove(false);
  }
  
  var minResults = [];
  var maxResults = [];

  for(i = 0; i <= Conduits2.length -1; i++) {
    minResults = [];
    maxResults = [];
    for(currFight in data[jsonData]) {
      minResults.push(data[jsonData][currFight][Conduits2[i]]["min"]);
      maxResults.push(data[jsonData][currFight][Conduits2[i]]["max"]);
    }

    chart.addSeries({
      color: getCovenantChoiceColor(Conduits2[i] + "_max"),
      data: maxResults,
      name: getConduitsName(Conduits2[i]) + " max",
      stack: Conduits2[i],
      showInLegend: true,
      }, false);

    chart.addSeries({
      color: getCovenantChoiceColor(Conduits2[i] + "_min"),
      data: minResults,
      name: getConduitsName(Conduits2[i]) + " min",
      stack: Conduits2[i],
      showInLegend: true,
    }, false);
  }

  chart.redraw();
  updateSize(chart, chartId, Conduits2.length);
}