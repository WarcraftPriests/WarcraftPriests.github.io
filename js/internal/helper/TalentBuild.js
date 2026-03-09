var talentBuildIdTemplate = null;
var talentBuildContentTemplate = null;

$('.talentBuild').click(function () {
  const $header = $(this);
  const $content = $header.next();
  //$content = $temp.next();
  $content.slideToggle(500, function () {
    $header.text(function () {
      return $content.is(':visible') ? 'Hide Talent Build' : 'Show Talent Build';
    });
  });
});

function ensureTalentBuildTemplates() {
  if (talentBuildIdTemplate == null) {
    talentBuildIdTemplate = document.getElementById(talentBuildIdDiv).innerHTML;
  }
  if (talentBuildContentTemplate == null) {
    talentBuildContentTemplate = document.getElementById(talentBuildContentDiv).innerHTML;
  }
}

function replaceTalentId(currTalent, currFightStyle) {
  ensureTalentBuildTemplates();
  let selectedFightStyle = normalizeFightStyleForTalentBuild(currFightStyle);
  const talentId = AppState.getConfigData()['builds'][currTalent.replaceAll('_', '-')]['talents'][selectedFightStyle]['string'];

  /* `builds.talentID.talents.fightStyle` */
  document.getElementById(talentBuildIdDiv).innerHTML = talentBuildIdTemplate.replaceAll('%talentId%', talentId);
  document.getElementById(talentBuildContentDiv).innerHTML = talentBuildContentTemplate.replaceAll('%talentId%', talentId);
}

function copyURI(evt) {
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
    /* clipboard write failed */
  });
}
