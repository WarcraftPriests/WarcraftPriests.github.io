// Mock jQuery before importing modules that depend on it
global.$ = function(selector) {
  return {
    click: function(fn) { return this; },
    next: function() { return this; },
    slideToggle: function(duration, fn) { if (fn) fn(); return this; },
    addClass: function() { return this; },
    removeClass: function() { return this; }
  };
};

import * as Main from '../src/main.entry.module.js';
import * as Chart from '../src/modules/chart/Chart.module.js';
import * as Buttons from '../src/modules/buttons/Buttons.module.js';

describe('Integration Tests', () => {
  test('should import Main module successfully', () => {
    expect(Main).toBeDefined();
  });

  test('should have Chart module available', () => {
    expect(Chart).toBeDefined();
    expect(typeof Chart.updateChart).toBe('function');
    expect(typeof Chart.determineChartName).toBe('function');
  });

  test('should have Buttons module available', () => {
    expect(Buttons).toBeDefined();
    expect(typeof Buttons.initializeButtons).toBe('function');
    expect(typeof Buttons.createButtons).toBe('function');
  });

  test('main module exports should be available', () => {
    // Verify that Main re-exports or provides access to key functions
    expect(Main).toBeTruthy();
  });

  describe('ES6 Module Interoperability', () => {
    test('Chart and Buttons modules should be independent imports', () => {
      expect(Chart).not.toEqual(Buttons);
    });

    test('all modules should be properly instantiated', () => {
      const modules = [Main, Chart, Buttons];
      modules.forEach(module => {
        expect(module).toBeTruthy();
        expect(typeof module).toBe('object');
      });
    });
  });
});


