import { AppState } from './internal/state/AppState.module.js';
import { getQueryParameter } from './internal/helper/Parameterized.module.js';
import { initializeButtons } from './internal/button/Buttons.module.js';
import { copyURI } from './internal/helper/TalentBuild.module.js';
import { SimRepoVersions, Sims } from './internal/helper/Converter.module.js';
import { version, defaultVersion, repoTemplateUrl, charts } from './internal/helper/Constants.module.js';

function resolveSimVersion(params) {
  const selectedVersion = params.get(version);
  return SimRepoVersions[selectedVersion] ? selectedVersion : defaultVersion;
}

function setDocumentTitleFromQuery(params) {
  const selectedSim = params.get('sims');
  if (selectedSim && Sims[selectedSim]) {
    document.title = `${Sims[selectedSim]} | ${document.title}`;
  }
}

export function initializeApp() {
  const params = getQueryParameter();
  const simVersion = resolveSimVersion(params);
  AppState.setBaseUrl(repoTemplateUrl.replace('{version}', simVersion));

  jQuery.get({ url: AppState.getBaseUrl() + '/internal/talents.yml', dataType: 'text' })
    .done(function(data) {
      AppState.setTalentData(jsyaml.load(data));
    });

  jQuery.get({ url: AppState.getBaseUrl() + '/config.yml', dataType: 'text' })
    .done(function(data) {
      AppState.setConfigData(jsyaml.load(data));
      window.wowheadUrl = AppState.getConfigData()[charts].wowheadUrl;
      initializeButtons();
    });

  setDocumentTitleFromQuery(params);

  // Delegated event listener for talent import links in chart tooltips.
  $(document).on('click', '.tooltipLink', function(event) {
    copyURI(event);
  });
}

export default {
  initializeApp
};
