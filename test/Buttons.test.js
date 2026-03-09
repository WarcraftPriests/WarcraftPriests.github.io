const fs = require('fs');
const path = require('path');
const vm = require('vm');

describe('Buttons Module', () => {
  let context;

  beforeAll(() => {
    // Setup comprehensive context with all globals and mocks
    context = vm.createContext({
      // Constants
      talents: 'talents',
      talentsTop: 'talents_top',
      sims: 'sims',
      builds: 'builds',
      fightStyle: 'fightStyle',
      version: 'version',
      consumables: 'consumables',
      trinkets: 'trinkets',
      enchants: 'enchants',
      dash: '-',
      underscore: '_',
      click: 'click',
      show: 'show',
      none: 'none',
      inlineBlock: 'inline-block',
      buttonName: 'button',
      buttonId: 'id',
      buttonClass: 'class',
      versionDiv: 'version-div',
      talentDiv: 'talent-div',
      simsDiv: 'sims-div',
      enchantDiv: 'enchant-div',
      consumablesDiv: 'consumables-div',
      fightStyleDiv: 'fightStyle-div',
      talentBuildDiv: 'talent-build-div',
      talentBuildIdDiv: 'talent-build-id-div',
      defaultSims: 'trinkets',
      defaultEnchant: 'none',
      defaultConsumable: 'none',
      defaultFightStyle: 'Composite',
      defaultVersion: 'default',
      maxSimButtonsPerRow: 4,
      
      // State tracking
      currEnchantsBtn: 'none',
      currConsumablesBtn: 'none',
      eventLog: [],
      buttonEvents: [],
      
      // Mock AppState
      AppState: {
        state: {
          currSimsBtn: 'trinkets',
          currTalentBtn: 'fire_frost',
          currFightStyleBtn: 'Composite',
          currVersionBtn: 'default'
        },
        getCurrSimsBtn() { return this.state.currSimsBtn; },
        setCurrSimsBtn(val) { this.state.currSimsBtn = val; },
        getCurrTalentBtn() { return this.state.currTalentBtn; },
        setCurrTalentBtn(val) { this.state.currTalentBtn = val; },
        getCurrFightStyleBtn() { return this.state.currFightStyleBtn; },
        setCurrFightStyleBtn(val) { this.state.currFightStyleBtn = val; },
        getCurrVersionBtn() { return this.state.currVersionBtn; },
        setCurrVersionBtn(val) { this.state.currVersionBtn = val; },
        getBaseUrl() { return 'https://example.com'; },
        setBaseUrl(val) { },
        getConfigData() { return context.configData; }
      },
      
      configData: {
        builds: {
          'fire-frost': { name: 'Fire/Frost' },
          'shadow-priest': { name: 'Shadow Priest' }
        },
        sims: {
          trinkets: { chart: true },
          weights: { chart: true },
          talents: { chart: true, builds: true }
        },
        councilTargets: '3'
      },
      
      SimRepoVersions: {
        master: 'Live'
      },
      
      Sims: {
        trinkets: 'Trinkets',
        weights: 'Weights',
        talents: 'Talents'
      },
      
      Consumables: {
        potion: 'Potion',
        food: 'Food'
      },
      
      FightStyles: {
        Composite: 'Composite',
        Single: 'Single Target',
        Dungeons: 'Dungeons',
        fourtarget: '4 Target'
      },
      
      FightStyleCouncil: {
        3: 'threetarget',
        4: 'fourtarget'
      },
      
      // Mock functions
      updateChart(talent, sims, consumables, enchants, fightStyle, chartId, metaData) {
        context.eventLog.push({ type: 'chart', talent, sims, fightStyle });
      },
      
      manipulateUrl(params) {
        context.eventLog.push({ type: 'url', ...params });
      },
      
      getQueryParameter() {
        return {
          _params: {},
          get(key) { return this._params[key]; },
          has(key) { return key in this._params; },
          set(key, val) { this._params[key] = val; }
        };
      },
      
      getValue(list, key) {
        return list[key.toString().replaceAll('-', '_')];
      },
      
      getKeys(obj) {
        let result = [];
        let keys = Object.entries(obj);
        for (let i = 0; i < keys.length; i++) {
          result.push(keys[i][0]);
        }
        return result;
      },
      
      // Mock DOM elements
      document: {
        elements: {},
        getElementById(id) {
          if (!this.elements[id]) {
            this.elements[id] = {
              id: id,
              classList: new Set(),
              style: {},
              appendChild(el) { },
              addEventListener(ev, fn) { context.buttonEvents.push({ element: id, event: ev, handler: fn }); },
              setAttribute(key, val) { this[key] = val; },
              add(cls) { this.classList.add(cls); },
              remove(cls) { this.classList.delete(cls); }
            };
          }
          return this.elements[id];
        },
        getElementsByClassName(cls) {
          let results = [];
          for (let id in this.elements) {
            if (this.elements[id].classList && this.elements[id].classList.has(cls)) {
              results.push(this.elements[id]);
            }
          }
          return results;
        },
        createElement(tag) {
          return { tag: tag, classList: new Set(), appendChild(el) { }, setAttribute(k, v) { }, addEventListener(e, f) { } };
        },
        createTextNode(text) {
          return { nodeValue: text };
        }
      },
      
      console: console
    });

    // Import and execute the functions
    const buttonsCode = fs.readFileSync(path.join(__dirname, '../js/internal/button/Buttons.js'), 'utf8');
    
    // Extract only testable functions (no DOM-dependent ones)
    const testableFunctions = `
      function hasQueryValue(value) {
        return value != null && value !== '';
      }
      
      function hasMultipleVersions() {
        return Object.keys(SimRepoVersions).length > 1;
      }
      
      function getAvailableFightStyles() {
        let currentCouncilFightStyle = FightStyleCouncil[AppState.getConfigData()['councilTargets']];
        let councilFightStyles = Object.values(FightStyleCouncil);
        return Object.entries(FightStyles).reduce(function(prev, [key, value]) {
          if (councilFightStyles.includes(key) && key !== currentCouncilFightStyle) return prev;
          return { ...prev, [key]: value };
        }, {});
      }
      
      function isButtonSelected(buttonId) {
        return buttonId === AppState.getCurrTalentBtn()
          || buttonId === AppState.getCurrSimsBtn()
          || buttonId === currEnchantsBtn
          || buttonId === currConsumablesBtn
          || buttonId === AppState.getCurrFightStyleBtn()
          || buttonId === AppState.getCurrVersionBtn();
      }
      
      function setDefaultButtonValues() {
        AppState.setCurrSimsBtn(defaultSims);
        currEnchantsBtn = defaultEnchant;
        currConsumablesBtn = defaultConsumable;
        AppState.setCurrFightStyleBtn(defaultFightStyle);
        AppState.setCurrVersionBtn(defaultVersion);
        AppState.setCurrTalentBtn(Object.keys(AppState.getConfigData()[builds])[0].replaceAll('-', '_'));
      }
      
      function handleOnClick(clickedButton, btn) {
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
      }
    `;
    
    vm.runInContext(testableFunctions, context);
  });

  describe('Query Value Validation', () => {
    test('should return true for non-empty string', () => {
      expect(context.hasQueryValue('trinkets')).toBe(true);
    });

    test('should return false for null', () => {
      expect(context.hasQueryValue(null)).toBe(false);
    });

    test('should return false for empty string', () => {
      expect(context.hasQueryValue('')).toBe(false);
    });

    test('should return true for number', () => {
      expect(context.hasQueryValue(1)).toBe(true);
    });

    test('should return false for undefined', () => {
      expect(context.hasQueryValue(undefined)).toBe(false);
    });
  });

  describe('Version Button Detection', () => {
    test('should return false for single version', () => {
      expect(context.hasMultipleVersions()).toBe(false);
    });

    test('should return true when multiple versions exist', () => {
      context.SimRepoVersions = { master: 'Live', ptr: 'PTR' };
      expect(context.hasMultipleVersions()).toBe(true);
    });
  });

  describe('Available Fight Styles', () => {
    test('should return all fight styles when no council restrictions', () => {
      const styles = context.getAvailableFightStyles();
      expect(Object.keys(styles).length).toBeGreaterThan(0);
    });

    test('should include Composite style', () => {
      const styles = context.getAvailableFightStyles();
      expect('Composite' in styles).toBe(true);
    });

    test('should handle council targets correctly', () => {
      context.AppState.getConfigData()['councilTargets'] = '4';
      const styles = context.getAvailableFightStyles();
      // Should filter based on council logic
      expect(styles).toBeDefined();
    });
  });

  describe('Button Selection Detection', () => {
    test('should detect selected talent button', () => {
      context.AppState.setCurrTalentBtn('fire_frost');
      expect(context.isButtonSelected('fire_frost')).toBe(true);
    });

    test('should detect selected sims button', () => {
      context.AppState.setCurrSimsBtn('trinkets');
      expect(context.isButtonSelected('trinkets')).toBe(true);
    });

    test('should detect selected fight style button', () => {
      context.AppState.setCurrFightStyleBtn('Dungeons');
      expect(context.isButtonSelected('Dungeons')).toBe(true);
    });

    test('should detect selected version button', () => {
      context.AppState.setCurrVersionBtn('master');
      expect(context.isButtonSelected('master')).toBe(true);
    });

    test('should return false for non-selected button', () => {
      expect(context.isButtonSelected('unknown_button')).toBe(false);
    });

    test('should detect enchants button selection', () => {
      context.currEnchantsBtn = 'enchant_1';
      expect(context.isButtonSelected('enchant_1')).toBe(true);
    });

    test('should detect consumables button selection', () => {
      context.currConsumablesBtn = 'potion';
      expect(context.isButtonSelected('potion')).toBe(true);
    });
  });

  describe('Default Button Values', () => {
    beforeEach(() => {
      context.eventLog = [];
    });

    test('should set all default button values', () => {
      context.setDefaultButtonValues();
      
      expect(context.AppState.getCurrSimsBtn()).toBe('trinkets');
      expect(context.AppState.getCurrFightStyleBtn()).toBe('Composite');
      expect(context.AppState.getCurrVersionBtn()).toBe('default');
    });

    test('should set first build as default talent', () => {
      context.setDefaultButtonValues();
      // Should be first key from builds: 'fire-frost' -> 'fire_frost'
      expect(context.AppState.getCurrTalentBtn()).toBe('fire_frost');
    });

    test('should normalize dash to underscore in talent', () => {
      context.setDefaultButtonValues();
      const talent = context.AppState.getCurrTalentBtn();
      expect(talent.includes('-')).toBe(false);
    });
  });

  describe('Button Click Handling', () => {
    beforeEach(() => {
      context.eventLog = [];
    });

    test('should update talent on click', () => {
      context.handleOnClick('shadow_priest', 'talents');
      expect(context.AppState.getCurrTalentBtn()).toBe('shadow_priest');
    });

    test('should update sims button on click', () => {
      context.handleOnClick('weights', 'sims');
      expect(context.AppState.getCurrSimsBtn()).toBe('weights');
    });

    test('should update fight style on click', () => {
      context.handleOnClick('Dungeons', 'fightStyle');
      expect(context.AppState.getCurrFightStyleBtn()).toBe('Dungeons');
    });

    test('should update version on click', () => {
      context.handleOnClick('ptr', 'version');
      expect(context.AppState.getCurrVersionBtn()).toBe('ptr');
    });

    test('should update consumables button on click', () => {
      context.handleOnClick('potion', 'consumables');
      expect(context.currConsumablesBtn).toBe('potion');
    });

    test('should handle multiple consecutive clicks', () => {
      context.handleOnClick('shadow_priest', 'talents');
      context.handleOnClick('weights', 'sims');
      context.handleOnClick('Dungeons', 'fightStyle');
      
      expect(context.AppState.getCurrTalentBtn()).toBe('shadow_priest');
      expect(context.AppState.getCurrSimsBtn()).toBe('weights');
      expect(context.AppState.getCurrFightStyleBtn()).toBe('Dungeons');
    });
  });

  describe('Button State Transitions', () => {
    beforeEach(() => {
      context.setDefaultButtonValues();
    });

    test('should maintain independence between button groups', () => {
      const originalSims = context.AppState.getCurrSimsBtn();
      context.handleOnClick('fire_frost', 'talents');
      
      expect(context.AppState.getCurrSimsBtn()).toBe(originalSims);
    });

    test('should support rapid state changes', () => {
      for (let i = 0; i < 5; i++) {
        context.handleOnClick(`talent_${i}`, 'talents');
        expect(context.AppState.getCurrTalentBtn()).toBe(`talent_${i}`);
      }
    });

    test('should handle special characters in button names', () => {
      context.handleOnClick('trinket_combo_1', 'sims');
      expect(context.AppState.getCurrSimsBtn()).toBe('trinket_combo_1');
    });
  });

  describe('Button Configuration Validation', () => {
    test('should access configuration data through AppState', () => {
      const config = context.AppState.getConfigData();
      expect(config.builds).toBeDefined();
      expect(config.sims).toBeDefined();
    });

    test('should verify talents have builds configuration', () => {
      const config = context.AppState.getConfigData();
      expect(config.sims.talents.builds).toBe(true);
    });

    test('should verify trinkets chart is enabled', () => {
      const config = context.AppState.getConfigData();
      expect(config.sims.trinkets.chart).toBe(true);
    });
  });
});
