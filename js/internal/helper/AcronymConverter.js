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
  trinkets: "Trinkets",
  weights: "Weights",
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
}

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
}

var Conduits2 = [
  "venthyr",
  "necrolord",
  "night_fae",
  "kyrian",
];

var getConduitIds = function (key) {
  return ConduitsIds[key];
}

var getTalentIds = function (key) {
  return TalentIds[key];
}

var getTalentSimsName = function (key) {
  return SimTalents[key];
}

var getConduitsName = function (key) {
  return Conduits[key];
};

var getTalentName = function (key) {
  return Talents[key];
};

var getFightStyleName = function (key) {
  return FightStyles[key];
};

var getTalentSimsName = function (key) {
  return SimTalents[key];
};

var getSimsName = function (key) {
  return Sims[key];
};

var getConsumablesName = function (key) {
  return Consumables[key];
};

var getFightStyleExtName = function (key) {
  return FightStyleExternal[key];
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
