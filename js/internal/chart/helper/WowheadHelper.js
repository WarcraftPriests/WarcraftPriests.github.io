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
    } else if( simsBtn == shards ) {
      url = wowheadUrl + wowheadSpellPath;
    } else if(configData[sims][simsBtn.replaceAll("_", "-")]["lookupType"] == "spell"){
      url = wowheadUrl + wowheadSpellPath;
    } else {
      url = wowheadUrl + wowheadItemPath;
    }
    
    result.push(buildChartLine(dpsName, id, url, simsBtn));
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
    || simsBtn == shards
    || simsBtn == conduits
    || simsBtn == covenants
    || simsBtn == enchants
    || simsBtn == legendaries
    || simsBtn.replaceAll("-", "_") == legendaryItems
    || simsBtn.replaceAll("-", "_") == legendaryCombos
    || simsBtn == racials
    || simsBtn.replaceAll("-", "_") == soulbindTraits) {
      result = buildChartLineWithWowheadLine(dpsName, itemId, url, result);
  } else if(simsBtn != null && simsBtn != undefined && simsBtn.replaceAll("-", "_") == conduitCombos) {
    result = buildChartLineForConduitCombos(dpsName, result);
  } else if(simsBtn != null && simsBtn != undefined && simsBtn.replaceAll("-", "_") == soulbinds) {
    result = buildChartLineForSoulbinds(dpsName, result);
  } else if(simsBtn != null && simsBtn != undefined && simsBtn.replaceAll("-", "_") == soulbindsLaunch) {
    result = buildChartLineForSoulbindsLaunch(dpsName, result);
  } else if(simsBtn != null && simsBtn != undefined && simsBtn == talents) {
    result = buildChartLineForTrinkets(dpsName, result);
  } else if(simsBtn != null && simsBtn != undefined && simsBtn == "soulbinds_prog") {
    result = buildChartLineForSoulbindsLaunch(dpsName, result);
  } else if(simsBtn != null && simsBtn != undefined && simsBtn == "trinket_combos") {
    result = buildChartLineForTrinketCombos(dpsName, result);
  }else {
    result = buildChartLineWithWowheadLine(dpsName, itemId, url, result);
  }
  return result;
}

function buildChartLineForTrinketCombos(dpsName, currentResult) {
  var currResult = "";
  var counter = 0;
  var names = dpsName.split("-");
  for(name of names) {
    var splittedName = name.split("_");
    var slicedName = name.slice(0, name.lastIndexOf("_"));
    var trinketId = getValue(TrinketIds, slicedName);
    var ilvl = splittedName[splittedName.length -1];
    var currName = slicedName.split("_");
    var finalName = "";
    for(tempName of currName) {
      finalName = finalName + tempName.charAt(0);
    }
    finalName = finalName + " (" + ilvl + ")";
    currResult = buildChartLineWithWowheadLine(finalName, trinketId, wowheadUrl + wowheadItemPath, currResult);
    if(counter == 0) {
      currResult = currResult + '  ';
      counter++;
    }
  }

  return currResult;
}

function buildWowheadTooltipsMultipleBar(data, simsBtn) {
  var result = [];
  for(currFight in data[jsonData]) {
    result.push(buildChartLine(getValue(FightStyleExternal, currFight), "", ""));
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