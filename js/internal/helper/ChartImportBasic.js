jQuery.get({url: baseUrl + "/config.yml", dataType: "text"})
        .done(function (data) {
            configData = jsyaml.load(data);

            var elements = document.getElementsByClassName("wcp_chart");
            for(dom of elements) {
                var talent = dom.getAttribute("data-talent");
                var sims = dom.getAttribute("data-sims");
                var covenants = dom.getAttribute("data-covenants");
                var fightStyle = dom.getAttribute("data-fightStyle");
                var chartId = dom.getAttribute("id");
                var maxEntries = dom.getAttribute("data-maxentries")
                updateChart(talent, sims, covenants, "", "", fightStyle, chartId, false, parseInt(maxEntries));
            }
        }
);