/**
 * AppState.js
 * Centralized application state management
 * Replaces implicit global variables with explicit state accessors
 */

var AppState = (function() {
  'use strict';

  // Private state container
  var state = {
    // Configuration and data
    baseUrl: '',
    configData: null,
    talentData: null,
    jsonData: null,
    jsonSortedDataKeys: null,
    trinketCombos: null,
    
    // Current UI selections
    currSimsBtn: '',
    currTalentBtn: '',
    currFightStyleBtn: '',
    currVersionBtn: ''
  };

  return {
    // Base URL getters/setters
    getBaseUrl: function() {
      return state.baseUrl;
    },
    setBaseUrl: function(url) {
      state.baseUrl = url;
    },

    // Config data getters/setters
    getConfigData: function() {
      return state.configData;
    },
    setConfigData: function(data) {
      state.configData = data;
    },

    // Talent data getters/setters
    getTalentData: function() {
      return state.talentData;
    },
    setTalentData: function(data) {
      state.talentData = data;
    },

    // JSON data getters/setters
    getJsonData: function() {
      return state.jsonData;
    },
    setJsonData: function(data) {
      state.jsonData = data;
    },

    // JSON sorted data keys getters/setters
    getJsonSortedDataKeys: function() {
      return state.jsonSortedDataKeys;
    },
    setJsonSortedDataKeys: function(keys) {
      state.jsonSortedDataKeys = keys;
    },

    // Trinket combos getters/setters
    getTrinketCombos: function() {
      return state.trinketCombos;
    },
    setTrinketCombos: function(combos) {
      state.trinketCombos = combos;
    },

    // Current sim button getters/setters
    getCurrSimsBtn: function() {
      return state.currSimsBtn;
    },
    setCurrSimsBtn: function(value) {
      state.currSimsBtn = value;
    },

    // Current talent button getters/setters
    getCurrTalentBtn: function() {
      return state.currTalentBtn;
    },
    setCurrTalentBtn: function(value) {
      state.currTalentBtn = value;
    },

    // Current fight style button getters/setters
    getCurrFightStyleBtn: function() {
      return state.currFightStyleBtn;
    },
    setCurrFightStyleBtn: function(value) {
      state.currFightStyleBtn = value;
    },

    // Current version button getters/setters
    getCurrVersionBtn: function() {
      return state.currVersionBtn;
    },
    setCurrVersionBtn: function(value) {
      state.currVersionBtn = value;
    },

    // Utility method to reset all state (useful for testing)
    reset: function() {
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
})();
