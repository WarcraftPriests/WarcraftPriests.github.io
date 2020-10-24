var Headings = {
    profile: "Profile",
    actor: "Actor",
    DPS: "DPS",
    int: "Intellect",
    haste: "Haste",
    crit: "Critical Strike",
    mastery: "Mastery",
    vers: "Versatile",
    dpsW: "DPS Weight",
};

function parseCSV(currSimsBtn, currFightStyleBtn, currTalentBtn) {
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
        var result = "<h3 style='color:#ffffff'>" + determineChartName("", getTalentSimsName(currTalentBtn), getSimsName(currSimsBtn), currFightStyleBtn) + "</h3>";
        result += "</br>";
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
        
        if(result != null || result != undefined || result != ""){
            document.getElementById('Chart-Display-div').innerHTML = result;
        }
    }

    function getLabel(key) {
        var result = "";
        result = Headings[key];
        if(result == null || result == undefined || result == "" ) {
            result = key;
        }

        return result.replace("_", " ");
    }
}