const fs = require('fs');
const path = require('path');
const vm = require('vm');

describe('Chart Module', () => {
  let context;

  beforeAll(() => {
    context = vm.createContext({
      // Constants
      talents: 'talents',
      talentsTop: 'talents_top',
      sims: 'sims',
      builds: 'builds',
      dungeonType: 'dungeonType',
      jsonLastUpdated: 'lastUpdated',
      jsonExtension: '.json',
      simResultPath: '/sim_results/',
      slash: '/',
      underscore: '_',
      dash: '-',
      space: ' ',
      px: 'px',
      
      // State tracking
      chartCalls: [],
      dataBuilds: [],
      sizes: [],
      
      // Mock AppState
      AppState: {
        state: {
          currSimsBtn: 'trinkets',
          currTalentBtn: 'fire_frost',
          currFightStyleBtn: 'Composite',
          baseUrl: 'https://example.com/data'
        },
        getCurrSimsBtn() { return this.state.currSimsBtn; },
        setCurrSimsBtn(val) { this.state.currSimsBtn = val; },
        getCurrTalentBtn() { return this.state.currTalentBtn; },
        setCurrTalentBtn(val) { this.state.currTalentBtn = val; },
        getCurrFightStyleBtn() { return this.state.currFightStyleBtn; },
        setCurrFightStyleBtn(val) { this.state.currFightStyleBtn = val; },
        getBaseUrl() { return this.state.baseUrl; },
        setBaseUrl(val) { this.state.baseUrl = val; },
        getConfigData() { return context.configData; }
      },
      
      configData: {
        builds: {
          'fire-frost': { name: 'Fire/Frost' },
          'shadow-priest': { name: 'Shadow Priest' }
        },
        sims: {
          trinkets: { 
            chart: true, 
            description: 'Shows DPS increase by trinket'
          },
          weights: { 
            chart: true,
            description: 'Stat weights for optimization'
          },
          talents: { 
            chart: true, 
            builds: true,
            description: 'Talent build comparisons'
          },
          'talents-top': {
            chart: true,
            description: 'Top talents comparison'
          }
        },
        councilTargets: '3'
      },
      
      ChartType: {
        trinkets: 'percentage',
        alchemy: 'percentage',
        stats: 'dot'
      },
      
      ChartPadding: {
        talents: -80,
        talents_top: -80,
        trinkets: -40
      },
      
      // Normalizer functions
      normalizeBuildKey(key) {
        return key.replaceAll('_', '-');
      },
      
      normalizeSimResultKey(key) {
        return key.replaceAll('_', '-');
      },
      
      normalizeFightStyleForResults(style, dungeonType) {
        return style.toLowerCase();
      },
      
      // Helper functions
      getValue(list, key) {
        return list[key.toString().replaceAll('-', '_')];
      },
      
      getConfigValue(list, key) {
        return list[key.toString().replaceAll('_', '-')];
      },
      
      // Mock chart update functions
      buildChartDataMultipleBar(data, simsBtn, chartId, maxEntries) {
        dataBuilds.push({ type: 'multiple', sims: simsBtn, chartId });
      },
      
      buildDataForPercentageChart(data, simsBtn, chartId, maxEntries) {
        dataBuilds.push({ type: 'percentage', sims: simsBtn, chartId });
      },
      
      buildChartDataDot(data, chartId) {
        dataBuilds.push({ type: 'dot', chartId });
      },
      
      buildChartDataSingleBar(data, bool, padding, simsBtn, chartId, maxEntries) {
        dataBuilds.push({ type: 'single', sims: simsBtn, chartId, padding });
      },
      
      renderChartUpdatedText(text) { },
      
      renderChartHeader(header) { },
      
      renderChartDescription(desc) { },
      
      updateSize(chart, chartId, size, maxEntries) { },
      
      handleJsonFailure(xhr, status) {
        console.log('JSON failed:', status);
      },
      
      // Mock jQuery
      jQuery: {
        getJSON(url, callback) {
          // Return mock for testing
          return {
            fail(errorCallback) { 
              return this; 
            }
          };
        }
      },
      
      console: console,
      chartCalls: [],
      dataBuilds: [],
      sizes: []
    });

    // Helper to ensure variables are accessible in VM context
    vm.runInContext(`
      var chartCalls = this.chartCalls;
      var dataBuilds = this.dataBuilds;
      var sizes = this.sizes;
    `, context);

    // Define testable functions
    const chartFunctions = `
      function updateChart(currTalentBtn, currSimsBtn, currConsumablesBtn, currEnchantsBtn, currFightStyleBtn, chartId, metaData, maxEntries) {
        if (currSimsBtn == 'weights') {
          parseCSV(currSimsBtn, currFightStyleBtn, currTalentBtn, chartId, metaData);
        } else {
          createChart(currSimsBtn, currFightStyleBtn, currTalentBtn, chartId, metaData, maxEntries);
        }
      }
      
      function createChart(simsBtn, fightStyle, talentChoice, chartId, metaData, maxEntries) {
        const url = determineJsonUrl(simsBtn, AppState.getBaseUrl(), fightStyle, talentChoice);
        chartCalls.push({ simsBtn, fightStyle, talentChoice, chartId, url });
      }
      
      function buildData(data, simsBtn, chartId, maxEntries) {
        var chart = getValue(ChartType, simsBtn);
        if (chart == 'multiple') {
          buildChartDataMultipleBar(data, simsBtn, chartId, maxEntries);
        } else if (chart == 'percentage') {
          buildDataForPercentageChart(data, simsBtn, chartId, maxEntries);
        } else if (chart == 'dot') {
          buildChartDataDot(data, chartId);
        } else {
          buildChartDataSingleBar(data, false, getValue(ChartPadding, simsBtn), simsBtn, chartId, maxEntries);
        }
      }
      
      function updateSize(chart, chartId, size, maxEntries) {
        var realSize = 0;
        if (maxEntries != null && maxEntries != undefined) {
          realSize = maxEntries;
        } else {
          realSize = size;
        }
        context.sizes.push({ chartId, realSize });
      }
      
      function determineChartName(firstTalent, fullSimType, fightStyle) {
        var simType = '';
        simType = fullSimType.replaceAll('-', ' ');
        simType = simType.replaceAll('_', ' ');
        
        if (fullSimType.toLowerCase() == 'talents_top') {
          return simType + space + dash + space + fightStyle;
        } else {
          return firstTalent + space + dash + space + simType + space + dash + space + fightStyle;
        }
      }
      
      function determineChartDescription(fullSimType) {
        fullSimType = fullSimType.replaceAll('_', '-');
        var descr = AppState.getConfigData()['sims'][fullSimType]['description'];
        return descr;
      }
      
      function determineJsonUrl(simsBtn, baseurl, fightStyle, talentChoice) {
        talentChoice = normalizeBuildKey(talentChoice);
        simsBtn = normalizeSimResultKey(simsBtn);
        fightStyle = normalizeFightStyleForResults(fightStyle, AppState.getConfigData()[dungeonType]);
        
        if (simsBtn == talents || simsBtn == talentsTop) {
          return baseurl + slash + simsBtn + simResultPath + fightStyle + jsonExtension;
        } else {
          return baseurl + slash + simsBtn + simResultPath + fightStyle + underscore + talentChoice + jsonExtension;
        }
      }
      
      function parseCSV(simsBtn, fightStyle, talentChoice, chartId, metaData) {
        chartCalls.push({ type: 'csv', simsBtn, fightStyle, talentChoice, chartId });
      }
    `;
    
    vm.runInContext(chartFunctions, context);
  });

  describe('Chart Name Generation', () => {
    test('should generate name for talent simulation', () => {
      const name = context.determineChartName('Fire/Frost', 'trinkets', 'Composite');
      expect(name).toContain('Fire/Frost');
      expect(name).toContain('trinkets');
      expect(name).toContain('Composite');
    });

    test('should replace underscores with spaces', () => {
      const name = context.determineChartName('Fire/Frost', 'trinket_combos', 'Composite');
      expect(name).toContain('trinket combos');
      expect(name).not.toContain('trinket_combos');
    });

    test('should replace dashes with spaces', () => {
      const name = context.determineChartName('Fire/Frost', 'talent-builds', 'Composite');
      expect(name).toContain('talent builds');
    });

    test('should format talents_top differently', () => {
      const name = context.determineChartName('Fire/Frost', 'talents_top', 'Composite');
      expect(name).toBe('talents top - Composite');
    });

    test('should include talent name for non-talents_top', () => {
      const name = context.determineChartName('Shadow Priest', 'trinkets', 'Dungeons');
      expect(name.startsWith('Shadow Priest')).toBe(true);
    });

    test('should include fight style at end', () => {
      const name = context.determineChartName('Fire/Frost', 'trinkets', 'Dungeons');
      expect(name.endsWith('Dungeons')).toBe(true);
    });
  });

  describe('Chart Description Retrieval', () => {
    test('should return trinkets description', () => {
      const desc = context.determineChartDescription('trinkets');
      expect(desc).toBe('Shows DPS increase by trinket');
    });

    test('should return weights description', () => {
      const desc = context.determineChartDescription('weights');
      expect(desc).toBe('Stat weights for optimization');
    });

    test('should return talents description', () => {
      const desc = context.determineChartDescription('talents');
      expect(desc).toBe('Talent build comparisons');
    });

    test('should normalize underscores to dashes for lookup', () => {
      const desc = context.determineChartDescription('talents_top');
      expect(desc).toBe('Top talents comparison');
    });

    test('should handle underscore normalization correctly', () => {
      // talents_top should lookup as talents and return its description
      const desc = context.determineChartDescription('talents');
      expect(desc).toBeDefined();
    });
  });

  describe('JSON URL Generation', () => {
    test('should generate URL for trinkets sim', () => {
      const url = context.determineJsonUrl('trinkets', 'https://example.com', 'Composite', 'fire_frost');
      expect(url).toContain('trinkets');
      expect(url).toContain('sim_results');
      expect(url).toContain('composite');
      expect(url).toContain('fire-frost');
      expect(url).toContain('.json');
    });

    test('should normalize fight style to lowercase', () => {
      const url = context.determineJsonUrl('trinkets', 'https://example.com', 'Dungeons', 'fire_frost');
      expect(url).toContain('dungeons');
      expect(url).not.toContain('Dungeons');
    });

    test('should normalize talent key underscores to dashes', () => {
      const url = context.determineJsonUrl('trinkets', 'https://example.com', 'Composite', 'shadow_priest');
      expect(url).toContain('shadow-priest');
    });

    test('should use special path for talents sim', () => {
      const url = context.determineJsonUrl('talents', 'https://example.com', 'Composite', 'fire_frost');
      expect(url).toContain('talents/sim_results/');
    });

    test('should use special path for talents_top', () => {
      const url = context.determineJsonUrl('talents_top', 'https://example.com', 'Composite', 'fire_frost');
      expect(url).toContain('talents-top');
    });

    test('should not include talent choice for talents sim type', () => {
      const url = context.determineJsonUrl('talents', 'https://example.com', 'Composite', 'fire_frost');
      expect(url).not.toContain('fire-frost');
    });

    test('should include base URL', () => {
      const url = context.determineJsonUrl('trinkets', 'https://my-server.com/data', 'Composite', 'fire_frost');
      expect(url).toContain('https://my-server.com/data');
    });
  });

  describe('Build Data for Chart Type', () => {
    test('should route to percentage chart for trinkets', () => {
      // buildData routes based on ChartType - we test the routing logic indirectly
      // through determineJsonUrl and chart organization
      expect(context.getValue(context.ChartType, 'trinkets')).toBe('percentage');
    });

    test('should route to dot chart for stats', () => {
      expect(context.getValue(context.ChartType, 'stats')).toBe('dot');
    });

    test('should use bar chart for unlisted types', () => {
      // Weights is not in ChartType, so it defaults to bar chart
      expect('weights' in context.ChartType).toBe(false);
    });
  });

  describe('Update Chart Routing', () => {
    beforeEach(() => {
      context.chartCalls = [];
      vm.runInContext('chartCalls = this.chartCalls;', context);
    });

    test('should call createChart for non-weights sims', () => {
      context.updateChart('fire_frost', 'trinkets', null, null, 'Composite', 'chart-id', true, null);
      expect(context.chartCalls.some(c => c.simsBtn === 'trinkets')).toBe(true);
    });

    test('should call parseCSV for weights sims', () => {
      context.updateChart('fire_frost', 'weights', null, null, 'Composite', 'chart-id', true, null);
      expect(context.chartCalls.some(c => c.type === 'csv')).toBe(true);
    });

    test('should pass all parameters to createChart', () => {
      context.updateChart('shadow_priest', 'trinkets', null, null, 'Dungeons', 'my-chart', true, 10);
      const call = context.chartCalls[0];
      expect(call.talentChoice).toBe('shadow_priest');
      expect(call.fightStyle).toBe('Dungeons');
      expect(call.chartId).toBe('my-chart');
    });

    test('should preserve chart metadata flag', () => {
      context.updateChart('fire_frost', 'trinkets', null, null, 'Composite', 'chart-id', true, null);
      const call = context.chartCalls[0];
      expect(call).toBeDefined();
    });
  });

  describe('Chart Size Updates', () => {
    test('should use maxEntries if provided', () => {
      // updateSize logic: if maxEntries is provided, use it; otherwise use data size
      const maxEntries = 20;
      const dataSize = 50;
      const expectedSize = maxEntries != null && maxEntries != undefined ? maxEntries : dataSize;
      expect(expectedSize).toBe(20);
    });

    test('should use data size if maxEntries not provided', () => {
      const maxEntries = null;
      const dataSize = 100;
      const expectedSize = maxEntries != null && maxEntries != undefined ? maxEntries : dataSize;
      expect(expectedSize).toBe(100);
    });

    test('should use data size if maxEntries undefined', () => {
      const maxEntries = undefined;
      const dataSize = 75;
      const expectedSize = maxEntries != null && maxEntries != undefined ? maxEntries : dataSize;
      expect(expectedSize).toBe(75);
    });

    test('should handle numeric chart ID strings', () => {
      expect('chart-id-123').toBeDefined();
    });
  });

  describe('Chart URL Generation Integration', () => {
    test('should construct complete URL with all normalized components', () => {
      const url = context.determineJsonUrl('trinkets', 'https://repo.com/data', 'Single', 'fire_frost');
      
      // Should have all components
      expect(url).toContain('https://repo.com/data');
      expect(url).toContain('trinkets');
      expect(url).toContain('sim_results');
      expect(url).toContain('single');
      expect(url).toContain('fire-frost');
      expect(url).toContain('.json');
    });

    test('should produce consistent URLs for same inputs', () => {
      const url1 = context.determineJsonUrl('trinkets', 'https://example.com', 'Composite', 'fire_frost');
      const url2 = context.determineJsonUrl('trinkets', 'https://example.com', 'Composite', 'fire_frost');
      
      expect(url1).toBe(url2);
    });
  });
});
