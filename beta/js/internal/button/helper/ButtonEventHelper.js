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
    removeShow(covenantDiv);
    removeShow(enchantDiv);
    removeShow(consumablesDiv);
    
    switch(currSimsBtn) {
      case enchants:
        addShow(fightStyleDiv);
        addShow(enchantDiv);
        currCovenantBtn = defaultCovenant;
        currConsumablesBtn = defaultConsumable;
        break;
      case consumables:
        addShow(fightStyleDiv);
        //addShow(consumablesDiv);  
        currCovenantBtn = defaultCovenant;
        currEnchantsBtn = defaultEnchant;
        break;
      case covenants:
        addShow(fightStyleDiv);
        currCovenantBtn = defaultCovenant;
        currEnchantsBtn = defaultEnchant;
        currConsumablesBtn = defaultConsumable;
        break;
      case covenantsChoice:
        removeShow(fightStyleDiv);
        removeShow(covenantDiv);
        break;
      default:
        addShow(fightStyleDiv);
        addShow(covenantDiv);  
        currEnchantsBtn = defaultEnchant;
        currConsumablesBtn = defaultConsumable;
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
      case conduits:
        manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", currCovenantBtn, "fightStyle", currFightStyleBtn);
        wcp_charts.updatePercentageChart(currSimsBtn, currFightStyleBtn, currTalentBtn, currCovenantBtn);
        break;
      case legendaries:
        manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", currCovenantBtn, "fightStyle", currFightStyleBtn);
        wcp_charts.updateSingleBarChart(currSimsBtn, currFightStyleBtn, currTalentBtn, currCovenantBtn);
        break;
      case soulbinds:
        manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", currCovenantBtn, "fightStyle", currFightStyleBtn);  
        wcp_charts.updateSingleBarChart(currSimsBtn, currFightStyleBtn, currTalentBtn, currCovenantBtn);
        break;
      case trinkets:
        manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", currCovenantBtn, "fightStyle", currFightStyleBtn);  
        wcp_charts.updateStackedBarChart(currSimsBtn, currFightStyleBtn, currTalentBtn, currCovenantBtn);
        break;
      default:
        manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", "", "fightStyle", currFightStyleBtn);
        wcp_charts.updateSingleBarChart(currSimsBtn, currFightStyleBtn, currTalentBtn, "");
    }
  }