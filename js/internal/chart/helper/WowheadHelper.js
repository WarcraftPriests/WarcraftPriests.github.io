/*
 * Build wowhead tooltips
 */
function buildWowheadTooltips(data, breakConidition, simsBtn) {
  const wowheadUrl = configData[charts].wowheadUrl
  var result = [];

  for (dpsName of data[jsonSortedDataKeys]) {
    var id = data[jsonIds][dpsName]; 
    
    if (id == null) {
      id = "";
    }

    if (simsBtn == consumables || simsBtn == alchemy || simsBtn == enchants || simsBtn == gems || simsBtn == specialGear) {
      url = wowheadUrl + wowheadItemPath;
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
    || simsBtn == enchants
    || simsBtn == racials) {
      result = buildChartLineWithWowheadLine(dpsName, itemId, url, result);
  } else if(simsBtn != null && simsBtn != undefined && (simsBtn == talents || simsBtn == talentsTop)) {
    result = buildChartLineForTalents(dpsName, result);
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
    currResult = buildChartLineWithWowheadLine(name, getValue(TalentIds, name.toUpperCase()), wowheadUrl + wowheadSpellPath, currResult, dpsName);
  }

  return currResult;
}

function buildChartLineForTalents(dpsName, currentResult) {
  currResult = ""
  return buildChartLineWithWowheadLine(dpsName, getValue(TalentIds, dpsName.toUpperCase()), wowheadUrl + wowheadSpellPath, currResult);
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
  if(currSimsBtn == 'talents' || currSimsBtn == 'talents_top') {
    link = talentData['builds'][dpsName];
    generated_link = talentData['generated'][dpsName];
    if (link) {
      result += '<a class="tooltipLink" href="' + link + '" onclick="copyURI(event)" title="Click here to copy Talent Import string"> '+ dpsName + ' </a>';
    } else if (generated_link) {
      result += '<a class="tooltipLink" href="' + generated_link + '" onclick="copyURI(event)" title="Click here to copy Talent Import string"> '+ dpsName + ' </a>';
    } else {
      result += dpsName;
    }
  } else {
    result += '<a style="color: white; font-size: 16px; padding: 3px; cursor: default" href="' + url + itemId + '"';
    result += ' target="_blank"';
    result += ">";
    result += dpsName;
    result += "</a>";
  }
  
  return result;
}
