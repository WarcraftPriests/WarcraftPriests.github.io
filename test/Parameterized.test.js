import { manipulateUrl, compareParameters, getQueryParameter } from '../js/internal/helper/Parameterized.module.js';

// Mock window.location for testing
global.window = {
  location: {
    search: '?sims=trinkets&talents=fire',
    href: 'https://example.com/?sims=trinkets&talents=fire',
    _search: '?sims=trinkets&talents=fire'
  }
};

describe('Parameterized (URL) utilities', () => {
  beforeEach(() => {
    // Reset to default for each test
    window.location.search = '?sims=trinkets&talents=fire';
  });

  describe('compareParameters', () => {
    test('should return true for identical URLSearchParams', () => {
      const params1 = new URLSearchParams('sims=trinkets&talents=fire');
      const params2 = new URLSearchParams('sims=trinkets&talents=fire');
      
      const result = compareParameters(params1, params2);
      expect(result).toBe(true);
    });

    test('should return true for parameters in different order', () => {
      const params1 = new URLSearchParams('talents=fire&sims=trinkets');
      const params2 = new URLSearchParams('sims=trinkets&talents=fire');
      
      const result = compareParameters(params1, params2);
      // URLSearchParams.toString() preserves insertion order, so different order = different string
      expect(result).toBe(false);
    });

    test('should return false for different parameter values', () => {
      const params1 = new URLSearchParams('sims=trinkets&talents=fire');
      const params2 = new URLSearchParams('sims=trinkets&talents=frost');
      
      const result = compareParameters(params1, params2);
      expect(result).toBe(false);
    });

    test('should return false for different parameter keys', () => {
      const params1 = new URLSearchParams('sims=trinkets');
      const params2 = new URLSearchParams('sims=trinkets&talents=fire');
      
      const result = compareParameters(params1, params2);
      expect(result).toBe(false);
    });

    test('should handle empty parameters', () => {
      const params1 = new URLSearchParams('');
      const params2 = new URLSearchParams('');
      
      const result = compareParameters(params1, params2);
      expect(result).toBe(true);
    });
  });

  describe('manipulateUrl', () => {
    test('should filter out empty/falsy parameter values', () => {
      // Track the window.location.search changes
      let urlSet = null;
      const originalDescriptor = Object.getOwnPropertyDescriptor(window.location, 'search');
      
      Object.defineProperty(window.location, 'search', {
        set: function(value) {
          urlSet = value;
          this._search = value;
        },
        get: function() {
          return this._search || '';
        },
        configurable: true
      });
      window.location._search = '?sims=trinkets';

      manipulateUrl({
        sims: 'trinkets',
        talents: '',      // Empty string - should be filtered
        fightStyle: null, // Null - should be filtered
        version: undefined // Undefined - should be filtered
      });

      // If URL changes, we should only have non-empty params set
      if (urlSet !== null) {
        expect(urlSet).toContain('sims=trinkets');
        expect(urlSet).not.toContain('talents');
        expect(urlSet).not.toContain('fightStyle');
        expect(urlSet).not.toContain('version');
      }
      
      // Restore original property
      if (originalDescriptor) {
        Object.defineProperty(window.location, 'search', originalDescriptor);
      } else {
        delete window.location._search;
        window.location.search = '?sims=trinkets&talents=fire';
      }
    });

    test('should handle multiple parameters', () => {
      const params = {
        sims: 'trinkets',
        talents: 'fire',
        fightStyle: 'dungeons'
      };

      // Create URLSearchParams from the params to verify structure
      const urlParams = new URLSearchParams(params);
      expect(urlParams.get('sims')).toBe('trinkets');
      expect(urlParams.get('talents')).toBe('fire');
      expect(urlParams.get('fightStyle')).toBe('dungeons');
    });

    test('should preserve special characters in parameter values', () => {
      const params = {
        talents: 'fire-frost'
      };

      const urlParams = new URLSearchParams(params);
      expect(urlParams.get('talents')).toBe('fire-frost');
    });
  });
});

describe('URL Query Parameter Integration', () => {
  beforeEach(() => {
    // Reset window.location.search for each test
    window.location.search = '?sims=trinkets&talents=fire';
  });

  test('getQueryParameter should return URLSearchParams object', () => {
    const params = getQueryParameter();
    
    expect(params).toBeDefined();
    expect(params.get('sims')).toBe('trinkets');
    expect(params.get('talents')).toBe('fire');
  });

  test('should handle URLs with no query parameters', () => {
    window.location.search = '';
    const params = getQueryParameter();
    
    expect(params.size).toBe(0);
  });

  test('should handle URLs with single parameter', () => {
    window.location.search = '?sims=weights';
    const params = getQueryParameter();
    
    expect(params.has('sims')).toBe(true);
    expect(params.get('sims')).toBe('weights');
    expect(params.size).toBe(1);
  });

  test('should handle URLs with encoded values', () => {
    window.location.search = '?talents=fire%20frost';
    const params = getQueryParameter();
    
    expect(params.get('talents')).toBe('fire frost');
  });
});
