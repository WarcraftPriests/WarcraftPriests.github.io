import { AppState } from '../../services/state/AppState.module.js';
import { normalizeFightStyleForResults } from '../../utils/Normalizers.module.js';
import { getConfigValue, getValue, Sims } from '../../utils/Converter.module.js';
import { renderChartHeader, renderChartDescription, renderCsvTable } from '../../utils/DomRenderHelper.module.js';
import {
  dungeonType,
  builds,
  slash,
  simResultPath,
  underscore,
  csvExtension
} from '../../utils/Constants.module.js';

export const Headings = {
  profile: 'Profile',
  actor: 'Actor',
  DPS: 'DPS',
  int: 'Intellect',
  haste: 'Haste',
  crit: 'Critical Strike',
  mastery: 'Mastery',
  vers: 'Versatility',
  dpsW: 'DPS Weight',
};

export function parseCSV(currSimsBtn, currFightStyleBtn, currTalentBtn, chartId, metaData) {
  currFightStyleBtn = normalizeFightStyleForResults(currFightStyleBtn, AppState.getConfigData()[dungeonType]);

  $(document).ready(function() {
    $.ajax({
      type: 'GET',
      url: determineCsvUrl(currSimsBtn, AppState.getBaseUrl(), currFightStyleBtn, currTalentBtn),
      dataType: 'text',
      success: function(data) { processData(data, currSimsBtn, currTalentBtn); }
    });
  });

  function processData(allText, currSimsBtnInner, currTalentBtnInner) {
    var recordNum = 9;
    var allTextLines = allText.split(/\r\n|\n/);
    if (metaData) {
      var simTalent = getConfigValue(AppState.getConfigData()[builds], currTalentBtnInner);
      if (typeof window !== 'undefined' && typeof window.determineChartName === 'function') {
        renderChartHeader(window.determineChartName('', simTalent.name, getValue(Sims, currSimsBtnInner), currFightStyleBtn));
      }
      if (typeof window !== 'undefined' && typeof window.determineChartDescription === 'function') {
        renderChartDescription(window.determineChartDescription(currSimsBtnInner));
      }
    }

    var rows = [];
    for (var i = 0; i < allTextLines.length - 1; i++) {
      var lines = allTextLines[i].split(',');
      var entries = lines.splice(0, recordNum);
      var row = [];
      for (var j = 0; j < recordNum; j++) {
        if (entries[j] != null && entries[j] != undefined) {
          row.push(getLabel(entries[j]));
        }
      }
      rows.push(row);
    }

    renderCsvTable(chartId, rows);
  }

  function getLabel(key) {
    var result = Headings[key];
    if (result == null || result == undefined || result == '') {
      result = key;
    }

    return result.replaceAll('_', ' ');
  }
}

export function determineCsvUrl(simsBtn, baseurl, fightStyle, talentChoice) {
  return baseurl + slash + simsBtn + simResultPath + fightStyle + underscore + talentChoice.replaceAll('_', '-') + csvExtension;
}

