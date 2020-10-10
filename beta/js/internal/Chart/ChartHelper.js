/*
 * Build wowhead tooltips
 */
function buildWowheadTooltips(data, breakConidition, simsBtn) {
  var result = [];
  for (dpsName of data[jsonSortedDataKeys]) {
    var id = data[jsonIds][dpsName]; 
    if (id == null) {
      id = "";
    }
    var url = "";

    switch(simsBtn) {
      case conduits:
        url = wowheadUrl + wowheadSpellPath;
        break;
      default:
        url = wowheadUrl + wowheadItemPath;
    }
    
    result.push(buildChartLine(dpsName, id, url));
  }

  return result;
}

/*
 * Build a single line of the wowhead tooltip
 */
function buildChartLine(dpsName, itemId, url) {
  console.log(itemId);
  result = "";
  result += '<div style="display:inline-block; margin-bottom:-3px">';
  result += '<a style="color: white; font-size: 16px; padding: 3px; cursor: default" href=#';
  result += ' onclick="return false"';
  result += ' rel="' + url;
  result += itemId;
  result += "/";
  result += dpsName.trim().replace(/ /g, "_");
  result += '" target="blank"';
  result += ' class="chart_link"';
  result += ">";
  result += dpsName.trim();
  result += "</a>";
  result += "</div>";

  return result;
}

/*
 * Use the data from the json request and sort them for the single bar
 * setup
 */
function buildChartDataSingleBar(data, chartId, chart) {
  let result = [];
  for (sortedData of data[jsonSortedDataKeys]) {
    let dps = data[jsonData][sortedData][jsonDPS];
    let baselineDPS = data[jsonData][jsonBase][jsonDPS];
    if (baselineDPS == null) 
      baselineDPS = 0;
  
    if(dps >= 0) {
      var percentage = (dps / baselineDPS) * 100 - 100;
      if(percentage < 0) {
        result.push(0);
      } else {
        result.push(percentage);
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
 * Use the data from the json request and sort them for the stacked bar
 * setup
 */
function buildChartDataStackedBar(data, chartId, chart) {
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
  if (covenantType === empty || covenantType == null) {
    return firstTalent 
              + space + dash + space
              + fullSimType 
              + space + dash + space
              + fightStyle;
  } else {
    return firstTalent 
              + space + dash + space
              + fullSimType 
              + space + dash + space 
              + getConduitsName(covenantType)
              + space + dash + space 
              + fightStyle;
  }
}

/*
 * Determines the url for the github repo to get the needed sim results
 */
function determineJsonUrl(simsBtn, baseurl, fightStyle, talentChoice, covenantType) {
  /*
   * Special case!
   */
  if(simsBtn == "talents"){
    return baseurl + slash + simsBtn + simResultPath + fightStyle + jsonExtension;
  }
  if(covenantType == "" 
      || covenantType == null) {
    return baseurl + slash + simsBtn + simResultPath + fightStyle + underscore + talentChoice + jsonExtension;
  } else {
    return baseurl + slash + simsBtn + simResultPath + fightStyle + underscore + talentChoice + underscore + covenantType + jsonExtension;
  }
}

/*
 * Method for chart setup
 */
function legendItemClick() {
  return false;
}

/*
 * Formatter for the tooltips of the chart
 */
function formatter(points, x, data) {
  var result = '<div class="chartHover">'
                    + '<div class="chartHoverLine">' 
                    + x 
                    + "</div>";
              
  var baseAmount = data[jsonData][jsonBase];
  if (baseAmount == null)
    baseAmount = 0;
  
  for (var i = points.length - 1; i >= 0; i--) {
    if (points[i].y != 0) {
      result += '<div><span class="chartHoverSpan" style="border-left: 9px solid ' 
                + points[i].series.color
                + ";" 
                + '">' 
                + points[i].series.name 
                + "</span>:&nbsp;&nbsp;" 
                + Intl.NumberFormat().format((baseAmount.DPS / 100) * points[i].y) 
                + space + DPS.toLocaleLowerCase()
                + space + dash + space;
      result += (points[i].y).toFixed(2);
      if (points[i].y > 0) {
        result += increase;
      } else {
        result += decrease;
      }
    }
  }
  result += "</div>";
  return result;
}

/*
 * Calculates the steps for the yAxis for the stacked layout ...
 * Not pretty but it works for the moment.
 */
function determineYAxisStacked(data) {
  var result = [];
  var highestDPS = 0;
  let baselineDPS = data[jsonData][jsonBase];
  for(currStep of data[jsonSimulatedSteps]) {
    for(sortedData of data[jsonSortedDataKeys]) {
      dps = data[jsonData][sortedData.trim()][currStep];
      var percentage = (dps / baselineDPS.DPS) * 100 - 100;
      if(percentage > highestDPS) {
        highestDPS = percentage;
      }
    }
  }
  var steps = Number(highestDPS / (data[jsonSimulatedSteps].length + 1));
  var multiplikator = data[jsonSimulatedSteps].length / 7;
  let lastValue = 0;
  result.push(lastValue)
  for(i = 0; i <= 7; i++) {
    lastValue = lastValue + Number(steps.toFixed(2) * multiplikator);
    result.push(Number(lastValue.toFixed(2)));
  }
  return result;
}

/*
 * Calculates the steps for the yAxis for the stacked layout ...
 * Not pretty but it works for the moment.
 */
function determineYAxisSingle(data) {
  var result = [];
  var highestDPS = 0;
  let baselineDPS = data[jsonData][jsonBase][jsonDPS];
  for(sortedData of data[jsonSortedDataKeys]) {
    let dps = data[jsonData][sortedData][jsonDPS];
    var percentage = (dps / baselineDPS) * 100 - 100;
    if(percentage > highestDPS) {
      highestDPS = percentage;
    }
  }

  var steps = Number(highestDPS / (data[jsonSortedDataKeys].length + 1));
  var multiplikator = data[jsonSortedDataKeys].length / 7;
  let lastValue = 0;
  result.push(lastValue)
  for(i = 0; i <= 7; i++) {
    lastValue = lastValue + Number(steps.toFixed(2) * multiplikator);
    result.push(Number(lastValue.toFixed(2)));
  }
  return result;
}

/*
 * Handles the failure of an json call to github, most a wrong combination of
 * talent, simType, convenant and fightStyle.
 * So no data could be fetched
 */
function handleJsonFailure(xhr, status) {
  console.log("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
  console.log(status);
}