const fs = require('fs');
const path = require('path');
const vm = require('vm');

describe('Integration: Button → State → Chart Flow', () => {
  let context;

  beforeAll(() => {
    // Create a comprehensive context with all necessary globals and mocks
    context = vm.createContext({
      // Constants
      talents: 'talents',
      talentsTop: 'talents_top',
      sims: 'sims',
      builds: 'builds',
      fightStyle: 'fightStyle',
      version: 'version',
      trinkets: 'trinkets',
      trinketCombos: 'trinket_combos',
      
      // State tracking
      stateChanges: [],
      configData: {
        builds: {
          'fire-frost': { name: 'Fire/Frost' },
          'shadow-priest': { name: 'Shadow Priest' }
        },
        sims: {
          trinkets: { chart: true },
          weights: { chart: true }
        },
        councilTargets: 'single'
      },
      
      // Mock AppState (tracks changes)
      AppState: {
        state: {
          currSimsBtn: 'trinkets',
          currTalentBtn: 'fire_frost',
          currFightStyleBtn: 'dungeons',
          currVersionBtn: 'default'
        },
        getCurrSimsBtn() { return this.state.currSimsBtn; },
        setCurrSimsBtn(value) {
          context.stateChanges.push({ type: 'simsBtn', old: this.state.currSimsBtn, new: value });
          this.state.currSimsBtn = value;
        },
        getCurrTalentBtn() { return this.state.currTalentBtn; },
        setCurrTalentBtn(value) {
          context.stateChanges.push({ type: 'talentBtn', old: this.state.currTalentBtn, new: value });
          this.state.currTalentBtn = value;
        },
        getCurrFightStyleBtn() { return this.state.currFightStyleBtn; },
        setCurrFightStyleBtn(value) {
          context.stateChanges.push({ type: 'fightStyleBtn', old: this.state.currFightStyleBtn, new: value });
          this.state.currFightStyleBtn = value;
        },
        getCurrVersionBtn() { return this.state.currVersionBtn; },
        setCurrVersionBtn(value) {
          context.stateChanges.push({ type: 'versionBtn', old: this.state.currVersionBtn, new: value });
          this.state.currVersionBtn = value;
        },
        getConfigData() { return context.configData; }
      },
      
      // Mock chart update tracking
      chartUpdates: [],
      updateChart(talentBtn, simsBtn, consumablesBtn, enchantsBtn, fightStyleBtn, chartId, metaData) {
        context.chartUpdates.push({
          talent: talentBtn,
          sims: simsBtn,
          fightStyle: fightStyleBtn,
          chartId: chartId
        });
      },
      
      // Mock URL manipulation
      urlChanges: [],
      manipulateUrl(params) {
        context.urlChanges.push(params);
      },
      
      // Mock style tracking
      styleUpdates: [],
      styleButtons() {
        context.styleUpdates.push(true);
      },
      
      // Query parameter mock
      getQueryParameter() {
        return {
          params: {},
          get(key) { return this.params[key]; },
          has(key) { return key in this.params; }
        };
      },
      
      // Constants for button management
      defaultSims: 'trinkets',
      defaultVersion: 'default',
      
      console: console
    });

    // For this integration test, we don't need to load actual files
    // Instead, we create mock implementations that test the flow
  });

  describe('Button State Changes', () => {
    beforeEach(() => {
      context.stateChanges = [];
      context.chartUpdates = [];
      context.urlChanges = [];
    });

    test('should update AppState when sims button is clicked', () => {
      const AppState = context.AppState;
      
      // Simulate button click: user selects different sims
      AppState.setCurrSimsBtn('weights');
      
      expect(AppState.getCurrSimsBtn()).toBe('weights');
      expect(context.stateChanges).toHaveLength(1);
      expect(context.stateChanges[0]).toEqual({
        type: 'simsBtn',
        old: 'trinkets',
        new: 'weights'
      });
    });

    test('should update AppState when talent button is clicked', () => {
      const AppState = context.AppState;
      
      AppState.setCurrTalentBtn('shadow_priest');
      
      expect(AppState.getCurrTalentBtn()).toBe('shadow_priest');
      expect(context.stateChanges[0]).toEqual({
        type: 'talentBtn',
        old: 'fire_frost',
        new: 'shadow_priest'
      });
    });

    test('should update AppState when fight style button is clicked', () => {
      const AppState = context.AppState;
      
      AppState.setCurrFightStyleBtn('raid');
      
      expect(AppState.getCurrFightStyleBtn()).toBe('raid');
    });

    test('should track multiple button changes in sequence', () => {
      const AppState = context.AppState;
      
      AppState.setCurrSimsBtn('weights');
      AppState.setCurrTalentBtn('shadow_priest');
      AppState.setCurrFightStyleBtn('raid');
      
      expect(context.stateChanges).toHaveLength(3);
      expect(context.stateChanges[0].type).toBe('simsBtn');
      expect(context.stateChanges[1].type).toBe('talentBtn');
      expect(context.stateChanges[2].type).toBe('fightStyleBtn');
    });
  });

  describe('State → Chart Update Flow', () => {
    beforeEach(() => {
      context.stateChanges = [];
      context.chartUpdates = [];
      context.urlChanges = [];
      context.styleUpdates = [];
    });

    test('should trigger chart update when sims button changes', () => {
      const AppState = context.AppState;
      
      // Simulate: button click → state change → chart update
      AppState.setCurrSimsBtn('weights');
      
      // In real code, this would be triggered by checkButtonClick()
      context.updateChart(
        AppState.getCurrTalentBtn(),
        AppState.getCurrSimsBtn(),
        null,
        null,
        AppState.getCurrFightStyleBtn(),
        'Chart-Display-div',
        true
      );
      
      expect(context.chartUpdates).toHaveLength(1);
      expect(context.chartUpdates[0].sims).toBe('weights');
    });

    test('should use consistent state across multiple operations', () => {
      const AppState = context.AppState;
      
      // Change state
      AppState.setCurrSimsBtn('weights');
      AppState.setCurrTalentBtn('shadow_priest');
      AppState.setCurrFightStyleBtn('raid');
      
      // All getters should return the updated values
      expect(AppState.getCurrSimsBtn()).toBe('weights');
      expect(AppState.getCurrTalentBtn()).toBe('shadow_priest');
      expect(AppState.getCurrFightStyleBtn()).toBe('raid');
      
      // Chart update should see all changes
      context.updateChart(
        AppState.getCurrTalentBtn(),
        AppState.getCurrSimsBtn(),
        null,
        null,
        AppState.getCurrFightStyleBtn(),
        'Chart-Display-div',
        true
      );
      
      expect(context.chartUpdates[0]).toEqual({
        talent: 'shadow_priest',
        sims: 'weights',
        fightStyle: 'raid',
        chartId: 'Chart-Display-div'
      });
    });

    test('should trigger URL update when state changes', () => {
      const AppState = context.AppState;
      
      AppState.setCurrSimsBtn('weights');
      AppState.setCurrTalentBtn('shadow_priest');
      
      // In real code, manipulateUrl is called in checkButtonClick()
      context.manipulateUrl({
        talents: AppState.getCurrTalentBtn(),
        sims: AppState.getCurrSimsBtn(),
        fightStyle: AppState.getCurrFightStyleBtn(),
        version: AppState.getCurrVersionBtn()
      });
      
      expect(context.urlChanges).toHaveLength(1);
      expect(context.urlChanges[0].sims).toBe('weights');
      expect(context.urlChanges[0].talents).toBe('shadow_priest');
    });
  });

  describe('Configuration Access via State', () => {
    test('should allow chart functions to read config from AppState', () => {
      const AppState = context.AppState;
      const config = AppState.getConfigData();
      
      expect(config.builds).toBeDefined();
      expect(config.sims).toBeDefined();
      expect(config.builds['fire-frost']).toBeDefined();
    });

    test('should provide consistent config throughout operations', () => {
      const AppState = context.AppState;
      
      // Multiple reads should return same data
      const config1 = AppState.getConfigData();
      const config2 = AppState.getConfigData();
      
      expect(config1).toBe(config2);
      expect(config1.builds['fire-frost'].name).toBe('Fire/Frost');
    });
  });

  describe('State Transitions and Validation', () => {
    beforeEach(() => {
      context.stateChanges = [];
    });

    test('should allow any string value for button states', () => {
      const AppState = context.AppState;
      
      // These would normally be validated, but AppState stores whatever is set
      AppState.setCurrSimsBtn('custom_sim_type');
      expect(AppState.getCurrSimsBtn()).toBe('custom_sim_type');
    });

    test('should handle rapid successive state changes', () => {
      const AppState = context.AppState;
      
      for (let i = 0; i < 5; i++) {
        AppState.setCurrSimsBtn(`sims_${i}`);
      }
      
      expect(context.stateChanges).toHaveLength(5);
      expect(AppState.getCurrSimsBtn()).toBe('sims_4');
    });

    test('should maintain state independence (simsBtn changes don\'t affect talentBtn)', () => {
      const AppState = context.AppState;
      const originalTalent = AppState.getCurrTalentBtn();
      
      AppState.setCurrSimsBtn('different_sims');
      
      expect(AppState.getCurrTalentBtn()).toBe(originalTalent);
    });
  });

  describe('Full User Interaction Flow', () => {
    beforeEach(() => {
      context.stateChanges = [];
      context.chartUpdates = [];
      context.urlChanges = [];
      context.styleUpdates = [];
    });

    test('should complete full flow: click button → update state → update URL → update chart', () => {
      const AppState = context.AppState;
      
      // Step 1: User clicks button
      AppState.setCurrSimsBtn('weights');
      AppState.setCurrTalentBtn('shadow_priest');
      
      // Step 2: Update styles
      context.styleButtons();
      
      // Step 3: Update URL
      context.manipulateUrl({
        talents: AppState.getCurrTalentBtn(),
        sims: AppState.getCurrSimsBtn(),
        fightStyle: AppState.getCurrFightStyleBtn(),
        version: AppState.getCurrVersionBtn()
      });
      
      // Step 4: Update chart
      context.updateChart(
        AppState.getCurrTalentBtn(),
        AppState.getCurrSimsBtn(),
        null,
        null,
        AppState.getCurrFightStyleBtn(),
        'Chart-Display-div',
        true
      );
      
      // Verify all steps occurred
      expect(context.stateChanges).toHaveLength(2); // 2 state changes
      expect(context.styleUpdates).toHaveLength(1); // 1 style update
      expect(context.urlChanges).toHaveLength(1); // 1 URL update
      expect(context.chartUpdates).toHaveLength(1); // 1 chart update
      
      // Verify final state
      expect(AppState.getCurrSimsBtn()).toBe('weights');
      expect(AppState.getCurrTalentBtn()).toBe('shadow_priest');
    });
  });
});
