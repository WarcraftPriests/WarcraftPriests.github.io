
function getDefaultDotDefinition(chartId) {
    return defaultDotDefinition = {
      chart: {
        renderTo: chartId,
        type: "scatter3d",
        backgroundColor: null,
        animation: false,
        height: 700,
        width: 600,
        options3d: {
          enabled: true,
          alpha: 10,
          beta: -10,
          depth: 700,
          fitToPlot: false,
        }
      },
      legend: {
        enabled: false,
        backgroundColor: darkColor,
        borderColor: mediumColor,
        borderWidth: 1,
        align: "right",
        verticalAlign: "middle",
        layout: "vertical",
        itemStyle: { "color": defaultFontColor },
        itemHoverStyle: { "color": defaultFontColor }
      },
      plotOptions: {
        series: {
          dataLabels: {
            allowOverlap: true,
            style: {
              color: defaultFontColor,
              fontSize: fontSize,
              fontWeight: fontWeightBold,
              fontWeight: "400",
              textOutline: ""
            }
          },
          events: {
            legendItemClick: function () {
              return false;
          }
        },
      },
    },
    series: [],
      title: {
        text: '', //"Title placeholder",
        style: {
          color: defaultFontColor,
          fontWeight: fontWeightBold,
        },
      },
      subtitle: {
        text: "",
        useHTML: true,
        style: {
          color: defaultFontColor,
          fontWeight: fontWeightBold,
          fontSize: fontSize
        }
      },
      tooltip: {
        headerFormat: '',
          pointFormatter: function () {
            return '<table>\
              <thead>\
                <tr>\
                  <th ></th>\
                  <th ></th>\
                  <th ></th>\
                </tr>\
              </thead>\
              <tbody>\
                <tr>\
                  <th >DPS</th>\
                  <td>' + Intl.NumberFormat().format(this.dps) + '</td>\
                  <td>' + Math.round(( 100 / this.dpsBase ) * ( this.dps - this.dpsBase) * 100 ) / 100 + '%</td>\
                </tr>\
                <tr>\
                  <th >Crit</th>\
                  <td>' + this.statCrit +'</td>\
                  <td>' + this.statCritPercent + '%</td>\
                </tr>\
                <tr>\
                  <th>Haste</th>\
                  <td>' + this.statHaste +'</td>\
                  <td>' + this.statHastePercent + '%</td>\
                </tr>\
                <tr>\
                  <th>Mastery</th>\
                  <td>' + this.statMastery +'</td>\
                  <td>' + this.statMasteryPercent + '%</td>\
                </tr>\
                <tr>\
                  <th>Versatility</th>\
                  <td>' + this.statVers +'</td>\
                  <td>' + this.statVersPercent + '%</td>\
                </tr>\
              </tbody>\
            </table>';
        },
        useHTML: true,
        borderColor: darkColor,
      },
      xAxis: {
        min: -5,
        max: 15,
        startOnTick: true,
        endOnTick: true,
        title: "",
        labels: {
          enabled: false,
        },
        gridLineWidth: 1,
        gridLineColor: mediumColor,
      },
      yAxis: {
        min: -5,
        max: 15,
        startOnTick: true,
        endOnTick: true,
        title: "",
        labels: {
          enabled: false,
        },
        gridLineWidth: 1,
        gridLineColor: mediumColor,
      },
      zAxis: {
        min: 0,
        max: 20,
        startOnTick: true,
        endOnTick: true,
        title: "",
        labels: {
          enabled: false,
        },
        reversed: true,
        gridLineWidth: 1,
        gridLineColor: mediumColor,
      },
    };
  }

  function getMultipleBarChartDefinition(wowheadTooltips, data, legendTitle, yAxisTitle, chartId) {
    return stackedCharDefinition = {
      chart: {
        renderTo: chartId,
        type: chartType,
        backgroundColor: defaultBackgroundColor,
      },
      title: {
        title: '',
      },
      xAxis: {
        categories: wowheadTooltips,
        useHTML: true,
        labels: {
          x: -40,
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
        min: '0',
        allowDecimals: true,
        gridLineColor: gridLineColor,
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
          enabled: false,
          style: {
            fontWeight: fontWeightBold,
            color: defaultFontColor,
            fontSize: 14,
          },
        },
        title: {
          text: yAxisTitle,
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
          text: legendTitle,
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
            },
            inactive: {
              opacity: 1,
            },
          },
          dataLabels: {
            align: alignRight,
            enabled: false,
            pointFormat: plotOptionsPointFormat,
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

  function getChartDefinitionPercentage(wowheadTooltips, data, legendTitle, yAxisTitle, chartId) {
    return percentageChartDefinition = {
      chart: {
        renderTo: chartId,
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
        categories: wowheadTooltips,
        useHTML: true,
        labels: {
          useHTML: true,
          x: -40,
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
        min: '0',
        allowDecimals: true,
        tickPositioner: function() {
          var result = [];
          var highestDPS = 0;
          let baselineDPS = data[jsonData][jsonBase];
          for(currStep of data[jsonSimulatedSteps]) {
            for(sortedData of data[jsonSortedDataKeys]) {
              var percentage = ((data[jsonData][sortedData.trim()][currStep]) / baselineDPS.DPS) * 100 - 100;
              if(percentage > highestDPS) {
                highestDPS = percentage;
              }
            }
          }

          let lastValue = 0;
          result.push(lastValue)
          for(i = 0; i <= 8; i++) {
            lastValue = lastValue + Number((Number(highestDPS / (data[jsonSimulatedSteps].length + 1))).toFixed(2) * (data[jsonSimulatedSteps].length / 7));
            result.push(Number(lastValue.toFixed(2)));
          }
        return result;
        },
        title: {
          text: yAxisTitle,
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
          text: legendTitle,
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

  function getSingleBarDefinition(wowheadTooltips, data, legendTitle, yAxisTitle, showLegend, xPadding, chartId) {
    return singleLineBarDefinition = {
      chart: {
        renderTo: chartId,
        type: chartType,
        backgroundColor: defaultBackgroundColor,
      },
      
      title: {
        text: '',
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
          x: xPadding,
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
        categories: wowheadTooltips,
        useHTML: true,
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
          text: yAxisTitle,
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
          text: legendTitle,
          style: {
            color: lightColor,
            fontWeight: fontWeightBold,
          },
        },
        itemStyle: {
          color: defaultFontColor,
          fontWeight: fontWeightBold,
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