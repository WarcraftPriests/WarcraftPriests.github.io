var SimTalents = {
  yshaarj_da: "Idol of Y'Shaarj / Dark Ascension",
  yshaarj_yogg_vf: "Idol of Y'Shaarj/Idol Yogg-Suron/Void Erruption",
  cthun_yogg_vf: "Idol of C'Thun/Idol Yogg-Suron/Void Erruption",
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
  twotarget: "2 Target",
  fourtarget: "4 Target",
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
  talent_builds: -80,
  racials: -40,
  enchants: -40,
  trinket_combos: -40,
  tiersets: -40,
  consumables: -40,
  alchemy: -40,
  gems: -40,
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

//Todo fix coming when clean up label for talents
var TalentIds = {
  hv: "1234123",
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
