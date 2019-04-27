const default_background_color = "#343a40";
const default_font_color = "#f8f9fa";
const default_axis_color = "#828282";

const light_color = "#eeeeee";
const medium_color = "#999999";
const dark_color = "#343a40";

const trinketColors = [
	'#F26D21', //coral
	'#107896', //alice
	'#EBC944' //daisy
]

const ilevel_color_table = {
/*
"300": "#1abc9c",
"305": "#000000",
"310": "#3498db",
"315": "#9b59b6",
"320": "#34495e",
"325": "#f1c40f",
"330": "#e67e22",
"335": "#e74c3c",
"340": "#ecf0f1",
"345": "#95a5a6",
"350": "#16a085",
"355": "#27ae60",
"360": "#2980b9",
"365": "#8e44ad",
"370": "#2c3e50",
"375": "#f39c12",
"380": "#d35400",
"385": "#c0392b",
"390": "#bdc3c7",
"395": "#7f8c8d",
"400": "#2ecc71",
*/
};

/*
<div class="dropdown">
  <button onclick="myFunction()" class="dropbtn">Dropdown</button>
  <div id="myDropdown" class="dropdown-content">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
</div>

*/

//Create Div for other charts
var externalLinks = document.createElement("div");
externalLinks.setAttribute("id", "external-links");
externalLinks.setAttribute("class", "main");

var trinketTrait = document.createElement("BUTTON");
trinketTrait.setAttribute("id", "trinket-trait-btn");
trinketTrait.setAttribute("class", "dropbtn");
trinketTrait.setAttribute("onClick", "location.href='index.html'");
var trinketTraitText = document.createTextNode("Trinket/Azerite Trait Charts");
trinketTrait.appendChild(trinketTraitText)
externalLinks.appendChild(trinketTrait);
document.body.appendChild(externalLinks);

generatehorizontalSpacer(externalLinks);

var traitCalc = document.createElement("BUTTON");
traitCalc.setAttribute("id", "trait-trait-btn");
traitCalc.setAttribute("class", "dropbtn");
traitCalc.setAttribute("onClick", "location.href='trait_calc.html'");
var traitCalcText = document.createTextNode("Trait Calculator");
traitCalc.appendChild(traitCalcText)
externalLinks.appendChild(traitCalc);
document.body.appendChild(externalLinks);

var hr = document.createElement("hr");
document.body.appendChild(hr);


//Create Div which holds all buttons
var setupDiv = document.createElement("div");
setupDiv.setAttribute("id", "setup-div");
setupDiv.setAttribute("class", "main");
document.body.appendChild(setupDiv);

//Add Talent Setups
var talentDiv = document.createElement("div");
talentDiv.setAttribute("id", "talent-div");
talentDiv.setAttribute("class", "dropdown");
setupDiv.appendChild(talentDiv);

var talentBtn = document.createElement("button");
talentBtn.setAttribute("id", "talentbtn");
talentBtn.setAttribute("class", "dropbtn");
talentBtn.setAttribute("onclick", "talentSelectMenu()")
var talentText = document.createTextNode("Select Talent");
talentBtn.appendChild(talentText);
talentDiv.appendChild(talentBtn);

var talentDropDiv = document.createElement("div");
talentDropDiv.setAttribute("id", "talentDropDiv");
talentDropDiv.setAttribute("class", "dropdown-content");
talentDiv.appendChild(talentDropDiv);

generatehorizontalSpacer(setupDiv);

var fightDiv = document.createElement("div");
fightDiv.setAttribute("id", "fight-div");
fightDiv.setAttribute("class", "dropdown");
setupDiv.appendChild(fightDiv);



var fightBtn = document.createElement("button");
fightBtn.setAttribute("id", "fightbtn")
fightBtn.setAttribute("class", "dropbtn");
fightBtn.setAttribute("onclick", "fightSelectMenu()")
var fightText = document.createTextNode("Select Fight Style");
fightBtn.appendChild(fightText);
fightDiv.appendChild(fightBtn);

var fightDropDiv = document.createElement("div");
fightDropDiv.setAttribute("id", "fightDropDiv");
fightDropDiv.setAttribute("class", "dropdown-content");
fightDiv.appendChild(fightDropDiv);

function generateSolidLine()
{
	var solidLine = document.createElement("hr")
	document.body.appendChild(solidLine);
}

generateSolidLine()

var mainDiv = document.createElement("div");
mainDiv.setAttribute("id", "main-div");
mainDiv.setAttribute("class", "main");
document.body.appendChild(mainDiv);



number = 0

function talentSelectMenu()
{

	talents = ["Shadow Crash", "Auspicious Spirits"];
	for (t of talents)
	{
		let talent = document.createElement("p");
		talent.setAttribute("id", t);
		talent.setAttribute("class", "dropdown-content");
		talent.setAttribute("onclick", "selectTalent(this.id)");
		var talentText = document.createTextNode(t);
		talent.appendChild(talentText);
		talentDropDiv.appendChild(talent);
	}

	talentDropDiv.classList.toggle("show");
}

function selectTalent(click)
{
	let dropDownElement = document.getElementById(click).parentElement;
	talentBtn.childNodes[0].nodeValue = click;

	while (dropDownElement.firstChild)
	{
		dropDownElement.removeChild(dropDownElement.firstChild);
	}
	addTrinketToChart();
}


function fightSelectMenu()
{
	fights = ["Composite", "Single Target", "Dungeon Slice"];
	for (f of fights)
	{
		let fight = document.createElement("p");
		fight.setAttribute("id", f);
		fight.setAttribute("class", "dropdown-content");
		fight.setAttribute("onclick", "selectFight(this.id)");
		var fightText = document.createTextNode(f);
		fight.appendChild(fightText);
		fightDropDiv.appendChild(fight);
	}

	fightDropDiv.classList.toggle("show");
}

function selectFight(click)
{
	let dropDownElement = document.getElementById(click).parentElement;
	fightBtn.childNodes[0].nodeValue = click;

	while (dropDownElement.firstChild)
	{
		dropDownElement.removeChild(dropDownElement.firstChild);
	}
	addTrinketToChart();
}

function updateTrinketText(click)
{
	let trinketDropDownElement = document.getElementById(click).parentElement;
	let trinketDropDownParent = trinketDropDownElement.parentElement;
	let newtrinketBtn = trinketDropDownParent.childNodes[0].childNodes[0];
	newtrinketBtn.nodeValue = click;
	let ilvlText = trinketDropDownParent.childNodes[3].childNodes[0];
	ilvlText.nodeValue = "Select Item Level";
	//addIlvlDropdown(trinketDropDownParent);

	//Remove all the trinkets.
	while (trinketDropDownElement.firstChild)
	{
    	trinketDropDownElement.removeChild(trinketDropDownElement.firstChild);
	}

}

function generateTrinketMenu(number){
	//Create Div which holds trinkets dropdown

	var trinketDiv = document.createElement("div");
	trinketDiv.setAttribute("id", "trinket-div" + number);
	trinketDiv.setAttribute("class", "dropdown");

	//Create Trinket Button
	var trinketBtn = document.createElement("button");
	trinketBtn.setAttribute("id", "trinketbtn" + number);
	trinketBtn.setAttribute("class","dropbtn");
	trinketBtn.setAttribute("onclick", "displayTrinkets(this)");

	var trinketText = document.createTextNode("Select Trinket");
	trinketBtn.appendChild(trinketText);
	trinketDiv.appendChild(trinketBtn);


	var trinketDropDown = document.createElement("div");
	trinketDropDown.setAttribute("id", "trinketDropDown"+number);
	trinketDropDown.setAttribute("class", "dropdown-content");
	trinketDiv.appendChild(trinketDropDown);

	mainDiv.appendChild(trinketDiv);
	generateverticalSpacer();

	number++;
	return number;
}

function generateIlvlMenu(number){
	number --;
	var currTrinketDiv = document.getElementById('trinket-div'+number)

	//Crate ilvl button
	var ilvlBtn = document.createElement("button");
	ilvlBtn.setAttribute("id", "ilvlbtn" + number);
	ilvlBtn.setAttribute("class","dropbtn");
	ilvlBtn.setAttribute("onclick", "addIlvlDropdown(this)");

	var ilvlText = document.createTextNode("Select Item Level");
	ilvlBtn.appendChild(ilvlText);

	generatehorizontalSpacer(currTrinketDiv);
	currTrinketDiv.appendChild(ilvlBtn);

	var ilvlDropDown = document.createElement("div");
	ilvlDropDown.setAttribute("id", "ilvlDropDown"+number);
	ilvlDropDown.setAttribute("class", "dropdown-content");
	currTrinketDiv.appendChild(ilvlDropDown);

	number++;


}

function generatehorizontalSpacer(div)
{
	var horizontalSpacer = document.createElement("span");
	horizontalSpacer.setAttribute("class", "divider");
	div.appendChild(horizontalSpacer);
}

function generateverticalSpacer()
{
	var verticalSpacer = document.createElement("span");
	verticalSpacer.setAttribute("class", "span");
	mainDiv.appendChild(verticalSpacer);
}

number = generateTrinketMenu(number);

generateIlvlMenu(number);
number = generateTrinketMenu(number);
generateIlvlMenu(number);
number = generateTrinketMenu(number);
generateIlvlMenu(number);

generateSolidLine()

function addTrinketMenu(){
	console.log(number)
	number = generateTrinketMenu(number);
	generateIlvlMenu(number);
	console.log(number)
}

/*
var addTrinketDiv = document.createElement("div");
addTrinketDiv.setAttribute("id", "add-trinket-div");
addTrinketDiv.setAttribute("class", "main");
document.body.appendChild(addTrinketDiv)

var addTrinket = document.createElement("button");
addTrinket.setAttribute("id", "add-trinket");
addTrinket.setAttribute("class", "add-trinket");
addTrinket.setAttribute("onclick", "addTrinketMenu()");
var addTrinketText = document.createTextNode("+");
addTrinket.appendChild(addTrinketText);
addTrinketDiv.appendChild(addTrinket);
*/





function displayTrinkets(trinketID)
{
	jQuery.getJSON("https://cdn.jsdelivr.net/gh/warcraftpriests/bfa-shadow-priest@master/json_Charts/" + "trinkets_SC_C" + ".json" , function(data) {
		let sortedItems = [];
		let dpsSortedData = data["sorted_data_keys"];
		dpsSortedData = dpsSortedData.sort();
		let trinketDrop = trinketID.parentElement.childNodes[1];
		let trinketDropDown = trinketID.parentElement.childNodes[0];
		for (d of dpsSortedData)
		{
			let newTrinket = document.createElement("p");
			newTrinket.setAttribute("id", d);
			newTrinket.setAttribute("class", "dropdown-content");
			newTrinket.setAttribute("onclick", "updateTrinketText(this.id)");
			let newTrinketText = document.createTextNode(d);
			newTrinket.appendChild(newTrinketText);
			trinketDrop.appendChild(newTrinket);
		}

		//let trinketDrop = document.getElementById(trinketID);
		trinketDrop.classList.toggle("show");


		}.bind(this)).fail(function(){
		console.log("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
		alert("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
	});
}



function updateTrinketText(click)
{
	let trinketDropDownElement = document.getElementById(click).parentElement;
	let trinketDropDownParent = trinketDropDownElement.parentElement;
	let newtrinketBtn = trinketDropDownParent.childNodes[0].childNodes[0];
	newtrinketBtn.nodeValue = click;
	let ilvlText = trinketDropDownParent.childNodes[3].childNodes[0];
	ilvlText.nodeValue = "Select Item Level";
	//addIlvlDropdown(trinketDropDownParent);

	//Remove all the trinkets.
	while (trinketDropDownElement.firstChild)
	{
    	trinketDropDownElement.removeChild(trinketDropDownElement.firstChild);
	}

}


function addIlvlDropdown(parentDiv)
{
	jQuery.getJSON("https://cdn.jsdelivr.net/gh/warcraftpriests/bfa-shadow-priest@master/json_Charts/" + "trinkets_SC_C" + ".json" , function(data) {
		let sortedItems = [];
		let regExp = new RegExp("[0-9]+", "g"); //Accounts for all 2 digit numbers
		let tempNumber = regExp.exec(parentDiv.id); // Pulls the number out of the parent div so we don't accidently create the wrong ilvl dropdown
		trinketDiv = document.getElementById('trinketbtn' + tempNumber);
		trinketName = trinketDiv.firstChild.nodeValue;
		ilvlDrop = parentDiv.parentElement.childNodes[4];
		var keys = [];
		for(var k in data["data"][trinketName]) keys.push(k); //Pull all item levels of the trinket.
		for( k of keys)
		{
			let newIlvl = document.createElement("p");
			newIlvl.setAttribute("id", k)
			newIlvl.setAttribute("class","dropdown-content");
			newIlvl.setAttribute("onclick", "updateIlvlText(this.id)");
			let newIlvlText = document.createTextNode(k);
			newIlvl.appendChild(newIlvlText);
			ilvlDrop.appendChild(newIlvl);
		}

		//let trinketDrop = document.getElementById(trinketID);
		ilvlDrop.classList.toggle("show");


		}.bind(this)).fail(function(){
		console.log("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
		alert("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
	});
}

function updateIlvlText(click)
{
	let ilvlDropDownElement = document.getElementById(click).parentElement;
	let ilvlDropDownParent = ilvlDropDownElement.parentElement;
	let newilvlBtn = ilvlDropDownParent.childNodes[3].childNodes[0];
	newilvlBtn.nodeValue = click;
	addIlvlDropdown(ilvlDropDownParent);
	chart = document.getElementById("chart-div");
	if (chart.classList.contains('chart-div-show') == false)
		chart.classList.toggle("chart-div-show");
	trinketName = ilvlDropDownParent.childNodes[0].childNodes[0].nodeValue
	addTrinketToChart();


	//Remove all the ilvls.
	while (ilvlDropDownElement.firstChild)
	{
    	ilvlDropDownElement.removeChild(ilvlDropDownElement.firstChild);
	}
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


var chartDiv = document.createElement("div");
chartDiv.setAttribute("id", "chart-div");
chartDiv.setAttribute("class", "chart-div");
document.body.append(chartDiv);



function getTalentSetup()
{
	talentSetup = talentBtn.childNodes[0].nodeValue;
	if (talentSetup == "Auspicious Spirits")
		return "AS";
	else if (talentSetup == "Shadow Crash")
		return "SC";
}

function getFightSetup()
{
	fightSetup = fightBtn.childNodes[0].nodeValue;
	if (fightSetup == "Composite")
		return "C";
	else if (fightSetup == "Single Target")
		return "ST";
	else if (fightSetup == "Dungeon Slice")
		return "D";
}

function addTrinketToChart()
{
	talentChoice = getTalentSetup();
	if (talentChoice == undefined)
	{
		talentChoice = "SC";
	}
	fightChoice = getFightSetup();
	if (fightChoice == undefined)
	{
		fightChoice = "C";
	}
	console.log(talentChoice + '-' + fightChoice)

	jQuery.getJSON("https://cdn.jsdelivr.net/gh/warcraftpriests/bfa-shadow-priest@master/json_Charts/trinkets_" + talentChoice + "_" + fightChoice + ".json" , function(data) {
		let chartItems = [];
		let graphData = [];
		for (var i = 0; i < number; i++)
		{
			let trinketDiv = document.getElementById("trinket-div"+i)
			let trinketName = trinketDiv.childNodes[0].childNodes[0].nodeValue;
			let trinketIlvl = trinketDiv.childNodes[3].childNodes[0].nodeValue;
			let baseDPS = data["data"]["Base"]["300"];

			if (trinketName != "Select Trinket" && trinketIlvl != "Select Item Level")
			{
				trinketDPS = data["data"][trinketName][trinketIlvl]
				trinketDPS -= baseDPS
				chartItems.push(trinketName);
				graphData.push({
					name: trinketName + ' - ' + trinketIlvl,
					data: [trinketDPS],
					color: trinketColors[i]
				});
			}
		}
		renderChart(graphData, chartItems);
		}.bind(this)).fail(function(){
		console.log("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
		alert("The JSON chart failed to load, please let DJ know via discord Djriff#0001, Ensure you select a Talent Setup and Fight Style First.");
	});
}

function renderChart(graphData, chartItems)
{
	let talentSetup = talentBtn.childNodes[0].nodeValue;
	let fightSetup = fightBtn.childNodes[0].nodeValue;

	basic_chart = Highcharts.chart("chart-div", {
	    chart: {
        renderTo: "chart-div",
        type: 'bar',
        backgroundColor: default_background_color
        },
	    title: {
	    	style: {
	            color: default_font_color,
	            fontWeight: 'bold'
            },
	        text: 'Trinket Comparison -' + talentSetup + ' - ' + fightSetup
	    },
	    plotOptions: {
	        bar: {
	            dataLabels: {
	                align: 'right',
	                enabled: true,
	                pointFormat: "Value: {point.y:,.0f} mm"
	            },
	            enableMouseTracking: true,
	            pointWidth: 15,
	            spacing: 20,
	            events: {
	            	legendItemClick: function () {
	      				return false;
	      			}
	            },
	            allowPointSelect: false
	            }
    	},
	    xAxis: {
	    	categories: [''],
	        labels: {
	        	useHTML: false,
	            style: {
	                color: default_font_color,
	                fontWeight: 'bold',
	                fontSize: 14,
	                events: {
	                	legendItemClick: function () {
	          				return false;
	      				}
	            	},
	            }
	        }
    	},
	    yAxis: {
	    	crosshair: {
	    		color: 'white',
	    		width: 3,
	    		snap: false,
	    		zIndex: 10
	    	},
	        labels: {
	            style: {
	                color: default_font_color
	            }
	        },
	        stackLabels: {
	            enabled: true,
	            style: {
	                fontWeight: 'bold',
	                color: default_font_color,
	                fontSize: 14
	            }
	        },
	        gridLineColor: '#616c77',
	        title: {
	            text: 'Damage Per Second',
	            color: default_font_color
	        }
	    },
	    legend: {
	        layout: 'vertical',
	        align: 'right',
	        borderColor: medium_color,
	        borderWidth: 1,
	        floating: false,
	        itemMarginBottom: 3,
	        itemMaginTop: 0,
	        reversed: false,
	        shadow: false,
	        verticalAlign: 'middle',
	        x: 0,
	        y: 0,
	        title: {
	            text: "Trinket Name",
	            style:
	                {
	                color:light_color,
	                fontWeight:'bold',
	            },
	        },
	    itemStyle: {
	        color: default_font_color,
	        fontWeight: 'bold',
	        },
	    },
	    series: $.each(graphData, function(i, chartD) {
        return chartD;
    })
	});

	document.getElementById("chart-div").style.height = 200 + chartItems.length * 30 + "px";
	basic_chart.setSize(document.getElementById("chart-div").style.width, document.getElementById("chart-div").style.height);
	basic_chart.redraw();
}
