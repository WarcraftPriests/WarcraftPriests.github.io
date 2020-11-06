var LegendTitles = {
    conduits: "Conduits Rank",
    consumables: "Increase in %",
    covenants: "Increase in %",
    covenantsChoice: "Increase in %",
    enchants: "Increase in %",
    legendaries: "Increase in %",
    racials: "Increase in %",
    soulbinds: "Increase in %",
    stats: "Increase in %",
    talents: "Increase in %",
    trinkets: "Item level",
    legendary_items: "Item level",
}

var getLegendTitle = function (key) {
    return LegendTitles[handleSpecialKeys(key)];
};

var handleSpecialKeys = function (key) {
    return key.replace("-", "_");
}