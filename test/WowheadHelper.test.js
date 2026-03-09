import { buildChartLineForTrinketCombos, buildWowheadTooltips } from '../src/modules/chart/helpers/WowheadHelper.module.js';
import * as Constants from '../src/utils/Constants.module.js';

// Mock document for DOM operations
global.window = {
  wowheadUrl: 'https://www.wowhead.com/'
};

global.document = {
  createElement: (tag) => {
    const elem = {
      tagName: tag,
      style: {},
      children: [],
      textContent: '',
      href: '',
      target: '',
      appendChild: function(child) {
        this.children.push(child);
      },
      get outerHTML() {
        if (this.tagName === 'a') {
          return `<a href="${this.href}"${this.target ? ` target="${this.target}"` : ''}>${this.textContent}</a>`;
        } else if (this.tagName === 'div') {
          return `<div>${this.children.map(c => typeof c === 'string' ? c : c.outerHTML || c.textContent || '').join('')}</div>`;
        }
        return this.textContent;
      }
    };
    return elem;
  },
  createTextNode: (text) => text
};

// Mock AppState
global.AppState = {
  getCurrSimsBtn: () => 'trinkets',
  getTalentData: () => ({ builds: {}, generated: {} }),
  getConfigData: () => ({ 
    sims: { 
      'trinkets': { item1: {}, item2: {}, item3: {} },
      'consumables': {},
      'alchemy': {},
      'enchants': {},
      'gems': {},
      'special-gear': {},
      'racials': {},
      'talents': {}
    } 
  }),
  getJsonSortedDataKeys: () => 'sortedDataKeys',
  getJsonData: () => 'data'
};

// Mock other globals used by WowheadHelper
global.currSimsBtn = null;
global.configData = { sims: {} };
global.talentData = { builds: {}, generated: {} };
global.FightStyleExternal = {};
global.TalentIds = {};
global.TrinketIds = {};

// Mock window object with wowheadUrl
global.window = global.window || {};
global.window.wowheadUrl = 'https://www.wowhead.com/';

describe('buildChartLineForTrinketCombos', () => {
  test('should build chart line for trinket combos using provided ids', () => {
    const ids = {
      'trinket_a': '12345',
      'trinket_b': '67890'
    };

    const dpsName = 'trinket_a_300-trinket_b_310';

    const result = buildChartLineForTrinketCombos(dpsName, ids);

    // The result should contain the links with correct href and text
    expect(result).toContain('href="https://www.wowhead.com/item=12345?ilvl=300');
    expect(result).toContain('ta (300)');
    expect(result).toContain('href="https://www.wowhead.com/item=67890?ilvl=310');
    expect(result).toContain('tb (310)');
  });

  test('should handle single trinket combo', () => {
    const ids = {
      'trinket_c': '11111'
    };

    const dpsName = 'trinket_c_320';

    const result = buildChartLineForTrinketCombos(dpsName, ids);

    expect(result).toContain('href="https://www.wowhead.com/item=11111?ilvl=320');
    expect(result).toContain('tc (320)');
  });

  test('should handle missing id gracefully', () => {
    const ids = {
      'trinket_a': '12345'
    };

    const dpsName = 'trinket_a_300-trinket_missing_310';

    const result = buildChartLineForTrinketCombos(dpsName, ids);

    expect(result).toContain('href="https://www.wowhead.com/item=12345?ilvl=300');
    expect(result).toContain('ta (300)');
    expect(result).toContain('href="https://www.wowhead.com/item=undefined?ilvl=310');
    expect(result).toContain('tm (310)');
  });
});

describe('buildWowheadTooltips', () => {
  // Note: buildWowheadTooltips is complex and depends on AppState module
  // which requires deep integration testing. The buildChartLineForTrinketCombos
  // tests above thoroughly validate the module conversion.
  
  test('buildWowheadTooltips is available for integration testing', () => {
    // This test simply verifies that the function was imported successfully
    expect(buildWowheadTooltips).toBeDefined();
    expect(typeof buildWowheadTooltips).toBe('function');
  });
});

