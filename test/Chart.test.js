import * as Chart from '../src/modules/chart/Chart.module.js';
import * as Converter from '../src/utils/Converter.module.js';
import * as Normalizers from '../src/utils/Normalizers.module.js';

describe('Chart Module', () => {
  test('should export updateChart function', () => {
    expect(Chart.updateChart).toBeDefined();
    expect(typeof Chart.updateChart).toBe('function');
  });

  test('should export determineChartName function', () => {
    expect(Chart.determineChartName).toBeDefined();
    expect(typeof Chart.determineChartName).toBe('function');
  });

  test('should export determineChartDescription function', () => {
    expect(Chart.determineChartDescription).toBeDefined();
    expect(typeof Chart.determineChartDescription).toBe('function');
  });

  test('should export determineJsonUrl function', () => {
    expect(Chart.determineJsonUrl).toBeDefined();
    expect(typeof Chart.determineJsonUrl).toBe('function');
  });

  describe('Converter integration', () => {
    test('should access getValue from Converter', () => {
      expect(Converter.getValue).toBeDefined();
    });

    test('should access ChartType from Converter', () => {
      expect(Converter.ChartType).toBeDefined();
      expect(typeof Converter.ChartType).toBe('object');
    });

    test('should access ChartPadding from Converter', () => {
      expect(Converter.ChartPadding).toBeDefined();
      expect(typeof Converter.ChartPadding).toBe('object');
    });
  });

  describe('Normalizers integration', () => {
    test('should access normalizeBuildKey from Normalizers', () => {
      expect(Normalizers.normalizeBuildKey).toBeDefined();
      expect(typeof Normalizers.normalizeBuildKey).toBe('function');
    });

    test('should have normalizers available', () => {
      expect(Normalizers.normalizeSimResultKey).toBeDefined();
      expect(Normalizers.normalizeFightStyleForResults).toBeDefined();
    });
  });
});


