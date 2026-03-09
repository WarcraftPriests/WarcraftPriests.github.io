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