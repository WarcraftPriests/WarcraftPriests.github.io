/*
 * Abstraction layer for creating buttons out of an Array
 */
function createButtonBasicList(divName, buttonArray, event, getLabelMethod, currBtn) {
  let div = document.getElementById(divName);
  for (b in buttonArray) {
    var buttonText = document.createTextNode(getLabelMethod(buttonArray[b]));
    let name = buttonArray[b];
    
    createButtonBasic(div, name, event, buttonText, currBtn);
  }
  styleButtons();
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
  button.appendChild(buttonText);
  div.appendChild(button);
  generateHorizontalSpacer(div);
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
          || btn.id == currFightStyleBtn ) {
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
    console.log("basd");
    currCovenantBtn = clickedButton;
  } else if(btn == fightStyle) {
    currFightStyleBtn = clickedButton
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
      addShow(enchantDiv);
      currCovenantBtn = defaultCovenant;
      currConsumablesBtn = defaultConsumable;
      break;
    case consumables:
      addShow(consumablesDiv);  
      currCovenantBtn = defaultCovenant;
      currEnchantsBtn = defaultEnchant;
      break;
    case covenants:
      currCovenantBtn = defaultCovenant;
      currEnchantsBtn = defaultEnchant;
      currConsumablesBtn = defaultConsumable;
      break;
    default:
      addShow(covenantDiv);  
      currEnchantsBtn = defaultEnchant;
      currConsumablesBtn = defaultConsumable;
  }
  
  updateChart(currTalentBtn, currSimsBtn, currCovenantBtn, currConsumablesBtn, currEnchantsBtn, currFightStyleBtn);
}

function addShow(div) {
  document.getElementById(div).classList.add(show);
}

function removeShow(div) {
  document.getElementById(div.toString()).classList.remove(show);
}

/*
 * Decides what kind of chart should be used 
 * and when a chart update should happen
 */
function updateChart(currTalentBtn, currSimsBtn, currCovenantBtn, currConsumablesBtn, currEnchantsBtn, currFightStyleBtn) {
  switch(currSimsBtn) {
    case conduits:
      wcp_charts.updateStackedBarChart(currSimsBtn, currFightStyleBtn, currTalentBtn, currCovenantBtn);
      break;
    case legendaries:
      wcp_charts.updateStackedBarChart(currSimsBtn, currFightStyleBtn, currTalentBtn, currCovenantBtn);
      break;
    case soulbinds:
      wcp_charts.updateSingleBarChart(currSimsBtn, currFightStyleBtn, currTalentBtn, currCovenantBtn);
      break;
    case trinkets:
      wcp_charts.updateStackedBarChart(currSimsBtn, currFightStyleBtn, currTalentBtn, currCovenantBtn);
      break;
    default:
      wcp_charts.updateSingleBarChart(currSimsBtn, currFightStyleBtn, currTalentBtn, "");
  }
}