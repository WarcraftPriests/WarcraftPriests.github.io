(function() {
  const params = getQueryParameter();
  const selectedVersion = params.get(version);
  const simVersion = SimRepoVersions[selectedVersion] ? selectedVersion : defaultVersion;
  AppState.setBaseUrl(repoTemplateUrl.replace('{version}', simVersion));
}());

jQuery.get({url: AppState.getBaseUrl() + '/internal/talents.yml', dataType: 'text'})
  .done(function (data) {
    AppState.setTalentData(jsyaml.load(data));
    //initializeButtons();
  }
  );

jQuery.get({url: AppState.getBaseUrl() + '/config.yml', dataType: 'text'})
  .done(function (data) {
    AppState.setConfigData(jsyaml.load(data));
    wowheadUrl = AppState.getConfigData()[charts].wowheadUrl;
    initializeButtons();
  }
  );

(function() {
  const params = getQueryParameter();
  const selectedSim = params.get('sims');
  if (selectedSim && Sims[selectedSim]) {
    document.title = `${Sims[selectedSim]} | ${document.title}`;
  }
}());

// Add delegated event listener for talent import links in chart tooltips
$(document).on('click', '.tooltipLink', function(event) {
  copyURI(event);
});
