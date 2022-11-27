var SimTalents = {
  yshaarj_da: "Idol of Y'Shaarj / Dark Ascension",
  yshaarj_yogg_vf: "Idol of Y'Shaarj/Idol of Yogg-Saron/Void Eruption",
  cthun_yogg_vf: "Idol of C'Thun/Idol of Yogg-Saron/Void Eruption",
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
  gems: "Gems",
  special_gear: "Special Gear",
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
  Infernal_Writ: "137485",
  Eye_of_Skovald: "133641",
  Horn_of_Valor: "133642",
  Voidmenders_Shadowgem: "110007",
  Ruby_Whelp_Shell: "193757",
  Tome_of_Unstable_Power: "193628",
  Umbrelskuls_Fractured_Heart: "193639",
  Furious_Ragefeather: "193677",
  Conjured_Chillglobe: "194300",
  Iceblood_Deathsnare: "194304",
  Whispering_Incarnate_Icon_0: "194301",
  Whispering_Incarnate_Icon_1: "194301",
  Whispering_Incarnate_Icon_2: "194301",
  Broodkeepers_Promise: "194307",
  Desperate_Invokers_Codex: "194310",
  Spiteful_Storm: "194309",
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
