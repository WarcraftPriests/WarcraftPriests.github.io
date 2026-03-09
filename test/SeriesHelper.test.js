import * as SeriesHelper from '../js/internal/chart/helper/SeriesHelper.module.js';
import * as Constants from '../js/internal/helper/Constants.module.js';

describe('SeriesHelper', () => {
  test('detects numeric steps and sorts levels', () => {
    expect(SeriesHelper.areStepsNumeric(['636', '649'])).toBe(true);
    expect(SeriesHelper.areStepsNumeric(['636', 'foo'])).toBe(false);
    expect(SeriesHelper.getSortedNumericLevels(['700', '636', '649'])).toEqual(['636', '649', '700']);
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

    const result = SeriesHelper.buildSingleBarSeriesData(data, 100, 'name');
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

    const series = SeriesHelper.buildStepPercentageSeries(data, ['low', 'high']);
    expect(series).toHaveLength(2);
    expect(series[0].data[0]).toBeCloseTo(5);
    expect(series[1].data[0]).toBeCloseTo(10);
  });
});
