jQuery.get({url: baseUrl + "/config.yml", dataType: "text"})
        .done(function (data) {
            configData = jsyaml.load(data);
            initializeButtons();
        }
);

(function(){
    const params = getQueryParameter();
    const selectedSim = params.get('sims');
    document.title = `${Sims[selectedSim]} | ${document.title}`;
}());