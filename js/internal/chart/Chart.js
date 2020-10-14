/*
 * Defines the chart for the site
 */
var WCP_Chart = function WCP_Chart(id, options) {
  this.chartId = id;
  this.options = options;
  this.chartOptions = defaultChartDefinition;
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
  jQuery.getJSON( determineJsonUrl(simsBtn, baseUrl, fightStyle, talentChoice, covenantType),
      function (data) {
        document.getElementById("updateData").innerHTML = updateDataInnerHtml + data[jsonLastUpdated];
        while (this.chart.series.length > 0) {
          this.chart.series[0].remove(false);
        }
        this.chart.update(getStackedChartDefinition(buildWowheadTooltips( data, false, simsBtn), 
                                                    determineChartName( covenantType, 
                                                                        getTalentName(talentChoice.split(dash)[0]), 
                                                                        simsBtn.charAt(0).toUpperCase() + simsBtn.slice(1), 
                                                                        fightStyle), 
                                                    data,
                                                    getLegendTitle(simsBtn),
                                                    getYAxisTitle(simsBtn)));
        buildDataForStackedChart(data, this.chartId, this.chart);
      }.bind(this)
    ).fail(function(xhr, status) {
      handleJsonFailure(xhr, status)
    });
};

/*
 * Filles the chart with data and uses the stacked bar chart
 */
WCP_Chart.prototype.updatePercentageChart = function ( simsBtn, fightStyle, talentChoice, covenantType ) {
  jQuery.getJSON( determineJsonUrl(simsBtn, baseUrl, fightStyle, talentChoice, covenantType),
      function (data) {
        document.getElementById("updateData").innerHTML = updateDataInnerHtml + data[jsonLastUpdated];
        while (this.chart.series.length > 0) {
          this.chart.series[0].remove(false);
        }

        this.chart.update(getChartDefinitioPercentage( buildWowheadTooltips(data, false, simsBtn), 
                                                       determineChartName(covenantType, 
                                                                          getTalentName(talentChoice.split(dash)[0]), 
                                                                          simsBtn.charAt(0).toUpperCase() + simsBtn.slice(1), 
                                                                          fightStyle), 
                                                       data,
                                                       getLegendTitle(simsBtn),
                                                       getYAxisTitle(simsBtn)));
        buildDataForPercentageChart(data, this.chartId, this.chart);
      }.bind(this)
    ).fail(function(xhr, status) {
      handleJsonFailure(xhr, status)
    });
};

/*
 * Filles the chart with data and uses the single bar chart
 */
WCP_Chart.prototype.updateSingleBarChart = function ( simsBtn, fightStyle, talentChoice, covenantType ) {
  jQuery.getJSON( determineJsonUrl(simsBtn, baseUrl, fightStyle, talentChoice, covenantType),
      function (data) {
        document.getElementById("updateData").innerHTML = updateDataInnerHtml + data[jsonLastUpdated];
        while (this.chart.series.length > 0) {
          this.chart.series[0].remove(false);
        }

        this.chart.update(getSingleBarDefinition( buildWowheadTooltips( data, true, simsBtn), 
                                                  determineChartName( covenantType, 
                                                                      getTalentName(talentChoice.split(dash)[0]), 
                                                                      simsBtn.charAt(0).toUpperCase() + simsBtn.slice(1), 
                                                                      fightStyle), 
                                                  data,
                                                  getLegendTitle(simsBtn),
                                                  getYAxisTitle(simsBtn)));
        buildChartDataSingleBar(data, this.chartId, this.chart)
      }.bind(this)
    ).fail(function(xhr, status) {
      handleJsonFailure(xhr, status)
    });
};

/*
 * Filles the chart with data and uses the single bar chart
 */
WCP_Chart.prototype.updateMultipleBarChart = function ( simsBtn, fightStyle, talentChoice, covenantType ) {
  jQuery.getJSON( determineJsonUrl(simsBtn, baseUrl, fightStyle, talentChoice, covenantType),
      function (data) {
        document.getElementById("updateData").innerHTML = updateDataInnerHtml + data[jsonLastUpdated];
        while (this.chart.series.length > 0) {
          this.chart.series[0].remove(false);
        }

        this.chart.update(getMultipleBarChartDefinition( buildWowheadTooltipsMultipleBar( data, simsBtn), 
                                                         determineChartName( covenantType, 
                                                                             getTalentName(talentChoice.split(dash)[0]), 
                                                                             simsBtn.charAt(0).toUpperCase() + simsBtn.slice(1), 
                                                                             fightStyle), 
                                                         data,
                                                         getLegendTitle(simsBtn),
                                                         getYAxisTitle(simsBtn)));
        buildChartDataMultipleBar(data, this.chartId, this.chart, fightStyle)
      }.bind(this)
    ).fail(function(xhr, status) {
      handleJsonFailure(xhr, status)
    });
};

/*
 * Opens a chart
 * -> not sure if needed
 */
function openChart() {
  this.x = document.getElementById;
}