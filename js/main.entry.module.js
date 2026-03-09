import { AppState } from './internal/state/AppState.module.js';
import {
  SimRepoVersions,
  Sims,
  Consumables,
  FightStyles,
  FightStyleCouncil,
  FightStyleExternal,
  LegendTitles,
  ChartType,
  ChartPadding,
  LookupType,
  TalentIds,
  TrinketIds,
  getValue,
  getConfigValue,
  getKeys
} from './internal/helper/Converter.module.js';
import * as Constants from './internal/helper/Constants.module.js';
import {
  normalizeSimResultKey,
  normalizeBuildKey,
  normalizeFightStyleForResults,
  normalizeFightStyleForTalentBuild
} from './internal/helper/Normalizers.module.js';
import {
  getQueryParameter,
  manipulateUrl,
  compareParameters
} from './internal/helper/Parameterized.module.js';
import {
  getColor,
  create_color
} from './internal/chart/helper/ColorHelper.module.js';
import * as SeriesHelper from './internal/chart/helper/SeriesHelper.module.js';
import TooltipBuilder from './internal/chart/helper/TooltipBuilder.module.js';
import * as WowheadHelper from './internal/chart/helper/WowheadHelper.module.js';
import * as DomRenderHelper from './internal/helper/DomRenderHelper.module.js';
import * as Definitions from './internal/chart/definitions/Definitions.module.js';
import * as DataHelper from './internal/chart/helper/DataHelper.module.js';
import * as Chart from './internal/chart/Chart.module.js';
import * as Csv from './internal/csv/Csv.module.js';
import * as TalentBuild from './internal/helper/TalentBuild.module.js';
import * as Buttons from './internal/button/Buttons.module.js';
import MainModule from './Main.module.js';

// Bridge module exports into globals so legacy scripts can continue working
// while we migrate files one by one.
if (typeof window !== 'undefined') {
  Object.assign(window, {
    AppState,
    SimRepoVersions,
    Sims,
    Consumables,
    FightStyles,
    FightStyleCouncil,
    FightStyleExternal,
    LegendTitles,
    ChartType,
    ChartPadding,
    LookupType,
    TalentIds,
    TrinketIds,
    getValue,
    getConfigValue,
    getKeys,
    ...Constants,
    normalizeSimResultKey,
    normalizeBuildKey,
    normalizeFightStyleForResults,
    normalizeFightStyleForTalentBuild,
    getQueryParameter,
    manipulateUrl,
    compareParameters,
    getColor,
    create_color,
    TooltipBuilder,
    ...SeriesHelper,
    ...WowheadHelper,
    ...DomRenderHelper,
    ...Definitions,
    ...DataHelper,
    ...Chart,
    ...Csv,
    ...TalentBuild,
    ...Buttons,
    MainModule
  });
}

export {
  AppState,
  SimRepoVersions,
  Sims,
  Consumables,
  FightStyles,
  FightStyleCouncil,
  FightStyleExternal,
  LegendTitles,
  ChartType,
  ChartPadding,
  LookupType,
  TalentIds,
  TrinketIds,
  getValue,
  getConfigValue,
  getKeys,
  Constants,
  normalizeSimResultKey,
  normalizeBuildKey,
  normalizeFightStyleForResults,
  normalizeFightStyleForTalentBuild,
  getQueryParameter,
  manipulateUrl,
  compareParameters,
  getColor,
  create_color,
  TooltipBuilder,
  SeriesHelper,
  WowheadHelper,
  DomRenderHelper,
  Definitions,
  DataHelper,
  Chart,
  Csv,
  TalentBuild,
  Buttons,
  MainModule
};
