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
  mbo: "Mind Bombd",
  ph: "Phsychic Horror",

  // Row 40
  as: "Auspicious Spirits",
  pl: "Psychic Link",
  sc: "Shadow Crash",

  // Row 45
  dm: "Damnation",
  mb: "mindbender",
  vt: "Void Torrent",

  // Row 50
  am: "Ancient Madness",
  hv: "Hungering Void",
  stm: "Surrender To Madness",
};

var GetTalentName = function (key) {
  return Talents[key];
};

var GetTalentShortName = function (key) {
  let talentValues = Object.values(Talents);
  let talentKeys = Object.entries(Talents);
  for (i = 0; i < talentValues.length; i++) {
    if (talentValues[i] == key) {
      return talentKeys[i][0];
    }
  }
};

var FightStyles = {
  C: "Composite",
  ST: "Single Target",
  D: "Dungeons",

  Composite: "C",
  Single_target: "ST",
  Dungeons: "D",
};

var GetFightStyleName = function (key) {
  return FightStyles[key];
};
