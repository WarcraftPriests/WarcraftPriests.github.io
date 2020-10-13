var covenantChoiceColor = {
    kyrian_min: "#0000cc",
    kyrian_max: "#8080ff",
    night_fae_min: "#a52a2a",
    night_fae_max: "#da7171",
    necrolord_min: "#e5d334",
    necrolord_max: "#f0e68c",
    venthyr_min: "#008b8b",
    venthyr_max: "#33ffff",
}

var covenantColor = {
    kyrian: "#0000cc",
    night_fae: "#a52a2a",
    necrolord: "#e5d334",
    venthyr: "#008b8b",
}

var getCovenantChoiceColor = function (key) {
    return covenantChoiceColor[key];
};

var getCovenantColor = function (key) {
   if(key.toLowerCase().includes(kyrian)) {
       return covenantColor[kyrian];
   } else if(key.toLowerCase().includes(nightFae)) {
       return covenantColor[nightFae];
   } else if(key.toLowerCase().includes(necrolord)) {
       return covenantColor[necrolord];
   } else if(key.toLowerCase().includes(venthyr)) {
       return covenantColor[venthyr];
   } else {
       return "#496DC9";
   }
}