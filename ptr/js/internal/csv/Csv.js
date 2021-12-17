var Headings = {
    profile: "Profile",
    actor: "Actor",
    DPS: "DPS",
    int: "Intellect",
    haste: "Haste",
    crit: "Critical Strike",
    mastery: "Mastery",
    vers: "Versatility",
    dpsW: "DPS Weight",
};

function parseCSV(currSimsBtn, currFightStyleBtn, currTalentBtn, chartId, metaData) {
    $(document).ready(function() {
        $.ajax({
            type: "GET",
            url: determineCsvUrl(currSimsBtn, baseUrl, currFightStyleBtn, currTalentBtn),
            dataType: "text",
            success: function(data) {processData(data, currSimsBtn, baseUrl, currFightStyleBtn, currTalentBtn);}
         });
    });
    
    function processData(allText, currSimsBtn, baseUrl, currFightStyleBtn, currTalentBtn) {
        var record_num = 9;  // or however many elements there are in each row
        var allTextLines = allText.split(/\r\n|\n/);
        if(metaData) {
            document.getElementById('header').innerHTML = "<h3 style='color:#ffffff'>" + determineChartName("", getValue(SimTalents, currTalentBtn), getValue(Sims, currSimsBtn), currFightStyleBtn) + "</h3>";
            document.getElementById('description').innerHTML = determineChartDescription(currSimsBtn);
        }
        var result = "</br>";
        result += "<table>";

        for(var i = 0; i < allTextLines.length -1; i++){
            var lines = allTextLines[i].split(',');
            var entries = lines.splice(0, record_num);
            result += "<tr>"
            for (var j=0; j<record_num; j++) {
                var flag = "<td>";
                var flagClose = "</td>";

                if(i == 0) {
                    flag = "<th>";
                    flagClose = "</th>";
                }

                if(entries[j] != null || entries[j] != undefined) {
                    result += flag + getLabel(entries[j]) + flagClose;
                }
            }
            result += "</tr>";
        }

        result +="</table>";
        result +="</br>";
        result +="</br>";
        result +="</br>";
        
        if(result != null || result != undefined || result != ""){
            document.getElementById(chartId).innerHTML = result;
        }
    }

    function getLabel(key) {
        var result = "";
        result = Headings[key];
        if(result == null || result == undefined || result == "" ) {
            result = key;
        }

        return result.replaceAll("_", " ");
    }
}

function determineCsvUrl(simsBtn, baseurl, fightStyle, talentChoice) {
    return baseurl + slash + simsBtn + simResultPath + fightStyle + underscore + talentChoice.replaceAll("_", "-") + csvExtension;
}