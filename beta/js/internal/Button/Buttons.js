var currTalentBtn = defaultTalent;
var currSimsBtn = defaultSims;
var currCovenantBtn = defaultCovenant;
var currEnchantsBtn = defaultEnchant;
var currConsumablesBtn = defaultConsumable;
var currFightStyleBtn = defaultFightStyle;

/*
 * Initial setup of all buttons for the site
 */
function createButtons() {
  createTalentButtons(getKeys(SimTalents));
  createSimsButtons(getKeys(Sims));
  createCovenantButtons(getKeys(Conduits));
  createConsumableButtons(getKeys(Consumables));
  createFightStyleButtons(getKeys(FightStyles));
  checkButtonClick();
}

/*
 * Creates fight style buttons
 */
function createFightStyleButtons(buttonArray) {
  createButtonBasicList(fightStyleDiv, buttonArray, checkButtonClick, getFightStyleName, fightStyle)
}

/*
 * Creates covenants buttons
 */
function createCovenantButtons(buttonArray) {
  createButtonBasicList(covenantDiv, buttonArray, checkButtonClick, getConduitsName, covenant)
}

/*
 * Creates consumables buttons
 */
function createConsumableButtons(buttonArray) {
  createButtonBasicList(consumablesDiv, buttonArray, checkButtonClick, getConsumablesName, consumables)
}

/*
 * Creates consumables buttons
 */
function createTalentButtons(buttonArray) {
  createButtonBasicList(talentDiv, buttonArray, checkButtonClick, getTalentName, talents)
}

/*
 * Creates sim buttons
 */
function createSimsButtons(buttonArray) {
  createButtonBasicList(simsDiv, buttonArray, checkButtonClick, getSimsName, sims);
}