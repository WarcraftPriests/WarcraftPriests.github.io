var SimTalents = {
  da_yshaarj_cthun: "Dark Ascension + Idol of Y'Shaarj / Idol of C'Thun",
  da_yshaarj_nzoth_cthun: "Dark Ascension + Idol of Y'Shaarj / Idol of N'Zoth / Idol of C'Thun",
  vf_yshaarj: "Void Eruption + Idol of Y'Shaarj",
};
  
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
  threetarget: "3 Target",
  // fourtarget: "4 Target",
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
  Vessel_of_Skittering_Shadows: "159610",
  Caged_Horror: "136716",
  Corrupted_Starlight: "137301",
  Oakhearts_Gnarled_Root: "137306",
  Coagulated_Genesaur_Blood: "110004",
  Sea_Star: "133201",
  Balefire_Branch: "159630",
  Lady_Waycrests_Music_Box: "159631",
  Mirror_of_Fractured_Tomorrows: "207581",
  Time_Thiefs_Gambit: "207579",
  Pips_Emerald_Friendship_Badge: "207168",
  Nymues_Unraveling_Spindle: "208615",
  Nymues_Unraveling_Spindle_IMMOBILIZED: "208615",
  Belorrelos_the_Suncaller: "207172",
  Augury_of_the_Primal_Flame: "208614",
  Ashes_of_the_Embersoul: "207167",
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
