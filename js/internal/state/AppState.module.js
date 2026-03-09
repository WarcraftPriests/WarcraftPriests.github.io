/**
 * AppState.module.js
 * ES module version of AppState for incremental migration.
 */

function createAppState() {
  const state = {
    baseUrl: '',
    configData: null,
    talentData: null,
    jsonData: null,
    jsonSortedDataKeys: null,
    trinketCombos: null,
    currSimsBtn: '',
    currTalentBtn: '',
    currFightStyleBtn: '',
    currVersionBtn: ''
  };

  return {
    getBaseUrl() {
      return state.baseUrl;
    },
    setBaseUrl(url) {
      state.baseUrl = url;
    },

    getConfigData() {
      return state.configData;
    },
    setConfigData(data) {
      state.configData = data;
    },

    getTalentData() {
      return state.talentData;
    },
    setTalentData(data) {
      state.talentData = data;
    },

    getJsonData() {
      return state.jsonData;
    },
    setJsonData(data) {
      state.jsonData = data;
    },

    getJsonSortedDataKeys() {
      return state.jsonSortedDataKeys;
    },
    setJsonSortedDataKeys(keys) {
      state.jsonSortedDataKeys = keys;
    },

    getTrinketCombos() {
      return state.trinketCombos;
    },
    setTrinketCombos(combos) {
      state.trinketCombos = combos;
    },

    getCurrSimsBtn() {
      return state.currSimsBtn;
    },
    setCurrSimsBtn(value) {
      state.currSimsBtn = value;
    },

    getCurrTalentBtn() {
      return state.currTalentBtn;
    },
    setCurrTalentBtn(value) {
      state.currTalentBtn = value;
    },

    getCurrFightStyleBtn() {
      return state.currFightStyleBtn;
    },
    setCurrFightStyleBtn(value) {
      state.currFightStyleBtn = value;
    },

    getCurrVersionBtn() {
      return state.currVersionBtn;
    },
    setCurrVersionBtn(value) {
      state.currVersionBtn = value;
    },

    reset() {
      state.baseUrl = '';
      state.configData = null;
      state.talentData = null;
      state.jsonData = null;
      state.jsonSortedDataKeys = null;
      state.trinketCombos = null;
      state.currSimsBtn = '';
      state.currTalentBtn = '';
      state.currFightStyleBtn = '';
      state.currVersionBtn = '';
    }
  };
}

export const AppState = createAppState();
export { createAppState };
