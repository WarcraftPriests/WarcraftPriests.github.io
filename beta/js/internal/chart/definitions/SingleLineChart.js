function getSingleBarDefinition(wowheadTooltips, chartName, data) {
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
        return formatterDefault(this.points, this.x, data);
      },
    },
  };   
}