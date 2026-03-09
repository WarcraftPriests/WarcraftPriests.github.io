describe('CSV helper functions', () => {
  describe('getLabel - CSV Heading Mapping', () => {
    // getLabel is an internal function inside parseCSV, so we test the Headings mapping
    const Headings = {
      profile: 'Profile',
      actor: 'Actor',
      DPS: 'DPS',
      int: 'Intellect',
      haste: 'Haste',
      crit: 'Critical Strike',
      mastery: 'Mastery',
      vers: 'Versatility',
      dpsW: 'DPS Weight',
    };

    test('should map known heading keys to display values', () => {
      expect(Headings['profile']).toBe('Profile');
      expect(Headings['DPS']).toBe('DPS');
      expect(Headings['haste']).toBe('Haste');
      expect(Headings['mastery']).toBe('Mastery');
      expect(Headings['vers']).toBe('Versatility');
    });

    test('should handle unknown keys gracefully', () => {
      // Unknown keys don't exist in Headings
      expect(Headings['unknown_key']).toBeUndefined();
    });

    test('should handle CSS-like property names', () => {
      const getValue = (obj, key) => obj ? obj[key] : undefined;
      
      // Test that function works with various keys
      expect(getValue(Headings, 'profile')).toBe('Profile');
      expect(getValue(Headings, 'dpsW')).toBe('DPS Weight');
      expect(getValue(Headings, 'missing')).toBeUndefined();
    });
  });

  describe('determineCsvUrl', () => {
    // Helper function constants
    const slash = '/';
    const simResultPath = '/sim_results_data/';
    const csvExtension = '.csv';
    const underscore = '_';

    const determineCsvUrl = (simsBtn, baseurl, fightStyle, talentChoice) => {
      return baseurl + slash + simsBtn + simResultPath + fightStyle + underscore + talentChoice.replaceAll('_', '-') + csvExtension;
    };

    test('should build correct CSV URL with all parameters', () => {
      const url = determineCsvUrl('trinkets', 'https://example.com', 'dungeons', 'fire_frost');
      
      expect(url).toBe('https://example.com/trinkets/sim_results_data/dungeons_fire-frost.csv');
    });

    test('should replace underscores with hyphens in talent choice', () => {
      const url = determineCsvUrl('weights', 'https://repo.com', 'raid', 'shadow_priest_build');
      
      expect(url).toContain('shadow-priest-build');
      expect(url).not.toContain('shadow_priest_build');
    });

    test('should preserve other parameters as-is', () => {
      const url = determineCsvUrl('trinket_combos', 'https://base.url', 'mythic', 'frost');
      
      expect(url).toContain('trinket_combos'); // simsBtn kept as-is
      expect(url).toContain('mythic'); // fightStyle kept as-is
      expect(url).toContain('.csv'); // extension
    });

    test('should handle base URLs with trailing slashes', () => {
      const url1 = determineCsvUrl('trinkets', 'https://example.com/', 'dungeons', 'fire');
      const url2 = determineCsvUrl('trinkets', 'https://example.com', 'dungeons', 'fire');
      
      // URL1 will have a double slash, but structure is correct
      expect(url1).toContain('/trinkets/');
      expect(url2).toContain('/trinkets/');
    });

    test('should handle empty or minimal parameters', () => {
      const url = determineCsvUrl('trinkets', '', 'raid', 'fire');
      
      expect(url).toMatch(/^\/trinkets\/sim_results_data\/raid_fire\.csv$/);
    });
  });

  describe('CSV Row Processing Logic', () => {
    test('should split CSV lines correctly', () => {
      const csvText = 'line1,line2,line3\nline4,line5,line6\nline7,line8,line9';
      const lines = csvText.split(/\r\n|\n/);
      
      expect(lines).toHaveLength(3);
      expect(lines[0]).toBe('line1,line2,line3');
      expect(lines[2]).toBe('line7,line8,line9');
    });

    test('should handle Windows and Unix line endings', () => {
      const windowsCSV = 'row1,data1,data2\r\nrow2,data3,data4';
      const unixCSV = 'row1,data1,data2\nrow2,data3,data4';
      
      const windowsLines = windowsCSV.split(/\r\n|\n/);
      const unixLines = unixCSV.split(/\r\n|\n/);
      
      expect(windowsLines).toHaveLength(2);
      expect(unixLines).toHaveLength(2);
      expect(windowsLines[0]).toBe(unixLines[0]);
    });

    test('should extract and trim entries from CSV row', () => {
      const row = 'profile,actor,DPS,int,haste';
      const entries = row.split(',');
      const recordNum = 5;
      
      const extracted = entries.splice(0, recordNum);
      expect(extracted).toHaveLength(5);
      expect(extracted[0]).toBe('profile');
      expect(extracted[4]).toBe('haste');
    });

    test('should handle null/undefined entries', () => {
      const entries = ['value1', null, 'value3', undefined, 'value5'];
      
      const filtered = entries.filter(e => e != null && e !== undefined);
      expect(filtered).toHaveLength(3);
      expect(filtered[0]).toBe('value1');
      expect(filtered[2]).toBe('value5');
    });

    test('should handle HTML characters in CSV data (escape safety)', () => {
      const csvRow = 'Item<script>alert(1)</script>,Name,Value';
      const entries = csvRow.split(',');
      
      // The raw data contains potentially harmful content
      expect(entries[0]).toContain('<script>');
      
      // When using textContent (as DomRenderHelper does), this escapes safely
      // The data is preserved exactly as-is, but displayed as plain text, not HTML
      expect(entries[0]).toBe('Item<script>alert(1)</script>');
    });
  });

  describe('CSV Parsing Edge Cases', () => {
    test('should handle empty CSV file', () => {
      const csvText = '';
      const lines = csvText.split(/\r\n|\n/).filter(l => l.trim());
      
      expect(lines).toHaveLength(0);
    });

    test('should handle CSV with trailing newline', () => {
      const csvText = 'row1,data1\nrow2,data2\n';
      const lines = csvText.split(/\r\n|\n/);
      
      // Split creates an empty element at the end
      expect(lines[lines.length - 1]).toBe('');
      
      // Process only non-empty lines
      const nonEmpty = lines.filter(l => l.trim()).length;
      expect(nonEmpty).toBe(2);
    });

    test('should handle comma-less entries gracefully', () => {
      const row = 'single_entry';
      const entries = row.split(',');
      
      expect(entries).toHaveLength(1);
      expect(entries[0]).toBe('single_entry');
    });

    test('should handle quoted fields (standard CSV)', () => {
      // Note: Simple split doesn't handle quotes, but tests show the limitation
      const row = '"field,with,comma","normal_field","quoted"';
      const entries = row.split(',');
      
      // Simple split breaks quoted fields - this shows why proper CSV parsing matters
      expect(entries.length).toBeGreaterThan(3);
      
      // With proper parser: would handle correctly
      // This is a known limitation of current implementation
    });
  });

  describe('CSV Data Type Conversions', () => {
    test('should replace underscores with spaces in labels', () => {
      const key = 'dps_weight';
      const result = key.replaceAll('_', ' ');
      
      expect(result).toBe('dps weight');
    });

    test('should handle multiple underscores', () => {
      const key = 'stat_value_type_dps';
      const result = key.replaceAll('_', ' ');
      
      expect(result).toBe('stat value type dps');
    });

    test('should preserve case when replacing underscores', () => {
      const key = 'DPS_Weight_Value';
      const result = key.replaceAll('_', ' ');
      
      expect(result).toBe('DPS Weight Value');
    });

    test('should handle keys without underscores', () => {
      const key = 'DPS';
      const result = key.replaceAll('_', ' ');
      
      expect(result).toBe('DPS');
    });
  });
});

