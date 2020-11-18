function getStackedChartDefinition(wowheadTooltips, data, legendTitle, yAxisTitle) {
  return stackedCharDefinition = {
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
        return yStepsForStackedBarChart(data);
      },
      title: {
        text: yAxisTitle,
        color: defaultFontColor,
      },
    },
    legend: {
      title: {
        text: legendTitle,
        style: {"textAlign": 'center'},
      },
    },
    plotOptions: {
      series: {
        states: {
          hover: {
            enabled: false
          }
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
        return formatterStacked(this.points, this.x, data);
      },
    },
  };   
}