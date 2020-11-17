function getMultipleBarChartDefinition(wowheadTooltips, data, legendTitle, yAxisTitle) {
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
        stackLabels: {
          enabled: false,
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
          column: {
            dataLabels: {
                enabled: false,
            },
          },
          line: {
            label: {
              enabled: false,
            },
          },
          pointPadding: 1.0, 
          states: {
            hover: {
              enabled: false
            }
          },
          stacking: stackingNormal,
          grouping: true,
          groupPadding: 0.1,
          enableMouseTracking: true,
          pointPadding: 0,
          pointWidth: 10,
          spacing: 100,
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
          return formatterMultipleBar(this.points, this.x, data);
        },
      },
    };   
  }