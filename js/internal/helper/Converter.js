var SimTalents = {
  am: "Ancient Madness",
  hv: "Hungering void",
  hv_as: "Hungering Void - Auspicious Spirits",
  hv_sc: "Hungering Void - Shadow Crash",
  stm: "Surrender To Madness",
};
  
var Sims = {
  conduit_combos: "Conduit Combos",
  conduits: "Conduits",
  consumables: "Consumables",
  covenant_choice: "Covenants Choice",
  covenants_launch: "Covenants launch",
  covenants_prog: "Covenants prog",
  covenants: "Covenants",
  enchants: "Enchants",
  legendaries: "Legendaries",
  legendary_items: "Legendary items",
  racials: "Racials",
  soulbind_traits: "Soulbind Traits",
  soulbinds_launch: "Soulbind Launch",
  soulbinds_prog: "Soulbind prog",
  soulbinds: "Soulbinds",
  stats: "Stats",
  talents: "Talents",
  talent_builds: "Talent Builds",
  trinkets: "Trinkets",
  weights: "Weights",
  trinket_combos: "Trinket Combos",
};
  
var Consumables = {
  potion: "Potion",
  food: "Food",
};
  
var Talents = {
  // Row 15
  fotm: "Fortress of the Mind",
  dam: "Death and Madness",
  ud: "Unfurling Darkness",
  
  // Row 25
  bns: "Body and Soul",
  sl: "San'layn",
  in: "Intangibility",
  
  // Row 30
  tof: "Twist of Fate",
  mis: "Misery",
  sn: "Searing Nightmare",
  
  // Row 35
  lw: "Last Word",
  mbo: "Mind Bomb",
  ph: "Phsychic Horror",
  
  // Row 40
  as: "Auspicious Spirits",
  pl: "Psychic Link",
  sc: "Shadow Crash",
  
  // Row 45
  dm: "Damnation",
  mb: "Mindbender",
  vt: "Void Torrent",
  
  // Row 50
  am: "Ancient Madness",
  hv: "Hungering Void",
  stm: "Surrender To Madness",
};
  
var FightStyles = {
  Composite: "Composite",
  Single: "Single Target",
  Dungeons: "Dungeons",
};
  
var FightStyleExternal = {
  composite: "Raid",
  single: "Single Target",
  dungeons: "Dungeons",
};
  
var Conduits = {
  kyrian: "Kyrian",
  necrolord: "Necrolord",
  night_fae: "Night Fae",
  venthyr: "Venthyr",
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
  
var ConduitsIds = {
  HA: "338319",
  DE: "338342",
  MD: "338332",
  RS: "338338",
  SP: "338315",
  FF: "338305",
  FT: "337979",
  CA: "337966",
  SS: "336239",
  TS: "331586",
  EP: "331580",
  DT: "331584",
  WP: "319983",
  BFW: "319973",
  GI: "322721",
  NTP: "320660",
  NTB: "320659",
  FOB: "319191",
  SB: "319210",
  WHT: "325066",
  FS: "325069",
  LGOTP: "328257",
  CM: "328266",
  PC: "329778",
  BCTA: "333950",
  HOG: "333935",
  PPS: "323090",
  LBE: "342181",
  GC: "323919",
  HAMG: "326572",
  VS: "323074",
  DD: "331584",
  RP: "336243",
  FR: "326514",
};

var LegendTitles = {
  conduits: "Conduits Rank",
  conduit_combos: "Increase in %",
  consumables: "Increase in %",
  covenants: "Increase in %",
  covenantsChoice: "Increase in %",
  enchants: "Increase in %",
  legendaries: "Increase in %",
  racials: "Increase in %",
  soulbinds: "Increase in %",
  soulbind_traits: "Increase in %",
  soulbinds_launch: "Increase in %",
  stats: "Increase in %",
  talents: "Increase in %",
  trinkets: "Item level",
  legendary_items: "Item level",
};

var ChartType = {
  covenant_choice: "multiple",
  conduits: "percentage",
  legendary_items: "percentage",
  trinkets: "percentage",
  stats: "dot",
};

var ChartPadding = {
  talents: -80,
  covenants: -40,
  legendaries: -40,
  soulbinds: -60,
  conduit_combos: -40,
  soulbind_traits: -40,
  soulbinds_launch: -60,
  racials: -40,
  soulbinds_prog: -60,
  consumables: -40,
  covenant_choice: -40,
  covenants_launch: -40,
  covenants_prog: -40,
  enchants: -40,
  trinket_combos: -40,
};

var AggregateConduits = [
  "venthyr",
  "necrolord",
  "night_fae",
  "kyrian",
];

var LookupType = {
  apl: "none",
  conduit_combos: "none",
  conduits: "spell",
  consumables: "spell",
  covenant_choice: "none",
  covenants: "spell",
  covenants_launch: "spell",
  coventants_prog: "spell",
  enchants: "spell",
  gear: "item",
  legendaries: "spell",
  legendary_items: "spell",
  racials: "spell",
  soulbind_traits: "spell",
  soulbinds: "none",
  soulbinds_launch: "none",
  soulbinds_prog: "none",
  stats: "none",
  talents: "none",
  trinket_combos: "none",
  trinkets: "none",
  weights: "none"
}

var TrinketIds = {
  Cabalists_Hymnal_Allies_4: "184028",
  Cabalists_Hymnal_Allies_3: "184028",
  Cabalists_Hymnal_Allies_2: "184028",
  Cabalists_Hymnal_Allies_1: "184028",
  Cabalists_Hymnal_Allies_0: "184028",
  Inscrutable_Quantum_Device: "179350",
  Empyreal_Ordnance: "180117",
  Dreadfire_Vessel: "184030",
  Glyph_of_Assimilation: "184021",
  Soul_Igniter: "184019",
  Macabre_Sheet_Music: "184024",
  Soulletting_Ruby: "178809",
}

var getValue = function(list, key) {
    return list[key.replace("-", "_")];
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