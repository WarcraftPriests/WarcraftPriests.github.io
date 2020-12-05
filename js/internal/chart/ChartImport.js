function main() {
    var dom = document.getElementsByClassName("wcp_class");
    wcp_charts = new WCP_Chart('Chart-Display-div');
    wcp_charts.init();
}



/*
 * Decides what kind of chart should be used 
 * and when a chart update should happen
 */
function updateChart(currTalentBtn, currSimsBtn, currCovenantBtn, currConsumablesBtn, currEnchantsBtn, currFightStyleBtn, chartId) {
  if(configData["sims"][currSimsBtn.replace("_", "-")]["covenant"]["lookup"]) {
    manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", currCovenantBtn, "fightStyle", currFightStyleBtn);
  } else {
    manipulateUrl("talents", currTalentBtn, "sims", currSimsBtn, "covenants", "", "fightStyle", currFightStyleBtn);
  }
  
  if(currSimsBtn == "weights") {
    parseCSV(currSimsBtn, currFightStyleBtn, currTalentBtn, chartId);
  } else {
    createChart(currSimsBtn, currFightStyleBtn, currTalentBtn, currCovenantBtn, chartId);
  }
}

function createChart( simsBtn, fightStyle, talentChoice, covenantType, chartId) {
  jQuery.getJSON( determineJsonUrl(simsBtn, baseUrl, fightStyle, talentChoice, covenantType),
      function (data) {
        document.getElementById("updateData").innerHTML = updateDataInnerHtml + data[jsonLastUpdated];
        var header = determineChartName( covenantType, 
                                         getValue(SimTalents, talentChoice), 
                                         simsBtn.charAt(0).toUpperCase() + simsBtn.slice(1), 
                                         fightStyle);
        document.getElementById('header').innerHTML = "<h3 style='color:#ffffff'>" + header + "</h3>";
        document.getElementById('description').innerHTML = determineChartDescription(simsBtn);
        buildData(data, simsBtn, chartId);
      }.bind(this)
    ).fail(function(xhr, status) {
      handleJsonFailure(xhr, status)
    });
}

function buildData(data, simsBtn, chartId) {
  var chart = getValue(ChartType, simsBtn);
  if(chart == "multiple") {
    buildChartDataMultipleBar(data, simsBtn, chartId)
  } else if(chart == "percentage") {
    buildDataForPercentageChart(data, simsBtn, chartId);
  } else if(chart == "dot") {
    buildChartDataDot(data, chartId);
  } else {
    buildChartDataSingleBar(data, false, getValue(ChartPadding, simsBtn), simsBtn, chartId)
  }
}

/*
 * Updates the size of the div for the chart for the real data
 */
function updateSize(chart, chartId, size) {
  document.getElementById(chartId).style.height = 200 + size * 30 + px; // Size the chart by our data.
    chart.setSize( 
      document.getElementById(chartId).style.width,
      document.getElementById(chartId).style.height
    );
    chart.redraw();
    try {
      $WowheadPower.refreshLinks();
    } catch (error) {
      console.log(error);
    }
}

/*
 * Determine the chart name for the current chart, for the used parameters
 */
function determineChartName(covenantType, firstTalent, fullSimType, fightStyle) {
  var simType = "";
  simType = fullSimType.replace("-", " ");
  simType = simType.replace("_", " ");

  if(fullSimType.toLowerCase() == covenantsChoice) {
    return coventantsChoiceChartName;
  } 
  if (covenantType === empty || covenantType == null) {
    return firstTalent 
              + space + dash + space
              + simType
              + space + dash + space
              + fightStyle;
  } else {
    return firstTalent 
              + space + dash + space
              + simType 
              + space + dash + space 
              + getValue(Conduits, covenantType)
              + space + dash + space 
              + fightStyle;
  }
}

function determineChartDescription(fullSimType) {
  fullSimType = fullSimType.replace("_", "-");
  var descr = configData["sims"][fullSimType]["description"];
  return descr;
}

/*
 * Determines the url for the github repo to get the needed sim results
 */
function determineJsonUrl(simsBtn, baseurl, fightStyle, talentChoice, covenantType) {
  /*
   * Special cases!
   */
  if(talentChoice.includes(underscore)) {
    talentChoice = talentChoice.replace(underscore, dash);
  }

  if(simsBtn.includes(underscore)) {
    simsBtn = simsBtn.replace(underscore, dash);
  }

  if(simsBtn == talents){
    return baseurl + slash + simsBtn + simResultPath + fightStyle + jsonExtension;
  } else if(configData["sims"][currSimsBtn.replace("_", "-")]["covenant"]["lookup"]) {
    return baseurl + slash + simsBtn + simResultPath + fightStyle + underscore + talentChoice + underscore + covenantType + jsonExtension;
  } else {
    return baseurl + slash + simsBtn + simResultPath + fightStyle + underscore + talentChoice + jsonExtension;
  }
}

/*
 * Handles the failure of an json call to github, most a wrong combination of
 * talent, simType, convenant and fightStyle.
 * So no data could be fetched
 */
function handleJsonFailure(xhr, status) {
  console.log("The JSON chart failed to load, please let DJ/espo know via discord Djriff#0001/espo#6663");
  console.log(status);
}
var SimTalents = {
    am: "Ancient Madness",
    hv: "Hungering void",
    hv_as: "Hungering Void - Auspicious Spirits",
    hv_sc: "Hungering Void - Shadow Crash",
    stm: "Surrender To Madness",
  };
  
  var Sims = {
    conduit_combos: "Conduit Combos",
    conduits: "Conduits",
    consumables: "Consumables",
    covenant_choice: "Covenants Choice",
    covenants_launch: "Covenants launch",
    covenants_prog: "Covenants prog",
    covenants: "Covenants",
    enchants: "Enchants",
    legendaries: "Legendaries",
    legendary_items: "Legendary items",
    racials: "Racials",
    soulbind_traits: "Soulbind Traits",
    soulbinds_launch: "Soulbind Launch",
    soulbinds_prog: "Soulbind prog",
    soulbinds: "Soulbinds",
    stats: "Stats",
    talents: "Talents",
    trinkets: "Trinkets",
    weights: "Weights",
  };
  
  var Consumables = {
    potion: "Potion",
    food: "Food",
  };
  
  var Talents = {
    // Row 15
    fotm: "Fortress of the Mind",
    dam: "Death and Madness",
    ud: "Unfurling Darkness",
  
    // Row 25
    bns: "Body and Soul",
    sl: "San'layn",
    in: "Intangibility",
  
    // Row 30
    tof: "Twist of Fate",
    mis: "Misery",
    sn: "Searing Nightmare",
  
    // Row 35
    lw: "Last Word",
    mbo: "Mind Bomb",
    ph: "Phsychic Horror",
  
    // Row 40
    as: "Auspicious Spirits",
    pl: "Psychic Link",
    sc: "Shadow Crash",
  
    // Row 45
    dm: "Damnation",
    mb: "Mindbender",
    vt: "Void Torrent",
  
    // Row 50
    am: "Ancient Madness",
    hv: "Hungering Void",
    stm: "Surrender To Madness",
  };
  
  var FightStyles = {
    Composite: "Composite",
    Single: "Single Target",
    Dungeons: "Dungeons",
  };
  
  var FightStyleExternal = {
    composite: "Raid",
    single: "Single Target",
    dungeons: "Dungeons",
  };
  
  var Conduits = {
    kyrian: "Kyrian",
    necrolord: "Necrolord",
    night_fae: "Night Fae",
    venthyr: "Venthyr",
  };
  
  var TalentIds = {
    FOTM: "193195",
    DAM: "321291",
    UD: "341273",
    BNS: "64129",
    SL: "199855",
    IN: "288733",
    TOF: "109142",
    MIS: "238558",
    SN: "341385",
    LW: "263716",
    MBO: "205369",
    PH: "64044",
    AS: "155271",
    PS: "199484",
    SC: "205385",
    DM: "341374",
    MB: "123040",
    VT: "263165",
    AM: "341240",
    HV: "345218",
    STM: "193223",
  }
  
  var ConduitsIds = {
    HA: "338319",
    DE: "338342",
    MD: "338332",
    RS: "338338",
    SP: "338315",
    FF: "338305",
    FT: "337979",
    CA: "337966",
    SS: "336239",
    TS: "331586",
    EP: "331580",
    DT: "331584",
    WP: "319983",
    BFW: "319973",
    GI: "322721",
    NTP: "320660",
    NTB: "320659",
    FOB: "319191",
    SB: "319210",
    WHT: "325066",
    FS: "325069",
    LGOTP: "328257",
    CM: "328266",
    PC: "329778",
    BCTA: "333950",
    HOG: "333935",
    PPS: "323090",
    LBE: "342181",
    GC: "323919",
    HAMG: "326572",
    VS: "323074",
    DD: "331584",
    RP: "336243",
    FR: "326514",
  }

  var LegendTitles = {
    conduits: "Conduits Rank",
    conduit_combos: "Increase in %",
    consumables: "Increase in %",
    covenants: "Increase in %",
    covenantsChoice: "Increase in %",
    enchants: "Increase in %",
    legendaries: "Increase in %",
    racials: "Increase in %",
    soulbinds: "Increase in %",
    soulbind_traits: "Increase in %",
    soulbinds_launch: "Increase in %",
    stats: "Increase in %",
    talents: "Increase in %",
    trinkets: "Item level",
    legendary_items: "Item level",
}

var ChartType = {
  covenantsChoice: "multiple",
  conduits: "percentage",
  legendaryItems: "percentage",
  trinkets: "percentage",
  stats: "dot",
}

var ChartPadding = {
  talents: -80,
}

var getValue = function(list, key) {
    return list[key.replace("-", "_")];
}

var getKeys = function(list) {
    let result = [];
    let values = Object.values(list);
    let keys = Object.entries(list);
    for (i = 0; i < values.length; i++) {
      result.push(keys[i][0]);
    }
  
    return result;
  };
/*
 * Color definitions
 */
const defaultBackgroundColor = "#343a40";
const defaultFontColor = "#f8f9fa";
const defaultAxisColor = "#828282";
const lightColor = "#eeeeee";
const mediumColor = "#999999";
const darkColor = "#343a40";
const gridLineColor = "#616c77";
const buttonBorderColor = "#DDA0DD";
const buttonBackgroundColor = "#330066";
const buttonBorderColorDefault = "white";
const fontSize = "1.1rem";

/*
 * Chart definitions
 */
const fontWeightBold = "bold";
const legendTitleTextDps = "Increase in %";
const tooltipHeaderFormat = "<b>(point.x)</b>";
const tooltipPointFormat = '<span style=color: "{point.color}"><b>{series.name}</b></span>: <b>{point.y}</b><br/>';
const plotOptionsPointFormat = "Value: {point.y:,.0f} mm";
const alignRight = "right";
const alignMiddle = "middle";
const stackingNormal = "normal";
const legendTitleTextSteps = "Steps";
const chartType = "bar";
const defaultHeader = "Ancient Madness - Trinkets - Venthyr - Composite";
const whiteText = "white";
const legendLayoutVertical = "vertical";
const legendTitleTextItemLevel = "Item Level";
const increase = "% (Increase)";
const decrease = "% (Decrease)";
const dpsIncrease = "Increase in %";
/*
 * Other definitions
 */
const updateDataInnerHtml = "Last Updated: ";
const divText = "div";
const buttonContainerText = "button-container";
const buttonText = "button";
const dash = "-";
const space = " ";
const DPS = "DPS";
const px = "px";
const empty = "";
const jsonExtension = ".json";
const csvExtension = ".csv"
const simResultPath = "/results/Results_";
const slash = "/";
const underscore = "_";

/*
 * Repo url definition
 */
const baseUrl = "https://raw.githubusercontent.com/WarcraftPriests/sl-shadow-priest/master/";
const wowheadUrl = "https://www.wowhead.com/"
const wowheadSpellPath = "spell="
const wowheadItemPath = "item="
const config = "config.yml";
const textType = "text";

/*
 * Json data schema definitions
 */
const jsonLastUpdated = "last_updated";
const jsonSortedDataKeys = "sorted_data_keys";
const jsonIds = "ids";
const jsonData = "data";
const jsonDPS = "DPS";
const jsonBase = "Base";
const jsonSimulatedSteps = "simulated_steps";


/*
 * Simc related stuff definitions
 */
const trinkets = "trinkets";
const talents = "talents";
const soulbinds = "soulbinds";
const composite = "Composite";
const legendaries = "legendaries";
const fightStyle = "fightStyle";
const covenant = "covenant";
const conduits = "conduits";
const racials = "racials";
const ancientMadness = "am";
const venthyr = "venthyr";
const kyrian = "kyrian";
const nightFae = "night_fae";
const necrolord = "necrolord";
const ring = "ring";
const food = "food";
const sims = "sims";
const apl = "apl";
const gear = "gear";
const stats = "stats";
const soulbindTraits = "soulbind_traits";
const soulbindsLaunch = "soulbinds_launch";
const conduitCombos = "conduit_combos";
const legendaryItems = "legendary_items";

/*
 * Button related definitions
 */
const fightStyleDiv = "fightStyle-div";
const covenantDiv = "covenant-div";
const covenantChoiceDiv = "covenantChoice-div";
const consumablesDiv = "consumables-div";
const enchantDiv = "enchants-div";
const talentDiv = "talent-div"
const simsDiv = "sims-div";
const buttonName = "button";
const buttonId = "id";
const buttonClass = "class";
const onClick = "onClick";
const click = "click";
const handleOnClickText = "handleOnClick('";
const show = "show";
const enchants = "enchants";
const consumables = "consumables";
const covenants = "covenants";
const covenantsChoice = "covenant_choice";
const weights = "weights";

const pointer = "pointer";
const attributeSpacer = "', '";
const attributeClose = "')";
const span = "span";
const classLabel = "class";
const divider = "divider";
const fivePixel = "5px";
const auto = "auto";
const inlineBlock = "inline-block";

const defaultTalent = ancientMadness
const defaultSims = trinkets;
const defaultCovenant = venthyr;
const defaultCovenantChoice = "aggregateCovenant";
const defaultEnchant = ring;
const defaultConsumable = food;
const defaultFightStyle = composite;
const coventantsChoiceChartName = "Covenant Choice - Aggregate"

const builds = "builds";
const files = "files";
const none = "none";
var covenantChoiceColor = {
    kyrian_min: "#0033CC",
    kyrian_max: "#0099FF",
    night_fae_min: "#9933CC",
    night_fae_max: "#9966CC",
    necrolord_min: "#009933",
    necrolord_max: "#00CC66",
    venthyr_min: "#CC0000",
    venthyr_max: "#FF3300",
}

var covenantColor = {
    kyrian: "#0033CC",
    night_fae: "#9933CC",
    necrolord: "#009933",
    venthyr: "#CC0000",
}

var racialColor = {
    Goblin: "#F2545B",
    Gnome: "#4F86C6",
    Dark_Iron_Dwarf: "#4F86C6",
    Night_Elf_Haste: "#4F86C6",
    Draenei: "#4F86C6",
    Human: "#4F86C6",
    Troll: "#F2545B",
    Blood_Elf: "#F2545B",
    Void_Elf: "#4F86C6",
    Panda_Feast: "#F3F7F0",
    Nightborne: "#F2545B",
    Lightforged_Draenei: "#4F86C6",
    Night_Elf_Crit: "#4F86C6",
    Kul_Tiran: "#4F86C6",
    Zandalari_Troll_Paku: "#F2545B",
    Zandalari_Troll_Bwonsamdi: "#F2545B",
    Mechagnome: "#4F86C6",
    Undead: "#F2545B",
    Worgen: "#4F86C6",
    Maghar_Orc: "#F2545B",
    Zandalari_Troll_Kimbul: "#F2545B",
    Panda_Haste: "#F3F7F0",
    Dwarf: "#4F86C6",
    Tauren: "#F2545B",
    Panda_Mastery: "#F3F7F0",
    Panda_Crit: "#F3F7F0",
    Panda_Vers: "#F3F7F0",
    Vulpera: "#F2545B",
    Panda_Smothered_Shank: "#F3F7F0",
}

var getCovenantChoiceColor = function (key) {
    return covenantChoiceColor[key];
};

var getColor = function (key, key2) {
   var color = covenantColor[key];
   
   if(color == null || color == undefined || color == ""){
     color = covenantColor[key2];
   }
   
   if(color == null || color == undefined || color == "") {
      if(key.includes("Necrolord")) {
        color = covenantColor["necrolord"];
      } else if(key.includes("Night_Fae")) {
        color = covenantColor["night_fae"];
      } else if(key.includes("Venthyr")) {
        color = covenantColor["venthyr"];
      } else if(key.includes("Kyrian")) {
        color = covenantColor["kyrian"];
      }
   }

   if(color == null || color == undefined || color == "") {
       color = racialColor[key];
   }

   if(color == null || color == undefined || color == "") {
       color = "#496DC9";
   }
   
   return color;
}

function create_color(dps, min_dps, max_dps) {
    
    let color_min = [0, 255, 255];
    let color_mid = [255, 255, 0];
    let color_max = [255, 0, 0];
    let diff_mid_max = 0;
    let diff_min_mid = 0;
    for (let i = 0; i < 3; i++) {
      diff_mid_max += Math.abs(color_max[i] - color_mid[i]);
      diff_min_mid += Math.abs(color_mid[i] - color_min[i]);
    }
    let mid_ratio = diff_min_mid / (diff_min_mid + diff_mid_max);
    let mid_dps = min_dps + (max_dps - min_dps) * mid_ratio;
    if (dps >= mid_dps) {
      let percent_of_max = (dps - mid_dps) / (max_dps - mid_dps);
      return [
        Math.floor(color_max[0] * percent_of_max + color_mid[0] * (1 - percent_of_max)),
        Math.floor(color_max[1] * percent_of_max + color_mid[1] * (1 - percent_of_max)),
        Math.floor(color_max[2] * percent_of_max + color_mid[2] * (1 - percent_of_max))
      ];
    } else {
      let percent_of_mid = (dps - min_dps) / (mid_dps - min_dps);
      return [
        Math.floor(color_mid[0] * percent_of_mid + color_min[0] * (1 - percent_of_mid)),
        Math.floor(color_mid[1] * percent_of_mid + color_min[1] * (1 - percent_of_mid)),
        Math.floor(color_mid[2] * percent_of_mid + color_min[2] * (1 - percent_of_mid))
      ];
    }
  }
/*
 * Use the data from the json request and sort them for the single bar
 * setup
 */
function buildChartDataSingleBar(data, showInLegend, xPadding, simsBtn, chartId) {
  var chartForSingle = new Highcharts.Chart( getSingleBarDefinition( 
                                                buildWowheadTooltips( data, true, simsBtn, showInLegend),
                                                data,
                                                getValue(LegendTitles, simsBtn),
                                                dpsIncrease,
                                                showInLegend,
                                                xPadding,
                                                chartId))
  while (chartForSingle.series.length > 0) {
    chartForSingle.series[0].remove(false);
  }
  let result = [];
  var currName = data.name.split("-").pop();
  currName = currName.replace(/\s/g, '');
  for (sortedData of data[jsonSortedDataKeys]) {
    let dps = data[jsonData][sortedData][jsonDPS];
    let baselineDPS = data[jsonData][jsonBase][jsonDPS];
    if (baselineDPS == null) 
      baselineDPS = 0;
    
    if(dps >= 0) {
      var percentage = (dps / baselineDPS) * 100 - 100;
      if(percentage < 0) {
        result.push({y: 0, color: getColor(sortedData, currName)});
      } else {
        result.push({y: percentage, color: getColor(sortedData, currName)});
      }
    }
  }

  chartForSingle.addSeries({
    data: result,
    name: DPS,
    showInLegend: showInLegend,
  },false);
  updateSize(chartForSingle, chartId, result.length);
}

/*
 * Use the data from the json request and sort them for the stacked bar
 * setup
 */
function buildDataForPercentageChart(data, simsBtn, chartId) {
  var chartForPercentage = new Highcharts.Chart( getChartDefinitionPercentage( 
                                                      buildWowheadTooltips(data, false, simsBtn), 
                                                      data,
                                                      getValue(LegendTitles, simsBtn),
                                                      dpsIncrease,
                                                      chartId));

  while (chartForPercentage.series.length > 0) {
    chartForPercentage.series[0].remove(false);
  }

  for (currStep of data[jsonSimulatedSteps]) {
    let currResult = [];  
    
    for (sortedData of data[jsonSortedDataKeys]) {
      let dps = data[jsonData][sortedData.trim()][currStep];
      let baselineDPS = data[jsonData][jsonBase];
      if (baselineDPS == null) 
        baselineDPS = 0;
  
      if(dps >= 0) {
        var percentage = (dps / baselineDPS.DPS) * 100 - 100;
        if(percentage < 0) {
          currResult.push(0);
        } else {
          currResult.push(percentage);
        }
      } else {
        currResult.push(0);
      }
      
    }
    chartForPercentage.addSeries({
      data: currResult,
      name: currStep,
      showInLegend: true,
    }, false);
  }
  updateSize(chartForPercentage, chartId, data[jsonSortedDataKeys].length);
}

/*
 * Use the data from the json request and sort them for the stacked bar
 * setup
 */
function buildChartDataMultipleBar(data, simsBtn, chartId) {
  var chartForMultipleBar = new Highcharts.Chart(getMultipleBarChartDefinition(
                                                      buildWowheadTooltipsMultipleBar( data, simsBtn), 
                                                      data,
                                                      getValue(LegendTitles, simsBtn),
                                                      dpsIncrease,
                                                      chartId));
  while (chartForMultipleBar.series.length > 0) {
    chartForMultipleBar.series[0].remove(false);
  }
  var minResults = [];
  var maxResults = [];

  for(i = 0; i <= Conduits2.length -1; i++) {
    minResults = [];
    maxResults = [];

    for(currFight in data[jsonData]) {
      var minValue = ((data[jsonData][currFight][Conduits2[i]]["min"]) * 100);
      var maxValue = ((data[jsonData][currFight][Conduits2[i]]["max"]) * 100) - ((data[jsonData][currFight][Conduits2[i]]["min"])) * 100;
      minResults.push(minValue);
      maxResults.push(maxValue);
    }

    chartForMultipleBar.addSeries({
      color: getCovenantChoiceColor(Conduits2[i] + "_max"),
      data: maxResults,
      name: getConduitsName(Conduits2[i]) + " max",
      stack: Conduits2[i],
      showInLegend: true,
      }, false);
    
      chartForMultipleBar.addSeries({
      color: getCovenantChoiceColor(Conduits2[i] + "_min"),
      data: minResults,
      name: getConduitsName(Conduits2[i]) + " min",
      stack: Conduits2[i],
      showInLegend: true,
    }, false);
  }
  chartForMultipleBar.redraw();
  updateSize(chartForMultipleBar, chartId, Conduits2.length);
}

function buildChartDataDot(githubData, chartId) {
  var chartForStats = new Highcharts.Chart(getDefaultDotDefinition(chartId));
  (function (H) {
      function dragStart(eStart) {
          eStart = chartForStats.pointer.normalize(eStart);

          var posX = eStart.chartX,
          posY = eStart.chartY,
          alpha = chartForStats.options.chart.options3d.alpha,
          beta = chartForStats.options.chart.options3d.beta,
          sensitivity = 5; // lower is more sensitive

          function drag(e) {
              e = chartForStats.pointer.normalize(e);

              chartForStats.update({
                  chart: {
                      options3d: {
                          alpha: alpha + (e.chartY - posY) / sensitivity,
                       beta: beta + (posX - e.chartX) / sensitivity
                      }
                  }
              }, undefined, undefined, false);
          }
          chartForStats.unbindDragMouse = H.addEvent(document, 'mousemove', drag);
          chartForStats.unbindDragTouch = H.addEvent(document, 'touchmove', drag);
          H.addEvent(document, 'mouseup', chartForStats.unbindDragMouse);
          H.addEvent(document, 'touchend', chartForStats.unbindDragTouch);
      }
      H.addEvent(chartForStats.container, 'mousedown', dragStart);
      H.addEvent(chartForStats.container, 'touchstart', dragStart);
  }(Highcharts));

  
  let light_color = "#eeeeee"
  let maxDPSPrefix = githubData[jsonSortedDataKeys][0];
  let minDPSPrefix = githubData[jsonSortedDataKeys][githubData[jsonSortedDataKeys].length -1];
  let maximalDps = githubData[jsonData][maxDPSPrefix][jsonDPS];
  let minimalDps = githubData[jsonData][minDPSPrefix][jsonDPS];
  
  let series = {
    name: Intl.NumberFormat().format(maximalDps) + " DPS",
    color: "#FF0000",
    data: []
  };

  for (sortedData of githubData[jsonSortedDataKeys]) {
    let entry = githubData[jsonData][sortedData][jsonDPS];
    let color_set = create_color(
      entry,
      minimalDps,
      maximalDps
    );
    let line_width = 1;
    let line_color = "#232227";

    let radius = 2 + 3 * (entry - minimalDps) / (maximalDps - minimalDps);
    if (maximalDps === entry) {
      line_width = 3;
      radius = 8;
      line_color = light_color;
    }

    let dataLabel = undefined;
    if(sortedData.includes("10")) {
      dataLabel = {
        enabled: true,
        allowOverlap: true,
      };
      
      if(sortedData.split(underscore)[0].includes("10")){
        dataLabel.format = "Mastery";
        dataLabel.verticalAlign = "top";
      } else if(sortedData.split("_")[1].includes("10")) {
        dataLabel.format = "Versatility";
        dataLabel.verticalAlign = "top";
      } else if(sortedData.split("_")[2].includes("10")) {
        dataLabel.format = "Haste";
      } else if(sortedData.split("_")[3].includes("10")) {
        dataLabel.format = "Crit";
        dataLabel.verticalAlign = "top";
      }
    }

    statMastery = ((parseInt(sortedData.split("_")[0].replace(/[^.\d]/g, ''))) * configData["stats"]["steps"] ) + configData["stats"]["base"] / configData["stats"]["include"].length;
    statVers = ((parseInt(sortedData.split("_")[1].replace(/[^.\d]/g, ''))) * configData["stats"]["steps"] ) + configData["stats"]["base"] / configData["stats"]["include"].length;
    statHaste = ((parseInt(sortedData.split("_")[2].replace(/[^.\d]/g, ''))) * configData["stats"]["steps"] ) + configData["stats"]["base"] / configData["stats"]["include"].length;
    statCrit = ((parseInt(sortedData.split("_")[3].replace(/[^.\d]/g, ''))) * configData["stats"]["steps"] ) + configData["stats"]["base"] / configData["stats"]["include"].length;
    sumStatValues = configData["stats"]["total"];

    series.data.push({
      x: Math.sqrt(3) / 2 * (parseInt(sortedData.split("_")[0].replace(/[^.\d]/g, '')) + 1 / 3 * parseInt(sortedData.split("_")[1].replace(/[^.\d]/g, ''))),
      y: Math.sqrt(2 / 3) * parseInt(sortedData.split("_")[1].replace(/[^.\d]/g, '')),
      z: parseInt(sortedData.split("_")[2].replace(/[^.\d]/g, '')) + 0.5 * parseInt(sortedData.split("_")[0].replace(/[^.\d]/g, '')) + 0.5 * parseInt(sortedData.split("_")[1].replace(/[^.\d]/g, '')),
      name: sortedData,
      color: "rgb(" + color_set[0] + "," + color_set[1] + "," + color_set[2] + ")",

      dps: entry,
      dpsMax: maximalDps,
      dpsMin: minimalDps,
      dpsBase: githubData[jsonData][jsonBase][jsonDPS],
      statMastery: statMastery,
      statVers: statVers,
      statHaste: statHaste,
      statCrit: statCrit,
      statMasteryPercent: Math.round(( 100 / sumStatValues ) * (((parseInt(sortedData.split("_")[0].replace(/[^.\d]/g, ''))) * configData["stats"]["steps"] ) + configData["stats"]["base"] / configData["stats"]["include"].length)),
      statVersPercent: Math.round(( 100 /sumStatValues ) * (((parseInt(sortedData.split("_")[1].replace(/[^.\d]/g, ''))) * configData["stats"]["steps"] ) + configData["stats"]["base"] / configData["stats"]["include"].length)),
      statHastePercent: Math.round(( 100 /sumStatValues ) * (((parseInt(sortedData.split("_")[2].replace(/[^.\d]/g, ''))) * configData["stats"]["steps"] ) + configData["stats"]["base"] / configData["stats"]["include"].length)),
      statCritPercent: Math.round(( 100 /sumStatValues ) * (((parseInt(sortedData.split("_")[3].replace(/[^.\d]/g, ''))) * configData["stats"]["steps"] ) + configData["stats"]["base"] / configData["stats"]["include"].length)),
      marker: {
        radius: radius,
        lineColor: line_color,
        lineWidth: line_width
      },
     dataLabels: dataLabel,
    });
  }

  
  while (chartForStats.series[0]) {
    chartForStats.series[0].remove(false);
  }

  chartForStats.addSeries(series, false);
  chartForStats.addSeries({ name: Intl.NumberFormat().format(minimalDps) + " DPS", color: "#00FFFF" }, false);
  chartForStats.redraw();
}
/*
 * Build wowhead tooltips
 */
function buildWowheadTooltips(data, breakConidition, simsBtn) {
  var result = [];
  for (dpsName of data[jsonSortedDataKeys]) {
    var id = data[jsonIds][dpsName]; 
    
    if (id == null) {
      id = "";
    }

    if(simsBtn == consumables) {
      url = wowheadUrl + wowheadItemPath;
    } else if(configData[sims][simsBtn.replace("_", "-")]["lookupType"] == "spell"){
      url = wowheadUrl + wowheadSpellPath;
    } else {
      url = wowheadUrl + wowheadItemPath;
    }
    
    result.push(buildChartLine(dpsName, id, url, simsBtn));
  }
  
  return result;
}

function buildWowheadTooltipsMultipleBar(data, simsBtn) {
  var result = [];
  for(currFight in data[jsonData]) {
    result.push(buildChartLine(getValue(FightStyleExternal, currFight), "", ""));
  }

  return result;
}
/*
 * Build a single line of the wowhead tooltip
 */
function buildChartLine(dpsName, itemId, url, simsBtn) {
  result = "";
  result += '<div style="display:inline-block; margin-bottom:-3px">';
  if( simsBtn == null
    || simsBtn == undefined
    || simsBtn == trinkets 
    || simsBtn == consumables
    || simsBtn == conduits
    || simsBtn == covenants
    || simsBtn == enchants
    || simsBtn == legendaries
    || simsBtn.replace("-", "_") == legendaryItems
    || simsBtn == racials
    || simsBtn.replace("-", "_") == soulbindTraits) {
      result = buildChartLineWithWowheadLine(dpsName, itemId, url, result);
  } else if(simsBtn != null && simsBtn != undefined && simsBtn.replace("-", "_") == conduitCombos) {
    result = buildChartLineForConduitCombos(dpsName, result);
  } else if(simsBtn != null && simsBtn != undefined && simsBtn.replace("-", "_") == soulbinds) {
    result = buildChartLineForSoulbinds(dpsName, result);
  } else if(simsBtn != null && simsBtn != undefined && simsBtn.replace("-", "_") == soulbindsLaunch) {
    result = buildChartLineForSoulbindsLaunch(dpsName, result);
  } else if(simsBtn != null && simsBtn != undefined && simsBtn == talents) {
    result = buildChartLineForTrinkets(dpsName, result);
  } else if(simsBtn != null && simsBtn != undefined && simsBtn == "soulbinds_prog") {
    result = buildChartLineForSoulbindsLaunch(dpsName, result);
  } else {
    result = buildChartLineWithWowheadLine(dpsName, itemId, url, result);
  }
  return result;
}

function buildChartLineForTrinkets(dpsName, currentResult) {
  var currResult = "";
  var names = dpsName.split("_");
  for(name of names) {
    currResult = buildChartLineWithWowheadLine(name, getValue(TalentIds, name.toUpperCase()), wowheadUrl + wowheadSpellPath, currResult);
  }

  return currResult;
}

function buildChartLineForSoulbinds(dpsName, currentResult) {
  var currResult = "";
  var names = []
  var currNames = dpsName.split("-");
  for(name of currNames) {
    if(name.includes("_")) {
      var currNames2 = name.split("_");
      for(currName of currNames2){
        names.push(currName);
      }
    } else {
      names.push(name);
    }
  }
  currResult = buildChartLineForBasic(names, currResult);
  return currentResult + currResult;
}

function buildChartLineForSoulbindsLaunch(dpsName, currentResult) {
  var result = currentResult;
  var names = [];
  var currNames = dpsName.split("-");
  for(name of currNames) {
    if(name.includes("_")) {
      var currNames2 = name.split("_");
      for(currName of currNames2) {
        names.push(currName);
      }
    } else {
      names.push(name);
    }
  }  
  result = buildChartLineForBasic(names, result);
  return result;
}

function buildChartLineForConduitCombos(dpsName, currentResult) {
  var result = currentResult;
  var names = dpsName.split("_");
  result = buildChartLineForBasic(names, result);
  return result;
}

function buildChartLineForBasic(names, currentResult) {
  var currResult = currentResult; 
  var counter = 0;
  var currName = "";
  var nextName = "";
  var skipNext = false;
  var nextId = "";
  for(name of names) {
    counter++;
    if(!(/^\d+$/.test(name))){
      if(skipNext) {
        skipNext = false;
        continue;
      } else if (counter < names.length) {
        currName = name;
        nextName = names[counter];
        nextId = getValue(ConduitsIds, nextName.toUpperCase());
      }
      var id = getValue(ConduitsIds, name.toUpperCase());
      if(nextId == null || nextId == undefined) {
        currName = name + "(" + nextName + ")";
        skipNext = true;
      } else if( id == null || id == undefined && counter == 1) {
        currName = name + " / ";
      } else {
        currName = name;
      }
      currResult = buildChartLineWithWowheadLine(currName, getValue(ConduitsIds, name.toUpperCase()), wowheadUrl + wowheadSpellPath, currResult);
      
      nextName = "";
      nextId = "";
    } 
  }
  return currResult;
}

function buildChartLineWithWowheadLine(dpsName, itemId, url, currentResult) {
  var result = currentResult;
  result += '<a style="color: white; font-size: 16px; padding: 3px; cursor: default" href="' + url + itemId + '"';
  result += ' onclick="return false"';
  result += '" target="blank"';
  result += ">";
  result += dpsName;
  result += "</a>";

  return result;
}

/*
 * Formatter for the tooltips of the chart
 */
function formatterDefault(points, x, data) {
  var result = '<div class="chartHover">'
                    + '<div class="chartHoverLine">' 
                    + x 
                    + "</div>";
  for (var i = points.length - 1; i >= 0; i--) {
    result += getTooltip( points[i].y, 
                          ((data[jsonData][jsonBase][DPS] / 100) * points[i].y), 
                          points[i].series,
                          data);
  }
  result += "</div>";
  return result;
}
  
/*
 * Formatter for the tooltips of the chart
 */
function formatterStacked(points, x, data) {
  var result = '<div class="chartHover">'
                    + '<div class="chartHoverLine">' 
                    + x
                    + "</div>";
  
  for (var i = points.length - 1; i >= 0; i--) {
    result += getTooltip( ((data[jsonData][jsonBase][DPS] + points[i].y) / data[jsonData][jsonBase][DPS] * 100 - 100),
                          points[i].y,
                          points[i].series,
                          data);
  }
  result += "</div>";
  return result;
}

/*
 * Formatter for the tooltips of the chart
 */
function formatterPercentage(points, x, data) {
  var result = '<div class="chartHover">'
                    + '<div class="chartHoverLine">' 
                    + x
                    + "</div>";
  
  for (var i = points.length - 1; i >= 0; i--) {
    result += getTooltip( points[i].y, 
                          (( data[jsonData][jsonBase][DPS] / 100 ) * points[i].y), 
                          points[i].series,
                          data);
  }

  result += "</div>";
  return result;
}

function formatterMultipleBar(points, x, data) {
  var result = '<div class="chartHover">'
                    + '<div class="chartHoverLine">' 
                    + x
                    + "</div>";
                    var minValue = 0;
                    var value = 0;
                    for (var i = points.length - 1; i >= 0; i--) {
                      if(points[i].series.name.includes("min")) {
                        minValue = points[i].y;
                        value = minValue;
                      } else if (points[i].series.name.includes("max")) {
                        value = minValue + points[i].y;
                        minValue = 0;
                      }
                      result += getTooltip( value, 
                                            0, 
                                            points[i].series,
                                            data);
                    }
                  
                    result += "</div>";
  
  return result;
}

function getTooltip(percentage, dpsIncrease, series, data) {
  result = "";
  if (percentage != 0) {
    result = '<div><span class="chartHoverSpan" style="border-left: 9px solid ' 
              + series.color
              + ";" 
              + '">' 
              + series.name
              + " ( " + data[jsonData][jsonBase][DPS] + " base )"
              + "</span>:&nbsp;&nbsp;";
    if(dpsIncrease != 0) {
      result += "+ "
              + Intl.NumberFormat().format(dpsIncrease) 
              + space + DPS.toLowerCase()
              + space + dash + space;
    }
    result += percentage.toFixed(2);
    if (percentage > 0) {
      result += '% (Increase)';
    } else {
      result += '% (decrease)';
    }
  }
  return result;
}

function getDefaultDotDefinition(chartId) {
    return defaultDotDefinition = {
      chart: {
        renderTo: chartId,
        type: "scatter3d",
        backgroundColor: null,
        animation: false,
        height: 700,
        width: 600,
        options3d: {
          enabled: true,
          alpha: 10,
          beta: -10,
          depth: 700,
          fitToPlot: false,
        }
      },
      legend: {
        enabled: false,
        backgroundColor: darkColor,
        borderColor: mediumColor,
        borderWidth: 1,
        align: "right",
        verticalAlign: "middle",
        layout: "vertical",
        itemStyle: { "color": defaultFontColor },
        itemHoverStyle: { "color": defaultFontColor }
      },
      plotOptions: {
        series: {
          dataLabels: {
            allowOverlap: true,
            style: {
              color: defaultFontColor,
              fontSize: fontSize,
              fontWeight: fontWeightBold,
              fontWeight: "400",
              textOutline: ""
            }
          },
          events: {
            legendItemClick: function () {
              return false;
          }
        },
      },
    },
    series: [],
      title: {
        text: '', //"Title placeholder",
        style: {
          color: defaultFontColor,
          fontWeight: fontWeightBold,
        },
      },
      subtitle: {
        text: "",
        useHTML: true,
        style: {
          color: defaultFontColor,
          fontWeight: fontWeightBold,
          fontSize: fontSize
        }
      },
      tooltip: {
        headerFormat: '',
          pointFormatter: function () {
            return '<table>\
              <thead>\
                <tr>\
                  <th ></th>\
                  <th ></th>\
                  <th ></th>\
                </tr>\
              </thead>\
              <tbody>\
                <tr>\
                  <th >DPS</th>\
                  <td>' + Intl.NumberFormat().format(this.dps) + '</td>\
                  <td>' + Math.round(( 100 / this.dpsBase ) * ( this.dps - this.dpsBase) * 100 ) / 100 + '%</td>\
                </tr>\
                <tr>\
                  <th >Crit</th>\
                  <td>' + this.statCrit +'</td>\
                  <td>' + this.statCritPercent + '%</td>\
                </tr>\
                <tr>\
                  <th>Haste</th>\
                  <td>' + this.statHaste +'</td>\
                  <td>' + this.statHastePercent + '%</td>\
                </tr>\
                <tr>\
                  <th>Mastery</th>\
                  <td>' + this.statMastery +'</td>\
                  <td>' + this.statMasteryPercent + '%</td>\
                </tr>\
                <tr>\
                  <th>Versatility</th>\
                  <td>' + this.statVers +'</td>\
                  <td>' + this.statVersPercent + '%</td>\
                </tr>\
              </tbody>\
            </table>';
        },
        useHTML: true,
        borderColor: darkColor,
      },
      xAxis: {
        min: -5,
        max: 15,
        startOnTick: true,
        endOnTick: true,
        title: "",
        labels: {
          enabled: false,
        },
        gridLineWidth: 1,
        gridLineColor: mediumColor,
      },
      yAxis: {
        min: -5,
        max: 15,
        startOnTick: true,
        endOnTick: true,
        title: "",
        labels: {
          enabled: false,
        },
        gridLineWidth: 1,
        gridLineColor: mediumColor,
      },
      zAxis: {
        min: 0,
        max: 20,
        startOnTick: true,
        endOnTick: true,
        title: "",
        labels: {
          enabled: false,
        },
        reversed: true,
        gridLineWidth: 1,
        gridLineColor: mediumColor,
      },
    };
  }

  function getMultipleBarChartDefinition(wowheadTooltips, data, legendTitle, yAxisTitle, chartId) {
    return stackedCharDefinition = {
      chart: {
        renderTo: chartId,
        type: chartType,
        backgroundColor: defaultBackgroundColor,
      },
      title: {
        title: '',
      },
      xAxis: {
        categories: wowheadTooltips,
        useHTML: true,
        labels: {
          x: -40,
          useHTML: true,
          style: {
            color: defaultFontColor,
            fontWeight: fontWeightBold,
            fontSize: 14,
            events: {
              legendItemClick: function () { return false; }
            },
          },
        },
      },
      yAxis: {
        min: '0',
        allowDecimals: true,
        gridLineColor: gridLineColor,
        crosshair: {
          color: whiteText,
          width: 3,
          snap: false,
          zIndex: 10,
        },
        labels: {
          style: {
            color: defaultFontColor,
          },
        },
        stackLabels: {
          enabled: false,
          style: {
            fontWeight: fontWeightBold,
            color: defaultFontColor,
            fontSize: 14,
          },
        },
        title: {
          text: yAxisTitle,
          color: defaultFontColor,
        },
      },
      legend: {
        layout: legendLayoutVertical,
        align: alignRight,
        borderColor: mediumColor,
        borderWidth: 1,
        floating: false,
        itemMarginBottom: 3,
        itemMaginTop: 0,
        reversed: true,
        shadow: false,
        verticalAlign: alignMiddle,
        x: 0,
        y: 0,
        title: {
          text: legendTitle,
          style: {
            color: lightColor,
            fontWeight: fontWeightBold,
          },
        },
        itemStyle: {
          color: defaultFontColor,
          fontWeight: fontWeightBold,
        },
      },
      plotOptions: {
        series: {
          column: {
            dataLabels: {
                enabled: false,
            },
          },
          line: {
            label: {
              enabled: false,
            },
          },
          pointPadding: 1.0, 
          states: {
            hover: {
              enabled: false
            },
            inactive: {
              opacity: 1,
            },
          },
          dataLabels: {
            align: alignRight,
            enabled: false,
            pointFormat: plotOptionsPointFormat,
          },
          stacking: stackingNormal,
          grouping: true,
          groupPadding: 0.1,
          enableMouseTracking: true,
          pointPadding: 0,
          pointWidth: 10,
          spacing: 100,
          events: {
            legendItemClick: function () { return false; }
          },
          allowPointSelect: false,
        },
      },
      title: {
        text: '',
      },
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: tooltipHeaderFormat, 
        style: {
          color: defaultFontColor,
        },
        pointFormat: tooltipPointFormat,
        padding: 5,
        formatter: function () {
          return formatterMultipleBar(this.points, this.x, data);
        },
      },
    };   
  }

  function getChartDefinitionPercentage(wowheadTooltips, data, legendTitle, yAxisTitle, chartId) {
    return percentageChartDefinition = {
      chart: {
        renderTo: chartId,
        type: chartType,
        backgroundColor: defaultBackgroundColor,
      },
  
      title: {
        title: '',
      },
  
      plotOptions: {
        series: {
          states: {
            hover: {
              enabled: false
            },
            inactive: {
              opacity: 1,
            },
          },
          stacking: stackingNormal,
          dataLabels: {
            align: alignRight,
            enabled: false,
            pointFormat: plotOptionsPointFormat,
          },
          enableMouseTracking: true,
          pointWidth: 15,
          spacing: 20,
          events: {
            legendItemClick: function () { return false; }
          },
          allowPointSelect: false,
        },
      },
  
      xAxis: {
        categories: wowheadTooltips,
        useHTML: true,
        labels: {
          useHTML: true,
          x: -40,
          style: {
            color: defaultFontColor,
            fontWeight: fontWeightBold,
            fontSize: 14,
            events: {
              legendItemClick: function () { return false; }
            },
          },
        },
      },
  
      yAxis: {
        crosshair: {
          color: whiteText,
          width: 3,
          snap: false,
          zIndex: 10,
        },
        labels: {
          style: {
            color: defaultFontColor,
          },
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: fontWeightBold,
            color: defaultFontColor,
            fontSize: 14,
          },
        },
        gridLineColor: gridLineColor,
        min: '0',
        allowDecimals: true,
        tickPositioner: function() {
          var result = [];
          var highestDPS = 0;
          let baselineDPS = data[jsonData][jsonBase];
          for(currStep of data[jsonSimulatedSteps]) {
            for(sortedData of data[jsonSortedDataKeys]) {
              var percentage = ((data[jsonData][sortedData.trim()][currStep]) / baselineDPS.DPS) * 100 - 100;
              if(percentage > highestDPS) {
                highestDPS = percentage;
              }
            }
          }

          let lastValue = 0;
          result.push(lastValue)
          for(i = 0; i <= 8; i++) {
            lastValue = lastValue + Number((Number(highestDPS / (data[jsonSimulatedSteps].length + 1))).toFixed(2) * (data[jsonSimulatedSteps].length / 7));
            result.push(Number(lastValue.toFixed(2)));
          }
        return result;
        },
        title: {
          text: yAxisTitle,
          color: defaultFontColor,
        },
      },
  
      legend: {
        layout: legendLayoutVertical,
        align: alignRight,
        borderColor: mediumColor,
        borderWidth: 1,
        floating: false,
        itemMarginBottom: 3,
        itemMaginTop: 0,
        reversed: true,
        shadow: false,
        verticalAlign: alignMiddle,
        x: 0,
        y: 0,
        title: {
          text: legendTitle,
          style: {
            color: lightColor,
            fontWeight: fontWeightBold,
          },
        },
        itemStyle: {
          color: defaultFontColor,
          fontWeight: fontWeightBold,
        },
      },
  
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: tooltipHeaderFormat, 
        style: {
          color: defaultFontColor,
        },
        pointFormat: tooltipPointFormat,
        padding: 5,
        formatter: function () {
          return formatterPercentage(this.points, this.x, data);
        },
      },
    };   
  }

  function getSingleBarDefinition(wowheadTooltips, data, legendTitle, yAxisTitle, showLegend, xPadding, chartId) {
    return singleLineBarDefinition = {
      chart: {
        renderTo: chartId,
        type: chartType,
        backgroundColor: defaultBackgroundColor,
      },
      
      title: {
        text: '',
      },
  
      plotOptions: {
        series: {
          states: {
            hover: {
              enabled: false
            },
            inactive: {
              opacity: 1,
            },
          },
          stacking: stackingNormal,
          dataLabels: {
            align: alignRight,
            enabled: false,
            pointFormat: plotOptionsPointFormat,
          },
          enableMouseTracking: true,
          pointWidth: 15,
          spacing: 20,
          events: {
            legendItemClick: function () { return false; }
          },
          allowPointSelect: false,
        },
      },
  
      xAxis: {
        labels: {
          x: xPadding,
          useHTML: true,
          style: {
            color: defaultFontColor,
            fontWeight: fontWeightBold,
            fontSize: 14,
            events: {
              legendItemClick: function () { return false; }
            },
          },
        },
        categories: wowheadTooltips,
        useHTML: true,
      },
  
      yAxis: {
        crosshair: {
          color: whiteText,
          width: 3,
          snap: false,
          zIndex: 10,
        },
        labels: {
          style: {
            color: defaultFontColor,
          },
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: fontWeightBold,
            color: defaultFontColor,
            fontSize: 14,
          },
        },
        gridLineColor: gridLineColor,
        title: {
          text: yAxisTitle,
          color: defaultFontColor,
        },
      },
      
      legend: {
        layout: legendLayoutVertical,
        align: alignRight,
        borderColor: mediumColor,
        borderWidth: 1,
        floating: false,
        itemMarginBottom: 3,
        itemMaginTop: 0,
        reversed: true,
        shadow: false,
        verticalAlign: alignMiddle,
        x: 0,
        y: 0,
        title: {
          text: legendTitle,
          style: {
            color: lightColor,
            fontWeight: fontWeightBold,
          },
        },
        itemStyle: {
          color: defaultFontColor,
          fontWeight: fontWeightBold,
        },
        enabled: showLegend,
      },
  
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: tooltipHeaderFormat,
        style: {
          color: defaultFontColor,
          textAlign: 'center',
        },
        pointFormat: tooltipPointFormat,
        padding: 5,
        formatter: function () {
          return formatterDefault(this.points, this.x, data);
        },
      },
    };   
  }
