var SimTalents = {
  vf_yogg_cthun: "Void Eruption + Yogg / C'Thun",
  da_cthun: "Dark Ascension + C'Thun",
  vf_nzoth_yogg_cthun_dr: "Void Eruption + Triple Idol + DR",
  vf_nzoth_yogg_cthun_me: "Void Eruption + Triple Idol + ME",
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
  Pips_Emerald_Friendship_Badge: "207168",
  Nymues_Unraveling_Spindle: "208615",
  Nymues_Unraveling_Spindle_IMMOBILIZED: "208615",
  Belorrelos_the_Suncaller: "207172",
  Augury_of_the_Primal_Flame: "208614",
  Ashes_of_the_Embersoul: "207167",
  Spoils_of_Neltharus: "193773",
  Tome_of_Unstable_Power: "193628",
  Umbrelskuls_Fractured_Heart: "193639",
  Furious_Ragefeather: "193677",
  Irideus_Fragment: "193743",
  Idol_of_Pure_Decay: "193660",
  Erupting_Spear_Fragment: "193769",
  Time_Breaching_Talon: "193791",
  Emerald_Coachs_Whistle: "193718",
  Conjured_Chillglobe: "194300",
  Iceblood_Deathsnare: "194304",
  Whispering_Incarnate_Icon_DPS: "194301",
  Whispering_Incarnate_Icon_FULL: "194301",
  Whispering_Incarnate_Icon_TankDPS: "194301",
  Whispering_Incarnate_Icon_HealerDPS: "194301",
  Desperate_Invokers_Codex: "194310",
  Spiteful_Storm: "194309",
  Screaming_Black_Dragonscale: "202612",
  Vessel_of_Searing_Shadow: "202615",
  Ominous_Chromatic_Essence_Obsidian: "203729",
  Ominous_Chromatic_Essence_Ruby: "203729",
  Ominous_Chromatic_Essence_Azure: "203729",
  Ominous_Chromatic_Essence_Bronze: "203729",
  Ominous_Chromatic_Essence_Emerald: "203729",
  Ominous_Chromatic_Essence_Obsidian_AllAllies: "203729",
  Ominous_Chromatic_Essence_Ruby_AllAllies: "203729",
  Ominous_Chromatic_Essence_Azure_AllAllies: "203729",
  Ominous_Chromatic_Essence_Bronze_AllAllies: "203729",
  Ominous_Chromatic_Essence_Emerald_AllAllies: "203729",
  Igneous_Flowstone: "203996",
  Neltharions_Call_to_Suffering: "204211",
  Beacon_to_the_Beyond: "203963",
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
