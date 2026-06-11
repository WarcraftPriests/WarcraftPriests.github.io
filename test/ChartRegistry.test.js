import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  ChartRegistry,
  CHART_TYPES,
  TOOLTIP_LINE_STRATEGIES,
  TOOLTIP_URL_STRATEGIES,
  getChartRegistryEntry,
  getChartLegendTitle,
  getChartXAxisLabelOffset,
  getChartTooltipLineStrategy,
  resolveChartTooltipUrlType,
  validateChartRegistry
} from '../src/modules/chart/definitions/ChartRegistry.module.js';
import {
  Sims,
  ChartType,
  ChartPadding,
  LegendTitles,
  LookupType,
  IcyVeinsGuideBySim
} from '../src/utils/Converter.module.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

describe('Chart registry contracts', () => {
  test('should have unique chart ids', () => {
    const ids = ChartRegistry.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('should pass strict schema validation', () => {
    const errors = validateChartRegistry(ChartRegistry);
    expect(errors).toEqual([]);
  });

  test('should define required core fields', () => {
    for (const entry of ChartRegistry) {
      expect(entry.id).toBeDefined();
      expect(entry.label).toBeDefined();
      expect(entry.iconName).toBeDefined();
      expect(typeof entry.id).toBe('string');
      expect(typeof entry.label).toBe('string');
      expect(typeof entry.iconName).toBe('string');
    }
  });

  test('should resolve registry entry by id and dashed id', () => {
    const snakeCaseEntry = getChartRegistryEntry('omnium_folio');
    const dashCaseEntry = getChartRegistryEntry('omnium-folio');

    expect(snakeCaseEntry).toBeDefined();
    expect(snakeCaseEntry.id).toBe('omnium_folio');
    expect(dashCaseEntry).toBeDefined();
    expect(dashCaseEntry.id).toBe('omnium_folio');
  });

  test('should resolve legend title from registry helper', () => {
    expect(getChartLegendTitle('trinkets')).toBe('Item level');
    expect(getChartLegendTitle('omnium-folio')).toBe('Increase in %');
  });

  test('should resolve xAxisLabelOffset with strategy defaults', () => {
    expect(getChartXAxisLabelOffset('talents')).toBe(-80);
    expect(getChartXAxisLabelOffset('trinket_combos')).toBe(-40);
    expect(getChartXAxisLabelOffset('omnium_folio')).toBe(-40);
  });

  test('should resolve tooltip strategy helpers with fallback behavior', () => {
    expect(getChartTooltipLineStrategy('talents')).toBe('talent');
    expect(getChartTooltipLineStrategy('trinket_combos')).toBe('trinket_combo');
    expect(getChartTooltipLineStrategy('omnium_folio')).toBe('omnium_folio');
    expect(getChartTooltipLineStrategy('unknown-chart')).toBe('wowhead');

    expect(resolveChartTooltipUrlType('special_gear', 'spell')).toBe('item');
    expect(resolveChartTooltipUrlType('racials', 'item')).toBe('spell');
    expect(resolveChartTooltipUrlType('trinkets', 'item')).toBe('item');
    expect(resolveChartTooltipUrlType('trinkets', 'none')).toBe('item');
    expect(resolveChartTooltipUrlType('unknown-chart', 'spell')).toBe('spell');
    expect(resolveChartTooltipUrlType('unknown-chart', 'none')).toBe('item');
  });

  test('should publish non-empty strategy/type enums', () => {
    expect(CHART_TYPES.length).toBeGreaterThan(0);
    expect(TOOLTIP_LINE_STRATEGIES.length).toBeGreaterThan(0);
    expect(TOOLTIP_URL_STRATEGIES.length).toBeGreaterThan(0);
  });

  test('should have icon files for every chart', () => {
    for (const entry of ChartRegistry) {
      const iconPath = path.join(repoRoot, 'images', 'icons', `${entry.iconName}.jpg`);
      expect(fs.existsSync(iconPath)).toBe(true);
    }
  });

  test('should keep Sims export synchronized with registry ids', () => {
    const simIds = Object.keys(Sims);
    const registryIds = ChartRegistry.map((entry) => entry.id);

    expect(simIds.sort()).toEqual(registryIds.sort());
  });

  test('should project chart metadata into lookup maps', () => {
    const withChartType = ChartRegistry.filter((entry) => entry.chartType !== undefined);
    const withLegendTitle = ChartRegistry.filter((entry) => entry.legendTitle !== undefined);
    const withLookupType = ChartRegistry.filter((entry) => entry.lookupType !== undefined);
    const withGuide = ChartRegistry.filter((entry) => entry.guide !== undefined);

    for (const entry of withChartType) {
      expect(ChartType[entry.id]).toBe(entry.chartType);
    }
    expect(ChartPadding.talents).toBe(-80);
    expect(ChartPadding.trinket_combos).toBe(-40);
    for (const entry of withLegendTitle) {
      expect(LegendTitles[entry.id]).toBe(entry.legendTitle);
    }
    for (const entry of withLookupType) {
      expect(LookupType[entry.id]).toBe(entry.lookupType);
    }
    for (const entry of withGuide) {
      expect(IcyVeinsGuideBySim[entry.id]).toEqual(entry.guide);
    }
  });
});
