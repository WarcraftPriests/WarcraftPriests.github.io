var SimRepoVersions = {
  master: "Live",
  // ptr: "PTR",
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
  threetarget: "3 Target",
  fourtarget: "4 Target",
  eighttarget: "8 Target",
};

var FightStyleCouncil = {
  3: "threetarget",
  4: "fourtarget"
}
  
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
  Spymasters_Web: "220202",
  Signet_of_the_Priory: "219308",
  Synergistic_Brewterializer: "219299",
  Carved_Blazikon_Wax: "219305",
  Gigazaps_Zap_Cap: "232545",
  Soulletting_Ruby: "178809",
  Ingenious_Mana_Battery: "169344",
  Geargrinders_Spare_Keys: "230197",
  Flarendos_Pilot_Light: "230191",
  Reverb_Radio: "230194",
  Mister_Lock_N_Stalk: "230193",
  House_of_Cards: "230027",
  Mugs_Moxie_Jug: "230192",
  Eye_of_Kezan: "230198",
  Quickwick_Candlestick: "225649",
  Shadowbinding_Ritual_Knife: "215178",
  Candle_Confidant: "225648",
  Entropic_Skardyn_Core: "219296",
  Suspicious_Energy_Drink: "235363",
  Funhouse_Lens: "234217",
  Amorphous_Relic: "232891",
  Prized_Gladiators_Badge_of_Ferocity: "229780",
  Empowering_Crystal_of_Anubikkaj: "219312",
  Mereldars_Toll: "219313",
  AraKara_Sacbrood: "219314",
  Bursting_Lightshard: "219310",
  Lily_of_the_Eternal_Weave: "242494",
  Azhiccaran_Parapodia: "242497",
  Sunblood_Amethyst: "178826",
  Miniscule_Mailemental_in_an_Envelope: "185846",
  Soleahs_Secret_Technique_Haste: "190958",
  Soleahs_Secret_Technique_Mastery: "190958",
  Diamantine_Voidcore: "242392",
  Astral_Antenna: "242395",
  Unyielding_Netherprism: "242396",
  Naazindhris_Mystic_Lash: "242398",
  Screams_of_a_Forgotten_Sky: "242399",
  Arazs_Ritual_Forge: "242402",
  Perfidious_Projector: "242403",
  Astral_Gladiators_Badge_of_Ferocity: "230638",
  Incorporeal_Essence_Gorger_NonEthereal: "246945",
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
