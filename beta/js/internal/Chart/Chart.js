/*
 * Defines the chart for the site
 */
var WCP_Chart = function WCP_Chart(id, options) {
  this.chartId = id;
  this.options = options;
  this.default;
  this.chartOptions = {
    chart: {
      renderTo: this.chartId,
      type: chartType,
      backgroundColor: defaultBackgroundColor,
    },
    title: {
      style: {
        color: defaultFontColor,
        fontWeight: fontWeightBold,
      },
      text: defaultHeader,
    },
    plotOptions: {
      series: {
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
          legendItemClick: legendItemClick(),
        },
        allowPointSelect: false,
      },
    },
    xAxis: {
      labels: {
        useHTML: true,
        style: {
          color: defaultFontColor,
          fontWeight: fontWeightBold,
          fontSize: 14,
          events: {
            legendItemClick: legendItemClick(),
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
      title: {
        text: legendTitleTextDps,
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
        text: legendTitleTextItemLevel,
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
  };
};

/*
 * Does a initial setup of the chart with
 * the trinket sims from github
 */
WCP_Chart.prototype.init = function () {
  this.chart = Highcharts.chart(this.chartId, this.chartOptions);
};

/*
 * Filles the chart with data and uses the stacked bar chart
 */
WCP_Chart.prototype.updateStackedBarChart = function ( simsBtn, fightStyle, talentChoice, covenantType ) {
  let fullSimType = simsBtn.charAt(0).toUpperCase() + simsBtn.slice(1);
  let firstTalent = getTalentName(talentChoice.split(dash)[0]);
  let chartName = determineChartName(covenantType, firstTalent, fullSimType, fightStyle);
  jQuery.getJSON( determineJsonUrl(simsBtn, baseUrl, fightStyle, talentChoice, covenantType),
      function (data) {
        var updateData = document.getElementById("updateData");
        updateData.innerHTML = updateDataInnerHtml + data[jsonLastUpdated];
        var wowheadTooltips = buildWowheadTooltips(data, false, simsBtn);
        
        while (this.chart.series.length > 0) {
          this.chart.series[0].remove(false);
        }

        this.chart.update({
          xAxis: {
            categories: wowheadTooltips,
            useHTML: true,
          },
          yAxis: {
            min: '0',
            allowDecimals: true,
            tickPositioner: function() {
              return determineYAxisStacked(data);
            },
          },
          legend: {
            title: {
              text: legendTitleTextSteps,
            },
          },
          plotOptions: {
            series: {
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
                legendItemClick: legendItemClick(),
              },
              allowPointSelect: false,
            },
          },
          title: {
            style: {
              color: defaultFontColor,
              fontWeight: fontWeightBold,
            },
            text: chartName,
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
              return formatter(this.points, this.x, data);
            },
          },
        });
        buildChartDataStackedBar(data, this.chartId, this.chart);
      }.bind(this)
    ).fail(function(xhr, status) {
      handleJsonFailure(xhr, status)
    });
};

/*
 * Filles the chart with data and uses the single bar chart
 */
WCP_Chart.prototype.updateSingleBarChart = function ( simsBtn, fightStyle, talentChoice, covenantType ) {
  let fullSimType = simsBtn.charAt(0).toUpperCase() + simsBtn.slice(1);
  let firstTalent = getTalentName(talentChoice.split(dash)[0]);
  let chartName = determineChartName(covenantType, firstTalent, fullSimType, fightStyle);
  jQuery.getJSON( determineJsonUrl(simsBtn, baseUrl, fightStyle, talentChoice, covenantType),
      function (data) {
        var updateData = document.getElementById("updateData");
        updateData.innerHTML = updateDataInnerHtml + data[jsonLastUpdated];
        var wowheadTooltips = buildWowheadTooltips(data, true, simsBtn);
        
        while (this.chart.series.length > 0) {
          this.chart.series[0].remove(false);
        }

        this.chart.update({
          xAxis: {
            categories: wowheadTooltips,
            useHTML: true,
            labels: {
              x: -40,
            },
          },
          yAxis: {
            min: '0',
            allowDecimals: true,
            tickPositioner: function() {
              return determineYAxisSingle(data);
            },
          },
          title: {
            style: {
              color: defaultFontColor,
              fontWeight: fontWeightBold,
            },
            text: chartName,
          },
          legend: {
            title: {
              text: legendTitleTextDps,
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
              return formatter(this.points, this.x, data);
            },
          },
        });
        buildChartDataSingleBar(data, this.chartId, this.chart)
      }.bind(this)
    ).fail(function(xhr, status) {
      handleJsonFailure(xhr, status)
    });
};

/*
 * ?!
 */
WCP_Chart.prototype.buildButtons = function () {
  var container = document.createElement(divText);
  container.id = buttonContainerText;
  
  for (i = 0; i < this.options.buttons.length; i++) {
    var div = document.createElement(divText);
    div.id = Object.keys(this.options.buttons)[i];
    
    for (x = 0; x < this.options.buttons[d.id].length; x++) {
      var button = document.createElement(buttonText);
      button.id = Object.values(this.options.buttons[div.id])[x];
      div.appendChild(button);
    }
    container.appendChild(div);
  }

  var parent = document.getElementById(this.chartId);
  parent.parentNode.insertBefore(container, parent);
};

/*
 * Opens a chart
 * -> not sure if needed
 */
function openChart() {
  this.x = document.getElementById;
}