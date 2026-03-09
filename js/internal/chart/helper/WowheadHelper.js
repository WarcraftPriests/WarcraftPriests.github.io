/*
 * Global object to store talent import strings (survives Highcharts sanitization)
 */
var talentImportStrings = {};

/*
 * Build wowhead tooltips
 */
function buildWowheadTooltips(data, breakConidition, simsBtn) {
  var result = [];

  for (const dpsName of data[jsonSortedDataKeys]) {
    var id = data[jsonIds][dpsName]; 
    
    if (id == null) {
      id = '';
    }

    var simConfig = configData[sims][simsBtn.replaceAll('_', '-')];
    var url = wowheadUrl + wowheadItemPath;
    if (simsBtn == consumables || simsBtn == alchemy || simsBtn == enchants || simsBtn == gems || simsBtn == specialGear) {
      url = wowheadUrl + wowheadItemPath;
    } else if (simConfig && simConfig['lookupType'] == 'spell') {
      url = wowheadUrl + wowheadSpellPath;
    } else {
      url = wowheadUrl + wowheadItemPath;
    }
    
    result.push(buildChartLine(dpsName, id, url, simsBtn, data));
  }
  
  return result;
}

/*
 * Build a single line of the wowhead tooltip
 */
function buildChartLine(dpsName, itemId, url, simsBtn, data = null) {
  var result = '';
  result += '<div style="display:inline-block; margin-bottom:-3px">';
  if (simsBtn == null
    || simsBtn == undefined
    || simsBtn == trinkets 
    || simsBtn == consumables
    || simsBtn == enchants
    || simsBtn == racials) {
    result = buildChartLineWithWowheadLine(dpsName, itemId, url, result);
  } else if (simsBtn != null && simsBtn != undefined && (simsBtn == talents || simsBtn == talentsTop || simsBtn == talentsTop.replaceAll('-', '_'))) {
    result = buildChartLineForTalents(dpsName, result);
  } else if (simsBtn != null && simsBtn != undefined && simsBtn == trinketCombos) {
    result = buildChartLineForTrinketCombos(dpsName, result, data ? data[jsonIds] : null);
  } else {
    result = buildChartLineWithWowheadLine(dpsName, itemId, url, result);
  }
  return result;
}

function buildChartLineForTrinketCombos(dpsName, currentResult, ids) {
  var currResult = '';
  var counter = 0;
  var names = dpsName.split('-');
  for (const name of names) {
    var splittedName = name.split('_');
    var slicedName = name.slice(0, name.lastIndexOf('_'));
    var trinketId = ids[slicedName];
    var ilvl = splittedName[splittedName.length - 1];
    var currName = slicedName.split('_');
    var finalName = '';
    for (const tempName of currName) {
      finalName = finalName + tempName.charAt(0);
    }
    finalName = finalName + ' (' + ilvl + ')';
    currResult = buildChartLineWithWowheadLine(finalName, trinketId, wowheadUrl + wowheadItemPath, currResult, ilvl);
    if (counter == 0) {
      currResult = currResult + '  ';
      counter++;
    }
  }

  return currResult;
}

function buildWowheadTooltipsMultipleBar(data, simsBtn) {
  var result = [];
  for (const currFight in data[jsonData]) {
    if (currFight === jsonBase) continue; // skip 'Base'
    // if the key isn't a known fight style, just show the raw name
    var label = getValue(FightStyleExternal, currFight);
    if (label == null || label == undefined || label === '') {
      label = currFight;
    }
    result.push(buildChartLine(label, '', '', simsBtn, data));
  }

  return result;
}

function buildChartLineForTrinkets(dpsName, currentResult) {
  var currResult = '';
  var names = dpsName.split('_');
  for (const name of names) {
    currResult = buildChartLineWithWowheadLine(name, getValue(TalentIds, name.toUpperCase()), wowheadUrl + wowheadSpellPath, currResult, dpsName);
  }

  return currResult;
}

function buildChartLineForTalents(dpsName, currentResult) {
  currResult = '';
  return buildChartLineWithWowheadLine(dpsName, getValue(TalentIds, dpsName.toUpperCase()), wowheadUrl + wowheadSpellPath, currResult);
}

function buildChartLineForBasic(names, currentResult) {
  var currResult = currentResult; 
  var counter = 0;
  var currName = '';
  var nextName = '';
  var skipNext = false;
  var nextId = '';
  for (const name of names) {
    counter++;
    if (!(/^\d+$/.test(name))) {
      if (skipNext) {
        skipNext = false;
        continue;
      } else if (counter < names.length) {
        currName = name;
        nextName = names[counter];
        nextId = getValue(ConduitsIds, nextName.toUpperCase());
      }
      var id = getValue(ConduitsIds, name.toUpperCase());
      if (nextId == null || nextId == undefined) {
        currName = name + '(' + nextName + ')';
        skipNext = true;
      } else if (id == null || id == undefined && counter == 1) {
        currName = name + ' / ';
      } else {
        currName = name;
      }
      currResult = buildChartLineWithWowheadLine(currName, getValue(ConduitsIds, name.toUpperCase()), wowheadUrl + wowheadSpellPath, currResult);
      
      nextName = '';
      nextId = '';
    } 
  }
  return currResult;
}

function buildChartLineWithWowheadLine(dpsName, itemId, url, currentResult, ilvl = 289) {
  var result = currentResult;
  if (currSimsBtn == talents || currSimsBtn == talentsTop || currSimsBtn == talentsTop.replaceAll('-', '_')) {
    var link = talentData['builds'][dpsName];
    var generatedLink = talentData['generated'][dpsName];
    if (link) {
      talentImportStrings[dpsName] = link;
      result += '<a class="tooltipLink" title="Click here to copy Talent Import string"> ' + dpsName + ' </a>';
    } else if (generatedLink) {
      talentImportStrings[dpsName] = generatedLink;
      result += '<a class="tooltipLink" title="Click here to copy Talent Import string"> ' + dpsName + ' </a>';
    } else {
      result += dpsName;
    }
  } else {
    if (currSimsBtn == trinkets || currSimsBtn == trinketCombos) {
      result += '<a style="color: white; font-size: 16px; padding: 3px; cursor: default" href="' + url + itemId + '?ilvl=' + ilvl + '"';
    } else {
      result += '<a style="color: white; font-size: 16px; padding: 3px; cursor: default" href="' + url + itemId + '"';
    }
    result += ' target="_blank"';
    result += '>';
    result += dpsName;
    result += '</a>';
  }
  
  return result;
}
