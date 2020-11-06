var yAxisTitles = {
    conduits: "Increase in %",
    consumables: "Increase in %",
    covenants: "Increase in %",
    covenantsChoice: "Increase in %",
    enchants: "Increase in %",
    legendaries: "Increase in %",
    racials: "Increase in %",
    soulbinds: "Increase in %",
    stats: "Increase in %",
    talents: "Increase in %",
    trinkets: "Increase in DPS",
    legendary_items: "Increase in %",
    soulbind_traits: "Increase in %",
    soulbinds_launch: "Increase in %",
    conduit_combos: "Increase in %",
}

var getYAxisTitle = function (key) {
    return yAxisTitles[handleSpecialKeys(key)];
};

var handleSpecialKeys = function (key) {
    return key.replace("-", "_");
}