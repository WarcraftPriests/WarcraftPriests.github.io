function getSingleBarDefinition(wowheadTooltips, data, legendTitle, yAxisTitle, showLegend, xPadding) {
  return singleLineBarDefinition = {
    xAxis: {
      categories: wowheadTooltips,
      useHTML: true,
      labels: {
        x: xPadding,
      },
    },
    yAxis: {
      title: {
        text: yAxisTitle,
        color: defaultFontColor,
      },
    },
    title: {
      text: '',
    },
    legend: {
      title: {
        text: legendTitle,
        style: {"textAlign": 'center'},
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