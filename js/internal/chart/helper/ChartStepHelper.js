/*
 * Calculates the steps for the yAxis for the stacked layout ...
 * Not pretty but it works for the moment.
 */
function yStepsForPercentageChart(data) {
  var result = [];
  var highestDPS = 0;
  let baselineDPS = data[jsonData][jsonBase];
  for(currStep of data[jsonSimulatedSteps]) {
    for(sortedData of data[jsonSortedDataKeys]) {
      var percentage = ((data[jsonData][sortedData.trim()][currStep]) / baselineDPS.DPS) * 100 - 100;
      if(percentage > highestDPS) {
        highestDPS = percentage;
      }
    }
  }

  let lastValue = 0;
  result.push(lastValue)
  for(i = 0; i <= 8; i++) {
    lastValue = lastValue + Number((Number(highestDPS / (data[jsonSimulatedSteps].length + 1))).toFixed(2) * (data[jsonSimulatedSteps].length / 7));
    result.push(Number(lastValue.toFixed(2)));
  }
  return result;
}
  
/*
 * Calculates the steps for the yAxis for the stacked layout ...
 * Not pretty but it works for the moment.
 */
function yStepsForStackedBarChart(data) {
  var result = [];
  var highestDPS = 0;
  for(currStep of data[jsonSimulatedSteps]) {
    for(sortedData of data[jsonSortedDataKeys]) {
      var dps = (data[jsonData][sortedData.trim()][currStep] - data[jsonData][jsonBase][jsonDPS]);
      if(dps > highestDPS) {
        highestDPS = dps;
      }
    }
  }

  let lastValue = 0;
  result.push(lastValue)
  for(i = 0; i <= 7; i++) {
    lastValue = lastValue + Number(Number(highestDPS / (data[jsonSimulatedSteps].length + 1)).toFixed(2) * (data[jsonSimulatedSteps].length / 7));
    result.push(Number(lastValue.toFixed(2)));
  }
  return result;
}