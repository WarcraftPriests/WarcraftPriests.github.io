// Setup jQuery mock for tests
global.$ = function(selector) {
  return {
    click: function(fn) { return this; },
    next: function() { return this; },
    slideToggle: function(duration, fn) { if (fn) fn(); return this; },
    addClass: function() { return this; },
    removeClass: function() { return this; }
  };
};
