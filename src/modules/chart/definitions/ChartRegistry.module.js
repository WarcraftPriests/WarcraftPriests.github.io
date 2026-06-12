const GUIDE_URLS = {
  default: {
    label: 'General Shadow Priest PvE Guide',
    url: 'https://www.icy-veins.com/wow/shadow-priest-pve-dps-guide'
  },
  talents: {
    label: 'Talents and Builds',
    url: 'https://www.icy-veins.com/wow/shadow-priest-pve-dps-spec-builds-talents'
  },
  stats: {
    label: 'Stat Priority',
    url: 'https://www.icy-veins.com/wow/shadow-priest-pve-dps-stat-priority'
  },
  gemsAndConsumables: {
    label: 'Gems, Enchants, and Consumables',
    url: 'https://www.icy-veins.com/wow/shadow-priest-pve-dps-gems-enchants-consumables'
  },
  gear: {
    label: 'Gear and Best in Slot',
    url: 'https://www.icy-veins.com/wow/shadow-priest-pve-dps-gear-best-in-slot'
  },
  rotation: {
    label: 'Rotation',
    url: 'https://www.icy-veins.com/wow/shadow-priest-pve-dps-rotation-cooldowns-abilities'
  }
};

function toTitleCaseId(id) {
  return id
    .split('_')
    .filter(function(part) { return part !== ''; })
    .map(function(part) {
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join(' ');
}

function defineChart(id, overrides) {
  var definition = overrides || {};
  return {
    id: id,
    label: definition.label || toTitleCaseId(id),
    iconName: definition.iconName || id,
    tooltipLineStrategy: definition.tooltipLineStrategy || 'wowhead',
    ...definition
  };
}

export const CHART_TYPES = Object.freeze(['percentage', 'dot', 'multiple']);
export const TOOLTIP_LINE_STRATEGIES = Object.freeze(['wowhead', 'talent', 'trinket_combo', 'omnium_folio']);
export const TOOLTIP_URL_STRATEGIES = Object.freeze(['auto', 'item', 'spell', 'none']);

export const ChartRegistry = [
  defineChart('consumables', {
    guide: GUIDE_URLS.gemsAndConsumables,
    legendTitle: 'Increase in %',
    lookupType: 'item',
    tooltipUrlStrategy: 'item'
  }),
  defineChart('enchants', {
    guide: GUIDE_URLS.gemsAndConsumables,
    legendTitle: 'Increase in %',
    chartType: 'percentage',
    lookupType: 'item',
    tooltipUrlStrategy: 'item'
  }),
  defineChart('racials', {
    guide: GUIDE_URLS.rotation,
    legendTitle: 'Increase in %',
    lookupType: 'spell',
    tooltipUrlStrategy: 'spell'
  }),
  defineChart('stats', {
    guide: GUIDE_URLS.stats,
    legendTitle: 'Increase in %',
    chartType: 'dot',
    lookupType: 'none'
  }),
  defineChart('talents_top', {
    label: 'Talents',
    guide: GUIDE_URLS.talents,
    legendTitle: 'Increase in %',
    lookupType: 'none',
    tooltipLineStrategy: 'talent'
  }),
  defineChart('talents', {
    guide: GUIDE_URLS.talents,
    legendTitle: 'Increase in %',
    lookupType: 'none',
    tooltipLineStrategy: 'talent'
  }),
  defineChart('talent_builds', {
    guide: GUIDE_URLS.talents,
    legendTitle: 'Increase in %',
    lookupType: 'none',
    tooltipLineStrategy: 'talent'
  }),
  defineChart('trinkets', {
    guide: GUIDE_URLS.gear,
    legendTitle: 'Item level',
    chartType: 'percentage',
    lookupType: 'none',
    tooltipUrlStrategy: 'item'
  }),
  defineChart('weights', {
    guide: GUIDE_URLS.stats,
    lookupType: 'none'
  }),
  defineChart('trinket_combos', {
    guide: GUIDE_URLS.gear,
    lookupType: 'none',
    tooltipLineStrategy: 'trinket_combo',
    tooltipUrlStrategy: 'item'
  }),
  defineChart('tiersets', {
    guide: GUIDE_URLS.gear
  }),
  defineChart('alchemy', {
    guide: GUIDE_URLS.gemsAndConsumables,
    legendTitle: 'Increase in %',
    chartType: 'percentage',
    lookupType: 'item',
    tooltipUrlStrategy: 'item'
  }),
  defineChart('gems', {
    guide: GUIDE_URLS.gemsAndConsumables,
    chartType: 'percentage',
    tooltipUrlStrategy: 'item'
  }),
  defineChart('special_gear', {
    guide: GUIDE_URLS.gear,
    lookupType: 'spell',
    tooltipUrlStrategy: 'item'
  }),
  defineChart('gem_combos', {
    guide: GUIDE_URLS.gemsAndConsumables
  }),
  defineChart('omnium_folio', {
    guide: GUIDE_URLS.gear,
    legendTitle: 'Increase in %',
    chartType: 'percentage',
    lookupType: 'spell',
    tooltipLineStrategy: 'omnium_folio',
    tooltipUrlStrategy: 'spell',
    xAxisLabelOffset: -34
  })
];

export const DefaultGuide = GUIDE_URLS.default;

const chartRegistryById = ChartRegistry.reduce(function(result, entry) {
  result[entry.id] = entry;
  return result;
}, {});

export function getChartRegistryEntry(chartId) {
  if (chartId == null) {
    return undefined;
  }

  return chartRegistryById[chartId.toString().replaceAll('-', '_')];
}

export function getChartLegendTitle(chartId) {
  var entry = getChartRegistryEntry(chartId);
  return entry ? entry.legendTitle : undefined;
}

export function getChartXAxisLabelOffset(chartId) {
  var entry = getChartRegistryEntry(chartId);
  if (!entry) {
    return undefined;
  }

  if (entry.xAxisLabelOffset !== undefined) {
    return entry.xAxisLabelOffset;
  }

  var strategy = entry.tooltipLineStrategy || 'wowhead';
  if (strategy === 'talent') {
    return -80;
  }

  if (strategy === 'wowhead' || strategy === 'trinket_combo' || strategy === 'omnium_folio') {
    return -40;
  }

  return undefined;
}

export function getChartTooltipLineStrategy(chartId) {
  var entry = getChartRegistryEntry(chartId);
  return entry && entry.tooltipLineStrategy ? entry.tooltipLineStrategy : 'wowhead';
}

export function resolveChartTooltipUrlType(chartId, lookupType) {
  var entry = getChartRegistryEntry(chartId);
  var strategy = entry && entry.tooltipUrlStrategy ? entry.tooltipUrlStrategy : 'auto';

  if (strategy === 'item' || strategy === 'spell' || strategy === 'none') {
    return strategy;
  }

  if (lookupType === 'spell') {
    return 'spell';
  }

  return 'item';
}

export function validateChartRegistry(registry) {
  var entries = Array.isArray(registry) ? registry : [];
  var errors = [];
  var seenIds = new Set();

  entries.forEach(function(entry, index) {
    var prefix = 'Entry #' + index;

    if (!entry || typeof entry !== 'object') {
      errors.push(prefix + ': must be an object.');
      return;
    }

    if (typeof entry.id !== 'string' || entry.id.length === 0) {
      errors.push(prefix + ': id must be a non-empty string.');
      return;
    }

    if (!/^[a-z0-9_]+$/.test(entry.id)) {
      errors.push(prefix + ' (' + entry.id + '): id must be snake_case.');
    }

    if (seenIds.has(entry.id)) {
      errors.push(prefix + ' (' + entry.id + '): duplicate id.');
    }
    seenIds.add(entry.id);

    if (typeof entry.label !== 'string' || entry.label.length === 0) {
      errors.push(prefix + ' (' + entry.id + '): label must be a non-empty string.');
    }

    if (typeof entry.iconName !== 'string' || entry.iconName.length === 0) {
      errors.push(prefix + ' (' + entry.id + '): iconName must be a non-empty string.');
    }

    if (!entry.guide || typeof entry.guide !== 'object') {
      errors.push(prefix + ' (' + entry.id + '): guide must be an object with label and url.');
    } else {
      if (typeof entry.guide.label !== 'string' || entry.guide.label.length === 0) {
        errors.push(prefix + ' (' + entry.id + '): guide.label must be a non-empty string.');
      }
      if (typeof entry.guide.url !== 'string' || entry.guide.url.length === 0) {
        errors.push(prefix + ' (' + entry.id + '): guide.url must be a non-empty string.');
      }
    }

    if (entry.chartType !== undefined && !CHART_TYPES.includes(entry.chartType)) {
      errors.push(prefix + ' (' + entry.id + '): chartType must be one of ' + CHART_TYPES.join(', ') + '.');
    }

    if (entry.tooltipLineStrategy !== undefined && !TOOLTIP_LINE_STRATEGIES.includes(entry.tooltipLineStrategy)) {
      errors.push(prefix + ' (' + entry.id + '): tooltipLineStrategy must be one of ' + TOOLTIP_LINE_STRATEGIES.join(', ') + '.');
    }

    if (entry.tooltipUrlStrategy !== undefined && !TOOLTIP_URL_STRATEGIES.includes(entry.tooltipUrlStrategy)) {
      errors.push(prefix + ' (' + entry.id + '): tooltipUrlStrategy must be one of ' + TOOLTIP_URL_STRATEGIES.join(', ') + '.');
    }

    if (entry.lookupType !== undefined && entry.lookupType !== 'item' && entry.lookupType !== 'spell' && entry.lookupType !== 'none') {
      errors.push(prefix + ' (' + entry.id + '): lookupType must be one of item, spell, none.');
    }

    if (entry.xAxisLabelOffset !== undefined && typeof entry.xAxisLabelOffset !== 'number') {
      errors.push(prefix + ' (' + entry.id + '): xAxisLabelOffset must be a number.');
    }
  });

  return errors;
}
