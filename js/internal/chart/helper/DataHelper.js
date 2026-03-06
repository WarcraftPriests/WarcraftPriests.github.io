/*
 * Prepare data for single bar chart
 */
function buildChartDataSingleBar(data, showInLegend, xPadding, simsBtn, chartId, maxEntries) {
  var chartForSingle = new Highcharts.Chart(getSingleBarDefinition( 
    buildWowheadTooltips(data, true, simsBtn, showInLegend),
    data,
    getValue(LegendTitles, simsBtn),
    dpsIncrease,
    showInLegend,
    xPadding,
    chartId, 
    maxEntries));
  while (chartForSingle.series.length > 0) {
    chartForSingle.series[0].remove(false);
  }
  let result = [];
  var currName = data.name.split(' - ').pop();
  currName = currName.replace(/\s/g, '');
  var counterLoop = 0;
  for (sortedData of data[jsonSortedDataKeys]) {
    if (counterLoop < 100) {
      let dps = data[jsonData][sortedData][jsonDPS];
      let baselineDPS = data[jsonData][jsonBase][jsonDPS];
      if (baselineDPS == null)
      {
        baselineDPS = 0;
      }
      
      if (dps) {
        var percentage = (dps / baselineDPS) * 100 - 100;
        result.push({y: percentage, color: getColor(sortedData, currName)});
      }
      
      counterLoop++;
    } else {
      break;
    }
  }

  chartForSingle.addSeries({
    data: result,
    name: DPS,
    showInLegend: showInLegend,
  }, false);
  updateSize(chartForSingle, chartId, result.length, maxEntries);
}

/*
 * Prepare data for percentage bar chart
 */
function buildDataForPercentageChart(data, simsBtn, chartId, maxEntries) {
  var chartForPercentage = new Highcharts.Chart(getChartDefinitionPercentage( 
    buildWowheadTooltips(data, false, simsBtn), 
    data,
    getValue(LegendTitles, simsBtn),
    dpsIncrease,
    chartId,
    maxEntries));

  while (chartForPercentage.series.length > 0) {
    chartForPercentage.series[0].remove(false);
  }

  // if the step names are purely numeric we'll treat them as item
  // levels and stack the _incremental_ percent increases rather than
  // plotting the absolute percent relative to baseline. this avoids
  // negative bar heights caused by downward steps and mirrors the
  // behavior users expect for trinket/legendary ilvl charts.
  var steps = data[jsonSimulatedSteps] || [];
  var numericSteps = steps.length > 0 && steps.every(s => /^\d+$/.test(s));
  var baseline = data[jsonData][jsonBase] || {DPS:0};

  if (numericSteps) {
    // sort levels ascending for correct incremental calculation
    var levels = steps.slice().sort(function(a, b) { return Number(a) - Number(b); });
    var lastVals = {}; // track last DPS per item for incremental calculation
    var seriesArray = []; // collect before reversing add order
    
    for (sortedData of data[jsonSortedDataKeys]) {
      lastVals[sortedData.trim()] = 0;
    }
    
    // calculate in ascending order so increments are positive
    levels.forEach(function(lvl, idx) {
      var currResult = [];
      for (sortedData of data[jsonSortedDataKeys]) {
        var itemKey = sortedData.trim();
        var dpsVal = data[jsonData][itemKey][lvl] || 0;
        var baseDps = data[jsonData][jsonBase] ? data[jsonData][jsonBase][jsonDPS] : 0;
        var valuePercent;
        if (dpsVal > 0) {
          if (lastVals[itemKey] === 0) {
            // first level for this item: absolute percent
            valuePercent = baseDps ? ((dpsVal - baseDps) / baseDps) * 100 : 0;
          } else {
            // subsequent levels: incremental from last seen
            var inc = dpsVal - lastVals[itemKey];
            valuePercent = baseDps ? (inc / baseDps) * 100 : 0;
          }
          lastVals[itemKey] = dpsVal;
        } else {
          valuePercent = 0;
        }
        currResult.push(Math.max(0, valuePercent));
      }
      seriesArray.push({ data: currResult, name: lvl });
    });
    
    // add in reverse order so lowest level appears leftmost on horizontal bar
    seriesArray.reverse();
    seriesArray.forEach(function(series) {
      chartForPercentage.addSeries({
        data: series.data,
        name: series.name,
        showInLegend: true,
      }, false);
    });

    updateSize(chartForPercentage, chartId, data[jsonSortedDataKeys].length, maxEntries);
  } else {
    // fallback to original behaviour for non-numeric steps
    for (currStep of steps) {
      let currResult = [];
      for (sortedData of data[jsonSortedDataKeys]) {
        let dps = data[jsonData][sortedData.trim()][currStep];
        let baselineDPS = data[jsonData][jsonBase];
        if (baselineDPS == null)
          baselineDPS = 0;
        if (dps >= 0) {
          var percentage = (dps / baselineDPS.DPS) * 100 - 100;
          currResult.push(percentage < 0 ? 0 : percentage);
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
}

/*
 * Prepare data for multiple bar chart
 */
function buildChartDataMultipleBar(data, simsBtn, chartId, maxEntries) {
  var chartForMultipleBar = new Highcharts.Chart(getMultipleBarChartDefinition(
    buildWowheadTooltipsMultipleBar(data, simsBtn), 
    data,
    getValue(LegendTitles, simsBtn),
    dpsIncrease,
    chartId,
    maxEntries));
  while (chartForMultipleBar.series.length > 0) {
    chartForMultipleBar.series[0].remove(false);
  }

  // determine whether the payload is the old min/max conduit format or a
  // simple mapping of numeric keys (item levels) to values.
  var sample = data[jsonData];
  var isMinMax = false;
  for (var k in sample) {
    if (sample[k] && typeof sample[k] === 'object' &&
        ('min' in sample[k] || 'max' in sample[k])) {
      // presence of either key ought to mean we're dealing with the
      // legacy conduit structure (min/max pair per fight)
      isMinMax = true;
      break;
    }
  }

  if (isMinMax) {
    // existing conduit handling
    var minResults = [];
    var maxResults = [];

    for (i = 0; i <= AggregateConduits.length - 1; i++) {
      minResults = [];
      maxResults = [];

      for (currFight in data[jsonData]) {
        var minValue = ((data[jsonData][currFight][AggregateConduits[i]]['min']) * 100);
        var maxValue = ((data[jsonData][currFight][AggregateConduits[i]]['max']) * 100) - ((data[jsonData][currFight][AggregateConduits[i]]['min'])) * 100;
        minResults.push(minValue);
        maxResults.push(maxValue);
      }

      chartForMultipleBar.addSeries({
        color: getCovenantChoiceColor(AggregateConduits[i] + '_min'),
        data: minResults,
        name: getValue(Conduits, AggregateConduits[i]) + ' min',
        stack: String(AggregateConduits[i]), // ensure key is string
        showInLegend: true,
      }, false);

      chartForMultipleBar.addSeries({
        color: getCovenantChoiceColor(AggregateConduits[i] + '_max'),
        data: maxResults,
        name: getValue(Conduits, AggregateConduits[i]) + ' max',
        stack: String(AggregateConduits[i]),
        showInLegend: true,
      }, false);
    }

    chartForMultipleBar.redraw();
    updateSize(chartForMultipleBar, chartId, AggregateConduits.length, maxEntries);

  } else {
    // numeric-key format: treat each top‑level key in the nested object as an
    // item level (or other incremental step) and stack the deltas.
    var sample = data[jsonData];
    var fights = Object.keys(sample).filter(f => f !== jsonBase); // exclude 'Base'
    var levelSet = new Set();
    fights.forEach(function(f) {
      Object.keys(sample[f]).forEach(function(l) { levelSet.add(l); });
    });
    var levels = Array.from(levelSet).sort(function(a, b) {
      return Number(a) - Number(b);
    });

    // build one series per level, where the first series is the absolute
    // value and each subsequent series is the difference from the previous
    // level.  convert to percent increase over base DPS to match the
    // conduit behavior and keep bars on-scale.
    levels.forEach(function(lvl, idx) {
      var seriesData = [];
      fights.forEach(function(f) {
        var val = sample[f][lvl] || 0;
        var baseDps = (data[jsonData][jsonBase] && data[jsonData][jsonBase][jsonDPS]) || 0;
        var percent;
        if (idx === 0) {
          percent = baseDps ? ((val - baseDps) / baseDps) * 100 : 0;
        } else {
          var prev = sample[f][levels[idx - 1]] || 0;
          var inc = val - prev;
          percent = baseDps ? (inc / baseDps) * 100 : 0;
        }
        seriesData.push(Math.max(0, percent));
      });

      chartForMultipleBar.addSeries({
        name: lvl,
        color: getColor(lvl),
        data: seriesData,
        stack: 'levels',
        showInLegend: true,
      }, false);
    });

    chartForMultipleBar.redraw();
    updateSize(chartForMultipleBar, chartId, fights.length, maxEntries);
  }
}

/*
 * Prepare data for dot chart
 */
function buildChartDataDot(githubData, chartId) {
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

  for (sortedData of githubData[jsonSortedDataKeys]) {
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
      if (sortedData.split(underscore)[0].includes('10')
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

    statMastery = ((parseInt(sortedData.split('_')[0].replace(/[^.\d]/g, ''))) * configData['stats']['steps']) + configData['stats']['base'] / configData['stats']['include'].length;
    statVers = ((parseInt(sortedData.split('_')[1].replace(/[^.\d]/g, ''))) * configData['stats']['steps']) + configData['stats']['base'] / configData['stats']['include'].length;
    statHaste = ((parseInt(sortedData.split('_')[2].replace(/[^.\d]/g, ''))) * configData['stats']['steps']) + configData['stats']['base'] / configData['stats']['include'].length;
    statCrit = ((parseInt(sortedData.split('_')[3].replace(/[^.\d]/g, ''))) * configData['stats']['steps']) + configData['stats']['base'] / configData['stats']['include'].length;
    sumStatValues = configData['stats']['total'];

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
      statMasteryPercent: Math.round((100 / sumStatValues) * (((parseInt(sortedData.split('_')[0].replace(/[^.\d]/g, ''))) * configData['stats']['steps']) + configData['stats']['base'] / configData['stats']['include'].length)),
      statVersPercent: Math.round((100 / sumStatValues) * (((parseInt(sortedData.split('_')[1].replace(/[^.\d]/g, ''))) * configData['stats']['steps']) + configData['stats']['base'] / configData['stats']['include'].length)),
      statHastePercent: Math.round((100 / sumStatValues) * (((parseInt(sortedData.split('_')[2].replace(/[^.\d]/g, ''))) * configData['stats']['steps']) + configData['stats']['base'] / configData['stats']['include'].length)),
      statCritPercent: Math.round((100 / sumStatValues) * (((parseInt(sortedData.split('_')[3].replace(/[^.\d]/g, ''))) * configData['stats']['steps']) + configData['stats']['base'] / configData['stats']['include'].length)),
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