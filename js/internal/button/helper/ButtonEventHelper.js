/*
 * When a button is clicked the value of that button is
 * stored in a variable so checkButtonClick() can use
 * that information.
 */
function handleOnClick(clickedButton, btn) {
    if(btn == talents) {
      currTalentBtn = clickedButton;
    } else if(btn == sims) {
      currSimsBtn = clickedButton;
    } else if(btn == consumables) {
      currConsumablesBtn = clickedButton;
    } else if(btn == covenant) {
      currCovenantBtn = clickedButton;
    } else if(btn == fightStyle) {
      currFightStyleBtn = clickedButton;
    } else if(btn == covenantChoice) {
      currCovenantChoiceBtn = clickedButton;
    }
  
    styleButtons();
  }
  
  /*
   * Handles the calls of a button click and updates the chart if
   * neccessary
   */
  function checkButtonClick() {
    addShow(fightStyleDiv);
    addShow(simsDiv);
    addShow(talentDiv);
    removeShow(covenantDiv);
    removeShow(enchantDiv);
    removeShow(consumablesDiv);
    
    for(currTalent in configData[sims]) {
      if(currSimsBtn == covenantsChoice) {
        removeShow(talentDiv);
      } else if(currTalent == currSimsBtn 
                  || currSimsBtn != null && currTalent == currSimsBtn.replace("_", "-")){
        if(configData[sims][currTalent][builds]){
          addButtonShow("hv_as");
          addButtonShow("hv_sc");
        } else {
          removeShow(talentDiv);
        }
        if(configData[sims][currTalent][covenant]["lookup"]){
          addShow(covenantDiv);
        } else {
          removeShow(covenantDiv);
        }
      }
      
    }
    updateChart(currTalentBtn, currSimsBtn, currCovenantBtn, currConsumablesBtn, currEnchantsBtn, currFightStyleBtn);
  }

  /*
 * Decides what kind of chart should be used 
 * and when a chart update should happen
 */
function updateChart(currTalentBtn, currSimsBtn, currCovenantBtn, currConsumablesBtn, currEnchantsBtn, currFightStyleBtn) {
  switch(currSimsBtn) {
    case covenantsChoice:
      manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", currCovenantBtn, "fightStyle", currFightStyleBtn);
      wcp_charts.updateMultipleBarChart(currSimsBtn, currFightStyleBtn, currTalentBtn, currCovenantBtn);
      break;
    case covenants:
      manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", currCovenantBtn, "fightStyle", currFightStyleBtn);
      wcp_charts.updateSingleBarChart(currSimsBtn, currFightStyleBtn, currTalentBtn, "", false, -40);
      break;
    case conduits:
      manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", currCovenantBtn, "fightStyle", currFightStyleBtn);
      wcp_charts.updatePercentageChart(currSimsBtn, currFightStyleBtn, currTalentBtn, currCovenantBtn);
      break;
    case legendaries:
      manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", currCovenantBtn, "fightStyle", currFightStyleBtn);
      wcp_charts.updateSingleBarChart(currSimsBtn, currFightStyleBtn, currTalentBtn, currCovenantBtn, true, -40);
      break;
    case legendaryItems:
      manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", currCovenantBtn, "fightStyle", currFightStyleBtn);
      wcp_charts.updatePercentageChart("legendary-items", currFightStyleBtn, currTalentBtn, currCovenantBtn);
      break;
    case soulbinds:
      manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", currCovenantBtn, "fightStyle", currFightStyleBtn);  
      wcp_charts.updateSingleBarChart(currSimsBtn, currFightStyleBtn, currTalentBtn, currCovenantBtn, true, -60);
      break;
    case trinkets:
      manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", currCovenantBtn, "fightStyle", currFightStyleBtn);  
      wcp_charts.updatePercentageChart(currSimsBtn, currFightStyleBtn, currTalentBtn, currCovenantBtn);
      break;
    case conduitCombos:
      manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", currCovenantBtn, "fightStyle", currFightStyleBtn);
      wcp_charts.updateSingleBarChart("conduit-combos", currFightStyleBtn, currTalentBtn, currCovenantBtn, true, -40);
      break;
    case soulbindTraits:
      manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", currCovenantBtn, "fightStyle", currFightStyleBtn);
      wcp_charts.updateSingleBarChart("soulbind-traits", currFightStyleBtn, currTalentBtn, "", true, -40);
      break;
    case soulbindsLaunch:
      manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", currCovenantBtn, "fightStyle", currFightStyleBtn);
      wcp_charts.updateSingleBarChart("soulbinds-launch", currFightStyleBtn, currTalentBtn, currCovenantBtn, true, -60);
      break;
    case apl:
      manipulateUrl("talents", "", "sims", currSimsBtn, "covenants", "", "fightStyle", "");
      wcp_charts.updateSingleBarChart(currSimsBtn, currFightStyleBtn, "", "", true, -40);
      break;
    case weights:
      manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", "", "fightStyle", currFightStyleBtn);
      parseCSV(currSimsBtn, currFightStyleBtn, currTalentBtn);
      break;
    case racials:
      manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", "", "fightStyle", currFightStyleBtn);
      wcp_charts.updateSingleBarChart(currSimsBtn, currFightStyleBtn, currTalentBtn, "", false, -40);
      break
    case stats:
      manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", "", "fightStyle", currFightStyleBtn);
      statChart(currSimsBtn, currFightStyleBtn, currTalentBtn, "");
      break;
    case talents:
      manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", "", "fightStyle", currFightStyleBtn);
      wcp_charts.updateSingleBarChart(currSimsBtn, currFightStyleBtn, currTalentBtn, "", true, -80);
      break;
    default:
      manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", "", "fightStyle", currFightStyleBtn);
      wcp_charts.updateSingleBarChart(currSimsBtn, currFightStyleBtn, currTalentBtn, "", true, -40);
  }
}