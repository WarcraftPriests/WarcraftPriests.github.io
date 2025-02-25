jQuery.get({url: baseUrl + "/internal/talents.yml", dataType: "text"})
        .done(function (data) {
            talentData = jsyaml.load(data);
            //initializeButtons();
        }
);

jQuery.get({url: baseUrl + "/config.yml", dataType: "text"})
        .done(function (data) {
            configData = jsyaml.load(data);
            wowheadUrl = configData[charts].wowheadUrl
            initializeButtons();
        }
);

(function(){
    const params = getQueryParameter();
    const selectedSim = params.get('sims');
    document.title = `${Sims[selectedSim]} | ${document.title}`;
}());
