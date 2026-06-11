import { AppState } from '../../../services/state/AppState.module.js';
import { getValue } from '../../../utils/Converter.module.js';
import {
  FightStyleExternal,
  TalentIds,
  TrinketIds
} from '../../../utils/Converter.module.js';
import {
  getChartTooltipLineStrategy,
  resolveChartTooltipUrlType
} from '../definitions/ChartRegistry.module.js';
import {
  jsonSortedDataKeys,
  jsonIds,
  jsonData,
  jsonBase,
  sims,
  trinkets,
  wowheadSpellPath,
  wowheadItemPath
} from '../../../utils/Constants.module.js';
import TooltipBuilder from './TooltipBuilder.module.js';

/*
 * Global object to store talent import strings (survives Highcharts sanitization)
 */
export var talentImportStrings = {};

var omniumFolioSpellIds = {
  ruf: '1279599',
  rouf: '1279599',
  rol: '1287665',
  rocp: '1279609',
  roo: '1279614',
  rore: '1279615',
  roe: '1289063',
  romc: '1287771',
  rovto: '1279596',
  robh: '1287774',
  rovw: '1287770'
};

/*
 * Build wowhead tooltips
 */
export function buildWowheadTooltips(data, breakCondition, simsBtn) {
  var result = [];

  // Access wowheadUrl from window global (set by Main.js)
  var wowheadUrl = typeof window !== 'undefined' ? window.wowheadUrl : '';

  for (const dpsName of data[jsonSortedDataKeys]) {
    var id = data[jsonIds][dpsName];

    if (id == null) {
      id = '';
    }

    var simConfig = AppState.getConfigData()[sims][simsBtn.replaceAll('_', '-')];
    var lookupType = simConfig ? simConfig['lookupType'] : null;
    var tooltipUrlType = resolveChartTooltipUrlType(simsBtn, lookupType);
    var url = tooltipUrlType === 'spell'
      ? wowheadUrl + wowheadSpellPath
      : wowheadUrl + wowheadItemPath;

    result.push(buildChartLine(dpsName, id, url, simsBtn, data, tooltipUrlType));
  }

  return result;
}

/*
 * Build a single line of the wowhead tooltip
 */
export function buildChartLine(dpsName, itemId, url, simsBtn, data = null, tooltipUrlType = null) {
  if (tooltipUrlType === 'none') {
    return TooltipBuilder.buildTextLine(dpsName);
  }

  var strategy = getChartTooltipLineStrategy(simsBtn);
  var isOmniumSim = typeof simsBtn === 'string' && simsBtn.toLowerCase().includes('omnium');
  var looksLikeOmniumCombo = typeof dpsName === 'string' && /ro[a-z0-9]+(?:[_+\/-]ro[a-z0-9]+)+/i.test(dpsName);

  if (strategy === 'talent') {
    return buildChartLineForTalents(dpsName);
  }

  if (strategy === 'trinket_combo') {
    return buildChartLineForTrinketCombos(dpsName, data ? data[jsonIds] : null);
  }

  if (strategy === 'omnium_folio' || (isOmniumSim && looksLikeOmniumCombo)) {
    return buildChartLineForOmniumFolio(dpsName);
  }

  return buildChartLineWithWowheadLine(dpsName, itemId, url, simsBtn);
}

function getOmniumFolioSpellId(abbreviation) {
  var key = abbreviation.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (omniumFolioSpellIds[key]) {
    return omniumFolioSpellIds[key];
  }

  return '0';
}

export function buildChartLineForOmniumFolio(dpsName) {
  var wowheadUrl = typeof window !== 'undefined' ? window.wowheadUrl : '';
  var abbreviations = (dpsName || '')
    .toString()
    .match(/[A-Za-z0-9]+/g);

  if (!abbreviations) {
    abbreviations = [];
  }

  if (abbreviations.length === 0) {
    return TooltipBuilder.buildTextLine(dpsName);
  }

  var items = abbreviations.map(function(abbreviation) {
    return {
      text: abbreviation,
      itemId: getOmniumFolioSpellId(abbreviation),
      url: wowheadUrl + wowheadSpellPath,
      ilvl: null
    };
  });

  return TooltipBuilder.buildMultiLinkLine(items, {
    lineClassName: 'trinketComboLine',
    itemClassName: 'trinketComboItem',
    linkClassName: 'wowheadLink trinketComboLink',
    separatorText: ' + ',
    separatorClassName: 'trinketComboSeparator'
  });
}

export function buildChartLineForTrinketCombos(dpsName, ids) {
  var wowheadUrl = typeof window !== 'undefined' ? window.wowheadUrl : '';
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

  return TooltipBuilder.buildMultiLinkLine(items, {
    lineClassName: 'trinketComboLine',
    itemClassName: 'trinketComboItem',
    linkClassName: 'wowheadLink trinketComboLink',
    separatorText: ' + ',
    separatorClassName: 'trinketComboSeparator'
  });
}

export function buildWowheadTooltipsMultipleBar(data, simsBtn) {
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

export function buildChartLineForTrinkets(dpsName) {
  var wowheadUrl = typeof window !== 'undefined' ? window.wowheadUrl : '';
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

export function buildChartLineForTalents(dpsName) {
  var wowheadUrl = typeof window !== 'undefined' ? window.wowheadUrl : '';
  var talentId = getValue(TalentIds, dpsName.toUpperCase());
  var currSimsBtn = AppState.getCurrSimsBtn();
  var talentData = AppState.getTalentData();

  if (getChartTooltipLineStrategy(currSimsBtn) === 'talent') {
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

export function buildChartLineForBasic(names) {
  var wowheadUrl = typeof window !== 'undefined' ? window.wowheadUrl : '';
  // Access ConduitsIds from window global if it exists (legacy Shadowlands code)
  var ConduitsIds = typeof window !== 'undefined' ? window.ConduitsIds : {};

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

export function buildChartLineWithWowheadLine(dpsName, itemId, url, simsBtn, ilvl) {
  if (simsBtn == trinkets) {
    return TooltipBuilder.buildWowheadLinkLine(dpsName, itemId, url, ilvl || 289);
  }

  // Default wowhead link
  return TooltipBuilder.buildWowheadLinkLine(dpsName, itemId, url);
}
