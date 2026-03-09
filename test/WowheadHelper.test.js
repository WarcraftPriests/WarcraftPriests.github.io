const fs = require('fs');
const path = require('path');
const vm = require('vm');

describe('buildChartLineForTrinketCombos', () => {
  let context;
  let buildChartLineForTrinketCombos;

  beforeAll(() => {
    // Create a VM context with all necessary globals
    context = vm.createContext({
      // Define all globals used in the script
      wowheadUrl: 'https://www.wowhead.com/',
      wowheadItemPath: 'item=',
      wowheadSpellPath: 'spell=',
      jsonIds: 'ids',
      jsonSortedDataKeys: 'sortedDataKeys',
      jsonData: 'data',
      consumables: 'consumables',
      alchemy: 'alchemy',
      enchants: 'enchants',
      gems: 'gems',
      specialGear: 'specialGear',
      trinkets: 'trinkets',
      racials: 'racials',
      talents: 'talents',
      talentsTop: 'talents_top',
      trinketCombos: 'trinket_combos',
      currSimsBtn: null,
      configData: { sims: {} },
      getValue: (obj, key) => obj ? obj[key] : undefined,
      FightStyleExternal: {},
      TalentIds: {},
      talentData: { builds: {}, generated: {} },
      TrinketIds: {}, // Not used anymore, but defined for completeness
      // Mock AppState
      AppState: {
        getCurrSimsBtn: () => null,
        getTalentData: () => ({ builds: {}, generated: {} }),
        getConfigData: () => ({ sims: {} }),
        getJsonSortedDataKeys: () => 'sortedDataKeys',
        getJsonData: () => 'data'
      },
      // Mock buildChartLineWithWowheadLine to return a simple string for testing
      buildChartLineWithWowheadLine: (dpsName, itemId, url, currentResult) => {
        return currentResult + `<a href="${url}${itemId}">${dpsName}</a>`;
      },
      console: console // Allow console access
    });

    // Load and run the script in the context
    const scriptPath = path.join(__dirname, '..', 'js', 'internal', 'chart', 'helper', 'WowheadHelper.js');
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');
    const script = new vm.Script(scriptContent);
    script.runInContext(context);

    // Get the function from the context
    buildChartLineForTrinketCombos = context.buildChartLineForTrinketCombos;
  });

  test('should build chart line for trinket combos using provided ids', () => {
    const ids = {
      'trinket_a': '12345',
      'trinket_b': '67890'
    };

    const dpsName = 'trinket_a_300-trinket_b_310';
    const currentResult = '';

    const result = buildChartLineForTrinketCombos(dpsName, currentResult, ids);

    // The result should contain the links with correct href and text
    expect(result).toContain('href="https://www.wowhead.com/item=12345"');
    expect(result).toContain('ta (300)');
    expect(result).toContain('href="https://www.wowhead.com/item=67890"');
    expect(result).toContain('tb (310)');
    expect(result).toContain('  '); // The space added after first
  });

  test('should handle single trinket combo', () => {
    const ids = {
      'trinket_c': '11111'
    };

    const dpsName = 'trinket_c_320';
    const currentResult = '';

    const result = buildChartLineForTrinketCombos(dpsName, currentResult, ids);

    expect(result).toContain('href="https://www.wowhead.com/item=11111"');
    expect(result).toContain('tc (320)');
    expect(result).toContain('  '); // Space added even for single
  });

  test('should handle missing id gracefully', () => {
    const ids = {
      'trinket_a': '12345'
    };

    const dpsName = 'trinket_a_300-trinket_missing_310';
    const currentResult = '';

    const result = buildChartLineForTrinketCombos(dpsName, currentResult, ids);

    expect(result).toContain('href="https://www.wowhead.com/item=12345"');
    expect(result).toContain('ta (300)');
    expect(result).toContain('href="https://www.wowhead.com/item=undefined"');
    expect(result).toContain('tm (310)');
  });
});

describe('buildWowheadTooltips', () => {
  let context;
  let buildWowheadTooltips;

  beforeAll(() => {
    // Create a VM context with all necessary globals
    context = vm.createContext({
      // String constants used as property keys
      jsonSortedDataKeys: 'sortedDataKeys',
      jsonIds: 'ids',
      jsonData: 'data',
      wowheadUrl: 'https://www.wowhead.com/',
      wowheadItemPath: 'item=',
      wowheadSpellPath: 'spell=',
      consumables: 'consumables',
      alchemy: 'alchemy',
      enchants: 'enchants',
      gems: 'gems',
      specialGear: 'specialGear',
      trinkets: 'trinkets',
      racials: 'racials',
      talents: 'talents',
      talentsTop: 'talents_top',
      trinketCombos: 'trinket_combos',
      sims: 'sims',
      // Mock AppState
      AppState: {
        getCurrSimsBtn: () => 'trinkets',
        getTalentData: () => ({ builds: {}, generated: {} }),
        getConfigData: () => ({ sims: { trinkets: {} } })
      },
      // Mock buildChartLine to return simplified string
      buildChartLine: (dpsName, id, url, simsBtn) => {
        return `[${dpsName}:${id}]`;
      },
      console: console
    });

    // Load and run the script in the context
    const scriptPath = path.join(__dirname, '..', 'js', 'internal', 'chart', 'helper', 'WowheadHelper.js');
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');
    const script = new vm.Script(scriptContent);
    script.runInContext(context);

    // Get the function from the context
    buildWowheadTooltips = context.buildWowheadTooltips;
  });

  test('should iterate over data using jsonSortedDataKeys constant', () => {
    // Regression test for: data[AppState.getJsonSortedDataKeys()] is not iterable
    // The function should use jsonSortedDataKeys as a string constant, not call AppState getter
    const data = {
      sortedDataKeys: ['item1', 'item2', 'item3'],  // Array that matches the constant key
      ids: {
        'item1': '123',
        'item2': '456',
        'item3': '789'
      }
    };

    const result = buildWowheadTooltips(data, null, 'trinkets');

    // Should successfully iterate and return results for all items
    expect(result).toHaveLength(3);
    expect(result[0]).toContain('item1');
    expect(result[1]).toContain('item2');
    expect(result[2]).toContain('item3');
  });

  test('should handle empty sorted keys array', () => {
    const data = {
      sortedDataKeys: [],
      ids: {}
    };

    const result = buildWowheadTooltips(data, null, 'trinkets');

    expect(result).toHaveLength(0);
  });
});