var Headings = {
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

function parseCSV(currSimsBtn, currFightStyleBtn, currTalentBtn, chartId, metaData) {
  currFightStyleBtn = normalizeFightStyleForResults(currFightStyleBtn, AppState.getConfigData()[dungeonType]);
    
  $(document).ready(function() {
    $.ajax({
      type: 'GET',
      url: determineCsvUrl(currSimsBtn, AppState.getBaseUrl(), currFightStyleBtn, currTalentBtn),
      dataType: 'text',
      success: function(data) {processData(data, currSimsBtn, AppState.getBaseUrl(), currFightStyleBtn, currTalentBtn);}
    });
  });
    
  function processData(allText, currSimsBtn, baseUrl, currFightStyleBtn, currTalentBtn) {
    var recordNum = 9;
    var allTextLines = allText.split(/\r\n|\n/);
    if (metaData) {
      var simTalent = getConfigValue(AppState.getConfigData()[builds], currTalentBtn);
      renderChartHeader(determineChartName('', simTalent.name, getValue(Sims, currSimsBtn), currFightStyleBtn));
      renderChartDescription(determineChartDescription(currSimsBtn));
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
    var result = '';
    result = Headings[key];
    if (result == null || result == undefined || result == '') {
      result = key;
    }

    return result.replaceAll('_', ' ');
  }
}

function determineCsvUrl(simsBtn, baseurl, fightStyle, talentChoice) {
  return baseurl + slash + simsBtn + simResultPath + fightStyle + underscore + talentChoice.replaceAll('_', '-') + csvExtension;
}