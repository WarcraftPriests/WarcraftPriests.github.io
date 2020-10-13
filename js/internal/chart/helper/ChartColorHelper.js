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

var getCovenantChoiceColor = function (key) {
    return covenantChoiceColor[key];
};