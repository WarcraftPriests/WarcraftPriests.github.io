const default_background_color = "#343a40";
const default_font_color = "#f8f9fa";
const default_axis_color = "#828282";

const light_color = "#eeeeee";
const medium_color = "#999999";
const dark_color = "#343a40";

const light_blue = '#05B8CC'
const green = '#00b200'

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

const primary_azerite_traits = [
	'Apothecarys Concoctions',
	'Archive of the Titans',
	'Barrage Of Many Bombs',
	'Battlefield Focus',
	'Blightborne Infusion',
	'Blood Rite',
	'Champion of Azeroth',
	'Chorus of Insanity',
	'Collective Will',
	'Combined Might',
	'Dagger in the Back Behind',
	'Dagger in the Back Front',
	'Death Throes',
	'Filthy Transfusion',
	'Glory in Battle',
	'Incite the Pack',
	'Laser Matrix',
	'Meticulous Scheming',
	'Relational Normalization Gizmo',
	'Retaliatory Fury',
	'Rezans Fury',
	'Ricocheting Inflatable Pyrosaw',
	'Ruinous Bolt',
	'Searing Dialogue',
	'Secrets of the Deep',
	'Shadow of Elune',
	'Spiteful Apparitions',
	'Swirling Sands',
	'Sylvanas Resolve',
	'Synaptic Spark Capacitor',
	'Thought Harvester',
	'Thunderous Blast',
	'Tidal Surge',
	'Tradewinds',
	'Unstable Catalyst',
	'Whispers of the Damned'
]

const secondary_azerite_traits = [
	'Azerite Globules', 
	'Blood Siphon', 
	'Earthlink',
	'Elemental Whirl', 
	'Gutripper',
	'Heed My Call',
	'On My Way', 
	'Overwhelming Power', 
	'Unstable Flames'
]


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

var trinketCalc = document.createElement("BUTTON");
trinketCalc.setAttribute("id", "trinket-trait-btn");
trinketCalc.setAttribute("class", "dropbtn");
trinketCalc.setAttribute("onClick", "location.href='trinket_calc.html'");
var trinketCalcText = document.createTextNode("Trinket Calculator");
trinketCalc.appendChild(trinketCalcText)
externalLinks.appendChild(trinketCalc);
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

	talents = ["Dark Ascension", "Legacy of the Void"];
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
	addtraitToChart();
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
	addtraitToChart();
}

function updateTraitText(click)
{
	let traitDropDownElement = document.getElementById(click).parentElement;
	let traitDropDownParent = traitDropDownElement.parentElement;
	let newtraitBtn = traitDropDownParent.childNodes[0].childNodes[0];
	newtraitBtn.nodeValue = click;
	let ilvlText = traitDropDownParent.childNodes[3].childNodes[0];
	ilvlText.nodeValue = "Select Item Level";
	//addSecondaryTrait(traitDropDownParent);

	//Remove all the traits.
	while (traitDropDownElement.firstChild) 
	{
    	traitDropDownElement.removeChild(traitDropDownElement.firstChild);
	}

}

function generatetraitMenu(number){
	//Create Div which holds traits dropdown
	
	var traitDiv = document.createElement("div");
	traitDiv.setAttribute("id", "trait-div" + number);
	traitDiv.setAttribute("class", "dropdown");

	//Create trait Button
	var traitBtn = document.createElement("button");
	traitBtn.setAttribute("id", "traitbtn" + number);
	traitBtn.setAttribute("class","dropbtn");
	traitBtn.setAttribute("onclick", "displayPrimaryTraits(this)");

	var traitText = document.createTextNode("Select Primary Trait");
	traitBtn.appendChild(traitText);
	traitDiv.appendChild(traitBtn);


	var traitDropDown = document.createElement("div");
	traitDropDown.setAttribute("id", "traitDropDown"+number);
	traitDropDown.setAttribute("class", "dropdown-content");
	traitDiv.appendChild(traitDropDown);

	mainDiv.appendChild(traitDiv);
	generateverticalSpacer();

	number++;
	return number;
}

function generateIlvlMenu(number){
	number --;
	var currtraitDiv = document.getElementById('trait-div'+number)

	//Crate ilvl button
	var ilvlBtn = document.createElement("button");
	ilvlBtn.setAttribute("id", "ilvlbtn" + number);
	ilvlBtn.setAttribute("class","dropbtn");
	ilvlBtn.setAttribute("onclick", "addSecondaryTrait(this)");

	var ilvlText = document.createTextNode("Select Secondary Trait");
	ilvlBtn.appendChild(ilvlText);

	generatehorizontalSpacer(currtraitDiv);
	currtraitDiv.appendChild(ilvlBtn);

	var ilvlDropDown = document.createElement("div");
	ilvlDropDown.setAttribute("id", "ilvlDropDown"+number);
	ilvlDropDown.setAttribute("class", "dropdown-content");
	currtraitDiv.appendChild(ilvlDropDown);

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

number = generatetraitMenu(number);

generateIlvlMenu(number);
number = generatetraitMenu(number);
generateIlvlMenu(number);
number = generatetraitMenu(number);
generateIlvlMenu(number);

generateSolidLine()

function addtraitMenu(){
	console.log(number)
	number = generatetraitMenu(number);
	generateIlvlMenu(number);
	console.log(number)
}

/*
var addtraitDiv = document.createElement("div");
addtraitDiv.setAttribute("id", "add-trait-div");
addtraitDiv.setAttribute("class", "main");
document.body.appendChild(addtraitDiv)

var addtrait = document.createElement("button");
addtrait.setAttribute("id", "add-trait");
addtrait.setAttribute("class", "add-trait");
addtrait.setAttribute("onclick", "addtraitMenu()");
var addtraitText = document.createTextNode("+");
addtrait.appendChild(addtraitText);
addtraitDiv.appendChild(addtrait);
*/





function displayPrimaryTraits(traitID)
{
		let traitDrop = traitID.parentElement.childNodes[1];
		let traitDropDown = traitID.parentElement.childNodes[0];
		for (p of primary_azerite_traits)
		{	
			let newtrait = document.createElement("p");
			newtrait.setAttribute("id", p);
			newtrait.setAttribute("class", "dropdown-content");
			newtrait.setAttribute("onclick", "updateTraitText(this.id)");
			let newtraitText = document.createTextNode(p);
			newtrait.appendChild(newtraitText);
			traitDrop.appendChild(newtrait);
		}

		//let traitDrop = document.getElementById(traitID);
		traitDrop.classList.toggle("show");
}



function updateTraitText(click)
{
	let traitDropDownElement = document.getElementById(click).parentElement;
	let traitDropDownParent = traitDropDownElement.parentElement;
	let newtraitBtn = traitDropDownParent.childNodes[0].childNodes[0];
	newtraitBtn.nodeValue = click;
	let ilvlText = traitDropDownParent.childNodes[3].childNodes[0];
	ilvlText.nodeValue = "Select Secondary Trait";
	//addSecondaryTrait(traitDropDownParent);

	//Remove all the traits.
	while (traitDropDownElement.firstChild) 
	{
    	traitDropDownElement.removeChild(traitDropDownElement.firstChild);
	}

}


function addSecondaryTrait(parentDiv)
{
		let regExp = new RegExp("[0-9]+", "g"); //Accounts for all 2 digit numbers
		let tempNumber = regExp.exec(parentDiv.id); // Pulls the number out of the parent div so we don't accidently create the wrong ilvl dropdown
		traitDiv = document.getElementById('traitbtn' + tempNumber);
		traitName = traitDiv.firstChild.nodeValue;
		ilvlDrop = parentDiv.parentElement.childNodes[4];
		for( s of secondary_azerite_traits)
		{
			let newIlvl = document.createElement("p");
			newIlvl.setAttribute("id", s)
			newIlvl.setAttribute("class","dropdown-content");
			newIlvl.setAttribute("onclick", "updateIlvlText(this.id)");
			let newIlvlText = document.createTextNode(s);
			newIlvl.appendChild(newIlvlText);
			ilvlDrop.appendChild(newIlvl);
		}
		
		//let traitDrop = document.getElementById(traitID);
		ilvlDrop.classList.toggle("show");
}

function updateIlvlText(click)
{
	let ilvlDropDownElement = document.getElementById(click).parentElement;
	let ilvlDropDownParent = ilvlDropDownElement.parentElement;
	let newilvlBtn = ilvlDropDownParent.childNodes[3].childNodes[0];
	newilvlBtn.nodeValue = click;
	addSecondaryTrait(ilvlDropDownParent);
	chart = document.getElementById("chart-div");
	if (chart.classList.contains('chart-div-show') == false)
		chart.classList.toggle("chart-div-show");
	traitName = ilvlDropDownParent.childNodes[0].childNodes[0].nodeValue
	addtraitToChart();


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
	if (talentSetup == "Legacy of the Void")
		return "LotV";
	else if (talentSetup == "Dark Ascension")
		return "DA";
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

function addtraitToChart()
{
	talentChoice = getTalentSetup();
	if (talentChoice == undefined)
	{
		talentChoice = "DA";
	}
	fightChoice = getFightSetup();
	if (fightChoice == undefined)
	{
		fightChoice = "C";
	}

	jQuery.getJSON("https://cdn.jsdelivr.net/gh/warcraftpriests/bfa-shadow-priest@/json_Charts/traits_" + talentChoice + "_" + fightChoice + ".json" , function(data) {
		let chartItems = [];		
		let graphData = [];
		let primarydpsData = [0,0,0];
		let secondarydpsData = [0,0,0];
		let primarydpsName = ["","",""];
		let secondarydpsName = ["","",""];
		for (var i = 0; i < number; i++)
		{
			let traitDiv = document.getElementById("trait-div"+i)
			let traitName = traitDiv.childNodes[0].childNodes[0].nodeValue;
			let traitIlvl = traitDiv.childNodes[3].childNodes[0].nodeValue;
			let baseDPS = data["data"]["Base"]["1_stack"];
			if (traitName != "Select Primary trait" && traitIlvl != "Select Secondary Trait")
			{
				
				primarytraitDPS = data["data"][traitName]['1_stack']
				secondarytraitDPS = data["data"][traitIlvl]['1_stack']
				primarytraitDPS -= baseDPS;
				secondarytraitDPS -= baseDPS;
				chartItems.push(traitName);
				primarydpsData[i] = primarytraitDPS;
				secondarydpsData[i] = secondarytraitDPS;
				primarydpsName[i] = traitName;
				secondarydpsName[i] = traitIlvl;
			}	
		}
			graphData.push({
				name: [secondarydpsName[0]],
				data: [secondarydpsData[0],0,0],
				color: light_blue
			}, {
				name: [primarydpsName[0]],
				data: [primarydpsData[0],0,0],
				color: green
			})

			graphData.push({
				name: [secondarydpsName[1]],
				data: [0,secondarydpsData[1],0],
				color: light_blue
			}, {
				name: [primarydpsName[1]],
				data: [0, primarydpsData[1],0],
				color: green
			})

			graphData.push({
				name: [secondarydpsName[2]],
				data: [0,0,secondarydpsData[2]],
				color: light_blue
			}, {
				name: [primarydpsName[2]],
				data: [0,0,primarydpsData[2]],
				color: green
			})



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
	        text: 'Trait Comparison -' + talentSetup + ' - ' + fightSetup
	    },
	    plotOptions: {
	        bar: {
	        	stacking: 'normal',
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
	    	categories:['Trait Combo 1', 'Trait Combo 2', 'Trait Combo 3'],
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
	            text: "Trait Name",
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
