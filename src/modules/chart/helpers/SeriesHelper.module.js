import { getColor } from './ColorHelper.module.js';
import {
  jsonSortedDataKeys,
  jsonData,
  jsonBase,
  jsonDPS
} from '../../../utils/Constants.module.js';

export function clearChartSeries(chart) {
  while (chart.series.length > 0) {
    chart.series[0].remove(false);
  }
}

export function calculatePercentIncrease(dpsValue, baseDps) {
  if (!baseDps || dpsValue == null) {
    return 0;
  }
  return (dpsValue / baseDps) * 100 - 100;
}

export function calculateNonNegativePercentIncrease(dpsValue, baseDps) {
  return Math.max(0, calculatePercentIncrease(dpsValue, baseDps));
}

export function getSortedNumericLevels(steps) {
  return (steps || []).slice().sort(function(a, b) {
    return Number(a) - Number(b);
  });
}

export function areStepsNumeric(steps) {
  return Array.isArray(steps) && steps.length > 0 && steps.every(function(step) {
    return /^\d+$/.test(step);
  });
}

export function buildSingleBarSeriesData(data, maxPoints, colorKey) {
  var result = [];
  var sortedKeys = data[jsonSortedDataKeys] || [];
  var baselineDps = ((data[jsonData] || {})[jsonBase] || {})[jsonDPS] || 0;
  var upperBound = Math.min(sortedKeys.length, maxPoints || sortedKeys.length);

  for (var i = 0; i < upperBound; i++) {
    var sortedData = sortedKeys[i];
    var dps = (((data[jsonData] || {})[sortedData] || {})[jsonDPS]);
    if (dps) {
      result.push({
        y: calculatePercentIncrease(dps, baselineDps),
        color: getColor(sortedData, colorKey)
      });
    }
  }

  return result;
}

export function buildNumericPercentageSeries(data, levels) {
  var sortedKeys = data[jsonSortedDataKeys] || [];
  var payload = data[jsonData] || {};
  var baseDps = ((payload[jsonBase] || {})[jsonDPS]) || 0;
  var lastValues = {};
  var seriesArray = [];

  for (var i = 0; i < sortedKeys.length; i++) {
    lastValues[sortedKeys[i].trim()] = 0;
  }

  levels.forEach(function(level) {
    var points = [];
    sortedKeys.forEach(function(sortedData) {
      var itemKey = sortedData.trim();
      var dpsValue = ((payload[itemKey] || {})[level]) || 0;
      var valuePercent = 0;

      if (dpsValue > 0) {
        if (lastValues[itemKey] === 0) {
          valuePercent = baseDps ? ((dpsValue - baseDps) / baseDps) * 100 : 0;
        } else {
          valuePercent = baseDps ? ((dpsValue - lastValues[itemKey]) / baseDps) * 100 : 0;
        }
        lastValues[itemKey] = dpsValue;
      }

      points.push(Math.max(0, valuePercent));
    });

    seriesArray.push({ data: points, name: level });
  });

  return seriesArray;
}

export function buildStepPercentageSeries(data, steps) {
  var sortedKeys = data[jsonSortedDataKeys] || [];
  var payload = data[jsonData] || {};
  var baseDps = ((payload[jsonBase] || {})[jsonDPS]) || 0;
  var seriesArray = [];

  steps.forEach(function(currStep) {
    var points = [];
    sortedKeys.forEach(function(sortedData) {
      var dps = ((payload[sortedData.trim()] || {})[currStep]);
      if (dps >= 0) {
        points.push(calculateNonNegativePercentIncrease(dps, baseDps));
      } else {
        points.push(0);
      }
    });

    seriesArray.push({
      data: points,
      name: currStep,
      showInLegend: true
    });
  });

  return seriesArray;
}

export function isMinMaxSeriesPayload(payload) {
  for (var key in payload) {
    if (payload[key] && typeof payload[key] === 'object' && ('min' in payload[key] || 'max' in payload[key])) {
      return true;
    }
  }
  return false;
}

export function buildMinMaxMultiBarSeries(data) {
  // NOTE: This function references AggregateConduits, Conduits, getCovenantChoiceColor
  // which are not currently defined. It appears to be legacy code for Shadowlands conduits.
  // Keeping the original implementation for compatibility but wrapping with safety checks.
  var seriesArray = [];
  
  // Check if the required globals exist (legacy compatibility)
  if (typeof window !== 'undefined' && window.AggregateConduits && window.getValue && window.getCovenantChoiceColor) {
    const AggregateConduits = window.AggregateConduits;
    const getValue = window.getValue;
    const Conduits = window.Conduits;
    const getCovenantChoiceColor = window.getCovenantChoiceColor;
    
    for (var i = 0; i < AggregateConduits.length; i++) {
      var minResults = [];
      var maxResults = [];

      for (var currFight in data[jsonData]) {
        var conduit = data[jsonData][currFight][AggregateConduits[i]];
        var minValue = (conduit['min']) * 100;
        var maxValue = ((conduit['max']) * 100) - ((conduit['min']) * 100);
        minResults.push(minValue);
        maxResults.push(maxValue);
      }

      seriesArray.push({
        color: getCovenantChoiceColor(AggregateConduits[i] + '_min'),
        data: minResults,
        name: getValue(Conduits, AggregateConduits[i]) + ' min',
        stack: String(AggregateConduits[i]),
        showInLegend: true
      });

      seriesArray.push({
        color: getCovenantChoiceColor(AggregateConduits[i] + '_max'),
        data: maxResults,
        name: getValue(Conduits, AggregateConduits[i]) + ' max',
        stack: String(AggregateConduits[i]),
        showInLegend: true
      });
    }
  }

  return seriesArray;
}

export function buildNumericMultiBarSeries(data, fights, levels) {
  var sample = data[jsonData] || {};
  var baseDps = ((sample[jsonBase] || {})[jsonDPS]) || 0;

  return levels.map(function(level, idx) {
    var seriesData = fights.map(function(fight) {
      var currentValue = ((sample[fight] || {})[level]) || 0;
      if (idx === 0) {
        return Math.max(0, baseDps ? ((currentValue - baseDps) / baseDps) * 100 : 0);
      }
      var prevValue = ((sample[fight] || {})[levels[idx - 1]]) || 0;
      return Math.max(0, baseDps ? ((currentValue - prevValue) / baseDps) * 100 : 0);
    });

    return {
      name: level,
      color: getColor(level),
      data: seriesData,
      stack: 'levels',
      showInLegend: true
    };
  });
}

