var currTalentBtn = defaultTalent;
var currSimsBtn = defaultSims;
var currCovenantBtn = defaultCovenant;
var currEnchantsBtn = defaultEnchant;
var currConsumablesBtn = defaultConsumable;
var currFightStyleBtn = defaultFightStyle;
var currCovenantChoiceBtn = defaultCovenantChoice;

function initializeButtons() {
  var query = getQueryParameter();
  if(query !== null) {
    if(query.has(talents)) {
      if(query.get(talents) != null
          || query.get(talents) != "")
      currTalentBtn = query.get(talents);
    }
    if(query.has(sims)) {
    if( query.get(sims) != null
      || query.get(sims) != "")
      currSimsBtn = query.get(sims);
    }
    if(query.has(covenants)) {
      if(query.get(covenants) != null
        || query.get(covenants) != "")
      currCovenantBtn = query.get(covenants);
    }
    if(query.has(fightStyle)) {
      if(query.get(fightStyle) != null
        || query.get(fightStyle) != "")
      currFightStyleBtn = query.get(fightStyle); 
    }
  }
  createButtons();
}

/*
 * Initial setup of all buttons for the site
 */
function createButtons() {
  createTalentButtons(configData[builds]);
  createSimsButtons(configData[sims]);
  createCovenantButtons(configData[covenants]);
  createConsumableButtons(getKeys(Consumables));
  createFightStyleButtons(getKeys(FightStyles));
  checkButtonClick();
}

/*
 * Creates fight style buttons
 */
function createFightStyleButtons(buttonArray) {
  createButtonBasicListSelf(fightStyleDiv, buttonArray, checkButtonClick, getFightStyleName, fightStyle)
}

/*
 * Creates covenants buttons
 */
function createCovenantButtons(buttonArray) {
  createButtonBasicListSelf(covenantDiv, buttonArray, checkButtonClick, getConduitsName, covenant)
}

/*
 * Creates consumables buttons
 */
function createConsumableButtons(buttonArray) {
  createButtonBasicListSelf(consumablesDiv, buttonArray, checkButtonClick, getConsumablesName, consumables)
}

/*
 * Creates consumables buttons
 */
function createTalentButtons(buttonArray) {
  createButtonBasicList(talentDiv, buttonArray, checkButtonClick, getTalentSimsName, talents)
}

/*
 * Creates sim buttons
 */
function createSimsButtons(buttonArray) {
  createButtonBasicList(simsDiv, buttonArray, checkButtonClick, getSimsName, sims);
}