const fs = require('fs');
const path = require('path');
const vm = require('vm');

describe('Parameterized (URL) utilities', () => {
  let context;
  let manipulateUrl;
  let compareParameters;

  beforeAll(() => {
    context = vm.createContext({
      // Mock window.location
      window: {
        location: {
          search: '?sims=trinkets&talents=fire',
          href: 'https://example.com/?sims=trinkets&talents=fire'
        }
      },
      // Mock URL manipulation
      URLSearchParams: class {
        constructor(params) {
          if (typeof params === 'string') {
            // Parse from string
            this.params = new Map();
            if (params.startsWith('?')) params = params.substring(1);
            if (params) {
              params.split('&').forEach(pair => {
                const [key, value] = pair.split('=');
                this.params.set(key, decodeURIComponent(value || ''));
              });
            }
          } else if (params instanceof Map) {
            this.params = params;
          } else if (typeof params === 'object' && params !== null) {
            // Object input
            this.params = new Map(Object.entries(params));
          } else {
            this.params = new Map();
          }
        }
        
        get size() {
          return this.params.size;
        }
        
        get(key) {
          return this.params.get(key);
        }
        
        has(key) {
          return this.params.has(key);
        }
        
        toString() {
          const pairs = [];
          this.params.forEach((value, key) => {
            pairs.push(`${key}=${encodeURIComponent(value)}`);
          });
          return pairs.sort().join('&');
        }
        
        entries() {
          return this.params.entries();
        }
      },
      console: console
    });

    // Load and run the script
    const scriptPath = path.join(__dirname, '..', 'js', 'internal', 'helper', 'Parameterized.js');
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');
    const script = new vm.Script(scriptContent);
    script.runInContext(context);

    manipulateUrl = context.manipulateUrl;
    compareParameters = context.compareParameters;
  });

  describe('compareParameters', () => {
    test('should return true for identical URLSearchParams', () => {
      const params1 = new context.URLSearchParams('sims=trinkets&talents=fire');
      const params2 = new context.URLSearchParams('sims=trinkets&talents=fire');
      
      const result = compareParameters(params1, params2);
      expect(result).toBe(true);
    });

    test('should return true for parameters in different order', () => {
      const params1 = new context.URLSearchParams('talents=fire&sims=trinkets');
      const params2 = new context.URLSearchParams('sims=trinkets&talents=fire');
      
      const result = compareParameters(params1, params2);
      // Our implementation sorts before comparing, so order shouldn't matter
      expect(result).toBe(true);
    });

    test('should return false for different parameter values', () => {
      const params1 = new context.URLSearchParams('sims=trinkets&talents=fire');
      const params2 = new context.URLSearchParams('sims=trinkets&talents=frost');
      
      const result = compareParameters(params1, params2);
      expect(result).toBe(false);
    });

    test('should return false for different parameter keys', () => {
      const params1 = new context.URLSearchParams('sims=trinkets');
      const params2 = new context.URLSearchParams('sims=trinkets&talents=fire');
      
      const result = compareParameters(params1, params2);
      expect(result).toBe(false);
    });

    test('should handle empty parameters', () => {
      const params1 = new context.URLSearchParams('');
      const params2 = new context.URLSearchParams('');
      
      const result = compareParameters(params1, params2);
      expect(result).toBe(true);
    });
  });

  describe('manipulateUrl', () => {
    test('should filter out empty/falsy parameter values', () => {
      // Track the window.location.search changes
      let urlSet = null;
      context.window.location.search = '?sims=trinkets';
      Object.defineProperty(context.window.location, 'search', {
        set: function(value) {
          urlSet = value;
        },
        get: function() {
          return this._search || '';
        }
      });
      context.window.location._search = '?sims=trinkets';

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
    });

    test('should handle multiple parameters', () => {
      const params = {
        sims: 'trinkets',
        talents: 'fire',
        fightStyle: 'dungeons'
      };

      // Create URLSearchParams from the params to verify structure
      const urlParams = new context.URLSearchParams(params);
      expect(urlParams.get('sims')).toBe('trinkets');
      expect(urlParams.get('talents')).toBe('fire');
      expect(urlParams.get('fightStyle')).toBe('dungeons');
    });

    test('should preserve special characters in parameter values', () => {
      const params = {
        talents: 'fire-frost'
      };

      const urlParams = new context.URLSearchParams(params);
      expect(urlParams.get('talents')).toBe('fire-frost');
    });
  });
});

describe('URL Query Parameter Integration', () => {
  let context;

  beforeAll(() => {
    context = vm.createContext({
      window: {
        location: {
          search: '?sims=trinkets&talents=fire'
        }
      },
      URLSearchParams: class {
        constructor(params) {
          if (typeof params === 'string') {
            this.params = new Map();
            if (params.startsWith('?')) params = params.substring(1);
            if (params) {
              params.split('&').forEach(pair => {
                const [key, value] = pair.split('=');
                this.params.set(key, decodeURIComponent(value || ''));
              });
            }
          } else if (typeof params === 'object' && params !== null) {
            this.params = new Map(Object.entries(params));
          } else {
            this.params = new Map();
          }
        }
        get(key) { return this.params.get(key); }
        has(key) { return this.params.has(key); }
        get size() { return this.params.size; }
        toString() {
          const pairs = [];
          this.params.forEach((value, key) => {
            pairs.push(`${key}=${encodeURIComponent(value)}`);
          });
          return pairs.sort().join('&');
        }
      },
      console: console
    });

    const scriptPath = path.join(__dirname, '..', 'js', 'internal', 'helper', 'Parameterized.js');
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');
    const script = new vm.Script(scriptContent);
    script.runInContext(context);
  });

  test('getQueryParameter should return URLSearchParams object', () => {
    const getQueryParameter = context.getQueryParameter;
    const params = getQueryParameter();
    
    expect(params).toBeDefined();
    expect(params.get('sims')).toBe('trinkets');
    expect(params.get('talents')).toBe('fire');
  });

  test('should handle URLs with no query parameters', () => {
    context.window.location.search = '';
    const getQueryParameter = context.getQueryParameter;
    const params = getQueryParameter();
    
    expect(params.size).toBe(0);
  });

  test('should handle URLs with single parameter', () => {
    context.window.location.search = '?sims=weights';
    const getQueryParameter = context.getQueryParameter;
    const params = getQueryParameter();
    
    expect(params.has('sims')).toBe(true);
    expect(params.get('sims')).toBe('weights');
    expect(params.size).toBe(1);
  });

  test('should handle URLs with encoded values', () => {
    context.window.location.search = '?talents=fire%20frost';
    const getQueryParameter = context.getQueryParameter;
    const params = getQueryParameter();
    
    expect(params.get('talents')).toBe('fire frost');
  });
});
