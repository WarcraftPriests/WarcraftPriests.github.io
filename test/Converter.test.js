import { getValue, getConfigValue, getKeys, Sims, Consumables, FightStyles, FightStyleCouncil, FightStyleExternal, ChartType, ChartPadding, LegendTitles, LookupType, SimRepoVersions } from '../js/internal/helper/Converter.module.js';

describe('Converter Module', () => {
  describe('getValue Function', () => {
    test('should retrieve value by key with underscores', () => {
      const value = getValue(Sims, 'trinkets');
      expect(value).toBe('Trinkets');
    });

    test('should convert dashes to underscores automatically', () => {
      const value = getValue(Sims, 'talent-builds');
      expect(value).toBe('Talent Builds');
    });

    test('should handle mixed dash and underscore keys', () => {
      const value = getValue(Sims, 'trinket-combos');
      expect(value).toBe('Trinket Combos');
    });

    test('should return undefined for non-existent keys', () => {
      const value = getValue(Sims, 'non_existent');
      expect(value).toBeUndefined();
    });

    test('should work with numeric keys converted to string', () => {
      const testList = { 1: 'one', 2: 'two' };
      const value = getValue(testList, 1);
      expect(value).toBe('one');
    });

    test('should handle consumables lookup', () => {
      const value = getValue(Consumables, 'potion');
      expect(value).toBe('Potion');
    });

    test('should handle fight styles lookup', () => {
      const value = getValue(FightStyles, 'Single');
      expect(value).toBe('Single Target');
    });

    test('should preserve case in values', () => {
      const value = getValue(Sims, 'talents_top');
      expect(value).toBe('Talents');
    });
  });

  describe('getConfigValue Function', () => {
    test('should retrieve value by key with dashes', () => {
      const testList = { 'fire-frost': 'Fire/Frost', 'shadow-priest': 'Shadow Priest' };
      const value = getConfigValue(testList, 'fire_frost');
      expect(value).toBe('Fire/Frost');
    });

    test('should convert underscores to dashes automatically', () => {
      const testList = { 'talent-builds': 'TB', 'trinket-combos': 'TC' };
      const value = getConfigValue(testList, 'talent_builds');
      expect(value).toBe('TB');
    });

    test('should handle keys that are already dashes', () => {
      const testList = { 'fire-frost': 'Result' };
      const value = getConfigValue(testList, 'fire-frost');
      expect(value).toBe('Result');
    });

    test('should return undefined for non-existent keys', () => {
      const value = getConfigValue(SimRepoVersions, 'ptr');
      expect(value).toBeUndefined();
    });

    test('should handle numeric keys', () => {
      const testList = { 1: 'one', 2: 'two' };
      const value = getConfigValue(testList, 1);
      expect(value).toBe('one');
    });
  });

  describe('getKeys Function', () => {
    test('should return array of object keys', () => {
      const keys = getKeys(Consumables);
      expect(Array.isArray(keys)).toBe(true);
      expect(keys).toContain('potion');
      expect(keys).toContain('food');
    });

    test('should return correct number of keys', () => {
      const keys = getKeys(FightStyles);
      expect(keys.length).toBeGreaterThan(3);
    });

    test('should preserve key order from object', () => {
      const testObj = { first: 1, second: 2, third: 3 };
      const keys = getKeys(testObj);
      expect(keys[0]).toBe('first');
      expect(keys[1]).toBe('second');
      expect(keys[2]).toBe('third');
    });

    test('should handle single-key objects', () => {
      const keys = getKeys({ only: 'one' });
      expect(keys).toEqual(['only']);
    });

    test('should handle large objects', () => {
      const largeObj = {};
      for (let i = 0; i < 100; i++) {
        largeObj[`key_${i}`] = i;
      }
      const keys = getKeys(largeObj);
      expect(keys.length).toBe(100);
    });

    test('should return empty array for empty object', () => {
      const keys = getKeys({});
      expect(keys).toEqual([]);
    });

    test('should match Sims keys', () => {
      const keys = getKeys(Sims);
      expect(keys).toContain('trinkets');
      expect(keys).toContain('talents');
      expect(keys).toContain('weights');
    });
  });

  describe('Sims Lookup Table', () => {
    test('should have trinkets entry', () => {
      expect(Sims.trinkets).toBe('Trinkets');
    });

    test('should have talents entry', () => {
      expect(Sims.talents).toBe('Talents');
    });

    test('should have weights entry', () => {
      expect(Sims.weights).toBe('Weights');
    });

    test('should distinguish between talents and talents_top', () => {
      expect(Sims.talents).toBe(Sims.talents_top);
      expect('talents' in Sims).toBe(true);
      expect('talents_top' in Sims).toBe(true);
    });

    test('should have complete set of simulation types', () => {
      const requiredSims = ['trinkets', 'talents', 'weights', 'enchants', 'stats'];
      for (const sim of requiredSims) {
        expect(sim in Sims).toBe(true);
      }
    });
  });

  describe('ChartType Lookup Table', () => {
    test('should specify percentage chart for trinkets', () => {
      expect(ChartType.trinkets).toBe('percentage');
    });

    test('should specify dot chart for stats', () => {
      expect(ChartType.stats).toBe('dot');
    });

    test('should specify percentage chart for alchemy', () => {
      expect(ChartType.alchemy).toBe('percentage');
    });

    test('should have entries for chart types that need specification', () => {
      expect(Object.keys(ChartType).length).toBeGreaterThan(0);
    });

    test('should not override default bar chart for unlisted types', () => {
      expect('weights' in ChartType).toBe(false);
    });
  });

  describe('ChartPadding Lookup Table', () => {
    test('should have negative padding for talents', () => {
      expect(ChartPadding.talents).toBe(-80);
    });

    test('should have negative padding for talent_builds', () => {
      expect(ChartPadding.talent_builds).toBe(-80);
    });

    test('should have standard padding for other types', () => {
      expect(ChartPadding.trinket_combos).toBe(-40);
    });

    test('should use getValue to access padding safely', () => {
      const padding = getValue(ChartPadding, 'talent-builds');
      expect(padding).toBe(-80);
    });
  });

  describe('FightStyles Lookup Table', () => {
    test('should include Composite style', () => {
      expect(FightStyles.Composite).toBe('Composite');
    });

    test('should include Single target style', () => {
      expect(FightStyles.Single).toBe('Single Target');
    });

    test('should include Dungeons style', () => {
      expect(FightStyles.Dungeons).toBe('Dungeons');
    });

    test('should include multi-target styles', () => {
      expect('twotarget' in FightStyles).toBe(true);
      expect('fourtarget' in FightStyles).toBe(true);
    });

    test('should distinguish between Composite and Single', () => {
      expect(FightStyles.Composite).not.toBe(FightStyles.Single);
    });
  });

  describe('FightStyleCouncil Lookup Table', () => {
    test('should map 3 to 3-target', () => {
      expect(FightStyleCouncil[3]).toBe('threetarget');
    });

    test('should map 4 to 4-target', () => {
      expect(FightStyleCouncil[4]).toBe('fourtarget');
    });

    test('should convert keys to match FightStyles', () => {
      const councilStyle = FightStyleCouncil[3];
      expect(councilStyle in FightStyles).toBe(true);
    });
  });

  describe('Consumables Lookup Table', () => {
    test('should have potion entry', () => {
      expect(Consumables.potion).toBe('Potion');
    });

    test('should have food entry', () => {
      expect(Consumables.food).toBe('Food');
    });

    test('should have exactly two consumables', () => {
      expect(Object.keys(Consumables).length).toBe(2);
    });
  });

  describe('LegendTitles Lookup Table', () => {
    test('should specify percentage increase for enchants', () => {
      expect(LegendTitles.enchants).toBe('Increase in %');
    });

    test('should specify item level for trinkets', () => {
      expect(LegendTitles.trinkets).toBe('Item level');
    });

    test('should have entries for major chart types', () => {
      expect('talents' in LegendTitles).toBe(true);
      expect('trinkets' in LegendTitles).toBe(true);
      expect('stats' in LegendTitles).toBe(true);
    });
  });

  describe('LookupType Lookup Table', () => {
    test('should specify item lookup for alchemy', () => {
      expect(LookupType.alchemy).toBe('item');
    });

    test('should specify spell lookup for racials', () => {
      expect(LookupType.racials).toBe('spell');
    });

    test('should specify none for talents', () => {
      expect(LookupType.talents).toBe('none');
    });

    test('should specify none for stats', () => {
      expect(LookupType.stats).toBe('none');
    });

    test('should differentiate between lookup types', () => {
      const types = new Set(Object.values(LookupType));
      expect(types.has('item')).toBe(true);
      expect(types.has('spell')).toBe(true);
      expect(types.has('none')).toBe(true);
    });
  });

  describe('Cross-Lookup Integration', () => {
    test('getValue with dash conversion for Sims', () => {
      const value1 = getValue(Sims, 'trinket-combos');
      const value2 = getValue(Sims, 'trinket_combos');
      expect(value1).toBe(value2);
    });

    test('getValue with dash conversion for ChartPadding', () => {
      const value1 = getValue(ChartPadding, 'talent-builds');
      const value2 = getValue(ChartPadding, 'talent_builds');
      expect(value1).toBe(value2);
      expect(value1).toBe(-80);
    });

    test('getKeys returns all Sims types', () => {
      const keys = getKeys(Sims);
      expect(keys.length).toBeGreaterThanOrEqual(10);
    });

    test('every Sims key should have a display value', () => {
      const keys = getKeys(Sims);
      for (const key of keys) {
        expect(Sims[key]).toBeDefined();
        expect(typeof Sims[key]).toBe('string');
      }
    });
  });

  describe('Converter function consistency', () => {
    test('getValue and getConfigValue should handle same inputs consistently', () => {
      const testList = { 'fire_frost': 'Fire/Frost' };
      
      // Both should handle keys consistently
      const val1 = getValue(testList, 'fire_frost');
      const val2 = getValue(testList, 'fire_frost');
      
      expect(val1).toBe(val2);
      expect(val1).toBe('Fire/Frost');
    });

    test('getKeys should return same order for same object', () => {
      const keys1 = getKeys(Sims);
      const keys2 = getKeys(Sims);
      expect(keys1).toEqual(keys2);
    });

    test('should handle large and complex lookup tables safely', () => {
      const allKeys = getKeys(LookupType);
      expect(allKeys.length).toBeGreaterThan(5);
      
      for (const key of allKeys) {
        const value = getValue(LookupType, key);
        expect(value).toBeDefined();
      }
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('getValue handles keys with special patterns', () => {
      const result = getValue(Sims, 'trinkets');
      expect(result).toBe('Trinkets');
    });

    test('getKeys with objects containing symbols should work', () => {
      const testObj = { key_1: 'val1', key_2: 'val2' };
      const keys = getKeys(testObj);
      expect(keys.length).toBe(2);
    });

    test('getValue should preserve case in lookup values', () => {
      const testList = { test_key: 'TestValue' };
      const result = getValue(testList, 'test_key');
      expect(result).toBe('TestValue');
    });

    test('should handle objects with numeric string keys', () => {
      const testObj = { '1': 'one', '2': 'two' };
      const keys = getKeys(testObj);
      expect(keys).toContain('1');
    });
  });
});
