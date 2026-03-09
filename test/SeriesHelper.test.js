const fs = require('fs');
const path = require('path');
const vm = require('vm');

describe('SeriesHelper', () => {
  let context;

  beforeAll(() => {
    context = vm.createContext({
      jsonSortedDataKeys: 'sorted_data_keys',
      jsonData: 'data',
      jsonDPS: 'DPS',
      jsonBase: 'Base',
      AggregateConduits: ['x'],
      Conduits: { x: 'X' },
      getColor: () => '#123456',
      getCovenantChoiceColor: () => '#654321',
      getValue: (obj, key) => obj[key]
    });

    const scriptPath = path.join(__dirname, '..', 'js', 'internal', 'chart', 'helper', 'SeriesHelper.js');
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');
    const script = new vm.Script(scriptContent);
    script.runInContext(context);
  });

  test('detects numeric steps and sorts levels', () => {
    expect(context.areStepsNumeric(['636', '649'])).toBe(true);
    expect(context.areStepsNumeric(['636', 'foo'])).toBe(false);
    expect(context.getSortedNumericLevels(['700', '636', '649'])).toEqual(['636', '649', '700']);
  });

  test('builds single bar series data from dps values', () => {
    const data = {
      sorted_data_keys: ['A', 'B'],
      data: {
        Base: { DPS: 1000 },
        A: { DPS: 1100 },
        B: { DPS: 900 }
      }
    };

    const result = context.buildSingleBarSeriesData(data, 100, 'name');
    expect(result).toHaveLength(2);
    expect(result[0].y).toBeCloseTo(10);
    expect(result[1].y).toBeCloseTo(-10);
  });

  test('builds fallback step percentage series', () => {
    const data = {
      sorted_data_keys: ['A'],
      data: {
        Base: { DPS: 1000 },
        A: { low: 1050, high: 1100 }
      }
    };

    const series = context.buildStepPercentageSeries(data, ['low', 'high']);
    expect(series).toHaveLength(2);
    expect(series[0].data[0]).toBeCloseTo(5);
    expect(series[1].data[0]).toBeCloseTo(10);
  });
});
