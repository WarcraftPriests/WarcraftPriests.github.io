// TODO: Can move to initializeButtons() ?
var currSimsBtn = defaultSims;
var currEnchantsBtn = defaultEnchant;
var currConsumablesBtn = defaultConsumable;
var currFightStyleBtn = defaultFightStyle;
var currVersionBtn = defaultVersion;

/*
 * Initialize all buttons by url params
 */
function initializeButtons() {
  // default to first entry in builds
  currTalentBtn = Object.keys(configData[builds])[0].replaceAll("-", "_")

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
    if(query.has(fightStyle)) {
      if(query.get(fightStyle) != null
        || query.get(fightStyle) != "")
      currFightStyleBtn = query.get(fightStyle); 
    }
    if(query.has(version)) {
      if(query.get(version) != null
        || query.get(version) != "")
        currVersionBtn = query.get(version); 
    }
  }
  createButtons();
}

/*
 * Initial setup of all buttons for the site
 */
function createButtons() {
  createVersionButtons(SimVersions)
  createTalentButtons(configData[builds]);
  createSimsButtons(configData[sims]);
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
 * Creates consumables buttons
 */
function createConsumableButtons(buttonArray) {
  createButtonBasicListSelf(consumablesDiv, buttonArray, checkButtonClick, Consumables, consumables)
}

/*
 * Creates version buttons
 */
function createVersionButtons(buttonArray) {
  let div = document.getElementById(versionDiv);
  for (b in buttonArray) {
    var buttonText = document.createTextNode(buttonArray[b]);
    createButtonBasicNoImage(div, b, checkButtonClick, buttonText, "version");
  }
  styleButtons();
}

/*
 * Creates talent buttons
 */
function createTalentButtons(buttonArray) {
  let div = document.getElementById(talentDiv);
  for (b in buttonArray) {
    var buttonText = document.createTextNode(buttonArray[b].name);
    b = b.replaceAll(dash, underscore);
    createButtonBasic(div, b, checkButtonClick, buttonText, talents);
  }
  styleButtons();
}

/*
 * Creates sim buttons
 */
function createSimsButtons(buttonArray) {
  const wrapper = document.createElement('div');
  wrapper.id = "sims-btn-wrapper";
  wrapper.style = `grid-template-columns: ${'auto '.repeat(maxSimButtonsPerRow)}`;
  document.getElementById(simsDiv).appendChild(wrapper);

  createSimsButtonList(wrapper.id, buttonArray, checkButtonClick, Sims, sims);
}

/*
 * Function for creating the buttons specific to the sims div.
 */
function createSimsButtonList(divName, buttonArray, event, labelArray, curBtn) {
  let div = document.getElementById(divName);
  for (b in buttonArray) {
    // Load button if it is a non sim type button or the chart is enabled
    if(!configData["sims"][b] || configData["sims"][b]["chart"]) {
      b = b.replaceAll(dash, underscore);
      var buttonText = document.createTextNode(getValue(labelArray, b));
      constructSimsButton(div, b, event, buttonText, curBtn);
    }
  }
  styleButtons();
}

/*
 * Abstraction layer for creating buttons out of an Array
 */
function createButtonBasicList(divName, buttonArray, event, labelArray, currBtn) {
  let div = document.getElementById(divName);
  for (b in buttonArray) {
    // Load button if it is a non sim type button or the chart is enabled
    if(!configData["sims"][b] || configData["sims"][b]["chart"]) {
      b = b.replaceAll(dash, underscore);
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
 * Whether or not the button with the given ID is selected in one of the button
 * groups.
 */
function isButtonSelected(buttonId) {
  return buttonId === currTalentBtn
    || buttonId === currSimsBtn
    || buttonId === currEnchantsBtn
    || buttonId === currConsumablesBtn
    || buttonId === currFightStyleBtn
    || buttonId === currVersionBtn
}

/*
 * Handles the colors of the current selected button
 */
function styleButtons() {
  var btnGroup = document.getElementsByClassName(buttonName);
  for (var i = 0; i < btnGroup.length; i++) {
    let btn = document.getElementById(btnGroup[i].id);
    if (isButtonSelected(btn.id)) {
      btn.classList.add("selected");
    }
  }
}

/*
 * Creates a button specifically with the customizations necessary to correctly
 * render the sim-related buttons.
 */
function constructSimsButton(buttonWrapper, name, event, buttonText, currBtn) {
  let button = document.createElement(buttonName.toUpperCase());
  button.setAttribute(buttonId, name);
  button.setAttribute(buttonClass, buttonName);
  button.setAttribute(onClick, handleOnClickText + name + attributeSpacer + currBtn + attributeClose);
  button.addEventListener(click, event);

  const imageWrapper = document.createElement('div');
  imageWrapper.style = "height: 100%; width: 20px;";
  var icon = document.createElement('img');
  icon.src = "images/icons/" + name + ".jpg";
  icon.classList = "sims-btn-icon";
  imageWrapper.appendChild(icon);
  button.appendChild(imageWrapper);

  const textWrapper = document.createElement('div');
  textWrapper.style = "padding-left: 8px; text-align: left; flex: 1;"
  textWrapper.appendChild(buttonText);
  button.appendChild(textWrapper);

  buttonWrapper.appendChild(button);
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
}

function createButtonBasicNoImage(div, name, event, buttonText, currBtn) {
  let button = document.createElement(buttonName.toUpperCase());
  button.setAttribute(buttonId, name);
  button.setAttribute(buttonClass, buttonName);
  button.setAttribute(onClick, handleOnClickText+ name + attributeSpacer + currBtn + attributeClose);
  button.addEventListener(click, event);

  var br = document.createTextNode("  ");
  button.appendChild(br);
  button.appendChild(buttonText);
  div.appendChild(button);
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
  } else if(btn == fightStyle) {
    currFightStyleBtn = clickedButton;
  } else if(btn == version) {
    currVersionBtn = clickedButton
  }

  styleButtons();
}

/*
 * Handles the calls of a button click and updates the chart if
 * necessary
 */
function checkButtonClick() {
  addShow(versionDiv)
  addShow(fightStyleDiv);
  addShow(simsDiv);
  addShow(talentDiv);
  removeShow(enchantDiv);
  removeShow(consumablesDiv);
  
  for(currTalent in configData[sims]) {
    if(currTalent == currSimsBtn 
                || currSimsBtn != null && currTalent == currSimsBtn.replaceAll("_", "-")){
      if(configData[sims][currTalent][builds]){
        replaceTalentId(currTalentBtn, currFightStyleBtn);
      } else {
        removeShow(talentDiv);
        removeShowSpecial(talentBuildIdDiv);
        removeShowSpecial(talentBuildDiv);
      }
    }
  }

  const version = currVersionBtn === defaultVersion ? "" : currVersionBtn
  // Need to wipe out talents when swapping versions
  // This results in double reload because it needs to default the build again once it fetches new config
  // We could ignore the build qs if it's not in the current config 
  const currentVersion = new URLSearchParams(window.location.search).get("version") || ""
  const talents = currentVersion != version ? "" : currTalentBtn

  manipulateUrl({
    talents,
    sims: currSimsBtn,
    fightStyle: currFightStyleBtn,
    version
  });
  updateChart(currTalentBtn, currSimsBtn, currConsumablesBtn, currEnchantsBtn, currFightStyleBtn, 'Chart-Display-div', true);
}

function removeShowSpecial(div) {
  document.getElementById(div.toString()).style.visibility = "hidden";
}
