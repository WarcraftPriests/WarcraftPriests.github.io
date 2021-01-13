jQuery.get({url: baseUrl + "/config.yml", dataType: "text"})
        .done(function (data) {
            configData = jsyaml.load(data);
            initializeButtons();
        }
);