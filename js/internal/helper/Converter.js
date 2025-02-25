// Map from gh branch name to sim version. Default to master
var SimVersions = {
  master: "Live",
  ptr: "PTR",
}
  
var Sims = {
  consumables: "Consumables",
  enchants: "Enchants",
  racials: "Racials",
  stats: "Stats",
  talents_top: "Talents",
  talents: "Talents",
  talent_builds: "Talent Builds",
  trinkets: "Trinkets",
  weights: "Weights",
  trinket_combos: "Trinket Combos",
  tiersets: "Tiersets",
  alchemy: "Alchemy",
  gems: "Gems",
  special_gear: "Special Gear",
  gem_combos: "Gem Combos",
};
  
var Consumables = {
  potion: "Potion",
  food: "Food",
};
  
var FightStyles = {
  Composite: "Composite",
  Single: "Single Target",
  Dungeons: "Dungeons",
  twotarget: "2 Target",
  // threetarget: "3 Target",
  fourtarget: "4 Target",
  eighttarget: "8 Target",
};
  
var FightStyleExternal = {
  composite: "Raid",
  single: "Single Target",
  dungeons: "Dungeons",
};

var LegendTitles = {
  enchants: "Increase in %",
  racials: "Increase in %",
  stats: "Increase in %",
  talents_top: "Increase in %",
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
  alchemy: "percentage",
  enchants: "percentage",
  gems: "percentage",
  stats: "dot",
};

var ChartPadding = {
  talents: -80,
  talents_top: -80,
  talent_builds: -80,
  racials: -40,
  enchants: -40,
  trinket_combos: -40,
  tiersets: -40,
  consumables: -40,
  alchemy: -40,
  gems: -40,
  gem_combos: -40,
  special_gear: -40,
};

var LookupType = {
  alchemy: "item",
  apl: "none",
  consumables: "item",
  enchants: "item",
  gear: "item",
  racials: "spell",
  special_gear: "spell",
  stats: "none",
  talents_top: "none",
  talents: "none",
  talent_builds: "none",
  trinket_combos: "none",
  trinkets: "none",
  weights: "none"
}

//Todo fix coming when clean up label for talents
var TalentIds = {
  hv: "1234123",
}

var TrinketIds = {
  Energy_Siphon: "156021",
  Living_Flame: "155947",
  Ara_Kara_Sacbrood: "219314",
  Empowering_Crystal_of_Anubikkaj: "219312",
  Unbound_Changeling_All: "178708",
  Unbound_Changeling_Haste: "178708",
  Unbound_Changeling_Mastery: "178708",
  Satchel_of_Misbegotten_Minions: "178772",
  Hadals_Nautilus: "159622",
  Gale_of_Shadows: "133304",
  Aberrant_Spellforge: "212451",
  Spymasters_Web: "220202",
  Ovinaxs_Mercurial_Egg: "220305",
  Treacherous_Transmitter: "221023",
  Quickwick_Candlestick: "225649",
  Forged_Gladiators_Badge_of_Ferocity: "218713",
  Shadowbinding_Ritual_Knife: "215178",
  Mad_Queens_Mandate: "212454",
  Candle_Confidant: "225648",
  Burst_of_Knowledge: "231424",
}

var getValue = function(list, key) {
    return list[key.toString().replaceAll("-", "_")];
};

var getConfigValue = function(list, key) {
  return list[key.toString().replaceAll("_", "-")]
}

var getKeys = function(list) {
  let result = [];
  let values = Object.values(list);
  let keys = Object.entries(list);
  for (i = 0; i < values.length; i++) {
    result.push(keys[i][0]);
  }
  
  return result;
};
