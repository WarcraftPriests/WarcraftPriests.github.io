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

    var simConfig = AppState.getConfigData()[sims][simsBtn.replaceAll('_', '-')];
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
  if (simsBtn == null
    || simsBtn == undefined
    || simsBtn == trinkets 
    || simsBtn == consumables
    || simsBtn == enchants
    || simsBtn == racials) {
    return buildChartLineWithWowheadLine(dpsName, itemId, url, simsBtn);
  } else if (simsBtn != null && simsBtn != undefined && (simsBtn == talents || simsBtn == talentsTop || simsBtn == talentsTop.replaceAll('-', '_'))) {
    return buildChartLineForTalents(dpsName);
  } else if (simsBtn != null && simsBtn != undefined && simsBtn == trinketCombos) {
    return buildChartLineForTrinketCombos(dpsName, data ? data[jsonIds] : null);
  } else {
    return buildChartLineWithWowheadLine(dpsName, itemId, url, simsBtn);
  }
}

function buildChartLineForTrinketCombos(dpsName, ids) {
  var items = [];
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
    
    items.push({
      text: finalName,
      itemId: trinketId,
      url: wowheadUrl + wowheadItemPath,
      ilvl: ilvl
    });
  }
  
  return TooltipBuilder.buildMultiLinkLine(items);
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

function buildChartLineForTrinkets(dpsName) {
  var items = [];
  var names = dpsName.split('_');
  
  for (const name of names) {
    items.push({
      text: name,
      itemId: getValue(TalentIds, name.toUpperCase()),
      url: wowheadUrl + wowheadSpellPath,
      ilvl: null
    });
  }
  
  return TooltipBuilder.buildMultiLinkLine(items);
}

function buildChartLineForTalents(dpsName) {
  var talentId = getValue(TalentIds, dpsName.toUpperCase());
  var currSimsBtn = AppState.getCurrSimsBtn();
  var talentData = AppState.getTalentData();
  
  if (currSimsBtn == talents || currSimsBtn == talentsTop || currSimsBtn == talentsTop.replaceAll('-', '_')) {
    var link = talentData['builds'][dpsName];
    var generatedLink = talentData['generated'][dpsName];
    
    if (link) {
      talentImportStrings[dpsName] = link;
      return TooltipBuilder.buildTalentLinkLine(dpsName);
    } else if (generatedLink) {
      talentImportStrings[dpsName] = generatedLink;
      return TooltipBuilder.buildTalentLinkLine(dpsName);
    } else {
      return TooltipBuilder.buildTextLine(dpsName);
    }
  }
  
  // Fallback for spell-type talents
  return TooltipBuilder.buildWowheadLinkLine(dpsName, talentId, wowheadUrl + wowheadSpellPath);
}

function buildChartLineForBasic(names) {
  var items = [];
  var counter = 0;
  var skipNext = false;
  
  for (const name of names) {
    counter++;
    if (!(/^\d+$/.test(name))) {
      if (skipNext) {
        skipNext = false;
        continue;
      }
      
      var currName = name;
      var nextName = counter < names.length ? names[counter] : '';
      var nextId = getValue(ConduitsIds, nextName.toUpperCase());
      var id = getValue(ConduitsIds, name.toUpperCase());
      
      if (nextId == null || nextId == undefined) {
        currName = name + '(' + nextName + ')';
        skipNext = true;
      } else if (id == null || id == undefined && counter == 1) {
        currName = name + ' / ';
      }
      
      items.push({
        text: currName,
        itemId: getValue(ConduitsIds, name.toUpperCase()),
        url: wowheadUrl + wowheadSpellPath,
        ilvl: null
      });
    } 
  }
  
  return TooltipBuilder.buildMultiLinkLine(items);
}

function buildChartLineWithWowheadLine(dpsName, itemId, url, simsBtn, ilvl) {
  var currSimsBtn = simsBtn || AppState.getCurrSimsBtn();
  
  // Handle talent-type sims
  if (currSimsBtn == talents || currSimsBtn == talentsTop || currSimsBtn == talentsTop.replaceAll('-', '_')) {
    return buildChartLineForTalents(dpsName);
  }
  
  // Handle trinkets with item level
  if (currSimsBtn == trinkets || currSimsBtn == trinketCombos) {
    return TooltipBuilder.buildWowheadLinkLine(dpsName, itemId, url, ilvl || 289);
  }
  
  // Default wowhead link
  return TooltipBuilder.buildWowheadLinkLine(dpsName, itemId, url);
}
