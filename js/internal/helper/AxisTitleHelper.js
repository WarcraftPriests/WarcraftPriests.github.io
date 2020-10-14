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
    trinkets: "Increase in DPS"
}

var getYAxisTitle = function (key) {
    if(key == 'conduit-combos'
        || key == 'soulbind-traits'
        || key == 'soulbinds-launch') {
        return "Increase in %"
    }
    return yAxisTitles[key];
};