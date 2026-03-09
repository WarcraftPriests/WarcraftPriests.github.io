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

import * as Buttons from '../js/internal/button/Buttons.module.js';
import * as Constants from '../js/internal/helper/Constants.module.js';

describe('Buttons Module', () => {
  test('should export initializeButtons function', () => {
    expect(Buttons.initializeButtons).toBeDefined();
    expect(typeof Buttons.initializeButtons).toBe('function');
  });

  test('should export createButtons function', () => {
    expect(Buttons.createButtons).toBeDefined();
    expect(typeof Buttons.createButtons).toBe('function');
  });

  test('should export handleOnClick function', () => {
    expect(Buttons.handleOnClick).toBeDefined();
    expect(typeof Buttons.handleOnClick).toBe('function');
  });

  test('should export checkButtonClick function', () => {
    expect(Buttons.checkButtonClick).toBeDefined();
    expect(typeof Buttons.checkButtonClick).toBe('function');
  });

  test('should export hasMultipleVersions function', () => {
    expect(Buttons.hasMultipleVersions).toBeDefined();
    expect(typeof Buttons.hasMultipleVersions).toBe('function');
  });

  describe('Constants integration', () => {
    test('should have required button constants', () => {
      expect(Constants.buttonContainerText).toBe('button-container');
      expect(Constants.buttonText).toBe('button');
    });
  });
});
