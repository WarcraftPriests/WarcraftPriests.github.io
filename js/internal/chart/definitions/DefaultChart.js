var defaultChartDefinition = {
  chart: {
    renderTo: this.chartId,
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
    labels: {
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