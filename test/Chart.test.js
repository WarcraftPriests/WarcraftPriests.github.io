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

  test('should export determineGuideLink function', () => {
    expect(Chart.determineGuideLink).toBeDefined();
    expect(typeof Chart.determineGuideLink).toBe('function');
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

  describe('Registry-driven chart behavior', () => {
    test('should resolve guide link for dashed sim key', () => {
      const result = Chart.determineGuideLink('omnium-folio', 'Composite');
      expect(result).toBeDefined();
      expect(result.label).toBe('Gear and Best in Slot');
    });

    test('should prefer dungeon-specific guide link for dungeons fight style', () => {
      const result = Chart.determineGuideLink('omnium_folio', 'Dungeons');
      expect(result).toBeDefined();
      expect(result.label).toBe('Mythic+ Tips');
    });
  });
});


