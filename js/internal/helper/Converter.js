var SimTalents = {
  yshaarj_da: "yshaarj_da",
  yshaarj_yogg_vf: "yshaarj_yogg_vf",
  cthun_yogg_vf: "cthun_yogg_vf",
};
  
var Sims = {
  consumables: "Consumables",
  enchants: "Enchants",
  racials: "Racials",
  stats: "Stats",
  talents: "Talents",
  talent_builds: "Talent Builds",
  trinkets: "Trinkets",
  weights: "Weights",
  trinket_combos: "Trinket Combos",
  tiersets: "Tiersets",
  alchemy: "Alchemy",
  gems: "Gems"
};
  
var Consumables = {
  potion: "Potion",
  food: "Food",
};
  
var FightStyles = {
  Composite: "Composite",
  Single: "Single Target",
  Dungeons: "Dungeons",
  twoset: "2T",
  fourset: "4T",
};
  
var FightStyleExternal = {
  composite: "Raid",
  single: "Single Target",
  dungeons: "Dungeons",
};
  
var TalentIds = {
  FOTM: "193195",
  DAM: "321291",
  UD: "341273",
  BNS: "64129",
  SL: "199855",
  IN: "288733",
  TOF: "109142",
  MIS: "238558",
  SN: "341385",
  LW: "263716",
  MBO: "205369",
  PH: "64044",
  AS: "155271",
  PS: "199484",
  SC: "205385",
  DM: "341374",
  MB: "123040",
  VT: "263165",
  AM: "341240",
  HV: "345218",
  STM: "193223",
};

var LegendTitles = {
  enchants: "Increase in %",
  racials: "Increase in %",
  stats: "Increase in %",
  talents: "Increase in %",
  talent_builds: "Increase in %",
  trinkets: "Item level",
  legendary_items: "Item level",
  legendary_combos: "Increase in %",
  alchemy: "Increase in %",
  consumables: "Increase in %",
};

var ChartType = {
  trinkets: "percentage",
  consumables: "percentage",
  //talents: "percentage",
  stats: "dot",
  //alchemy: "percentage",
};

var ChartPadding = {
  talents: -80,
  talent_builds: -80,
  racials: -40,
  enchants: -40,
  trinket_combos: -40,
  tiersets: -40,
};

var LookupType = {
  apl: "none",
  consumables: "spell",
  enchants: "spell",
  gear: "item",
  racials: "spell",
  stats: "none",
  talents: "none",
  talent_builds: "none",
  trinket_combos: "none",
  trinkets: "none",
  weights: "none"
}

var TrinketIds = {
  Cabalists_Hymnal_Allies_4: "184028",
}

var getValue = function(list, key) {
    return list[key.toString().replaceAll("-", "_")];
};

var getKeys = function(list) {
  let result = [];
  let values = Object.values(list);
  let keys = Object.entries(list);
  for (i = 0; i < values.length; i++) {
    result.push(keys[i][0]);
  }
  
  return result;
};