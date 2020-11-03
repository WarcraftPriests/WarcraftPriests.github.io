var SimTalents = {
  am: "Ancient Madness",
  hv: "Hungering void",
  hv_as: "Hungering Void - Auspicious Spirits",
  hv_pl: "Hungering Void - Psychic Link",
  stm: "Surrender To Madness",
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

var Sims = {
  conduit_combos: "Conduit Combos",
  conduits: "Conduits",
  consumables: "Consumables",
  covenantsChoice: "Covenants Choice",
  covenants: "Covenants",
  enchants: "Enchants",
  //gear: "Gear",
  legendaries: "Legendaries",
  racials: "Racials",
  soulbind_traits: "Soulbind Traits",
  soulbinds_launch: "Soulbind Launch",
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

var Conduits = {
  kyrian: "Kyrian",
  necrolord: "Necrolord",
  night_fae: "Night Fae",
  venthyr: "Venthyr",
};

var Conduits2 = [
  "venthyr",
  "necrolord",
  "night_fae",
  "kyrian",
];

var getTalentSimsName = function (key) {
  if(key.includes("-")) {
    key = key.replace("-", "_");
  }
  return SimTalents[key];
}


var getConsumablesName = function (key) {
  return Consumables[key];
};

var getConsumablesShortName = function (key) {
  return getShortName(key, Consumables)
};

var getConduitsName = function (key) {
  return Conduits[key];
};

var getConduitsShortName = function (key) {
  return getShortName(key, Conduits)
};

var getTalentName = function (key) {
  return Talents[key];
};

var getTalentShortName = function (key) {
  return getShortName(key, Talents)
};

var getFightStyleName = function (key) {
  return FightStyles[key];
};

var getFightStyleExtName = function (key) {
  return FightStyleExternal[key];
};

var getFightStyleShortName = function (key) {
  return getShortName(key, FightStyles);
};

var getSimsName = function (key) {
  return Sims[key];
};

var getSimsShortName = function (key) {
  return getShortName(key, Sims);
};

var getShortName = function (key, list) {
  let values = Object.values(list);
  let keys = Object.entries(list);
  for (i = 0; i < values.length; i++) {
    if (values[i] == key) {
      return keys[i][0];
    }
  }
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
