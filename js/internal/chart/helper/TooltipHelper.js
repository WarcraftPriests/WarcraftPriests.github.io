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

    if(simsBtn == consumables) {
      url = wowheadUrl + wowheadItemPath;
    } else if(configData[sims][simsBtn.replace("_", "-")]["lookupType"] == "spell"){
      url = wowheadUrl + wowheadSpellPath;
    } else {
      url = wowheadUrl + wowheadItemPath;
    }
    
    result.push(buildChartLine(dpsName, id, url, simsBtn));
  }
  
  return result;
}

function buildWowheadTooltipsMultipleBar(data, simsBtn) {
  var result = [];
  for(currFight in data[jsonData]) {
    result.push(buildChartLine(getValue(FightStyleExternal, currFight), "", ""));
  }

  return result;
}
/*
 * Build a single line of the wowhead tooltip
 */
function buildChartLine(dpsName, itemId, url, simsBtn) {
  result = "";
  result += '<div style="display:inline-block; margin-bottom:-3px">';
  if( simsBtn == null
    || simsBtn == undefined
    || simsBtn == trinkets 
    || simsBtn == consumables
    || simsBtn == conduits
    || simsBtn == covenants
    || simsBtn == enchants
    || simsBtn == legendaries
    || simsBtn.replace("-", "_") == legendaryItems
    || simsBtn == racials
    || simsBtn.replace("-", "_") == soulbindTraits) {
      result = buildChartLineWithWowheadLine(dpsName, itemId, url, result);
  } else if(simsBtn != null && simsBtn != undefined && simsBtn.replace("-", "_") == conduitCombos) {
    result = buildChartLineForConduitCombos(dpsName, result);
  } else if(simsBtn != null && simsBtn != undefined && simsBtn.replace("-", "_") == soulbinds) {
    result = buildChartLineForSoulbinds(dpsName, result);
  } else if(simsBtn != null && simsBtn != undefined && simsBtn.replace("-", "_") == soulbindsLaunch) {
    result = buildChartLineForSoulbindsLaunch(dpsName, result);
  } else if(simsBtn != null && simsBtn != undefined && simsBtn == talents) {
    result = buildChartLineForTrinkets(dpsName, result);
  } else if(simsBtn != null && simsBtn != undefined && simsBtn == "soulbinds_prog") {
    result = buildChartLineForSoulbindsLaunch(dpsName, result);
  } else {
    result = buildChartLineWithWowheadLine(dpsName, itemId, url, result);
  }
  return result;
}

function buildChartLineForTrinkets(dpsName, currentResult) {
  var currResult = "";
  var names = dpsName.split("_");
  for(name of names) {
    currResult = buildChartLineWithWowheadLine(name, getValue(TalentIds, name.toUpperCase()), wowheadUrl + wowheadSpellPath, currResult);
  }

  return currResult;
}

function buildChartLineForSoulbinds(dpsName, currentResult) {
  var currResult = "";
  var names = []
  var currNames = dpsName.split("-");
  for(name of currNames) {
    if(name.includes("_")) {
      var currNames2 = name.split("_");
      for(currName of currNames2){
        names.push(currName);
      }
    } else {
      names.push(name);
    }
  }
  currResult = buildChartLineForBasic(names, currResult);
  return currentResult + currResult;
}

function buildChartLineForSoulbindsLaunch(dpsName, currentResult) {
  var result = currentResult;
  var names = [];
  var currNames = dpsName.split("-");
  for(name of currNames) {
    if(name.includes("_")) {
      var currNames2 = name.split("_");
      for(currName of currNames2) {
        names.push(currName);
      }
    } else {
      names.push(name);
    }
  }  
  result = buildChartLineForBasic(names, result);
  return result;
}

function buildChartLineForConduitCombos(dpsName, currentResult) {
  var result = currentResult;
  var names = dpsName.split("_");
  result = buildChartLineForBasic(names, result);
  return result;
}

function buildChartLineForBasic(names, currentResult) {
  var currResult = currentResult; 
  var counter = 0;
  var currName = "";
  var nextName = "";
  var skipNext = false;
  var nextId = "";
  for(name of names) {
    counter++;
    if(!(/^\d+$/.test(name))){
      if(skipNext) {
        skipNext = false;
        continue;
      } else if (counter < names.length) {
        currName = name;
        nextName = names[counter];
        nextId = getValue(ConduitsIds, nextName.toUpperCase());
      }
      var id = getValue(ConduitsIds, name.toUpperCase());
      if(nextId == null || nextId == undefined) {
        currName = name + "(" + nextName + ")";
        skipNext = true;
      } else if( id == null || id == undefined && counter == 1) {
        currName = name + " / ";
      } else {
        currName = name;
      }
      currResult = buildChartLineWithWowheadLine(currName, getValue(ConduitsIds, name.toUpperCase()), wowheadUrl + wowheadSpellPath, currResult);
      
      nextName = "";
      nextId = "";
    } 
  }
  return currResult;
}

function buildChartLineWithWowheadLine(dpsName, itemId, url, currentResult) {
  var result = currentResult;
  result += '<a style="color: white; font-size: 16px; padding: 3px; cursor: default" href="' + url + itemId + '"';
  result += ' onclick="return false"';
  result += '" target="blank"';
  result += ">";
  result += dpsName;
  result += "</a>";

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
                          points[i].series,
                          data);
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
                          points[i].series,
                          data);
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
                          points[i].series,
                          data);
  }

  result += "</div>";
  return result;
}

function formatterMultipleBar(points, x, data) {
  var result = '<div class="chartHover">'
                    + '<div class="chartHoverLine">' 
                    + x
                    + "</div>";
                    var minValue = 0;
                    var value = 0;
                    for (var i = points.length - 1; i >= 0; i--) {
                      if(points[i].series.name.includes("min")) {
                        minValue = points[i].y;
                        value = minValue;
                      } else if (points[i].series.name.includes("max")) {
                        value = minValue + points[i].y;
                        minValue = 0;
                      }
                      result += getTooltip( value, 
                                            0, 
                                            points[i].series,
                                            data);
                    }
                  
                    result += "</div>";
  
  return result;
}

function getTooltip(percentage, dpsIncrease, series, data) {
  result = "";
  if (percentage != 0) {
    result = '<div><span class="chartHoverSpan" style="border-left: 9px solid ' 
              + series.color
              + ";" 
              + '">' 
              + series.name
              + " ( " + data[jsonData][jsonBase][DPS] + " base )"
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