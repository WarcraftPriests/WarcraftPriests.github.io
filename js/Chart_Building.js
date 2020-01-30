const default_background_color = "#343a40";
const default_font_color = "#f8f9fa";
const default_axis_color = "#828282";

const light_color = "#eeeeee";
const medium_color = "#999999";
const dark_color = "#343a40";

var lastUpdate = document.getElementById("updateData")



//Commented out for now until I can decide on colors.
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
'Ancients Bulwark',
'Apothecarys Concoctions',
'Arcane Heart',
'Archive of the Titans',
'Barrage Of Many Bombs',
'Battlefield Focus',
'Blightborne Infusion',
'Blood Rite',
'Bonded Souls',
'Champion of Azeroth',
'Chorus of Insanity',
'Clockwork Heart',
'Collective Will',
'Combined Might',
'Dagger in the Back Behind',
'Dagger in the Back Front',
'Death Throes',
'Fight or Flight',
'Filthy Transfusion',
'Glory in Battle',
'Heart of Darkness',
'Incite the Pack',
'Laser Matrix',
'Loyal to the End 4 Allies',
'Loyal to the End 3 Allies',
'Loyal to the End 2 Allies',
'Loyal to the End 1 Allies',
'Loyal to the End 0 Allies',
'Meticulous Scheming',
'Relational Normalization Gizmo',
'Retaliatory Fury',
'Rezans Fury',
'Ricocheting Inflatable Pyrosaw',
'Ruinous Bolt',
'Searing Dialogue',
'Secrets of the Deep',
'Seductive Power',
'Shadow of Elune',
'Spiteful Apparitions',
'Swirling Sands',
'Sylvanas Resolve',
'Synaptic Spark Capacitor',
'Thought Harvester',
'Thunderous Blast',
'Tidal Surge',
'Tradewinds',
'Treacherous Covenant',
'Undulating Tides',
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

const major_essence_powers = [
"Focused Azerite Beam",
"Guardian of Azeroth",
"Purifying Blast",
"The Unbound Force",
"Memory of Lucid Dreams",
"Vision of Perfection",
"Conflict",
"Concentrated Flame",
"Ripple in Space",
"Blood of the Enemy 100",
"Blood of the Enemy 75",
"Blood of the Enemy 50",
"Worldvein Resonance 4 Allies",
"Worldvein Resonance 3 Allies",
"Worldvein Resonance 2 Allies",
"Worldvein Resonance 1 Allies",
"Worldvein Resonance 0 Allies",
"Replica of Knowledge",
"Moment of Glory",
"Reaping Flames"
]

const minor_essnece_powers = [
"Blood Soaked",
"Condensed Life Force",
"Focused Energy",
"Purification Protocol",
"Reckless Force",
"Lucid Dreams",
"Strive for Perfection",
"Strife",
"Ancient Flame",
"Reality Shift",
"Lifeblood 4 Allies",
"Lifeblood 3 Allies",
"Lifeblood 2 Allies",
"Lifeblood 1 Allies",
"Lifeblood 0 Allies",
"Symbiotic Presence",
"Unified Strength",
"Lethal Strikes"
]

const potion_flask = [
"Potion of Unbridled Fury",
"Potion of Focused Resolve",
"Greater Flask of Endless Fathoms",
"Flask of Endless Fathoms",
"Superior Battle Potion of Intellect",
"Potion of Rising Death",
"Battle Potion of Intellect",
"Potion of Empowered Proximity"
]

const food_consumables = [
"Baked Port Tato",
"Mech-Dowels Big Mech",
"Swamp Fish n Chips",
"Honey-Glazed Haunches",
"Bil Tong",
"Famine Evaluator and Snack Table",
"Abyssal-Fried Rissole ",
"Fancy Darkmoon Feast",
"Spiced Snapper",
"Bountiful Captains Feast",
"Sailors Pie",
"Galley Banquet"
]

const weapon_enchants = [
"Weapon-Quick Navigation",
"Weapon-Deadly Navigation",
"Weapon-Machinists Brilliance",
"Weapon-Torrent of Elements",
"Weapon-Versatile Navigation",
"Weapon-Masterful Navigation",
"Weapon-Oceanic Restoration"
]

const ring_enchants = [
"Ring Accord of Haste",
"Ring Accord of Critical Strike",
"Ring Accord of Versatility",
"Ring Pact of Haste",
"Ring Pact of Critical Strike",
"Ring Accord of Mastery",
"Ring Pact of Versatility",
"Ring Pact of Mastery"
]

var WCP_Chart = function WCP_Chart(id, options) {
  this.chartId = id;
  this.options = options;
  this.default

  this.chartOptions = {
    chart: {
      renderTo: this.chartId,
      type: 'bar',
      backgroundColor: default_background_color
    },
    title: {
      style: {
        color: default_font_color,
        fontWeight: 'bold'
      },
      text: "Trinket Chart - Shadow Crash"
    },
    plotOptions: {
      series: {
        stacking: 'normal',
        dataLabels: {
          align: 'right',
          enabled: false,
          pointFormat: "Value: {point.y:,.0f} mm"
        },
        enableMouseTracking: true,
        pointWidth: 15,
        spacing: 20,
        events: {
          legendItemClick: function() {
            return false;
          }
        },
        allowPointSelect: false
      }
    },
    xAxis: {
      labels: {
        useHTML: true,
        style: {
          color: default_font_color,
          fontWeight: 'bold',
          fontSize: 14,
          events: {
            legendItemClick: function() {
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
      reversed: true,
      shadow: false,
      verticalAlign: 'middle',
      x: 0,
      y: 0,
      title: {
        text: "Item Level",
        style: {
          color: light_color,
          fontWeight: 'bold',
        },
      },
      itemStyle: {
        color: default_font_color,
        fontWeight: 'bold',
      },
    }
  };
};

WCP_Chart.prototype.init = function() {
  // Setup your dummy charts, tabs, initiate the inial chart
  this.chart = Highcharts.chart(this.chartId, this.chartOptions); // Empty chart.
  if (this.options.hasOwnProperty('buttons')) {
    this.buildButtons();
  }
  var first = Object.keys(this.options.charts)[3];
  if (this.options.charts[first].type == 'trinket') {
    this.updateTrinketChart(first); // Setup the initial chart
  } else if (this.options.charts[first].type == 'azerite-trait') {
    this.updateTraitChart(first); // Setup the initial chart
  } else {
    console.log(this.options.carts[0].type, 'is an invalid type');
    return;
  }
};

//https://rawcdn.githack.com/WarcraftPriests/bfa-shadow-priest/master/json_Charts/traits_SC_C.json

WCP_Chart.prototype.updateTrinketChart = function(chartName) {

  jQuery.getJSON("https://raw.githubusercontent.com/WarcraftPriests/bfa-shadow-priest/master/json_Charts/" + this.options.charts[chartName].src + ".json", function(data) {
    toUpdateData = "Last Updated: ";
    toUpdateData += data["LastUpdated"];
    updateData.innerHTML = toUpdateData;
    var sortedItems = [];
    var dpsSortedData = data["sorted_data_keys"];
    var wowheadTooltips = [];
    for (dpsName of dpsSortedData) {
      chartLink = "";
      truncatedName = dpsName.trim()
      dpsName = dpsName.replace(/ /g, '_');
      itemID = data["item_ids"][dpsName];
      chartLink = "";
      chartLink += "<div style=\"display:inline-block; margin-bottom:-3px\">";
      chartLink += "<a style=\"color: white; font-size: 16px; padding: 3px; cursor: default\" href=#";
      chartLink += " onclick=\"return false\"";
      chartLink += " rel=\"https://www.wowhead.com/item=";
      chartLink += itemID;
      chartLink += "/"
      chartLink += dpsName.trim().replace(/ /g, '_');
      chartLink += "\" target=\"blank\"";
      chartLink += " class=\"chart_link\"";
      chartLink += ">";
      chartLink += dpsName.trim();
      chartLink += "</a>";
      chartLink += "</div>";
      //Push link into array
      wowheadTooltips.push(chartLink);
    }
    while (this.chart.series.length > 0) {
      this.chart.series[0].remove(false);
    }
    this.chart.update({
      xAxis: {
        categories: wowheadTooltips,
        useHTML: true,
      },
      legend: {
        title: {
          text: "Item Level"
        }
      },
      title: {
        style: {
          color: default_font_color,
          fontWeight: 'bold'
        },
        text: this.options.charts[chartName].title
      },
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: "<b>(point.x)</b>", //'<span style="font-size: 14px"><b>{point.key}</b></span><br/>',
        style: {
          color: default_font_color,
        },
        pointFormat: '<span style=color: "{point.color}"><b>{series.name}</b></span>: <b>{point.y}</b><br/>',
        padding: 5,
        formatter: function() {
          var s = '<div style="margin: -4px -6px -11px -7px; padding: 3px 3px 6px 3px; background-color:';
          s += dark_color;
          s += '"><div style=\"margin-left: 9px; margin-right: 9px; margin-bottom: 6px; font-weight: 700;\">' + this.x + '</div>'
          var baseAmount = data["data"]["Base"]["300"];
          var cumulativeAmount = 0 + baseAmount;
          for (var i = this.points.length - 1; i >= 0; i--) {
            cumulativeAmount += this.points[i].y;
            if (this.points[i].y != 0) {
              s += '<div><span style=\"margin-left: 9px; border-left: 9px solid ' +
                this.points[i].series.color + ';' +
                ' padding-left: 4px;' +
                '\">' +
                this.points[i].series.name +
                '</span>:&nbsp;&nbsp;' +
                Intl.NumberFormat().format(cumulativeAmount - baseAmount);
              s += ' dps';
              s += ' - ';
              let percentage = (cumulativeAmount / baseAmount * 100 - 100).toFixed(2);
              s += percentage;
              if (percentage > 0) {
                s += '% (Increase)';
              } else {
                s += '% (decrease)';
              }
            }
          }
          s += '</div>';
          return s;
        },
      },
    })
    let itemLevels = data["simulated_steps"];

    for (currIlevel of itemLevels) {
      let maxItemLevel = data["simulated_steps"][0];
      let itemLevelDpsValues = [];
      for (sortedData of dpsSortedData) {
        var keys = [];
        for (var k in data["data"][sortedData]) keys.push(k); //Pull all item levels of the trinket.
        let ilvldifference = keys[1] - keys[0];
        let minItemLevel = keys[0];
        sortedData = sortedData.trim();
        let dps = data["data"][sortedData][currIlevel];
        let baselineDPS = data["data"]["Base"]["300"];
        //Check to make sure DPS isn't 0
        if (dps >= 0) {
          if (currIlevel == minItemLevel) {
            //If lowest ilvl is looked at, subtract base DPS
            if (dps - baselineDPS < 0) {
              itemLevelDpsValues.push(0);
            } else {
              itemLevelDpsValues.push(dps - baselineDPS);
            }
          } else {
            if (dps - data["data"][sortedData][currIlevel - ilvldifference] < 0) {
              itemLevelDpsValues.push(0);
            } else {
              itemLevelDpsValues.push(dps - data["data"][sortedData][currIlevel - ilvldifference]);
            }
          }
        } else {
          if (currIlevel in data["data"][sortedData]) {
            itemLevelDpsValues.push(0);
          } else {
            itemLevelDpsValues.push(0);
          }
        }


      }
      //this.chart.yAxis[0].update({categories: dpsSortedData});
      this.chart.addSeries({
        color: ilevel_color_table[currIlevel],
        data: itemLevelDpsValues,
        name: currIlevel,
        showInLegend: true
      }, false);
    }
    document.getElementById(this.chartId).style.height = 200 + dpsSortedData.length * 30 + "px";
    this.chart.setSize(document.getElementById(this.chartId).style.width, document.getElementById(this.chartId).style.height);
    //this.chart.renderTo(this.chartId);
    this.chart.redraw();
    try {
      $WowheadPower.refreshLinks();
    } catch (error) {
      console.log(error);
    }
  }.bind(this)).fail(function(xhr, status) {
    console.log("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
    console.log(status);
    alert("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
  });
};


WCP_Chart.prototype.updateTraitChart = function(chartName) {
  jQuery.getJSON("https://raw.githubusercontent.com/WarcraftPriests/bfa-shadow-priest/master/json_Charts/" + this.options.charts[chartName].src + ".json", function(data) {
    let sortedItems = [];
    let dpsSortedData = data["sorted_data_keys"];
    //Check if the traits are primary or secondary and adjust the graph accordingly
    let traitSelect = [];

    if (traits == 'P') {
      for (dpsName of dpsSortedData) {
        dpsName = dpsName.trim();
        for (p of primary_azerite_traits) {
          if (dpsName == p) {
            traitSelect.push(dpsName);
          }
        }
      }
    } else {
      {
        for (dpsName of dpsSortedData) {
          dpsName = dpsName.trim();
          for (s of secondary_azerite_traits) {
            if (dpsName == s) {
              traitSelect.push(dpsName);
            }
          }
        }
      }
    }
    var wowheadTooltipsTraits = [];
    for (dpsName of traitSelect) {
      chartLink = "";
      dpsName = dpsName.trim()
      spellID = data["spell_ids"][dpsName + ' '];
      chartLink = "";
      chartLink += "<div style=\"display:inline-block; margin-bottom:-3px\">";
      chartLink += "<a style=\"color: white; font-size: 16px; padding: 3px; cursor: default\" href=#";
      chartLink += " onclick=\"return false\"";
      chartLink += " rel=\"https://www.wowhead.com/spell=";
      chartLink += spellID;
      chartLink += "/"
      chartLink += dpsName.replace(/ /g, '-');
      chartLink += "\" target=\"blank\"";
      chartLink += " class=\"chart_link\"";
      chartLink += ">";
      chartLink += dpsName;
      chartLink += "</a>";
      chartLink += "</div>";
      //Push link into array
      //console.log(chartLink);
      wowheadTooltipsTraits.push(chartLink);
    }
    while (this.chart.series.length > 0) {
      this.chart.series[0].remove(false);
    }
    this.chart.update({
      xAxis: {
        categories: wowheadTooltipsTraits,
        useHTML: true,
        labels: {
          x: -30,
        },
      },
      title: {
        style: {
          color: default_font_color,
          fontWeight: 'bold'
        },
        text: this.options.charts[chartName].title
      },
      legend: {
        title: {
          text: "Stack Count"
        }
      },
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: "<b>(point.x)</b>", //'<span style="font-size: 14px"><b>{point.key}</b></span><br/>',
        style: {
          color: default_font_color,
        },
        pointFormat: '<span style=color: "{point.color}"><b>{series.name}</b></span>: <b>{point.y}</b><br/>',
        padding: 5,
        //shared: true
        formatter: function() {
          var s = '<div style="margin: -4px -6px -11px -7px; padding: 3px 3px 6px 3px; background-color:';
          s += dark_color;
          s += '"><div style=\"margin-left: 9px; margin-right: 9px; margin-bottom: 6px; font-weight: 700;\">' + this.x + '</div>'
          var baseAmount = data["data"]["Base"]["1_stack"];
          var cumulativeAmount = 0 + baseAmount;
          for (var i = this.points.length - 1; i >= 0; i--) {
            cumulativeAmount += this.points[i].y;
            if (this.points[i].y != 0) {
              s += '<div><span style=\"margin-left: 9px; border-left: 9px solid ' +
                this.points[i].series.color + ';' +
                ' padding-left: 4px;' +
                '\">' +
                this.points[i].series.name +
                '</span>:&nbsp;&nbsp;' +
                Intl.NumberFormat().format(cumulativeAmount - baseAmount);
              s += ' dps';
              s += ' - ';
              let percentage = (cumulativeAmount / baseAmount * 100 - 100).toFixed(2);
              s += percentage;
              if (percentage > 0) {
                s += '% (Increase)';
              } else {
                s += '% (decrease)';
              }
            }
          }
          s += '</div>';
          return s;
        },
      },
    });
    for (let stackCount of [3, 2, 1]) {
      let maxItemLevel = data["simulated_steps"][0].split("_")[1];
      let stackName = stackCount + "_" + maxItemLevel;
      let itemLevelDpsValues = [];
      for (sortedData of traitSelect) {
        sortedData = sortedData.trim();
        let dps = data["data"][sortedData][stackName];
        let baselineDPS = data["data"]["Base"]["1_" + maxItemLevel];

        //Check to make sure DPS isn't 0
        if (dps > 0) {
          if (stackCount == 1) {
            //If lowest ilvl is looked at, subtract base DPS
            itemLevelDpsValues.push(dps - baselineDPS);
          } else {
            itemLevelDpsValues.push(dps - data["data"][sortedData][stackCount - 1 + "_" + maxItemLevel]);
          }
        } else {
          if (stackName in data["data"][sortedData]) {
            itemLevelDpsValues.push(dps);
          } else {
            itemLevelDpsValues.push(0);
          }
        }
      }
      let newStackName = stackName.split("_")[0];
      //standard_chart.yAxis[0].update({categories: dpsSortedData});
      this.chart.addSeries({
        color: ilevel_color_table[stackName],
        data: itemLevelDpsValues,
        name: newStackName,
        showInLegend: true
      }, false);
    }
    document.getElementById(this.chartId).style.height = 200 + traitSelect.length * 30 + "px";
    this.chart.setSize(document.getElementById(this.chartId).style.width, document.getElementById(this.chartId).style.height);
    //this.chart.renderTo(this.chartId);
    this.chart.redraw();
    try {
      $WowheadPower.refreshLinks();
    } catch (error) {
      console.log(error);
    }

  }.bind(this)).fail(function(xhr, status) {
    console.log("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
    console.log(status);
    //alert("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
  });
};

WCP_Chart.prototype.updateEssenceChart = function(chartName) {

  jQuery.getJSON("https://raw.githubusercontent.com/WarcraftPriests/bfa-shadow-priest/master/json_Charts/" + this.options.charts[chartName].src + ".json", function(data) {
    let sortedItems = [];
    let dpsSortedData = data["sorted_data_keys"];
    //Check if the essences are major or minor and adjust the graph accordingly
    let essenceSelect = [];

    if (essence == 'Major') {
      for (dpsName of dpsSortedData) {
        dpsName = dpsName.trim();
        for (m of major_essence_powers) {
          if (dpsName == m) {
            essenceSelect.push(dpsName);
          }
        }
      }
    } else {
      {
        for (dpsName of dpsSortedData) {
          dpsName = dpsName.trim();
          for (m of minor_essnece_powers) {
            if (dpsName == m) {
              essenceSelect.push(dpsName);
            }
          }
        }
      }
    }
    console.log(essenceSelect);
    var wowheadTooltipsTraits = [];
    for (dpsName of essenceSelect) {
      chartLink = "";
      dpsName = dpsName.trim()
      spellID = data["spell_ids"][dpsName];
      chartLink = "";
      chartLink += "<div style=\"display:inline-block; margin-bottom:-3px\">";
      chartLink += "<a style=\"color: white; font-size: 16px; padding: 3px; cursor: default\" href=#";
      chartLink += " onclick=\"return false\"";
      chartLink += " rel=\"https://www.wowhead.com/spell=";
      chartLink += spellID;
      chartLink += "/"
      chartLink += dpsName.replace(/ /g, '-');
      chartLink += "\" target=\"blank\"";
      chartLink += " class=\"chart_link\"";
      chartLink += ">";
      chartLink += dpsName;
      chartLink += "</a>";
      chartLink += "</div>";
      //Push link into array
      //console.log(chartLink);
      wowheadTooltipsTraits.push(chartLink);
    }
    while (this.chart.series.length > 0) {
      this.chart.series[0].remove(false);
    }
    this.chart.update({
      xAxis: {
        categories: wowheadTooltipsTraits,
        useHTML: true,
        labels: {
          x: -30,
        },
      },
      title: {
        style: {
          color: default_font_color,
          fontWeight: 'bold'
        },
        text: this.options.charts[chartName].title
      },
      legend: {
        title: {
          text: "Essence Rank"
        }
      },
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: "<b>(point.x)</b>", //'<span style="font-size: 14px"><b>{point.key}</b></span><br/>',
        style: {
          color: default_font_color,
        },
        pointFormat: '<span style=color: "{point.color}"><b>{series.name}</b></span>: <b>{point.y}</b><br/>',
        padding: 5,
        //shared: true
        formatter: function() {
          var s = '<div style="margin: -4px -6px -11px -7px; padding: 3px 3px 6px 3px; background-color:';
          s += dark_color;
          s += '"><div style=\"margin-left: 9px; margin-right: 9px; margin-bottom: 6px; font-weight: 700;\">' + this.x + '</div>'
          var baseAmount = data["data"]["Base"]["rank_1"];
          var cumulativeAmount = 0 + baseAmount;
          for (var i = this.points.length - 1; i >= 0; i--) {
            cumulativeAmount += this.points[i].y;
            if (this.points[i].y != 0) {
              s += '<div><span style=\"margin-left: 9px; border-left: 9px solid ' +
                this.points[i].series.color + ';' +
                ' padding-left: 4px;' +
                '\">' +
                this.points[i].series.name +
                '</span>:&nbsp;&nbsp;' +
                Intl.NumberFormat().format(cumulativeAmount - baseAmount);
              s += ' dps';
              s += ' - ';
              let percentage = (cumulativeAmount / baseAmount * 100 - 100).toFixed(2);
              s += percentage;
              if (percentage > 0) {
                s += '% (Increase)';
              } else {
                s += '% (decrease)';
              }
            }
          }
          s += '</div>';
          return s;
        },
      },
    });
    for (let stackCount of [3, 2, 1]) {
      let maxItemLevel = data["simulated_steps"][0].split("_")[0]; // Rank
      let stackName = maxItemLevel + "_" + stackCount; //Rank_1
      let itemLevelDpsValues = [];
      for (sortedData of essenceSelect) {
        sortedData = sortedData.trim();
        let dps = data["data"][sortedData][stackName];
        let baselineDPS = data["data"]["Base"][maxItemLevel + "_1"];

        //Check to make sure DPS isn't 0
        if (dps > 0) {
          if (stackCount == 1) {
            //If lowest ilvl is looked at, subtract base DPS
            itemLevelDpsValues.push(dps - baselineDPS);
          } else if (stackCount == 2) {
            if(dps - data["data"][sortedData][maxItemLevel + "_1"] > 0)
              itemLevelDpsValues.push(dps - data["data"][sortedData][maxItemLevel + "_1"]);
            else {
               itemLevelDpsValues.push(0);
            }
          } else {
            if(dps - data["data"][sortedData][maxItemLevel + "_2"] > 0)
              itemLevelDpsValues.push(dps - data["data"][sortedData][maxItemLevel + "_2"]);
            else {
               itemLevelDpsValues.push(0);
             }
          }
        } else {
          if (stackName in data["data"][maxItemLevel + "_" + (stackCount -1) ]) {
            itemLevelDpsValues.push(dps);

          } else {
            itemLevelDpsValues.push(0);
          }
        }
      }
      let newStackName = stackName.split("_")[1];
      //standard_chart.yAxis[0].update({categories: dpsSortedData});
      this.chart.addSeries({
        color: ilevel_color_table[stackName],
        data: itemLevelDpsValues,
        name: newStackName,
        showInLegend: true
      }, false);
    }
    document.getElementById(this.chartId).style.height = 200 + essenceSelect.length * 30 + "px";
    this.chart.setSize(document.getElementById(this.chartId).style.width, document.getElementById(this.chartId).style.height);
    //this.chart.renderTo(this.chartId);
    this.chart.redraw();
    try {
      $WowheadPower.refreshLinks();
    } catch (error) {
      console.log(error);
    }

  }.bind(this)).fail(function(xhr, status) {
    console.log("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
    console.log(status);
    //alert("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
  });
};


WCP_Chart.prototype.updateCorruptionChart = function(chartName) {
  jQuery.getJSON("https://raw.githubusercontent.com/WarcraftPriests/bfa-shadow-priest/master/json_Charts/" + this.options.charts[chartName].src + ".json", function(data) {
    let sortedItems = [];
    let dpsSortedData = data["sorted_data_keys"];
    //Check if the traits are primary or secondary and adjust the graph accordingly
    let traitSelect = [];

    var wowheadTooltipsTraits = [];
    for (dpsName of dpsSortedData) {
      chartLink = "";
      dpsName = dpsName.trim()
      dpsName = dpsName.replace(" ","_")
      dpsName = dpsName.replace(" ","_")
      spellID = data["spell_ids"][dpsName.replace(" ", "_")];

      chartLink = "";
      chartLink += "<div style=\"display:inline-block; margin-bottom:-3px\">";
      chartLink += "<a style=\"color: white; font-size: 16px; padding: 3px; cursor: default\" href=#";
      chartLink += " onclick=\"return false\"";
      chartLink += " rel=\"https://www.wowhead.com/spell=";
      chartLink += spellID;
      chartLink += "/"
      chartLink += dpsName.replace(/ /g, '-');
      chartLink += "\" target=\"blank\"";
      chartLink += " class=\"chart_link\"";
      chartLink += ">";
      chartLink += dpsName;
      chartLink += "</a>";
      chartLink += "</div>";
      //Push link into array
      //console.log(chartLink);
      wowheadTooltipsTraits.push(chartLink);
    }
    
    //console.log(wowheadTooltipsTraits);

    while (this.chart.series.length > 0) {
      this.chart.series[0].remove(false);
    }
    this.chart.update({
      xAxis: {
        categories: wowheadTooltipsTraits,
        useHTML: true,
        labels: {
          x: -30,
        },
      },
      title: {
        style: {
          color: default_font_color,
          fontWeight: 'bold'
        },
        text: this.options.charts[chartName].title
      },
      legend: {
        title: {
          text: "Tier Level"
        }
      },
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: "<b>(point.x)</b>", //'<span style="font-size: 14px"><b>{point.key}</b></span><br/>',
        style: {
          color: default_font_color,
        },
        pointFormat: '<span style=color: "{point.color}"><b>{series.name}</b></span>: <b>{point.y}</b><br/>',
        padding: 5,
        //shared: true
        formatter: function() {
          var s = '<div style="margin: -4px -6px -11px -7px; padding: 3px 3px 6px 3px; background-color:';
          s += dark_color;
          s += '"><div style=\"margin-left: 9px; margin-right: 9px; margin-bottom: 6px; font-weight: 700;\">' + this.x + '</div>'
          var baseAmount = data["data"]["Base"]["DPS"];
          var cumulativeAmount = 0 + baseAmount;
          for (var i = this.points.length - 1; i >= 0; i--) {
            cumulativeAmount += this.points[i].y;
            if (this.points[i].y != 0) {
              s += '<div><span style=\"margin-left: 9px; border-left: 9px solid ' +
                this.points[i].series.color + ';' +
                ' padding-left: 4px;' +
                '\">' +
                this.points[i].series.name +
                '</span>:&nbsp;&nbsp;' +
                Intl.NumberFormat().format(cumulativeAmount - baseAmount);
              s += ' dps';
              s += ' - ';
              let percentage = 0;
              if (corruptionPointflag)
              {
                percentage = (cumulativeAmount / 1 * 100 - 100).toFixed(2);
              }
              else
              {
                percentage = (cumulativeAmount / baseAmount * 100 - 100).toFixed(2);
              }
                s += percentage;
              if (percentage > 0) {
                s += '% (Increase)';
              } else {
                s += '% (decrease)';
              }
            }
          }
          s += '</div>';
          return s;
        },
      },
    });
    let itemLevelDpsValues = [];
      for (sortedData of dpsSortedData) {
        sortedData = sortedData.trim();
        let dps = data["data"][sortedData]["DPS"];
        let baselineDPS = data["data"]["Base"]["DPS"];
        let corruptionPoints = 0;
        if (corruptionPointflag)
        {
          corruptionPoints = data["data"][sortedData]["Corruption"];;
        }

        //Check to make sure DPS isn't 0
        if(corruptionPointflag)
            {
              if(dps > 0 && dps != baselineDPS)
              {              
                itemLevelDpsValues.push(dps);
              }
              else
              {
                itemLevelDpsValues.push(0);
              }
            }
        else
        {
          if (dps-baselineDPS > 0) {
              //If lowest ilvl is looked at, subtract base DPS
              itemLevelDpsValues.push(dps-baselineDPS)
          } else {
            itemLevelDpsValues.push(0);
          }
      }
      }
      //standard_chart.yAxis[0].update({categories: dpsSortedData});
      this.chart.addSeries({
        color: ilevel_color_table["DPS"],
        data: itemLevelDpsValues,
        name: "DPS",
        showInLegend: true
      }, false);
    document.getElementById(this.chartId).style.height = 200 + dpsSortedData.length * 30 + "px";
    this.chart.setSize(document.getElementById(this.chartId).style.width, document.getElementById(this.chartId).style.height);
    //this.chart.renderTo(this.chartId);
    this.chart.redraw();
    try {
      $WowheadPower.refreshLinks();
    } catch (error) {
      console.log(error);
    }

  }.bind(this)).fail(function(xhr, status) {
    console.log("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
    console.log(status);
    //alert("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
  });
};



WCP_Chart.prototype.updateTalentsChart = function(chartName) {
  jQuery.getJSON("https://raw.githubusercontent.com/WarcraftPriests/bfa-shadow-priest/master/json_Charts/" + this.options.charts[chartName].src + ".json", function(data) {
    let sortedItems = [];
    let dpsSortedData = data["sorted_data_keys"];
    //Check if the essences are major or minor and adjust the graph accordingly
    let talentSelect = [];
    for (dpsName of dpsSortedData) {
        dpsName = dpsName.trim();
        talentSelect.push(dpsName);
    }

/*
    var wowheadTooltipsTraits = [];
    for (dpsName of talentSelect) {
      chartLink = "";
      dpsName = dpsName.trim()
      talentArray = dpsName.split(" ");
      chartLink = "";
      chartLink += "<div style=\"display:inline-block; margin-bottom:-3px; padding-right:10px;\">";
      for (t of talentArray) {
        chartLink += "<a style=\"color: white; font-size: 16px; padding: 3px; cursor: default\" href=#";
        chartLink += " onclick=\"return false\"";
        chartLink += " rel=\"https://www.wowhead.com/spell=";
        spellID = data["spell_ids"][t];
        chartLink += spellID;
        chartLink += "/"
        chartLink += t
        chartLink += "\" target=\"blank\"";
        chartLink += " class=\"chart_link\"";
        chartLink += ">";
        chartLink += t;
        chartLink += "</a>";
        chartLink += " / ";
      }
      //Push link into array
      //console.log(chartLink);
      wowheadTooltipsTraits.push(chartLink);
    }
*/
    while (this.chart.series.length > 0) {
      this.chart.series[0].remove(false);
    }
    this.chart.update({
      xAxis: {
        categories: talentSelect,
        useHTML: true,
        labels: {
          x: -40,
        },
      },
      title: {
        style: {
          color: default_font_color,
          fontWeight: 'bold'
        },
        text: this.options.charts[chartName].title
      },
      legend: {
        title: {
          text: "DPS"
        }
      },
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: "<b>(point.x)</b>", //'<span style="font-size: 14px"><b>{point.key}</b></span><br/>',
        style: {
          color: default_font_color,
        },
        pointFormat: '<span style=color: "{point.color}"><b>{series.name}</b></span>: <b>{point.y}</b><br/>',
        padding: 5,
        //shared: true
        formatter: function() {
          var s = '<div style="margin: -4px -6px -11px -7px; padding: 3px 3px 6px 3px; background-color:';
          s += dark_color;
          s += '"><div style=\"margin-left: 9px; margin-right: 9px; margin-bottom: 6px; font-weight: 700;\">' + this.x + '</div>'
          var baseAmount = data["data"]["Base"]["DPS"];
          var cumulativeAmount = 0 + baseAmount;
          for (var i = this.points.length - 1; i >= 0; i--) {
            cumulativeAmount += this.points[i].y;
            if (this.points[i].y != 0) {
              s += '<div><span style=\"margin-left: 9px; border-left: 9px solid ' +
                this.points[i].series.color + ';' +
                ' padding-left: 4px;' +
                '\">' +
                this.points[i].series.name +
                '</span>:&nbsp;&nbsp;' +
                Intl.NumberFormat().format(cumulativeAmount - baseAmount);
              s += ' dps';
              s += ' - ';
              let percentage = (cumulativeAmount / baseAmount * 100 - 100).toFixed(2);
              s += percentage;
              if (percentage > 0) {
                s += '% (Increase)';
              } else {
                s += '% (decrease)';
              }
            }
          }
          s += '</div>';
          return s;
        },
      },
    });
      let itemLevelDpsValues = [];
      for (sortedData of talentSelect) {
        sortedData = sortedData.trim();
        let dps = data["data"][sortedData]["DPS"];
        let baselineDPS = data["data"]["Base"]["DPS"];

        //Check to make sure DPS isn't 0
        if (dps > 0) {
            //If lowest ilvl is looked at, subtract base DPS
            itemLevelDpsValues.push(dps - baselineDPS);
        } else {
          itemLevelDpsValues.push(dps);
        }
      }
      //standard_chart.yAxis[0].update({categories: dpsSortedData});
      this.chart.addSeries({
        color: ilevel_color_table["DPS"],
        data: itemLevelDpsValues,
        name: "DPS",
        showInLegend: true
      }, false);

    document.getElementById(this.chartId).style.height = 200 + talentSelect.length * 30 + "px";
    this.chart.setSize(document.getElementById(this.chartId).style.width, document.getElementById(this.chartId).style.height);
    //this.chart.renderTo(this.chartId);
    this.chart.redraw();
    try {
      $WowheadPower.refreshLinks();
    } catch (error) {
      console.log(error);
    }

  }.bind(this)).fail(function(xhr, status) {
    console.log("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
    console.log(status);
    //alert("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
  });
};

WCP_Chart.prototype.updateRacialsChart = function(chartName) {
  jQuery.getJSON("https://raw.githubusercontent.com/WarcraftPriests/bfa-shadow-priest/master/json_Charts/" + this.options.charts[chartName].src + ".json", function(data) {
    let sortedItems = [];
    let dpsSortedData = data["sorted_data_keys"];
    //Check if the essences are major or minor and adjust the graph accordingly
    let racialSelect = [];
    for (dpsName of dpsSortedData) {
        dpsName = dpsName.trim();
        racialSelect.push(dpsName);
    }

/*
    var wowheadTooltipsTraits = [];
    for (dpsName of racialSelect) {
      chartLink = "";
      dpsName = dpsName.trim()
      racialArray = dpsName.split(" ");
      chartLink = "";
      chartLink += "<div style=\"display:inline-block; margin-bottom:-3px; padding-right:10px;\">";
      for (t of racialArray) {
        chartLink += "<a style=\"color: white; font-size: 16px; padding: 3px; cursor: default\" href=#";
        chartLink += " onclick=\"return false\"";
        chartLink += " rel=\"https://www.wowhead.com/spell=";
        spellID = data["spell_ids"][t];
        chartLink += spellID;
        chartLink += "/"
        chartLink += t
        chartLink += "\" target=\"blank\"";
        chartLink += " class=\"chart_link\"";
        chartLink += ">";
        chartLink += t;
        chartLink += "</a>";
        chartLink += " / ";
      }
      //Push link into array
      //console.log(chartLink);
      wowheadTooltipsTraits.push(chartLink);
    }
*/
    while (this.chart.series.length > 0) {
      this.chart.series[0].remove(false);
    }
    this.chart.update({
      xAxis: {
        categories: racialSelect,
        useHTML: true,
        labels: {
          x: -40,
        },
      },
      title: {
        style: {
          color: default_font_color,
          fontWeight: 'bold'
        },
        text: this.options.charts[chartName].title
      },
      legend: {
        title: {
          text: "DPS"
        }
      },
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: "<b>(point.x)</b>", //'<span style="font-size: 14px"><b>{point.key}</b></span><br/>',
        style: {
          color: default_font_color,
        },
        pointFormat: '<span style=color: "{point.color}"><b>{series.name}</b></span>: <b>{point.y}</b><br/>',
        padding: 5,
        //shared: true
        formatter: function() {
          var s = '<div style="margin: -4px -6px -11px -7px; padding: 3px 3px 6px 3px; background-color:';
          s += dark_color;
          s += '"><div style=\"margin-left: 9px; margin-right: 9px; margin-bottom: 6px; font-weight: 700;\">' + this.x + '</div>'
          var baseAmount = data["data"]["Base"]["DPS"];
          var cumulativeAmount = 0 + baseAmount;
          for (var i = this.points.length - 1; i >= 0; i--) {
            cumulativeAmount += this.points[i].y;
            if (this.points[i].y != 0) {
              s += '<div><span style=\"margin-left: 9px; border-left: 9px solid ' +
                this.points[i].series.color + ';' +
                ' padding-left: 4px;' +
                '\">' +
                this.points[i].series.name +
                '</span>:&nbsp;&nbsp;' +
                Intl.NumberFormat().format(cumulativeAmount - baseAmount);
              s += ' dps';
              s += ' - ';
              let percentage = (cumulativeAmount / baseAmount * 100 - 100).toFixed(2);
              s += percentage;
              if (percentage > 0) {
                s += '% (Increase)';
              } else {
                s += '% (decrease)';
              }
            }
          }
          s += '</div>';
          return s;
        },
      },
    });
      let itemLevelDpsValues = [];
      for (sortedData of racialSelect) {
        sortedData = sortedData.trim();
        let dps = data["data"][sortedData]["DPS"];
        let baselineDPS = data["data"]["Base"]["DPS"];

        //Check to make sure DPS isn't 0
        if (dps > 0) {
            //If lowest ilvl is looked at, subtract base DPS
            itemLevelDpsValues.push(dps - baselineDPS);
        } else {
          itemLevelDpsValues.push(dps);
        }
      }
      //standard_chart.yAxis[0].update({categories: dpsSortedData});
      this.chart.addSeries({
        color: ilevel_color_table["DPS"],
        data: itemLevelDpsValues,
        name: "DPS",
        showInLegend: true
      }, false);

    document.getElementById(this.chartId).style.height = 200 + racialSelect.length * 30 + "px";
    this.chart.setSize(document.getElementById(this.chartId).style.width, document.getElementById(this.chartId).style.height);
    //this.chart.renderTo(this.chartId);
    this.chart.redraw();
    try {
      $WowheadPower.refreshLinks();
    } catch (error) {
      console.log(error);
    }

  }.bind(this)).fail(function(xhr, status) {
    console.log("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
    console.log(status);
    //alert("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
  });
};

WCP_Chart.prototype.updateEnchantsChart = function(chartName) {
  jQuery.getJSON("https://raw.githubusercontent.com/WarcraftPriests/bfa-shadow-priest/master/json_Charts/" + this.options.charts[chartName].src + ".json", function(data) {
    let sortedItems = [];
    let dpsSortedData = data["sorted_data_keys"];
    //Check if the essences are major or minor and adjust the graph accordingly
    let enchantselect = [];
      if (enchant == 'Weapon') {
        for (dpsName of dpsSortedData) {
          dpsName = dpsName.trim();
          for (m of weapon_enchants) {
            if (dpsName == m) {
              enchantselect.push(dpsName);
            }
          }
        }
    } else {
      {
        for (dpsName of dpsSortedData) {
          dpsName = dpsName.trim();
          for (m of ring_enchants) {
            if (dpsName == m) {
              enchantselect.push(dpsName);
            }
          }
        }
      }
    }


    var wowheadTooltipsTraits = [];
    for (dpsName of enchantselect) {
      chartLink = "";
      dpsName = dpsName.trim()
      spellID = data["spell_ids"][dpsName];
      chartLink = "";
      chartLink += "<div style=\"display:inline-block; margin-bottom:-3px\">";
      chartLink += "<a style=\"color: white; font-size: 16px; padding: 3px; cursor: default\" href=#";
      chartLink += " onclick=\"return false\"";
      chartLink += " rel=\"https://www.wowhead.com/spell=";
      chartLink += spellID;
      chartLink += "/"
      chartLink += dpsName.replace(/ /g, '-');
      chartLink += "\" target=\"blank\"";
      chartLink += " class=\"chart_link\"";
      chartLink += ">";
      chartLink += dpsName;
      chartLink += "</a>";
      chartLink += "</div>";
      //Push link into array
      //console.log(chartLink);
      wowheadTooltipsTraits.push(chartLink);
    }

    while (this.chart.series.length > 0) {
      this.chart.series[0].remove(false);
    }
    this.chart.update({
      xAxis: {
        categories: wowheadTooltipsTraits,
        useHTML: true,
        labels: {
          x: -40,
        },
      },
      title: {
        style: {
          color: default_font_color,
          fontWeight: 'bold'
        },
        text: this.options.charts[chartName].title
      },
      legend: {
        title: {
          text: "DPS"
        }
      },
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: "<b>(point.x)</b>", //'<span style="font-size: 14px"><b>{point.key}</b></span><br/>',
        style: {
          color: default_font_color,
        },
        pointFormat: '<span style=color: "{point.color}"><b>{series.name}</b></span>: <b>{point.y}</b><br/>',
        padding: 5,
        //shared: true
        formatter: function() {
          var s = '<div style="margin: -4px -6px -11px -7px; padding: 3px 3px 6px 3px; background-color:';
          s += dark_color;
          s += '"><div style=\"margin-left: 9px; margin-right: 9px; margin-bottom: 6px; font-weight: 700;\">' + this.x + '</div>'
          var baseAmount = data["data"]["Base"]["DPS"];
          var cumulativeAmount = 0 + baseAmount;
          for (var i = this.points.length - 1; i >= 0; i--) {
            cumulativeAmount += this.points[i].y;
            if (this.points[i].y != 0) {
              s += '<div><span style=\"margin-left: 9px; border-left: 9px solid ' +
                this.points[i].series.color + ';' +
                ' padding-left: 4px;' +
                '\">' +
                this.points[i].series.name +
                '</span>:&nbsp;&nbsp;' +
                Intl.NumberFormat().format(cumulativeAmount - baseAmount);
              s += ' dps';
              s += ' - ';
              let percentage = (cumulativeAmount / baseAmount * 100 - 100).toFixed(2);
              s += percentage;
              if (percentage > 0) {
                s += '% (Increase)';
              } else {
                s += '% (decrease)';
              }
            }
          }
          s += '</div>';
          return s;
        },
      },
    });
      let itemLevelDpsValues = [];
      for (sortedData of enchantselect) {
        sortedData = sortedData.trim();
        let dps = data["data"][sortedData]["DPS"];
        let baselineDPS = data["data"]["Base"]["DPS"];

        //Check to make sure DPS isn't 0
        if (dps > 0) {
            //If lowest ilvl is looked at, subtract base DPS
            itemLevelDpsValues.push(dps - baselineDPS);
        } else {
          itemLevelDpsValues.push(dps);
        }
      }
      //standard_chart.yAxis[0].update({categories: dpsSortedData});
      this.chart.addSeries({
        color: ilevel_color_table["DPS"],
        data: itemLevelDpsValues,
        name: "DPS",
        showInLegend: true
      }, false);

    document.getElementById(this.chartId).style.height = 200 + enchantselect.length * 30 + "px";
    this.chart.setSize(document.getElementById(this.chartId).style.width, document.getElementById(this.chartId).style.height);
    //this.chart.renderTo(this.chartId);
    this.chart.redraw();
    try {
      $WowheadPower.refreshLinks();
    } catch (error) {
      console.log(error);
    }

  }.bind(this)).fail(function(xhr, status) {
    console.log("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
    console.log(status);
    //alert("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
  });
};

WCP_Chart.prototype.updateConsumablesChart = function(chartName) {
  jQuery.getJSON("https://raw.githubusercontent.com/WarcraftPriests/bfa-shadow-priest/master/json_Charts/" + this.options.charts[chartName].src + ".json", function(data) {
    let sortedItems = [];
    let dpsSortedData = data["sorted_data_keys"];
    //Check if the essences are major or minor and adjust the graph accordingly
    let consumableselect = [];
      if (consumable == 'Potion') {
        for (dpsName of dpsSortedData) {
          dpsName = dpsName.trim();
          for (m of potion_flask) {
            if (dpsName == m) {
              consumableselect.push(dpsName);
            }
          }
        }
    } else {
      {
        for (dpsName of dpsSortedData) {
          dpsName = dpsName.trim();
          for (m of food_consumables) {
            if (dpsName == m) {
              consumableselect.push(dpsName);
            }
          }
        }
      }
    }


    var wowheadTooltipsTraits = [];
    for (dpsName of consumableselect) {
      chartLink = "";
      dpsName = dpsName.trim()
      spellID = data["spell_ids"][dpsName];
      chartLink = "";
      chartLink += "<div style=\"display:inline-block; margin-bottom:-3px\">";
      chartLink += "<a style=\"color: white; font-size: 16px; padding: 3px; cursor: default\" href=#";
      chartLink += " onclick=\"return false\"";
      chartLink += " rel=\"https://www.wowhead.com/spell=";
      chartLink += spellID;
      chartLink += "/"
      chartLink += dpsName.replace(/ /g, '-');
      chartLink += "\" target=\"blank\"";
      chartLink += " class=\"chart_link\"";
      chartLink += ">";
      chartLink += dpsName;
      chartLink += "</a>";
      chartLink += "</div>";
      //Push link into array
      //console.log(chartLink);
      wowheadTooltipsTraits.push(chartLink);
    }

    while (this.chart.series.length > 0) {
      this.chart.series[0].remove(false);
    }
    this.chart.update({
      xAxis: {
        categories: wowheadTooltipsTraits,
        useHTML: true,
        labels: {
          x: -40,
        },
      },
      title: {
        style: {
          color: default_font_color,
          fontWeight: 'bold'
        },
        text: this.options.charts[chartName].title
      },
      legend: {
        title: {
          text: "DPS"
        }
      },
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: "<b>(point.x)</b>", //'<span style="font-size: 14px"><b>{point.key}</b></span><br/>',
        style: {
          color: default_font_color,
        },
        pointFormat: '<span style=color: "{point.color}"><b>{series.name}</b></span>: <b>{point.y}</b><br/>',
        padding: 5,
        //shared: true
        formatter: function() {
          var s = '<div style="margin: -4px -6px -11px -7px; padding: 3px 3px 6px 3px; background-color:';
          s += dark_color;
          s += '"><div style=\"margin-left: 9px; margin-right: 9px; margin-bottom: 6px; font-weight: 700;\">' + this.x + '</div>'
          var baseAmount = data["data"]["Base"]["DPS"];
          var cumulativeAmount = 0 + baseAmount;
          for (var i = this.points.length - 1; i >= 0; i--) {
            cumulativeAmount += this.points[i].y;
            if (this.points[i].y != 0) {
              s += '<div><span style=\"margin-left: 9px; border-left: 9px solid ' +
                this.points[i].series.color + ';' +
                ' padding-left: 4px;' +
                '\">' +
                this.points[i].series.name +
                '</span>:&nbsp;&nbsp;' +
                Intl.NumberFormat().format(cumulativeAmount - baseAmount);
              s += ' dps';
              s += ' - ';
              let percentage = (cumulativeAmount / baseAmount * 100 - 100).toFixed(2);
              s += percentage;
              if (percentage > 0) {
                s += '% (Increase)';
              } else {
                s += '% (decrease)';
              }
            }
          }
          s += '</div>';
          return s;
        },
      },
    });
      let itemLevelDpsValues = [];
      for (sortedData of consumableselect) {
        sortedData = sortedData.trim();
        let dps = data["data"][sortedData]["DPS"];
        let baselineDPS = data["data"]["Base"]["DPS"];

        //Check to make sure DPS isn't 0
        if (dps > 0) {
            //If lowest ilvl is looked at, subtract base DPS
            itemLevelDpsValues.push(dps - baselineDPS);
        } else {
          itemLevelDpsValues.push(dps);
        }
      }
      //standard_chart.yAxis[0].update({categories: dpsSortedData});
      this.chart.addSeries({
        color: ilevel_color_table["DPS"],
        data: itemLevelDpsValues,
        name: "DPS",
        showInLegend: true
      }, false);

    document.getElementById(this.chartId).style.height = 200 + consumableselect.length * 30 + "px";
    this.chart.setSize(document.getElementById(this.chartId).style.width, document.getElementById(this.chartId).style.height);
    //this.chart.renderTo(this.chartId);
    this.chart.redraw();
    try {
      $WowheadPower.refreshLinks();
    } catch (error) {
      console.log(error);
    }

  }.bind(this)).fail(function(xhr, status) {
    console.log("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
    console.log(status);
    //alert("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
  });
};

WCP_Chart.prototype.buildButtons = function() {
  var container = document.createElement('div');
  container.id = 'button-container';
  for (i = 0; i < this.options.buttons.length; i++) {
    var d = document.createElement('div');
    d.id = Object.keys(this.options.buttons)[i];
    for (x = 0; x < this.options.buttons[d.id].length; x++) {
      var b = document.createElement('button');
      b.id = Object.values(this.options.buttons[d.id])[x];
      d.appendChild(b);
    }
    container.appendChild(d);
  }
  var parent = document.getElementById(this.chartId);
  parent.parentNode.insertBefore(container, parent);
};

WCP_Chart.prototype.changeChart = function(event) {

}

WCP_Chart.prototype.tabClicked = function(event) {
  var chartName = event.target;
  console.log(chartName);
  if (this.options.charts[chartName].type == 'trinket') {
    this.updateTrinketChart(chartName); // Setup the initial chart
  } else if (this.options.charts[chartName].type == 'azerite-trait') {
    this.updateTraitChart(chartName); // Setup the initial chart
  } else if (this.options.charts[chartName].type == 'essence') {
    this.updateEssenceChart(chartName); // Setup the initial chart
  } else if (this.options.charts[chartName].type == 'talents') {
    this.updateTalentsChart(chartName); // Setup the initial chart
  } else if (this.options.charts[chartName].type == 'corruption') {
    this.updateCorruptionChart(chartName); //Setup the initial chart
  }
};

function generatehorizontalSpacer(div) {
  var horizontalSpacer = document.createElement("span");
  horizontalSpacer.setAttribute("class", "divider");
  horizontalSpacer.style.width = '5px';
  horizontalSpacer.style.height = 'auto';
  horizontalSpacer.style.display = 'inline-block';
  div.appendChild(horizontalSpacer);
}

/*
Button Layout:
[Shadow Crash][Auspicious Spirits] --"talent-div"
[Trinket][Azerite Trait] --"Trinket-Trait-div"
[Composite][Single Target][Dungeon] --"Fight-Style-Div"
*/

//Create Div for other charts
var externalLinks = document.createElement("div");
externalLinks.setAttribute("id", "external-links");
externalLinks.setAttribute("class", "tabcontent");

var trinketCalc = document.createElement("BUTTON");
trinketCalc.setAttribute("id", "trinket-calculator-btn");
trinketCalc.setAttribute("class", "button");
trinketCalc.setAttribute("onClick", "location.href='trinket_calc.html'");
var trinketCalcText = document.createTextNode("Trinket Calculator");
trinketCalc.appendChild(trinketCalcText)
externalLinks.appendChild(trinketCalc);

generatehorizontalSpacer(externalLinks);

var traitCalc = document.createElement("BUTTON");
traitCalc.setAttribute("id", "trait-calculator-btn");
traitCalc.setAttribute("class", "button");
traitCalc.setAttribute("onClick", "location.href='trait_calc.html'");
var traitCalcText = document.createTextNode("Trait Calculator");
traitCalc.appendChild(traitCalcText)
externalLinks.appendChild(traitCalc);

document.body.appendChild(externalLinks);

var hr = document.createElement("hr");
document.body.appendChild(hr);









//Set vars for btns
var repoOption = 'master'
var btnGroup = document.getElementsByClassName("button");
var talentsBtn = 'AS';
var itemBtn = 'Trinkets';
var fightBtn = 'C';
var traits = 'P';
var essence = 'Major';
var enchant = 'Weapon';
var consumable = "Potion"
var corruptionPointflag = false;


function talentClick(clicked) {
  talentsBtn = clicked;
  clickedID = clicked + 'Btn';
  var talents = document.getElementById('talent-div').children;
  for (i = 0; i < talents.length; i++) {
    if (talents[i].id.toLowerCase() == clickedID.toLowerCase()) {
      talents[i].style.borderColor = '#DDA0DD';
      talents[i].style.backgroundColor = "#330066";
    } else {
      talents[i].style.borderColor = 'white';
      talents[i].style.backgroundColor = default_background_color;
    }
  }
}

function itemClick(clicked) {
  if (clicked == 'Traits-P' || clicked == 'Traits-S') {
    itemBtn = 'Traits'
    traits = clicked.split("-")[1];
  } else if (clicked == 'Essence-Major' || clicked == 'Essence-Minor') {
    itemBtn = 'Essences';
    essence = clicked.split("-")[1];
  } else if (clicked == 'Enchant-Weapon' || clicked == 'Enchant-Ring') {
    itemBtn = 'Enchants';
    enchant = clicked.split("-")[1];
  } else if (clicked == 'Consumable-Potion' || clicked == 'Consumable-Food') {
    itemBtn = 'Consumables';
    consumable = clicked.split("-")[1];
  } else if (clicked == 'Corruption-DPS') {
    corruptionPointflag = true;
    itemBtn = "Corruption-DPS";
  } else if (clicked == 'Corruption') {
    corruptionPointflag = false;
    itemBtn = clicked;
  } else  {
    itemBtn = clicked;
  }

  clickedID = clicked + 'Btn';
  var trinketTraits = document.getElementById('sims-div').children;
  for (i = 0; i < trinketTraits.length; i++) {
    if (trinketTraits[i].id.toLowerCase() == clickedID.toLowerCase() && trinketTraits[i].id.toLowerCase() != 'primary' && trinketTraits[i].id.toLowerCase() != 'secondary') {
      trinketTraits[i].style.borderColor = '#DDA0DD';
      trinketTraits[i].style.backgroundColor = "#330066";
    } else {
      trinketTraits[i].style.borderColor = 'white';
      trinketTraits[i].style.backgroundColor = default_background_color;
    }
  }
}

function fightClick(clicked) {
  fightBtn = clicked;
  clickedID = clicked + 'Btn';
  var fight = document.getElementById('Fight-Style-div').children;
  for (i = 0; i < fight.length; i++) {
    if (fight[i].id.toLowerCase() == clickedID.toLowerCase()) {
      fight[i].style.borderColor = '#DDA0DD';
      fight[i].style.backgroundColor = "#330066";
    } else {
      fight[i].style.borderColor = 'white';
      fight[i].style.backgroundColor = default_background_color;
    }
  }
}

traitButtons = document.getElementById("traits-div");
essenceButtons = document.getElementById("essence-div");
enchantButtons = document.getElementById("enchant-div");
consumableButtons = document.getElementById("consumable-div");
corruptionButtons = document.getElementById("corruption-div");

for (var i = 0; i < btnGroup.length; i++) {
  btnGroup[i].addEventListener("click", function() {

    if (itemBtn == 'Trinkets') {
      wcp_charts.updateTrinketChart(talentsBtn + itemBtn + fightBtn);
      traitButtons.classList.remove("show");
      essenceButtons.classList.remove("show");
      enchantButtons.classList.remove("show");
      consumableButtons.classList.remove("show");
      corruptionButtons.classList.remove("show");
    } else if (itemBtn == 'Traits') {
      wcp_charts.updateTraitChart(talentsBtn + itemBtn + fightBtn);
      traitButtons.classList.add("show");
      essenceButtons.classList.remove("show");
      enchantButtons.classList.remove("show");
      consumableButtons.classList.remove("show");
      corruptionButtons.classList.remove("show");
    } else if (itemBtn == 'Essences') {
      wcp_charts.updateEssenceChart(talentsBtn + itemBtn + fightBtn);
      traitButtons.classList.remove("show");
      essenceButtons.classList.add("show");
      enchantButtons.classList.remove("show");
      consumableButtons.classList.remove("show");
      corruptionButtons.classList.remove("show");
    } else if (itemBtn == 'Talents') {
      wcp_charts.updateTalentsChart(itemBtn + fightBtn);
      traitButtons.classList.remove("show");
      essenceButtons.classList.remove("show");
      enchantButtons.classList.remove("show");
      consumableButtons.classList.remove("show");
      corruptionButtons.classList.remove("show");
    } else if (itemBtn == 'Racials') {
      wcp_charts.updateRacialsChart(talentsBtn + itemBtn + fightBtn);
      traitButtons.classList.remove("show");
      essenceButtons.classList.remove("show");
      enchantButtons.classList.remove("show");
      consumableButtons.classList.remove("show");
      corruptionButtons.classList.remove("show");
    } else if (itemBtn == "Enchants") {
      wcp_charts.updateEnchantsChart(talentsBtn + itemBtn + fightBtn);
      traitButtons.classList.remove("show");
      essenceButtons.classList.remove("show");
      enchantButtons.classList.add("show");
      consumableButtons.classList.remove("show");
      corruptionButtons.classList.remove("show");
    }else if (itemBtn == "Consumables") {
      wcp_charts.updateConsumablesChart(talentsBtn + itemBtn + fightBtn);
      traitButtons.classList.remove("show");
      essenceButtons.classList.remove("show");
      enchantButtons.classList.remove("show");
      consumableButtons.classList.add("show");
      corruptionButtons.classList.remove("show");
    }else if (itemBtn == "Corruption" || itemBtn == "Corruption-DPS") {
      wcp_charts.updateCorruptionChart(talentsBtn + itemBtn + fightBtn);
      traitButtons.classList.remove("show");
      essenceButtons.classList.remove("show");
      enchantButtons.classList.remove("show");
      consumableButtons.classList.remove("show");
      corruptionButtons.classList.add("show");
    }
  })
}


//Style Buttons
function styleButtons() {
  for (var i = 0; i < btnGroup.length; i++) {
    let btn = document.getElementById(btnGroup[i].id)

    if (btn.id == 'ASBtn' || btn.id == 'TrinketsBtn' || btn.id == 'CBtn') {
      btn.style.borderColor = "#DDA0DD";
      btn.style.backgroundColor = "#330066";
    } else {
      btn.style.borderColor = "white";
      btn.style.backgroundColor = default_background_color;
    }
    btn.style.cursor = 'pointer';
  }
}

styleButtons();

//Tab Function
function createTabs(tabID) {
  let tempTab = document.createElement("div");
  tempTab.setAttribute("id", tabID);
  tempTab.setAttribute("class", "tabcontent");
  tempTab.style.display = "block"; //Hide all tabs by default.
  return tempTab;
}

//Charts div
var chartDiv = document.createElement("div");
chartDiv.setAttribute("id", "Chart-Display-div");
chartDiv.setAttribute("class", "tabcontent");
document.body.appendChild(chartDiv);

//Trinket Tabs
var SCTrinketTab_C = createTabs("SC-Trinket-Tab-Composite");
var SCTrinketTab_ST = createTabs("SC-Trinket-Tab-SingleTarget");
var SCTrinketTab_D = createTabs("SC-Trinket-Tab-Dungeon");
var ASTrinketTab_C = createTabs("AS-Trinket-Tab-Composite");
var ASTrinketTab_ST = createTabs("AS-Trinket-Tab-SingleTarget");
var ASTrinketTab_D = createTabs("AS-Trinket-Tab-Dungeon");

//Trait Tabs
var SCTraitTab_C = createTabs("SC-Trait-Tab-Composite");
var SCTraitTab_ST = createTabs("SC-Trait-Tab-SingleTarget");
var SCTraitTab_D = createTabs("SC-Trait-Tab-Dungeon");
var ASTraitTab_C = createTabs("AS-Trait-Tab-Composite");
var ASTraitTab_ST = createTabs("AS-Trait-Tab-SingleTarget");
var ASTraitTab_D = createTabs("AS-Trait-Tab-Dungeon");

//Essence Tabs
var SCEssenceTab_C = createTabs("SC-Essence-Tab-Composite");
var SCEssenceTab_ST = createTabs("SC-Essence-Tab-SingleTarget");
var SCEssenceTab_D = createTabs("SC-Essence-Tab-Dungeon");
var ASEssenceTab_C = createTabs("AS-Essence-Tab-Composite");
var ASEssenceTab_ST = createTabs("AS-Essence-Tab-SingleTarget");
var ASEssenceTab_D = createTabs("AS-Essence-Tab-Dungeon");

//Talent Tabs
var Talent_C = createTabs("Talents-Composite");
var Talent_ST = createTabs("Talents-SingleTarget");
var Talent_D = createTabs("Talents-Dungeon");

//Racial Tabs
var SCRacialTab_C = createTabs("SC-Racial-Tab-Composite");
var SCRacialTab_ST = createTabs("SC-Racial-Tab-SingleTarget");
var SCRacialTab_D = createTabs("SC-Racial-Tab-Dungeon");
var ASRacialTab_C = createTabs("AS-Racial-Tab-Composite");
var ASRacialTab_ST = createTabs("AS-Racial-Tab-SingleTarget");
var ASRacialTab_D = createTabs("AS-Racial-Tab-Dungeon");

//Enchant Tabs
var SCEnchantTab_C = createTabs("SC-Enchant-Tab-Composite");
var SCEnchantTab_ST = createTabs("SC-Enchant-Tab-SingleTarget");
var SCEnchantTab_D = createTabs("SC-Enchant-Tab-Dungeon");
var ASEnchantTab_C = createTabs("AS-Enchant-Tab-Composite");
var ASEnchantTab_ST = createTabs("AS-Enchant-Tab-SingleTarget");
var ASEnchantTab_D = createTabs("AS-Enchant-Tab-Dungeon");

//Consumable Tabs
var SCConsumableTab_C = createTabs("SC-Consumable-Tab-Composite");
var SCConsumableTab_ST = createTabs("SC-Consumable-Tab-SingleTarget");
var SCConsumableTab_D = createTabs("SC-Consumable-Tab-Dungeon");
var ASConsumableTab_C = createTabs("AS-Consumable-Tab-Composite");
var ASConsumableTab_ST = createTabs("AS-Consumable-Tab-SingleTarget");
var ASConsumableTab_D = createTabs("AS-Consumable-Tab-Dungeon");



var SCTrinketsCTest = createTabs("SCTrinketsC");

//Show AS Trinekts Composite by Default
ASTrinketTab_C.style.display = "none";

//Button Clicking
function openChart() {
  var x = document.getElementById
}
