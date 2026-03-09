import { AppState } from './services/state/AppState.module.js';
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
} from './utils/Converter.module.js';
import * as Constants from './utils/Constants.module.js';
import {
  normalizeSimResultKey,
  normalizeBuildKey,
  normalizeFightStyleForResults,
  normalizeFightStyleForTalentBuild
} from './utils/Normalizers.module.js';
import {
  getQueryParameter,
  manipulateUrl,
  compareParameters
} from './services/url/Parameterized.module.js';
import {
  getColor,
  create_color
} from './modules/chart/helpers/ColorHelper.module.js';
import * as SeriesHelper from './modules/chart/helpers/SeriesHelper.module.js';
import TooltipBuilder from './modules/chart/helpers/TooltipBuilder.module.js';
import * as WowheadHelper from './modules/chart/helpers/WowheadHelper.module.js';
import * as DomRenderHelper from './utils/DomRenderHelper.module.js';
import * as Definitions from './modules/chart/definitions/Definitions.module.js';
import * as DataHelper from './modules/chart/helpers/DataHelper.module.js';
import * as Chart from './modules/chart/Chart.module.js';
import * as Csv from './modules/csv/Csv.module.js';
import * as TalentBuild from './modules/talents/TalentBuild.module.js';
import * as Buttons from './modules/buttons/Buttons.module.js';
import MainModule from './app.module.js';

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
