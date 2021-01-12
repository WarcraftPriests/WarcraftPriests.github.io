var currTalentBtn = defaultTalent;
var currSimsBtn = defaultSims;
var currCovenantBtn = defaultCovenant;
var currEnchantsBtn = defaultEnchant;
var currConsumablesBtn = defaultConsumable;
var currFightStyleBtn = defaultFightStyle;
var currCovenantChoiceBtn = defaultCovenantChoice;

/*
 * Initialize all buttons by url params
 */
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
  createButtonBasicListSelf(fightStyleDiv, buttonArray, checkButtonClick, FightStyles, fightStyle)
}

/*
 * Creates covenants buttons
 */
function createCovenantButtons(buttonArray) {
  createButtonBasicListSelf(covenantDiv, buttonArray, checkButtonClick, Conduits, covenant)
}

/*
 * Creates consumables buttons
 */
function createConsumableButtons(buttonArray) {
  createButtonBasicListSelf(consumablesDiv, buttonArray, checkButtonClick, Consumables, consumables)
}

/*
 * Creates consumables buttons
 */
function createTalentButtons(buttonArray) {
  createButtonBasicList(talentDiv, buttonArray, checkButtonClick, SimTalents, talents)
}

/*
 * Creates sim buttons
 */
function createSimsButtons(buttonArray) {
  createButtonBasicList(simsDiv, buttonArray, checkButtonClick, Sims, sims);
}

/*
 * Abstraction layer for creating buttons out of an Array
 */
function createButtonBasicList(divName, buttonArray, event, labelArray, currBtn) {
  let div = document.getElementById(divName);
  for (b in buttonArray) {
    if(b != apl && b != gear) {
      b = b.replace(dash, underscore);
      var buttonText = document.createTextNode(getValue(labelArray, b));
      createButtonBasic(div, b, event, buttonText, currBtn);
    }
  }
  styleButtons();
}

/*
 * Abstraction layer for creating buttons out of an Array
 * special case for consumables, fightStyle and covenants
 */
function createButtonBasicListSelf(divName, buttonArray, event, labelArray, currBtn) {
  let div = document.getElementById(divName);
  for (b in buttonArray) {
    var buttonText = document.createTextNode(getValue(labelArray, buttonArray[b]));
    createButtonBasic(div, buttonArray[b], event, buttonText, currBtn);
  }
  styleButtons();
}

/*
 * Generates the horizontal spacer between the buttons
 */
function generateHorizontalSpacer(div) {
  var horizontalSpacer = document.createElement(span);
  horizontalSpacer.setAttribute(classLabel, divider);
  horizontalSpacer.style.width = fivePixel;
  horizontalSpacer.style.height = auto;
  horizontalSpacer.style.display = inlineBlock;
  div.appendChild(horizontalSpacer);
}

/*
 * add a button to the index.hmtl
 */
function addButtonShow(buttonName) {
  document.getElementById(buttonName).style.display = '';
  document.getElementById(buttonName).nextSibling.style.display = inlineBlock;
}

/*
 * remove button from index.html
 */
function removeButtonShow(buttonName) {
  document.getElementById(buttonName).style.display = none;
  document.getElementById(buttonName).nextSibling.style.display = none;
}

/*
 * adds a specific button row to index.html
 */
function addShow(div) {
  document.getElementById(div).classList.add(show);
}

/*
 * removes a specific button row from index.html
 */
function removeShow(div) {
  document.getElementById(div.toString()).classList.remove(show);
}

/*
 * Handles the colors of the current selected button
 */
function styleButtons() {
  var btnGroup = document.getElementsByClassName(buttonName);
  for (var i = 0; i < btnGroup.length; i++) {
    let btn = document.getElementById(btnGroup[i].id);
    if (btn.id == currTalentBtn 
          || btn.id == currSimsBtn 
          || btn.id == currCovenantBtn
          || btn.id == currEnchantsBtn 
          || btn.id == currConsumablesBtn
          || btn.id == currFightStyleBtn
          || btn.id == currCovenantChoiceBtn ) {
      btn.style.borderColor = buttonBorderColor;
      btn.style.backgroundColor = buttonBackgroundColor;
    } else {
      btn.style.borderColor = buttonBorderColorDefault;
      btn.style.backgroundColor = defaultBackgroundColor;
    }
    btn.style.cursor = pointer;
  }
}

/*
 * Creating a real button for the two ways
 * - single button
 * - array button
 */
function createButtonBasic(div, name, event, buttonText, currBtn) {
  let button = document.createElement(buttonName.toUpperCase());
  button.setAttribute(buttonId, name);
  button.setAttribute(buttonClass, buttonName);
  button.setAttribute(onClick, handleOnClickText+ name + attributeSpacer + currBtn + attributeClose);
  button.addEventListener(click, event);
  
  var icon = document.createElement('img');
  icon.src = "images/icons/" + name + ".jpg";
  icon.style = "position: relative; top: 2px; width: 16px; height: 16px;";
  var br = document.createTextNode("  ");
  button.appendChild(icon);
  button.appendChild(br);
  button.appendChild(buttonText);
  div.appendChild(button);
  generateHorizontalSpacer(div);
}

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
      removeShow(fightStyleDiv);
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
  updateUrl(currTalentBtn, currSimsBtn, currCovenantBtn, currConsumablesBtn, currEnchantsBtn, currFightStyleBtn)
  updateChart(currTalentBtn, currSimsBtn, currCovenantBtn, currConsumablesBtn, currEnchantsBtn, currFightStyleBtn, 'Chart-Display-div', true);
}

function updateUrl(currTalentBtn, currSimsBtn, currCovenantBtn, currConsumablesBtn, currEnchantsBtn, currFightStyleBtn) {
  if(configData["sims"][currSimsBtn.replace("_", "-")]["covenant"]["lookup"]) {
    manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", currCovenantBtn, "fightStyle", currFightStyleBtn);
  } else if(currSimsBtn == "covenant_choice") {
    manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", "", "fightStyle", "");
  } else {
    manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", "", "fightStyle", currFightStyleBtn);
  }
}