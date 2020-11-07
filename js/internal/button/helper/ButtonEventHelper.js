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
    
    switch(currSimsBtn) {
      case enchants:
        addShow(fightStyleDiv);
        addShow(enchantDiv);
        addShow(talentDiv);
        removeButtonShow("hv");
        currCovenantBtn = defaultCovenant;
        currConsumablesBtn = defaultConsumable;
        break;
      case consumables:
        addShow(fightStyleDiv);
        addShow(talentDiv);
        removeButtonShow("hv");
        currCovenantBtn = defaultCovenant;
        currEnchantsBtn = defaultEnchant;
        break;
      case covenants:
        addShow(fightStyleDiv);  
        addShow(talentDiv);
        removeButtonShow("hv");
        currCovenantBtn = defaultCovenant;
        currEnchantsBtn = defaultEnchant;
        currConsumablesBtn = defaultConsumable;
        break;
      case covenantsChoice:
        addShow(talentDiv);
        removeShow(fightStyleDiv);
        removeShow(covenantDiv);
        removeButtonShow("hv_as");
        removeButtonShow("hv_sc");
        break;
      case apl:
        removeShow(covenantDiv);
        removeShow(talentDiv);
        removeButtonShow("hv");
        break;
      case legendaryItems:
        addShow(fightStyleDiv);  
        addShow(talentDiv);
        addShow(covenantDiv);
        removeButtonShow("hv");
        break;
      case soulbindTraits:
        addShow(fightStyleDiv);  
        removeShow(covenantDiv);
        removeButtonShow("hv");
        break;
      case soulbindsLaunch:
        addShow(covenantDiv);
        removeShow(enchantDiv);
        removeShow(consumablesDiv);
        removeButtonShow("hv_as");
        removeButtonShow("hv_sc");
        currTalentBtn = defaultTalent;
        currEnchantsBtn = defaultEnchant;
        currConsumablesBtn = defaultConsumable;
        break;
      case talents:
        addShow(fightStyleDiv);
        addShow(simsDiv);
        removeButtonShow("hv");
        removeShow(covenantDiv);
        removeShow(enchantDiv);
        removeShow(consumablesDiv);
        removeShow(talentDiv);
        currTalentBtn = defaultTalent;
        currCovenantBtn = defaultCovenant;
        currEnchantsBtn = defaultEnchant;
        currConsumablesBtn = defaultConsumable;
        break;
      case trinkets:
        addShow(covenantDiv);
        removeShow(enchantDiv);
        removeShow(consumablesDiv);
        removeButtonShow("hv_as");
        removeButtonShow("hv_sc");
        currTalentBtn = defaultTalent;
        currEnchantsBtn = defaultEnchant;
        currConsumablesBtn = defaultConsumable;
        break;
      case racials:
        removeShow(covenantDiv);
        removeShow(enchantDiv);
        removeShow(consumablesDiv);
        removeButtonShow("hv_as");
        removeButtonShow("hv_sc");
        currTalentBtn = defaultTalent;
        currCovenantBtn = defaultCovenant;
        currEnchantsBtn = defaultEnchant;
        currConsumablesBtn = defaultConsumable;
        break;
      case weights:
        removeShow(covenantDiv);
        removeShow(enchantDiv);
        removeShow(consumablesDiv);
        removeButtonShow("hv_as");
        removeButtonShow("hv_sc");
        currTalentBtn = defaultTalent;
        currCovenantBtn = defaultCovenant;
        currEnchantsBtn = defaultEnchant;
        currConsumablesBtn = defaultConsumable;
        break;
      default:
        addShow(fightStyleDiv);
        addShow(covenantDiv);  
        addShow(talentDiv);
        removeButtonShow("hv");
        addButtonShow("hv_as");
        addButtonShow("hv_sc");
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
        wcp_charts.updateSingleBarChart(currSimsBtn, currFightStyleBtn, currTalentBtn, currCovenantBtn, true);
        break;
      case legendaryItems:
        manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", currCovenantBtn, "fightStyle", currFightStyleBtn);
        wcp_charts.updatePercentageChart("legendary-items", currFightStyleBtn, currTalentBtn, currCovenantBtn);
        break;
      case soulbinds:
        manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", currCovenantBtn, "fightStyle", currFightStyleBtn);  
        wcp_charts.updateSingleBarChart(currSimsBtn, currFightStyleBtn, currTalentBtn, currCovenantBtn, true);
        break;
      case trinkets:
        manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", currCovenantBtn, "fightStyle", currFightStyleBtn);  
        wcp_charts.updatePercentageChart(currSimsBtn, currFightStyleBtn, currTalentBtn, currCovenantBtn);
        break;
      case conduitCombos:
        manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", currCovenantBtn, "fightStyle", currFightStyleBtn);
        wcp_charts.updateSingleBarChart("conduit-combos", currFightStyleBtn, currTalentBtn, currCovenantBtn, true);
        break;
      case soulbindTraits:
        manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", currCovenantBtn, "fightStyle", currFightStyleBtn);
        wcp_charts.updateSingleBarChart("soulbind-traits", currFightStyleBtn, currTalentBtn, "", true);
        break;
      case soulbindsLaunch:
        manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", currCovenantBtn, "fightStyle", currFightStyleBtn);
        wcp_charts.updateSingleBarChart("soulbinds-launch", currFightStyleBtn, currTalentBtn, currCovenantBtn, true);
        break;
      case apl:
        manipulateUrl("talents", "", "sims", currSimsBtn, "covenants", "", "fightStyle", "");
        wcp_charts.updateSingleBarChart(currSimsBtn, currFightStyleBtn, "", "", true);
        break;
      case weights:
        manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", "", "fightStyle", currFightStyleBtn);
        parseCSV(currSimsBtn, currFightStyleBtn, currTalentBtn);
        break;
      case racials:
        manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", "", "fightStyle", currFightStyleBtn);
        wcp_charts.updateSingleBarChart(currSimsBtn, currFightStyleBtn, currTalentBtn, "", false);
        break
      default:
        manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", "", "fightStyle", currFightStyleBtn);
        wcp_charts.updateSingleBarChart(currSimsBtn, currFightStyleBtn, currTalentBtn, "", true);
    }
  }