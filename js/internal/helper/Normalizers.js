function normalizeSimResultKey(rawSimType) {
  if (rawSimType == null) {
    return rawSimType;
  }
  return rawSimType.replaceAll('_', '-');
}

function normalizeBuildKey(rawBuildKey) {
  if (rawBuildKey == null) {
    return rawBuildKey;
  }
  return rawBuildKey.replaceAll('_', '-');
}

function normalizeFightStyleForResults(rawFightStyle, selectedDungeonType) {
  if (rawFightStyle == null) {
    return rawFightStyle;
  }

  if (rawFightStyle.includes('twotarget')) {
    return '2T';
  }
  if (rawFightStyle.includes('threetarget')) {
    return '3T';
  }
  if (rawFightStyle.includes('fourtarget')) {
    return '4T';
  }
  if (rawFightStyle.includes('eighttarget')) {
    return '8T';
  }
  if (rawFightStyle.includes('Dungeons')) {
    var dungeonType = selectedDungeonType || 'push';
    return 'Dungeons-' + dungeonType[0].toUpperCase() + dungeonType.slice(1);
  }

  return rawFightStyle;
}

function normalizeFightStyleForTalentBuild(rawFightStyle) {
  if (rawFightStyle == null) {
    return rawFightStyle;
  }

  if (rawFightStyle === 'twotarget') {
    return '2t';
  }
  if (rawFightStyle === 'threetarget') {
    return '3t';
  }
  if (rawFightStyle === 'fourtarget') {
    return '4t';
  }
  if (rawFightStyle === 'eighttarget') {
    return '8t';
  }
  if (rawFightStyle.toLowerCase() === 'dungeons') {
    return 'dungeons';
  }

  return rawFightStyle.toLowerCase();
}