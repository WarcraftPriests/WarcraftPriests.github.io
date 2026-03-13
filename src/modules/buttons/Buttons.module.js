import { AppState } from '../../services/state/AppState.module.js';
import {
  SimRepoVersions,
  Sims,
  Consumables,
  FightStyles,
  FightStyleTooltips,
  FightStyleCouncil,
  getValue,
  getKeys
} from '../../utils/Converter.module.js';
import {
  getQueryParameter,
  manipulateUrl
} from '../../services/url/Parameterized.module.js';
import {
  defaultSims,
  defaultEnchant,
  defaultConsumable,
  defaultFightStyle,
  defaultVersion,
  builds,
  sims,
  talents,
  fightStyle,
  version,
  consumables,
  fightStyleDiv,
  simsDiv,
  talentDiv,
  enchantDiv,
  consumablesDiv,
  versionDiv,
  talentBuildIdDiv,
  talentBuildDiv,
  dash,
  underscore,
  maxSimButtonsPerRow,
  buttonName,
  buttonId,
  buttonClass,
  click,
  inlineBlock,
  none,
  show
} from '../../utils/Constants.module.js';
import { replaceTalentId } from '../talents/TalentBuild.module.js';
import { updateChart } from '../chart/Chart.module.js';

const CHART_UPDATE_DEBOUNCE_MS = 100;

let currEnchantsBtn = defaultEnchant;
let currConsumablesBtn = defaultConsumable;
let chartUpdateDebounceTimer = null;

function triggerChartUpdateDebounced() {
  if (chartUpdateDebounceTimer) {
    clearTimeout(chartUpdateDebounceTimer);
  }

  chartUpdateDebounceTimer = setTimeout(function() {
    chartUpdateDebounceTimer = null;
    checkButtonClick();
  }, CHART_UPDATE_DEBOUNCE_MS);
}

export function setDefaultButtonValues() {
  AppState.setCurrSimsBtn(defaultSims);
  currEnchantsBtn = defaultEnchant;
  currConsumablesBtn = defaultConsumable;
  AppState.setCurrFightStyleBtn(defaultFightStyle);
  AppState.setCurrVersionBtn(defaultVersion);
  AppState.setCurrTalentBtn(Object.keys(AppState.getConfigData()[builds])[0].replaceAll('-', '_'));
}

function hasQueryValue(value) {
  return value != null && value !== '';
}

/*
 * Initialize all buttons by url params
 */
export function initializeButtons() {
  setDefaultButtonValues();

  var query = getQueryParameter();
  if (query !== null) {
    if (query.has(talents)) {
      const queriedTalent = query.get(talents);
      if (hasQueryValue(queriedTalent)) {
        AppState.setCurrTalentBtn(queriedTalent);
      }
    }
    if (query.has(sims)) {
      const queriedSims = query.get(sims);
      if (hasQueryValue(queriedSims)) {
        AppState.setCurrSimsBtn(queriedSims);
      }
    }

    if (query.has(fightStyle)) {
      if (Object.hasOwn(getAvailableFightStyles(), query.get(fightStyle)))
        AppState.setCurrFightStyleBtn(query.get(fightStyle)); 
    }
    if (query.has(version)) {
      const queriedVersion = query.get(version);
      if (hasQueryValue(queriedVersion)) {
        AppState.setCurrVersionBtn(queriedVersion);
      }
    }
  }
  createButtons();
}

/*
 * Initial setup of all buttons for the site
 */
export function createButtons() {
  createVersionButtons(SimRepoVersions);
  createTalentButtons(AppState.getConfigData()[builds]);
  createSimsButtons(AppState.getConfigData()[sims]);
  createConsumableButtons(getKeys(Consumables));
  createFightStyleButtons(getKeys(getAvailableFightStyles()));
  checkButtonClick();
}

function getAvailableFightStyles() {
  // TODO: Make council fight style optinal?
  let currentCouncilFightStyle = FightStyleCouncil[AppState.getConfigData()['councilTargets']];
  let councilFightStyles = Object.values(FightStyleCouncil);
  return Object.entries(FightStyles).reduce(function(prev, [key, value]) {
    if (councilFightStyles.includes(key) && key !== currentCouncilFightStyle) return prev;
    return { ...prev, [key]: value };
  }, {});
}

/*
 * Creates fight style buttons
 */
function createFightStyleButtons(buttonArray) {
  createButtonBasicListSelf(fightStyleDiv, buttonArray, checkButtonClick, FightStyles, fightStyle, FightStyleTooltips);
}

/*
 * Creates consumables buttons
 */
function createConsumableButtons(buttonArray) {
  createButtonBasicListSelf(consumablesDiv, buttonArray, checkButtonClick, Consumables, consumables);
}

/*
 * Creates version buttons
 */
function createVersionButtons(buttonArray) {
  let div = document.getElementById(versionDiv);
  for (const key in buttonArray) {
    var buttonText = document.createTextNode(buttonArray[key]);
    createButtonBasicNoImage(div, key, checkButtonClick, buttonText, version);
  }
  styleButtons();
}

/*
 * Creates talent buttons
 */
function createTalentButtons(buttonArray) {
  let div = document.getElementById(talentDiv);
  for (const key in buttonArray) {
    var buttonText = document.createTextNode(buttonArray[key].name);
    const normalizedKey = key.replaceAll(dash, underscore);
    createButtonBasic(div, normalizedKey, checkButtonClick, buttonText, talents);
  }
  styleButtons();
}

/*
 * Creates sim buttons
 */
function createSimsButtons(buttonArray) {
  const wrapper = document.createElement('div');
  wrapper.id = 'sims-btn-wrapper';
  wrapper.style = `grid-template-columns: ${'auto '.repeat(maxSimButtonsPerRow)}`;
  document.getElementById(simsDiv).appendChild(wrapper);

  createSimsButtonList(wrapper.id, buttonArray, checkButtonClick, Sims, sims);
}

/*
 * Function for creating the buttons specific to the sims div.
 */
function createSimsButtonList(divName, buttonArray, event, labelArray, curBtn) {
  let div = document.getElementById(divName);
  for (const key in buttonArray) {
    // Load button if it is a non sim type button or the chart is enabled
    if (!AppState.getConfigData()['sims'][key] || AppState.getConfigData()['sims'][key]['chart']) {
      const normalizedKey = key.replaceAll(dash, underscore);
      var buttonText = document.createTextNode(getValue(labelArray, normalizedKey));
      constructSimsButton(div, normalizedKey, event, buttonText, curBtn);
    }
  }
  styleButtons();
}

/*
 * Abstraction layer for creating buttons out of an Array
 */
function createButtonBasicList(divName, buttonArray, event, labelArray, currBtn) {
  let div = document.getElementById(divName);
  for (const key in buttonArray) {
    // Load button if it is a non sim type button or the chart is enabled
    if (!AppState.getConfigData()['sims'][key] || AppState.getConfigData()['sims'][key]['chart']) {
      const normalizedKey = key.replaceAll(dash, underscore);
      var buttonText = document.createTextNode(getValue(labelArray, normalizedKey));
      createButtonBasic(div, normalizedKey, event, buttonText, currBtn);
    }
  }
  styleButtons();
}

/*
 * Abstraction layer for creating buttons out of an Array
 * special case for consumables, fightStyle and covenants
 */
function createButtonBasicListSelf(divName, buttonArray, event, labelArray, currBtn, tooltips) {
  let div = document.getElementById(divName);
  for (const buttonKey of buttonArray) {
    var buttonText = document.createTextNode(getValue(labelArray, buttonKey));
    const tooltip = tooltips ? getValue(tooltips, buttonKey) : null;
    createButtonBasic(div, buttonKey, event, buttonText, currBtn, tooltip);
  }
  styleButtons();
}

function bindButtonClick(button, name, currBtn, event, options) {
  var useDebouncedUpdate = options && options.useDebouncedUpdate === true;

  button.addEventListener(click, function() {
    handleOnClick(name, currBtn);
    if (useDebouncedUpdate) {
      triggerChartUpdateDebounced();
      return;
    }

    event();
  });
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
  return buttonId === AppState.getCurrTalentBtn()
    || buttonId === AppState.getCurrSimsBtn()
    || buttonId === currEnchantsBtn
    || buttonId === currConsumablesBtn
    || buttonId === AppState.getCurrFightStyleBtn()
    || buttonId === AppState.getCurrVersionBtn();
}

/*
 * Handles the colors of the current selected button
 */
function styleButtons() {
  var btnGroup = document.getElementsByClassName(buttonName);
  for (var i = 0; i < btnGroup.length; i++) {
    let btn = document.getElementById(btnGroup[i].id);
    if (isButtonSelected(btn.id)) {
      btn.classList.add('selected');
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
  bindButtonClick(button, name, currBtn, event, { useDebouncedUpdate: true });

  const imageWrapper = document.createElement('div');
  imageWrapper.style = 'height: 100%; width: 20px;';
  var icon = document.createElement('img');
  icon.src = 'images/icons/' + name + '.jpg';
  icon.classList = 'sims-btn-icon';
  imageWrapper.appendChild(icon);
  button.appendChild(imageWrapper);

  const textWrapper = document.createElement('div');
  textWrapper.style = 'padding-left: 8px; text-align: left; flex: 1;';
  textWrapper.appendChild(buttonText);
  button.appendChild(textWrapper);

  buttonWrapper.appendChild(button);
}

/*
 * Creating a real button for the two ways
 * - single button
 * - array button
 */
function createButtonBasic(div, name, event, buttonText, currBtn, tooltip) {
  let button = document.createElement(buttonName.toUpperCase());
  button.setAttribute(buttonId, name);
  button.setAttribute(buttonClass, buttonName);
  if (tooltip) {
    button.setAttribute('title', tooltip);
  }
  bindButtonClick(button, name, currBtn, event, { useDebouncedUpdate: true });
  
  var icon = document.createElement('img');
  icon.src = 'images/icons/' + name + '.jpg';
  icon.style = 'position: relative; top: 2px; width: 16px; height: 16px;';
  var br = document.createTextNode('  ');
  button.appendChild(icon);
  button.appendChild(br);
  button.appendChild(buttonText);
  div.appendChild(button);
}

function createButtonBasicNoImage(div, name, event, buttonText, currBtn) {
  let button = document.createElement(buttonName.toUpperCase());
  button.setAttribute(buttonId, name);
  button.setAttribute(buttonClass, buttonName);
  bindButtonClick(button, name, currBtn, event, { useDebouncedUpdate: true });

  var br = document.createTextNode('  ');
  button.appendChild(br);
  button.appendChild(buttonText);
  div.appendChild(button);
}

/*
 * When a button is clicked the value of that button is
 * stored in a variable so checkButtonClick() can use
 * that information.
 */
export function handleOnClick(clickedButton, btn) {
  if (btn == talents) {
    AppState.setCurrTalentBtn(clickedButton);
  } else if (btn == sims) {
    AppState.setCurrSimsBtn(clickedButton);
  } else if (btn == consumables) {
    currConsumablesBtn = clickedButton;
  } else if (btn == fightStyle) {
    AppState.setCurrFightStyleBtn(clickedButton);
  } else if (btn == version) {
    AppState.setCurrVersionBtn(clickedButton);
  }

  styleButtons();
}

/*
 * Handles the calls of a button click and updates the chart if
 * necessary
 */
export function checkButtonClick() {
  addShow(fightStyleDiv);
  addShow(simsDiv);
  addShow(talentDiv);
  removeShow(enchantDiv);
  removeShow(consumablesDiv);

  if (hasMultipleVersions()) {
    addShow(versionDiv);
  }
  
  for (const currTalent in AppState.getConfigData()[sims]) {
    if (currTalent == AppState.getCurrSimsBtn() 
                || AppState.getCurrSimsBtn() != null && currTalent == AppState.getCurrSimsBtn().replaceAll('_', '-')) {
      if (AppState.getConfigData()[sims][currTalent][builds]) {
        replaceTalentId(AppState.getCurrTalentBtn(), AppState.getCurrFightStyleBtn());
      } else {
        removeShow(talentDiv);
        removeShowSpecial(talentBuildIdDiv);
        removeShowSpecial(talentBuildDiv);
      }
    }
  }

  const selectedVersion = AppState.getCurrVersionBtn() === defaultVersion ? '' : AppState.getCurrVersionBtn();
  const currentVersion = getQueryParameter().get(version) || '';
  const talents = currentVersion != selectedVersion ? '' : AppState.getCurrTalentBtn();

  manipulateUrl({
    talents,
    sims: AppState.getCurrSimsBtn(),
    fightStyle: AppState.getCurrFightStyleBtn(),
    version: selectedVersion
  });
  updateChart(AppState.getCurrTalentBtn(), AppState.getCurrSimsBtn(), currConsumablesBtn, currEnchantsBtn, AppState.getCurrFightStyleBtn(), 'Chart-Display-div', true);
}

export function hasMultipleVersions() {
  return Object.keys(SimRepoVersions).length > 1;
}

function removeShowSpecial(div) {
  document.getElementById(div.toString()).style.visibility = 'hidden';
}

