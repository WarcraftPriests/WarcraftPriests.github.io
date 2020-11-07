var covenantChoiceColor = {
    kyrian_min: "#0033CC",
    kyrian_max: "#0099FF",
    night_fae_min: "#9933CC",
    night_fae_max: "#9966CC",
    necrolord_min: "#009933",
    necrolord_max: "#00CC66",
    venthyr_min: "#CC0000",
    venthyr_max: "#FF3300",
}

var covenantColor = {
    kyrian: "#0033CC",
    night_fae: "#9933CC",
    necrolord: "#009933",
    venthyr: "#CC0000",
}

var racialColor = {
    Goblin: "#F2545B",
    Gnome: "#4F86C6",
    Dark_Iron_Dwarf: "#4F86C6",
    Night_Elf_Haste: "#4F86C6",
    Draenei: "#4F86C6",
    Human: "#4F86C6",
    Troll: "#F2545B",
    Blood_Elf: "#F2545B",
    Void_Elf: "#4F86C6",
    Panda_Feast: "#F3F7F0",
    Nightborne: "#F2545B",
    Lightforged_Draenei: "#4F86C6",
    Night_Elf_Crit: "#4F86C6",
    Kul_Tiran: "#4F86C6",
    Zandalari_Troll_Paku: "#F2545B",
    Zandalari_Troll_Bwonsamdi: "#F2545B",
    Mechagnome: "#4F86C6",
    Undead: "#F2545B",
    Worgen: "#4F86C6",
    Maghar_Orc: "#F2545B",
    Zandalari_Troll_Kimbul: "#F2545B",
    Panda_Haste: "#F3F7F0",
    Dwarf: "#4F86C6",
    Tauren: "#F2545B",
    Panda_Mastery: "#F3F7F0",
    Panda_Crit: "#F3F7F0",
    Panda_Vers: "#F3F7F0",
    Vulpera: "#F2545B",
    Panda_Smothered_Shank: "#F3F7F0",
}

var getCovenantChoiceColor = function (key) {
    return covenantChoiceColor[key];
};

var getColor = function (key) {
   var color = covenantColor[key];
   
   if(color == null || color == undefined || color == "") {
       color = racialColor[key];
   }

   if(color == null || color == undefined || color == "") {
       color = "#496DC9";
   }
   
   return color;
}

function create_color(dps, min_dps, max_dps) {
    
    // colour of lowest DPS
    let color_min = [0, 255, 255];
    // additional colour step between min and max
    let color_mid = [255, 255, 0];
    // colour of  max dps
    let color_max = [255, 0, 0];
  
    // calculate the position of the mid colour in this relation to ensure a smooth colour transition (colour distance...if something like this exists) between the three
    let diff_mid_max = 0;
    let diff_min_mid = 0;
    for (let i = 0; i < 3; i++) {
      diff_mid_max += Math.abs(color_max[i] - color_mid[i]);
      diff_min_mid += Math.abs(color_mid[i] - color_min[i]);
    }
    // ratio from min to max to describe the position of the id colour
    let mid_ratio = diff_min_mid / (diff_min_mid + diff_mid_max);
    // mid dps resulting from the ratio
    let mid_dps = min_dps + (max_dps - min_dps) * mid_ratio;
  
    // calculate colour based on relative dps
    if (dps >= mid_dps) {
      let percent_of_max = (dps - mid_dps) / (max_dps - mid_dps);
      return [
        Math.floor(color_max[0] * percent_of_max + color_mid[0] * (1 - percent_of_max)),
        Math.floor(color_max[1] * percent_of_max + color_mid[1] * (1 - percent_of_max)),
        Math.floor(color_max[2] * percent_of_max + color_mid[2] * (1 - percent_of_max))
      ];
    } else {
      let percent_of_mid = (dps - min_dps) / (mid_dps - min_dps);
      return [
        Math.floor(color_mid[0] * percent_of_mid + color_min[0] * (1 - percent_of_mid)),
        Math.floor(color_mid[1] * percent_of_mid + color_min[1] * (1 - percent_of_mid)),
        Math.floor(color_mid[2] * percent_of_mid + color_min[2] * (1 - percent_of_mid))
      ];
    }
  }