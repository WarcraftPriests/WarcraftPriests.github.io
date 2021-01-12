jQuery.get({url: baseUrl + "/config.yml", dataType: "text"})
        .done(function (data) {
            configData = jsyaml.load(data);
            wcp_charts = new WCP_Chart('Chart-Display-div');
            wcp_charts.init();
            initializeButtons();
        }
);

(function(){
    const params = getQueryParameter();
    const selectedSim = params.get('sims');
    document.title = `${Sims[selectedSim]} | ${document.title}`;
}());