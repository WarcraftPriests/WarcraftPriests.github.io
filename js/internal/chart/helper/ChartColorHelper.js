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