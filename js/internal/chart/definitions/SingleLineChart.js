function getSingleBarDefinition(wowheadTooltips, chartName, data, legendTitle) {
  return singleLineBarDefinition = {
    xAxis: {
      categories: wowheadTooltips,
      useHTML: true,
      labels: {
        x: -40,
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
        text: legendTitle,
        style: {"textAlign": 'center'},
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
        return formatterDefault(this.points, this.x, data);
      },
    },
  };   
}