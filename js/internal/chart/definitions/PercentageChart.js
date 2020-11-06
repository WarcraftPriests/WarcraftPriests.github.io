function getChartDefinitionPercentage(wowheadTooltips, chartName, data, legendTitle, yAxisTitle) {
  return percentageChartDefinition = {
    xAxis: {
      categories: wowheadTooltips,
      useHTML: true,
    },
    yAxis: {
      min: '0',
      allowDecimals: true,
      tickPositioner: function() {
        return yStepsForPercentageChart(data);
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
        return formatterPercentage(this.points, this.x, data);
      },
    },
  };   
}