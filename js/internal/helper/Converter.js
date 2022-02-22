var SimTalents = {
  am: "Ancient Madness",
  hv: "Hungering Void",
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
  legendary_combos: "Legendary Combos",
  racials: "Racials",
  shards_of_domination: "Shards of Domination",
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
  BP: "352417",
  ME: "350936",
  CE: "350899",
  KO: "352110",
  PC: "356390",
  BH: "352503",
  DRD: "352786",
  WHS: "352805",
  BT: "351146",
  NR: "351149",
  LTP: "351491",
  SoS: "352186",
  EAA: "352188",
  AAF: "357902",
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
  shards_of_domination: "Increase in %",
  soulbinds: "Increase in %",
  soulbind_traits: "Increase in %",
  soulbinds_launch: "Increase in %",
  stats: "Increase in %",
  talents: "Increase in %",
  talent_builds: "Increase in %",
  trinkets: "Item level",
  legendary_items: "Item level",
  legendary_combos: "Increase in %",
};

var ChartType = {
  covenant_choice: "multiple",
  conduits: "percentage",
  legendary_items: "percentage",
  //legendary_combos: "percentage",
  trinkets: "percentage",
  stats: "dot",
};

var ChartPadding = {
  talents: -80,
  talent_builds: -80,
  covenants: -40,
  legendaries: -40,
  soulbinds: -60,
  conduit_combos: -40,
  soulbind_traits: -40,
  soulbinds_launch: -60,
  racials: -40,
  soulbinds_prog: -60,
  shards_of_domination: -40,
  consumables: -40,
  covenant_choice: -40,
  covenants_launch: -40,
  covenants_prog: -40,
  enchants: -40,
  trinket_combos: -40,
  legendary_combos: -10,
  tiersets: -40,
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
  shards_of_domination: "spell",
  covenant_choice: "none",
  covenants: "spell",
  covenants_launch: "spell",
  coventants_prog: "spell",
  enchants: "spell",
  gear: "item",
  legendaries: "spell",
  legendary_combos: "none",
  legendary_items: "spell",
  racials: "spell",
  soulbind_traits: "spell",
  soulbinds: "none",
  soulbinds_launch: "none",
  soulbinds_prog: "none",
  stats: "none",
  talents: "none",
  talent_builds: "none",
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