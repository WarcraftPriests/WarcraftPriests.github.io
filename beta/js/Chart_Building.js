const default_background_color = "#343a40";
const default_font_color = "#f8f9fa";
const default_axis_color = "#828282";

const light_color = "#eeeeee";
const medium_color = "#999999";
const dark_color = "#343a40";

var lastUpdate = document.getElementById("updateData");
const baseurl =
  "https://raw.githubusercontent.com/WarcraftPriests/sl-shadow-priest/master/";

var WCP_Chart = function WCP_Chart(id, options) {
  this.chartId = id;
  this.options = options;
  this.default;

  this.chartOptions = {
    chart: {
      renderTo: this.chartId,
      type: "bar",
      backgroundColor: default_background_color,
    },
    title: {
      style: {
        color: default_font_color,
        fontWeight: "bold",
      },
      text: "Ancient Madness - Auspicious Spirits - Trinkets - Composite",
    },
    plotOptions: {
      series: {
        stacking: "normal",
        dataLabels: {
          align: "right",
          enabled: false,
          pointFormat: "Value: {point.y:,.0f} mm",
        },
        enableMouseTracking: true,
        pointWidth: 15,
        spacing: 20,
        events: {
          legendItemClick: function () {
            return false;
          },
        },
        allowPointSelect: false,
      },
    },
    xAxis: {
      labels: {
        useHTML: true,
        style: {
          color: default_font_color,
          fontWeight: "bold",
          fontSize: 14,
          events: {
            legendItemClick: function () {
              return false;
            },
          },
        },
      },
    },
    yAxis: {
      crosshair: {
        color: "white",
        width: 3,
        snap: false,
        zIndex: 10,
      },
      labels: {
        style: {
          color: default_font_color,
        },
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color: default_font_color,
          fontSize: 14,
        },
      },
      gridLineColor: "#616c77",
      title: {
        text: "Damage Per Second",
        color: default_font_color,
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      borderColor: medium_color,
      borderWidth: 1,
      floating: false,
      itemMarginBottom: 3,
      itemMaginTop: 0,
      reversed: true,
      shadow: false,
      verticalAlign: "middle",
      x: 0,
      y: 0,
      title: {
        text: "Item Level",
        style: {
          color: light_color,
          fontWeight: "bold",
        },
      },
      itemStyle: {
        color: default_font_color,
        fontWeight: "bold",
      },
    },
  };
};

WCP_Chart.prototype.init = function () {
  // Setup your dummy charts, tabs, initiate the inial chart
  this.chart = Highcharts.chart(this.chartId, this.chartOptions); // Empty chart.

  this.updateStackedBarChart("trinkets", "Composite", "am", "venthyr"); // Setup the initial chart
};

WCP_Chart.prototype.updateStackedBarChart = function (
  simsBtn,
  fightStyle,
  talentChoice,
  covenantType
) {
  let fullTalents = talentChoice.split("-");
  let firstTalent = GetTalentName(fullTalents[0]);
  let secondTalent = GetTalentName(fullTalents[1]);
  fullTalents = firstTalent;

  let fullSimType = simsBtn.charAt(0).toUpperCase() + simsBtn.slice(1);
  var covenantPath = "";
  if (covenantType === "" || covenantType == null) {
    covenantPath = "";
  } else {
    covenantPath = "_" + covenantType;
  }

  let chartName = firstTalent + " - " + fullSimType + " - " + fightStyle;
  jQuery
    .getJSON(
      baseurl +
        "/" +
        simsBtn +
        "/results/Results_" +
        fightStyle +
        "_" +
        talentChoice +
        covenantPath +
        ".json",
      function (data) {
        toUpdateData = "Last Updated: ";
        toUpdateData += data["last_updated"];
        updateData.innerHTML = toUpdateData;
        var sortedItems = [];
        var dpsSortedData = data["sorted_data_keys"];
        var wowheadTooltips = [];
        for (dpsName of dpsSortedData) {
          if (data["ids"][dpsName] == null) {
            continue;
          }

          chartLink = "";
          truncatedName = dpsName.trim();
          dpsName = dpsName.replace(/ /g, "_");
          itemID = data["ids"][dpsName];
          chartLink = "";
          chartLink += '<div style="display:inline-block; margin-bottom:-3px">';
          chartLink +=
            '<a style="color: white; font-size: 16px; padding: 3px; cursor: default" href=#';
          chartLink += ' onclick="return false"';
          chartLink += ' rel="https://www.wowhead.com/item=';
          chartLink += itemID;
          chartLink += "/";
          chartLink += dpsName.trim().replace(/ /g, "_");
          chartLink += '" target="blank"';
          chartLink += ' class="chart_link"';
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
              text: "Steps",
            },
          },
          plotOptions: {
            series: {
              stacking: "normal",
              dataLabels: {
                align: "right",
                enabled: false,
                pointFormat: "Value: {point.y:,.0f} mm",
              },
              enableMouseTracking: true,
              pointWidth: 15,
              spacing: 20,
              events: {
                legendItemClick: function () {
                  return false;
                },
              },
              allowPointSelect: false,
            },
          },
          title: {
            style: {
              color: default_font_color,
              fontWeight: "bold",
            },
            text: chartName,
          },
          tooltip: {
            shared: true,
            useHTML: true,
            headerFormat: "<b>(point.x)</b>", //'<span style="font-size: 14px"><b>{point.key}</b></span><br/>',
            style: {
              color: default_font_color,
            },
            pointFormat:
              '<span style=color: "{point.color}"><b>{series.name}</b></span>: <b>{point.y}</b><br/>',
            padding: 5,
            formatter: function () {
              var s =
                '<div style="margin: -4px -6px -11px -7px; padding: 3px 3px 6px 3px; background-color:';
              s += dark_color;
              s +=
                '"><div style="margin-left: 9px; margin-right: 9px; margin-bottom: 6px; font-weight: 700;">' +
                this.x +
                "</div>";
              var baseAmount = data["data"]["Base"];
              if (baseAmount == null) baseAmount = 0;
              var cumulativeAmount = 0 + baseAmount;
              for (var i = this.points.length - 1; i >= 0; i--) {
                cumulativeAmount += this.points[i].y;
                if (this.points[i].y != 0) {
                  s +=
                    '<div><span style="margin-left: 9px; border-left: 9px solid ' +
                    this.points[i].series.color +
                    ";" +
                    " padding-left: 4px;" +
                    '">' +
                    this.points[i].series.name +
                    "</span>:&nbsp;&nbsp;" +
                    Intl.NumberFormat().format(cumulativeAmount - baseAmount);
                  s += " dps";
                  s += " - ";
                  let percentage = (
                    (cumulativeAmount / baseAmount) * 100 -
                    100
                  ).toFixed(2);
                  s += percentage;
                  if (percentage > 0) {
                    s += "% (Increase)";
                  } else {
                    s += "% (decrease)";
                  }
                }
              }
              s += "</div>";
              return s;
            },
          },
        });

        let steps = data["simulated_steps"];

        for (currStep of steps) {
          let maxStep =
            data["simulated_steps"][data["simulated_steps"].length - 1];
          let stepDpsValues = [];
          for (sortedData of dpsSortedData) {
            var keys = [];
            for (var k in data["data"][sortedData]) keys.push(k); // Pull all the values from each step.
            let stepDifference = keys[1] - keys[0];
            let minStep = keys[0];
            sortedData = sortedData.trim(); //Remove any accidental white space.
            let dps = data["data"][sortedData][currStep];
            let baselineDPS = data["data"]["Base"];
            if (baselineDPS == null) baselineDPS = 0;
            // Check to make sure DPS isn't 0
            if (dps >= 0) {
              if (currStep == minStep) {
                // If lowest step is looked at, subtract base DPS.
                if (dps - baselineDPS < 0) {
                  stepDpsValues.push(0);
                } else {
                  stepDpsValues.push(dps - baselineDPS);
                }
              } else {
                stepDpsValues.push(
                  dps - data["data"][sortedData][currStep - stepDifference]
                );
              }
            } else {
              if (currStep in data["data"][sortedData]) {
                stepDpsValues.push(0);
              } else {
                stepDpsValues.push(0);
              }
            }
          }

          this.chart.addSeries(
            {
              data: stepDpsValues,
              name: currStep,
              showInLegend: true,
            },
            false
          );
        }

        document.getElementById(this.chartId).style.height =
          200 + dpsSortedData.length * 30 + "px"; // Size the chart by our data.
        this.chart.setSize(
          document.getElementById(this.chartId).style.width,
          document.getElementById(this.chartId).style.height
        );
        this.chart.redraw();
        try {
          $WowheadPower.refreshLinks();
        } catch (error) {
          console.log(error);
        }
      }.bind(this)
    )
    .fail(function (xhr, status) {
      console.log(
        "The JSON chart failed to load, please let DJ know via discord Djriff#0001"
      );
      console.log(status);
      //alert("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
    });
};

WCP_Chart.prototype.updateSingleBarChart = function (
  simsBtn,
  fightStyle,
  talentChoice,
  covenantType
) {
  let fullTalents = talentChoice.split("-");
  let firstTalent = GetTalentName(fullTalents[0]);
  let secondTalent = GetTalentName(fullTalents[1]);
  fullTalents = firstTalent + " - " + secondTalent;

  let fullSimType = simsBtn.charAt(0).toUpperCase() + simsBtn.slice(1);
  var covenantPath = "";
  if (covenantType === "" || covenantType == null) {
    covenantPath = "";
  } else {
    covenantPath = "_" + covenantType;
  }

  let chartName = fullTalents + " - " + fullSimType + " - " + fightStyle;
  jQuery
    .getJSON(
      baseurl +
        "/" +
        simsBtn +
        "/results/Results_" +
        fightStyle +
        "_" +
        talentChoice +
        covenantPath +
        ".json",
      function (data) {
        toUpdateData = "Last Updated: ";
        toUpdateData += data["last_updated"];
        updateData.innerHTML = toUpdateData;
        let dpsSortedData = data["sorted_data_keys"];
        let formattedName = [];
        for (dpsName of dpsSortedData) {
          dpsName = dpsName.trim();
          formattedName.push(dpsName);
        }

        var wowheadTooltips = [];
        for (dpsName of dpsSortedData) {
          if (data["ids"][dpsName] == null) {
            continue;
          }

          // break on talents or something that doesn't need tooltips.
          if (simsBtn === "talents" || simsBtn == "soulbinds") {
            break;
          }

          chartLink = "";
          truncatedName = dpsName.trim();
          dpsName = dpsName.replace(/ /g, "_");
          itemID = data["ids"][dpsName];
          chartLink = "";
          chartLink += '<div style="display:inline-block; margin-bottom:-3px">';
          chartLink +=
            '<a style="color: white; font-size: 16px; padding: 3px; cursor: default" href=#';
          chartLink += ' onclick="return false"';
          chartLink += ' rel="https://www.wowhead.com/item=';
          chartLink += itemID;
          chartLink += "/";
          chartLink += dpsName.trim().replace(/ /g, "_");
          chartLink += '" target="blank"';
          chartLink += ' class="chart_link"';
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

        if (wowheadTooltips.length > 0) formattedName = wowheadTooltips;

        this.chart.update({
          xAxis: {
            categories: formattedName,
            useHTML: true,
            labels: {
              x: -40,
            },
          },
          title: {
            style: {
              color: default_font_color,
              fontWeight: "bold",
            },
            text: chartName,
          },
          legend: {
            title: {
              text: "DPS",
            },
          },
          tooltip: {
            shared: true,
            useHTML: true,
            headerFormat: "<b>(point.x)</b>", //'<span style="font-size: 14px"><b>{point.key}</b></span><br/>',
            style: {
              color: default_font_color,
            },
            pointFormat:
              '<span style=color: "{point.color}"><b>{series.name}</b></span>: <b>{point.y}</b><br/>',
            padding: 5,
            //shared: true
            formatter: function () {
              var s =
                '<div style="margin: -4px -6px -11px -7px; padding: 3px 3px 6px 3px; background-color:';
              s += dark_color;
              s +=
                '"><div style="margin-left: 9px; margin-right: 9px; margin-bottom: 6px; font-weight: 700;">' +
                this.x +
                "</div>";
              var baseAmount = data["data"]["Base"]["DPS"];
              var cumulativeAmount = 0 + baseAmount;
              for (var i = this.points.length - 1; i >= 0; i--) {
                cumulativeAmount += this.points[i].y;
                if (this.points[i].y != 0) {
                  s +=
                    '<div><span style="margin-left: 9px; border-left: 9px solid ' +
                    this.points[i].series.color +
                    ";" +
                    " padding-left: 4px;" +
                    '">' +
                    this.points[i].series.name +
                    "</span>:&nbsp;&nbsp;" +
                    Intl.NumberFormat().format(cumulativeAmount - baseAmount);
                  s += " dps";
                  s += " - ";
                  let percentage = (
                    (cumulativeAmount / baseAmount) * 100 -
                    100
                  ).toFixed(2);
                  s += percentage;
                  if (percentage > 0) {
                    s += "% (Increase)";
                  } else {
                    s += "% (decrease)";
                  }
                }
              }
              s += "</div>";
              return s;
            },
          },
        });

        let dpsValues = [];
        for (sortedData of dpsSortedData) {
          let dps = data["data"][sortedData]["DPS"];
          let baselineDPS = data["data"]["Base"]["DPS"];
          if (baselineDPS == null) baselineDPS = 0;

          if (dps > 0) {
            if (dps - baselineDPS < 0) {
              dpsValues.push(0);
            } else {
              dpsValues.push(dps - baselineDPS);
            }
          } else {
            if (dps < 0) {
              dpsValues.push(0);
            } else {
              psValues.push(dps);
            }
          }
        }

        this.chart.addSeries(
          {
            data: dpsValues,
            name: "DPS",
            showInLegend: true,
          },
          false
        );

        document.getElementById(this.chartId).style.height =
          200 + dpsValues.length * 30 + "px";
        this.chart.setSize(
          document.getElementById(this.chartId).style.width,
          document.getElementById(this.chartId).style.height
        );
        //this.chart.renderTo(this.chartId);
        this.chart.redraw();
        try {
          $WowheadPower.refreshLinks();
        } catch (error) {
          console.log(error);
        }
      }.bind(this)
    )
    .fail(function (xhr, status) {
      console.log(
        "The JSON chart failed to load, please let DJ know via discord Djriff#0001"
      );
      console.log(status);
      //alert("The JSON chart failed to load, please let DJ know via discord Djriff#0001");
    });
};

WCP_Chart.prototype.buildButtons = function () {
  var container = document.createElement("div");
  container.id = "button-container";
  for (i = 0; i < this.options.buttons.length; i++) {
    var d = document.createElement("div");
    d.id = Object.keys(this.options.buttons)[i];
    for (x = 0; x < this.options.buttons[d.id].length; x++) {
      var b = document.createElement("button");
      b.id = Object.values(this.options.buttons[d.id])[x];
      d.appendChild(b);
    }
    container.appendChild(d);
  }
  var parent = document.getElementById(this.chartId);
  parent.parentNode.insertBefore(container, parent);
};

function generatehorizontalSpacer(div) {
  var horizontalSpacer = document.createElement("span");
  horizontalSpacer.setAttribute("class", "divider");
  horizontalSpacer.style.width = "5px";
  horizontalSpacer.style.height = "auto";
  horizontalSpacer.style.display = "inline-block";
  div.appendChild(horizontalSpacer);
}

var hr = document.createElement("hr");
document.body.appendChild(hr);

//Set vars for btns
var repoOption = "master";
var btnGroup = document.getElementsByClassName("button");
var talentsBtn = "am-as";
var itemBtn = "Trinkets";
var fightBtn = "Composite";
var soulbinds = "Kyrian";
var conduits = "Kyrian";
var covenantBtn = "kyrian";
var enchant = "Weapon";
var consumable = "Potion";
var corruptionPointflag = false;

function talentClick(clicked) {
  talentsBtn = clicked;
  clickedID = clicked + "Btn";
  var talents = document.getElementById("talent-div").children;
  for (i = 0; i < talents.length; i++) {
    if (talents[i].id.toLowerCase() == clickedID.toLowerCase()) {
      talents[i].style.borderColor = "#DDA0DD";
      talents[i].style.backgroundColor = "#330066";
    } else {
      talents[i].style.borderColor = "white";
      talents[i].style.backgroundColor = default_background_color;
    }
  }
}

function itemClick(clicked) {
  if (
    clicked == "soulbind-Kyrian" ||
    clicked == "soulbind-Necrolord" ||
    clicked == "soulbind-Night_Fae" ||
    clicked == "soulbind-Venthyr"
  ) {
    itemBtn = "soulbinds";
    covenantBtn = clicked.split("-")[1].toLowerCase();
    wcp_charts.updateSingleBarChart(
      "soulbinds",
      fightBtn,
      talentsBtn,
      covenantBtn
    );
  } else if (
    clicked == "conduit-Kyrian" ||
    clicked == "conduit-Necrolord" ||
    clicked == "conduit-Night_Fae" ||
    clicked == "conduit-Venthyr"
  ) {
    itemBtn = "conduits";
    covenantBtn = clicked.split("-")[1].toLowerCase();
    wcp_charts.updateStackedBarChart(
      "conduits",
      fightBtn,
      talentsBtn,
      covenantBtn
    );
  } else if (
    clicked == "legendaries-Kyrian" ||
    clicked == "legendaries-Necrolord" ||
    clicked == "legendaries-Night_Fae" ||
    clicked == "legendaries-Venthyr"
  ) {
    itemBtn = "legendaries";
    covenantBtn = clicked.split("-")[1].toLowerCase();
    wcp_charts.updateSingleBarChart(
      "legendaries",
      fightBtn,
      talentsBtn,
      covenantBtn
    );
  } else if (clicked == "Enchant-Weapon" || clicked == "Enchant-Ring") {
    itemBtn = "Enchants";
    enchant = clicked.split("-")[1];
  } else if (clicked == "Consumable-Potion" || clicked == "Consumable-Food") {
    itemBtn = "Consumables";
    consumable = clicked.split("-")[1];
  } else if (clicked == "Corruption-DPS") {
    corruptionPointflag = true;
    itemBtn = "Corruption-DPS";
  } else if (clicked == "Corruption") {
    corruptionPointflag = false;
    itemBtn = clicked;
  } else {
    itemBtn = clicked;
  }

  clickedID = clicked + "Btn";
}

function fightClick(clicked) {
  fightBtn = clicked;
  clickedID = clicked + "Btn";
  var fight = document.getElementById("Fight-Style-div").children;
  for (i = 0; i < fight.length; i++) {
    if (fight[i].id.toLowerCase() == clickedID.toLowerCase()) {
      fight[i].style.borderColor = "#DDA0DD";
      fight[i].style.backgroundColor = "#330066";
    } else {
      fight[i].style.borderColor = "white";
      fight[i].style.backgroundColor = default_background_color;
    }
  }
}

conduitButtons = document.getElementById("conduits-div");
soulbindButtons = document.getElementById("soulbinds-div");
legendaryButtons = document.getElementById("legendary-div");
enchantButtons = document.getElementById("enchant-div");
consumableButtons = document.getElementById("consumable-div");
corruptionButtons = document.getElementById("corruption-div");

//Style Buttons
function styleButtons() {
  for (var i = 0; i < btnGroup.length; i++) {
    let btn = document.getElementById(btnGroup[i].id);

    if (btn.id == "ASBtn" || btn.id == "TrinketsBtn" || btn.id == "CBtn") {
      btn.style.borderColor = "#DDA0DD";
      btn.style.backgroundColor = "#330066";
    } else {
      btn.style.borderColor = "white";
      btn.style.backgroundColor = default_background_color;
    }
    btn.style.cursor = "pointer";
  }
}

styleButtons();

//Charts div
var chartDiv = document.createElement("div");
chartDiv.setAttribute("id", "Chart-Display-div");
chartDiv.setAttribute("class", "tabcontent");
document.body.appendChild(chartDiv);

var configyml = baseurl + "/config.yml";

function read_config(cfgfile) {
  jQuery.get({ url: cfgfile, dataType: "text" }).done(function (data) {
    var obj = jsyaml.load(data);
    var builds = obj["builds"];
    var charts = [];
    var titles = [];
    var talentBtns = [];
    var src = [];
    var fightStyles = [];
    var simType = [];

    // Add the talents that were ran.
    for (i in builds) {
      let talent = i.split("-");
      let firstTalent = GetTalentName(talent[0]);
      talentBtns.push(firstTalent);

      for (f in builds[i]) {
        let fightstyle = f.charAt(0).toUpperCase() + f.slice(1);
        titles.push(firstTalent + " - " + fightstyle);
        fightStyles.push(GetFightStyleName(fightstyle));
        src.push("Results_" + fightstyle + "_" + i);
      }
    }

    var sims = obj["sims"];
    // Add the sims that were actually built.
    for (s in sims) {
      for (b in sims[s]) {
        if (b == "builds") {
          let values = Object.values(sims[s]);
          if (values[0] == true) {
            let builds = true;
            simType.push(s);
          }
        }
      }
    }

    createTalentButtons(talentBtns);
    createSimsButtons(simType);
    createFightStyleButtons(fightStyles);
  });
}

function createTalentButtons(buttonArray) {
  let buttonDiv = document.getElementById("talent-div");
  for (b in buttonArray) {
    let talentSplit = buttonArray[b].split("-");
    let firstTalent = GetTalentShortName(talentSplit[0].trim());
    let shorthandTalent = firstTalent;

    let talentBtn = document.createElement("BUTTON");
    talentBtn.setAttribute("id", shorthandTalent + "Btn");
    talentBtn.setAttribute("class", "button");
    talentBtn.setAttribute("onClick", "talentClick('" + shorthandTalent + "')");
    talentBtn.addEventListener("click", checkButtonClick);
    var talentBtnText = document.createTextNode(buttonArray[b]);
    talentBtn.appendChild(talentBtnText);
    buttonDiv.appendChild(talentBtn);
    generatehorizontalSpacer(buttonDiv);
  }

  styleButtons();
}

function createSimsButtons(simTypeArray) {
  let simDiv = document.getElementById("sims-div");
  for (s in simTypeArray) {
    let simBtn = document.createElement("BUTTON");
    simBtn.setAttribute("id", simTypeArray[s] + "Btn");
    simBtn.setAttribute("class", "button");
    simBtn.setAttribute("onClick", "itemClick('" + simTypeArray[s] + "')");
    simBtn.addEventListener("click", checkButtonClick);
    let simBtnTextCapitalized =
      simTypeArray[s].charAt(0).toUpperCase() + simTypeArray[s].slice(1);
    var simBtnText = document.createTextNode(simBtnTextCapitalized);
    simBtn.appendChild(simBtnText);
    simDiv.appendChild(simBtn);
    generatehorizontalSpacer(simDiv);
  }

  styleButtons();
}

function createFightStyleButtons(fightStyleArray) {
  let fightStyleDiv = document.getElementById("Fight-Style-div");

  let fightStyleBtn = document.createElement("BUTTON");
  fightStyleBtn.setAttribute("id", "CompositeBtn");
  fightStyleBtn.setAttribute("class", "button");
  fightStyleBtn.setAttribute("onClick", "fightClick('Composite')");
  fightStyleBtn.addEventListener("click", checkButtonClick);
  var fightStyleBtnText = document.createTextNode("Composite");
  fightStyleBtn.appendChild(fightStyleBtnText);
  fightStyleDiv.appendChild(fightStyleBtn);

  generatehorizontalSpacer(fightStyleDiv);

  fightStyleBtn = document.createElement("BUTTON");
  fightStyleBtn.setAttribute("id", "DungeonsBtn");
  fightStyleBtn.setAttribute("class", "button");
  fightStyleBtn.setAttribute("onClick", "fightClick('Dungeons')");
  fightStyleBtn.addEventListener("click", checkButtonClick);
  fightStyleBtnText = document.createTextNode("Dungeons");
  fightStyleBtn.appendChild(fightStyleBtnText);
  fightStyleDiv.appendChild(fightStyleBtn);

  styleButtons();
}

function checkButtonClick() {
  if (itemBtn == "trinkets") {
    //wcp_charts.updateTrinketChart(talentsBtn + itemBtn + fightBtn);
    wcp_charts.updateStackedBarChart("trinkets", fightBtn, talentsBtn);
    conduitButtons.classList.remove("show");
    soulbindButtons.classList.remove("show");
    legendaryButtons.classList.remove("show");
    enchantButtons.classList.remove("show");
    consumableButtons.classList.remove("show");
  } else if (itemBtn == "conduits") {
    wcp_charts.updateStackedBarChart(
      "conduits",
      fightBtn,
      talentsBtn,
      covenantBtn
    );
    conduitButtons.classList.add("show");
    soulbindButtons.classList.remove("show");
    legendaryButtons.classList.remove("show");
    enchantButtons.classList.remove("show");
    consumableButtons.classList.remove("show");
  } else if (itemBtn == "soulbinds") {
    wcp_charts.updateSingleBarChart(
      "soulbinds",
      fightBtn,
      talentsBtn,
      covenantBtn
    );
    conduitButtons.classList.remove("show");
    soulbindButtons.classList.add("show");
    legendaryButtons.classList.remove("show");
    enchantButtons.classList.remove("show");
    consumableButtons.classList.remove("show");
  } else if (itemBtn == "talents") {
    wcp_charts.updateSingleBarChart("talents", fightBtn, talentsBtn);
    conduitButtons.classList.remove("show");
    soulbindButtons.classList.remove("show");
    legendaryButtons.classList.remove("show");
    enchantButtons.classList.remove("show");
    consumableButtons.classList.remove("show");
  } else if (itemBtn == "racials") {
    wcp_charts.updateSingleBarChart("racials", fightBtn, talentsBtn);
    conduitButtons.classList.remove("show");
    soulbindButtons.classList.remove("show");
    legendaryButtons.classList.remove("show");
    enchantButtons.classList.remove("show");
    consumableButtons.classList.remove("show");
  } else if (itemBtn == "enchants") {
    wcp_charts.updateSingleBarChart("enchants", fightBtn, talentsBtn);
    conduitButtons.classList.remove("show");
    soulbindButtons.classList.remove("show");
    legendaryButtons.classList.remove("show");
    enchantButtons.classList.add("show");
    consumableButtons.classList.remove("show");
  } else if (itemBtn == "consumables") {
    wcp_charts.updateSingleBarChart("consumables", fightBtn, talentsBtn);
    conduitButtons.classList.remove("show");
    soulbindButtons.classList.remove("show");
    legendaryButtons.classList.remove("show");
    enchantButtons.classList.remove("show");
    consumableButtons.classList.add("show");
  } else if (itemBtn == "legendaries") {
    wcp_charts.updateSingleBarChart(
      "legendaries",
      fightBtn,
      talentsBtn,
      covenantBtn
    );
    conduitButtons.classList.remove("show");
    soulbindButtons.classList.remove("show");
    legendaryButtons.classList.add("show");
    enchantButtons.classList.remove("show");
    consumableButtons.classList.remove("show");
  } else if (itemBtn == "stats") {
    wcp_charts.updateSingleBarChart("stats", fightBtn, talentsBtn);
    conduitButtons.classList.remove("show");
    soulbindButtons.classList.remove("show");
    legendaryButtons.classList.remove("show");
    enchantButtons.classList.remove("show");
    consumableButtons.classList.remove("show");
  } else if (itemBtn == "covenants") {
    wcp_charts.updateSingleBarChart("covenants", fightBtn, talentsBtn);
    conduitButtons.classList.remove("show");
    soulbindButtons.classList.remove("show");
    legendaryButtons.classList.remove("show");
    enchantButtons.classList.remove("show");
    consumableButtons.classList.remove("show");
  }
}

read_config(configyml);

//Button Clicking
function openChart() {
  var x = document.getElementById;
}
