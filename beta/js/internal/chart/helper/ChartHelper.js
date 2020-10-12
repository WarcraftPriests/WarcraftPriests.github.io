/*
 * Updates the size of the div for the chart for the real data
 */
function updateSize(chart, chartId, size) {
  document.getElementById(chartId).style.height = 200 + size * 30 + px; // Size the chart by our data.
    chart.setSize( 
      document.getElementById(chartId).style.width,
      document.getElementById(chartId).style.height
    );
    chart.redraw();
    try {
      $WowheadPower.refreshLinks();
    } catch (error) {
      console.log(error);
    }
}

/*
 * Determine the chart name for the current chart, for the used parameters
 */
function determineChartName(covenantType, firstTalent, fullSimType, fightStyle) {
  if(fullSimType == "CovenantsChoice") {
    return coventantsChoiceChartName;
  }
  if (covenantType === empty || covenantType == null) {
    return firstTalent 
              + space + dash + space
              + fullSimType 
              + space + dash + space
              + fightStyle;
  } else {
    return firstTalent 
              + space + dash + space
              + fullSimType 
              + space + dash + space 
              + getConduitsName(covenantType)
              + space + dash + space 
              + fightStyle;
  }
}

/*
 * Determines the url for the github repo to get the needed sim results
 */
function determineJsonUrl(simsBtn, baseurl, fightStyle, talentChoice, covenantType) {
  /*
   * Special cases!
   */
  if(simsBtn == talents){
    return baseurl + slash + simsBtn + simResultPath + getFightStyleName(fightStyle) + jsonExtension;
  }
  if(simsBtn == covenantsChoice) {
    return baseurl + slash + "covenant-choice" + simResultPath + "Aggregate" + jsonExtension;
  }
  if(covenantType == "" 
      || covenantType == null) {
    return baseurl + slash + simsBtn + simResultPath + getFightStyleName(fightStyle) + underscore + talentChoice + jsonExtension;
  } else {
    return baseurl + slash + simsBtn + simResultPath + getFightStyleName(fightStyle) + underscore + talentChoice + underscore + covenantType + jsonExtension;
  }
}

/*
 * Handles the failure of an json call to github, most a wrong combination of
 * talent, simType, convenant and fightStyle.
 * So no data could be fetched
 */
function handleJsonFailure(xhr, status) {
  console.log("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
  console.log(status);
}