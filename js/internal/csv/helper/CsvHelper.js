function determineCsvUrl(simsBtn, baseurl, fightStyle, talentChoice) {
    return baseurl + slash + simsBtn + simResultPath + fightStyle + underscore + talentChoice.replace("_", "-") + csvExtension;
}