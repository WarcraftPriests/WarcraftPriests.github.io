import { AppState } from '../state/AppState.module.js';
import { normalizeFightStyleForTalentBuild } from './Normalizers.module.js';
import { talentBuildIdDiv, talentBuildContentDiv } from './Constants.module.js';
import { talentImportStrings } from '../chart/helper/WowheadHelper.module.js';

var talentBuildIdTemplate = null;
var talentBuildContentTemplate = null;

$('.talentBuild').click(function() {
  const $header = $(this);
  const $content = $header.next();
  $content.slideToggle(500, function() {
    $header.text(function() {
      return $content.is(':visible') ? 'Hide Talent Build' : 'Show Talent Build';
    });
  });
});

export function ensureTalentBuildTemplates() {
  if (talentBuildIdTemplate == null) {
    talentBuildIdTemplate = document.getElementById(talentBuildIdDiv).innerHTML;
  }
  if (talentBuildContentTemplate == null) {
    talentBuildContentTemplate = document.getElementById(talentBuildContentDiv).innerHTML;
  }
}

export function replaceTalentId(currTalent, currFightStyle) {
  ensureTalentBuildTemplates();
  let selectedFightStyle = normalizeFightStyleForTalentBuild(currFightStyle);
  const talentId = AppState.getConfigData()['builds'][currTalent.replaceAll('_', '-')]['talents'][selectedFightStyle]['string'];

  document.getElementById(talentBuildIdDiv).innerHTML = talentBuildIdTemplate.replaceAll('%talentId%', talentId);
  document.getElementById(talentBuildContentDiv).innerHTML = talentBuildContentTemplate.replaceAll('%talentId%', talentId);
}

export function copyURI(evt) {
  evt.preventDefault();
  const talentName = evt.target.textContent.trim();
  const importString = talentImportStrings[talentName];
  if (!importString) {
    alert('Error: Talent import string not found');
    return;
  }
  navigator.clipboard.writeText(importString).then(() => {
    alert('Talent id copied to the clipboard');
  }, () => {
    // Clipboard write failed silently to match legacy behavior.
  });
}
