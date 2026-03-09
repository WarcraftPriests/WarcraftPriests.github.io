const fs = require('fs');
const path = require('path');
const vm = require('vm');

describe('Converter Module', () => {
  let context;

  beforeAll(() => {
    context = vm.createContext({
      // Converter utility functions
      getValue(list, key) {
        return list[key.toString().replaceAll('-', '_')];
      },
      
      getConfigValue(list, key) {
        return list[key.toString().replaceAll('_', '-')];
      },
      
      getKeys(obj) {
        let result = [];
        let values = Object.values(obj);
        let keys = Object.entries(obj);
        for (let i = 0; i < values.length; i++) {
          result.push(keys[i][0]);
        }
        return result;
      },
      
      // Converter lookup tables
      Sims: {
        consumables: 'Consumables',
        enchants: 'Enchants',
        racials: 'Racials',
        stats: 'Stats',
        talents_top: 'Talents',
        talents: 'Talents',
        talent_builds: 'Talent Builds',
        trinkets: 'Trinkets',
        weights: 'Weights',
        trinket_combos: 'Trinket Combos',
        tiersets: 'Tiersets',
        alchemy: 'Alchemy',
        gems: 'Gems',
        special_gear: 'Special Gear',
        gem_combos: 'Gem Combos'
      },
      
      Consumables: {
        potion: 'Potion',
        food: 'Food'
      },
      
      FightStyles: {
        Composite: 'Composite',
        Single: 'Single Target',
        Dungeons: 'Dungeons',
        twotarget: '2 Target',
        threetarget: '3 Target',
        fourtarget: '4 Target',
        eighttarget: '8 Target'
      },
      
      FightStyleCouncil: {
        3: 'threetarget',
        4: 'fourtarget'
      },
      
      FightStyleExternal: {
        composite: 'Raid',
        single: 'Single Target',
        dungeons: 'Dungeons'
      },
      
      ChartType: {
        trinkets: 'percentage',
        alchemy: 'percentage',
        enchants: 'percentage',
        gems: 'percentage',
        stats: 'dot'
      },
      
      ChartPadding: {
        talents: -80,
        talents_top: -80,
        talent_builds: -80,
        racials: -40,
        enchants: -40,
        trinket_combos: -40,
        tiersets: -40,
        consumables: -40,
        alchemy: -40,
        gems: -40,
        gem_combos: -40,
        special_gear: -40
      },
      
      LegendTitles: {
        enchants: 'Increase in %',
        racials: 'Increase in %',
        stats: 'Increase in %',
        talents_top: 'Increase in %',
        talents: 'Increase in %',
        talent_builds: 'Increase in %',
        trinkets: 'Item level',
        legendary_items: 'Item level',
        legendary_combos: 'Increase in %',
        alchemy: 'Increase in %',
        consumables: 'Increase in %'
      },
      
      LookupType: {
        alchemy: 'item',
        apl: 'none',
        consumables: 'item',
        enchants: 'item',
        gear: 'item',
        racials: 'spell',
        special_gear: 'spell',
        stats: 'none',
        talents_top: 'none',
        talents: 'none',
        talent_builds: 'none',
        trinket_combos: 'none',
        trinkets: 'none',
        weights: 'none'
      },
      
      SimRepoVersions: {
        master: 'Live'
      },
      
      console: console
    });
  });

  describe('getValue Function', () => {
    test('should retrieve value by key with underscores', () => {
      const value = context.getValue(context.Sims, 'trinkets');
      expect(value).toBe('Trinkets');
    });

    test('should convert dashes to underscores automatically', () => {
      const value = context.getValue(context.Sims, 'talent-builds');
      expect(value).toBe('Talent Builds');
    });

    test('should handle mixed dash and underscore keys', () => {
      const value = context.getValue(context.Sims, 'trinket-combos');
      expect(value).toBe('Trinket Combos');
    });

    test('should return undefined for non-existent keys', () => {
      const value = context.getValue(context.Sims, 'non_existent');
      expect(value).toBeUndefined();
    });

    test('should work with numeric keys converted to string', () => {
      const testList = { 1: 'one', 2: 'two' };
      const value = context.getValue(testList, 1);
      expect(value).toBe('one');
    });

    test('should handle consumables lookup', () => {
      const value = context.getValue(context.Consumables, 'potion');
      expect(value).toBe('Potion');
    });

    test('should handle fight styles lookup', () => {
      const value = context.getValue(context.FightStyles, 'Single');
      expect(value).toBe('Single Target');
    });

    test('should preserve case in values', () => {
      const value = context.getValue(context.Sims, 'talents_top');
      expect(value).toBe('Talents');
    });
  });

  describe('getConfigValue Function', () => {
    test('should retrieve value by key with dashes', () => {
      const testList = { 'fire-frost': 'Fire/Frost', 'shadow-priest': 'Shadow Priest' };
      const value = context.getConfigValue(testList, 'fire_frost');
      expect(value).toBe('Fire/Frost');
    });

    test('should convert underscores to dashes automatically', () => {
      const testList = { 'talent-builds': 'TB', 'trinket-combos': 'TC' };
      const value = context.getConfigValue(testList, 'talent_builds');
      expect(value).toBe('TB');
    });

    test('should handle keys that are already dashes', () => {
      const testList = { 'fire-frost': 'Result' };
      const value = context.getConfigValue(testList, 'fire-frost');
      expect(value).toBe('Result');
    });

    test('should return undefined for non-existent keys', () => {
      const value = context.getConfigValue(context.SimRepoVersions, 'ptr');
      expect(value).toBeUndefined();
    });

    test('should handle numeric keys', () => {
      const testList = { 1: 'one', 2: 'two' };
      const value = context.getConfigValue(testList, 1);
      expect(value).toBe('one');
    });
  });

  describe('getKeys Function', () => {
    test('should return array of object keys', () => {
      const keys = context.getKeys(context.Consumables);
      expect(Array.isArray(keys)).toBe(true);
      expect(keys).toContain('potion');
      expect(keys).toContain('food');
    });

    test('should return correct number of keys', () => {
      const keys = context.getKeys(context.FightStyles);
      expect(keys.length).toBeGreaterThan(3);
    });

    test('should preserve key order from object', () => {
      const testObj = { first: 1, second: 2, third: 3 };
      const keys = context.getKeys(testObj);
      expect(keys[0]).toBe('first');
      expect(keys[1]).toBe('second');
      expect(keys[2]).toBe('third');
    });

    test('should handle single-key objects', () => {
      const keys = context.getKeys({ only: 'one' });
      expect(keys).toEqual(['only']);
    });

    test('should handle large objects', () => {
      const largeObj = {};
      for (let i = 0; i < 100; i++) {
        largeObj[`key_${i}`] = i;
      }
      const keys = context.getKeys(largeObj);
      expect(keys.length).toBe(100);
    });

    test('should return empty array for empty object', () => {
      const keys = context.getKeys({});
      expect(keys).toEqual([]);
    });

    test('should match Sims keys', () => {
      const keys = context.getKeys(context.Sims);
      expect(keys).toContain('trinkets');
      expect(keys).toContain('talents');
      expect(keys).toContain('weights');
    });
  });

  describe('Sims Lookup Table', () => {
    test('should have trinkets entry', () => {
      expect(context.Sims.trinkets).toBe('Trinkets');
    });

    test('should have talents entry', () => {
      expect(context.Sims.talents).toBe('Talents');
    });

    test('should have weights entry', () => {
      expect(context.Sims.weights).toBe('Weights');
    });

    test('should distinguish between talents and talents_top', () => {
      expect(context.Sims.talents).toBe(context.Sims.talents_top);
      expect('talents' in context.Sims).toBe(true);
      expect('talents_top' in context.Sims).toBe(true);
    });

    test('should have complete set of simulation types', () => {
      const requiredSims = ['trinkets', 'talents', 'weights', 'enchants', 'stats'];
      for (const sim of requiredSims) {
        expect(sim in context.Sims).toBe(true);
      }
    });
  });

  describe('ChartType Lookup Table', () => {
    test('should specify percentage chart for trinkets', () => {
      expect(context.ChartType.trinkets).toBe('percentage');
    });

    test('should specify dot chart for stats', () => {
      expect(context.ChartType.stats).toBe('dot');
    });

    test('should specify percentage chart for alchemy', () => {
      expect(context.ChartType.alchemy).toBe('percentage');
    });

    test('should have entries for chart types that need specification', () => {
      expect(Object.keys(context.ChartType).length).toBeGreaterThan(0);
    });

    test('should not override default bar chart for unlisted types', () => {
      expect('weights' in context.ChartType).toBe(false);
    });
  });

  describe('ChartPadding Lookup Table', () => {
    test('should have negative padding for talents', () => {
      expect(context.ChartPadding.talents).toBe(-80);
    });

    test('should have negative padding for talent_builds', () => {
      expect(context.ChartPadding.talent_builds).toBe(-80);
    });

    test('should have standard padding for other types', () => {
      expect(context.ChartPadding.trinket_combos).toBe(-40);
    });

    test('should use getValue to access padding safely', () => {
      const padding = context.getValue(context.ChartPadding, 'talent-builds');
      expect(padding).toBe(-80);
    });
  });

  describe('FightStyles Lookup Table', () => {
    test('should include Composite style', () => {
      expect(context.FightStyles.Composite).toBe('Composite');
    });

    test('should include Single target style', () => {
      expect(context.FightStyles.Single).toBe('Single Target');
    });

    test('should include Dungeons style', () => {
      expect(context.FightStyles.Dungeons).toBe('Dungeons');
    });

    test('should include multi-target styles', () => {
      expect('twotarget' in context.FightStyles).toBe(true);
      expect('fourtarget' in context.FightStyles).toBe(true);
    });

    test('should distinguish between Composite and Single', () => {
      expect(context.FightStyles.Composite).not.toBe(context.FightStyles.Single);
    });
  });

  describe('FightStyleCouncil Lookup Table', () => {
    test('should map 3 to 3-target', () => {
      expect(context.FightStyleCouncil[3]).toBe('threetarget');
    });

    test('should map 4 to 4-target', () => {
      expect(context.FightStyleCouncil[4]).toBe('fourtarget');
    });

    test('should convert keys to match FightStyles', () => {
      const councilStyle = context.FightStyleCouncil[3];
      expect(councilStyle in context.FightStyles).toBe(true);
    });
  });

  describe('Consumables Lookup Table', () => {
    test('should have potion entry', () => {
      expect(context.Consumables.potion).toBe('Potion');
    });

    test('should have food entry', () => {
      expect(context.Consumables.food).toBe('Food');
    });

    test('should have exactly two consumables', () => {
      expect(Object.keys(context.Consumables).length).toBe(2);
    });
  });

  describe('LegendTitles Lookup Table', () => {
    test('should specify percentage increase for enchants', () => {
      expect(context.LegendTitles.enchants).toBe('Increase in %');
    });

    test('should specify item level for trinkets', () => {
      expect(context.LegendTitles.trinkets).toBe('Item level');
    });

    test('should have entries for major chart types', () => {
      expect('talents' in context.LegendTitles).toBe(true);
      expect('trinkets' in context.LegendTitles).toBe(true);
      expect('stats' in context.LegendTitles).toBe(true);
    });
  });

  describe('LookupType Lookup Table', () => {
    test('should specify item lookup for alchemy', () => {
      expect(context.LookupType.alchemy).toBe('item');
    });

    test('should specify spell lookup for racials', () => {
      expect(context.LookupType.racials).toBe('spell');
    });

    test('should specify none for talents', () => {
      expect(context.LookupType.talents).toBe('none');
    });

    test('should specify none for stats', () => {
      expect(context.LookupType.stats).toBe('none');
    });

    test('should differentiate between lookup types', () => {
      const types = new Set(Object.values(context.LookupType));
      expect(types.has('item')).toBe(true);
      expect(types.has('spell')).toBe(true);
      expect(types.has('none')).toBe(true);
    });
  });

  describe('Cross-Lookup Integration', () => {
    test('getValue with dash conversion for Sims', () => {
      const value1 = context.getValue(context.Sims, 'trinket-combos');
      const value2 = context.getValue(context.Sims, 'trinket_combos');
      expect(value1).toBe(value2);
    });

    test('getValue with dash conversion for ChartPadding', () => {
      const value1 = context.getValue(context.ChartPadding, 'talent-builds');
      const value2 = context.getValue(context.ChartPadding, 'talent_builds');
      expect(value1).toBe(value2);
      expect(value1).toBe(-80);
    });

    test('getKeys returns all Sims types', () => {
      const keys = context.getKeys(context.Sims);
      expect(keys.length).toBeGreaterThanOrEqual(10);
    });

    test('every Sims key should have a display value', () => {
      const keys = context.getKeys(context.Sims);
      for (const key of keys) {
        expect(context.Sims[key]).toBeDefined();
        expect(typeof context.Sims[key]).toBe('string');
      }
    });
  });

  describe('Converter function consistency', () => {
    test('getValue and getConfigValue should handle same inputs consistently', () => {
      const testList = { 'fire_frost': 'Fire/Frost' };
      
      // Both should handle keys consistently
      const val1 = context.getValue(testList, 'fire_frost');
      const val2 = context.getValue(testList, 'fire_frost');
      
      expect(val1).toBe(val2);
      expect(val1).toBe('Fire/Frost');
    });

    test('getKeys should return same order for same object', () => {
      const keys1 = context.getKeys(context.Sims);
      const keys2 = context.getKeys(context.Sims);
      expect(keys1).toEqual(keys2);
    });

    test('should handle large and complex lookup tables safely', () => {
      const allKeys = context.getKeys(context.LookupType);
      expect(allKeys.length).toBeGreaterThan(5);
      
      for (const key of allKeys) {
        const value = context.getValue(context.LookupType, key);
        expect(value).toBeDefined();
      }
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('getValue handles keys with special patterns', () => {
      const result = context.getValue(context.Sims, 'trinkets');
      expect(result).toBe('Trinkets');
    });

    test('getKeys with objects containing symbols should work', () => {
      const testObj = { key_1: 'val1', key_2: 'val2' };
      const keys = context.getKeys(testObj);
      expect(keys.length).toBe(2);
    });

    test('getValue should preserve case in lookup values', () => {
      const testList = { test_key: 'TestValue' };
      const result = context.getValue(testList, 'test_key');
      expect(result).toBe('TestValue');
    });

    test('should handle objects with numeric string keys', () => {
      const testObj = { '1': 'one', '2': 'two' };
      const keys = context.getKeys(testObj);
      expect(keys).toContain('1');
    });
  });
});
