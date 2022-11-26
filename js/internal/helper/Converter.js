var SimTalents = {
  am: "Ancient Madness",
  hv: "Hungering Void",
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
  PoC: "329778",
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
  PF: "351750",
  FAFL: "352373",
  BP: "352417"
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
};

var ChartType = {
  trinkets: "percentage",
  stats: "dot",
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
  Cabalists_Hymnal_Allies_3: "18402
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
  Forbidden_Necromantic_Tome: "186421",
  Tome_of_Monstrous_Constructions: "186422",
  Titanic_Ocular_Gland: "186423",
  Shadowed_Orb_of_Torment: "186428",
  Ebonsoul_Vise: "186431",
  Tome_of_Insight: "186156",
  Unbound_Changeling_Mastery: "178708",
  Unbound_Changeling_Haste: "178708",
  Unbound_Changeling_All: "178708",
  Moonlit_Prism: "137541",
  Resonant_Reservoir: "188272",
  Elegy_of_the_Eternals: "188270",
  The_First_Sigil: "188271",
  Architects_Ingenuity_Core: "188268",
  Grim_Eclipse: "188254",
  Scars_of_Fraternal_Strife: "188253",
  Tovras_Lightning_Repository: "110001",
  Fleshrenders_Meathook: "110002",
  Soleahs_Secret_Technique_Haste: "190958",
  Soleahs_Secret_Technique_Mastery: "190958",
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