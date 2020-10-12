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
      case racials:
        url = wowheadUrl + wowheadSpellPath;
        break;
      case enchants:
        url = wowheadUrl + wowheadSpellPath;
        break;
      case legendaries:
        url = wowheadUrl + wowheadSpellPath;
        break;
      default:
        url = wowheadUrl + wowheadItemPath;
    }
      
    result.push(buildChartLine(dpsName, id, url));
  }
  
  return result;
}

function buildWowheadTooltipsMultipleBar(data, simsBtn) {
  var result = [];
  for(currFight in data[jsonData]) {
    result.push(buildChartLine(getFightStyleExtName(currFight), "", ""));
  }

  return result;
}
/*
 * Build a single line of the wowhead tooltip
 */
function buildChartLine(dpsName, itemId, url) {
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
 * Formatter for the tooltips of the chart
 */
function formatterDefault(points, x, data) {
  var result = '<div class="chartHover">'
                    + '<div class="chartHoverLine">' 
                    + x 
                    + "</div>";
    
  for (var i = points.length - 1; i >= 0; i--) {
    result += getTooltip( points[i].y, 
                          ((data[jsonData][jsonBase][DPS] / 100) * points[i].y), 
                          points[i].series );
  }
  result += "</div>";
  return result;
}
  
/*
 * Formatter for the tooltips of the chart
 */
function formatterStacked(points, x, data) {
  var result = '<div class="chartHover">'
                    + '<div class="chartHoverLine">' 
                    + x
                    + "</div>";
  
  for (var i = points.length - 1; i >= 0; i--) {
    result += getTooltip( ((data[jsonData][jsonBase][DPS] + points[i].y) / data[jsonData][jsonBase][DPS] * 100 - 100),
                          points[i].y,
                          points[i].series);
  }
  result += "</div>";
  return result;
}

/*
 * Formatter for the tooltips of the chart
 */
function formatterPercentage(points, x, data) {
  var result = '<div class="chartHover">'
                    + '<div class="chartHoverLine">' 
                    + x
                    + "</div>";
  
  for (var i = points.length - 1; i >= 0; i--) {
    result += getTooltip( points[i].y, 
                          (( data[jsonData][jsonBase][DPS] / 100 ) * points[i].y), 
                          points[i].series);
  }

  result += "</div>";
  return result;
}

function formatterMultipleBar(points, x, data) {
  var result = '<div class="chartHover">'
                    + '<div class="chartHoverLine">' 
                    + x
                    + "</div>";
  
                    for (var i = points.length - 1; i >= 0; i--) {
                      result += getTooltip( points[i].y, 
                                            0, 
                                            points[i].series);
                    }
                  
                    result += "</div>";
  
  return result;
}

function getTooltip(percentage, dpsIncrease, series) {
  result = "";
  if (percentage != 0) {
    result = '<div><span class="chartHoverSpan" style="border-left: 9px solid ' 
              + series.color
              + ";" 
              + '">' 
              + series.name
              + "</span>:&nbsp;&nbsp;";
    if(dpsIncrease != 0) {
      result += "+ "
              + Intl.NumberFormat().format(dpsIncrease) 
              + space + DPS.toLowerCase()
              + space + dash + space;
    }
    result += percentage.toFixed(2);
    if (percentage > 0) {
      result += '% (Increase)';
    } else {
      result += '% (decrease)';
    }
  }

  return result;
}