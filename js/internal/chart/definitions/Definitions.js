
/*
 * Dot chart definition used for:
 * - Stats
 */
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

/*
 * Multiple bar definition used for:
 * - Covenants Choice
 * - ...
 */
function getMultipleBarChartDefinition(wowheadTooltips, data, legendTitle, yAxisTitle, chartId, maxEntries) {
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
      max: maxEntries,
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
        var result = '<div class="chartHover">'
              + '<div class="chartHoverLine">' 
              + this.x
              + "</div>";
        var minValue = 0;
        var value = 0;
        for (var i = this.points.length - 1; i >= 0; i--) {
          if(this.points[i].series.name.includes("min")) {
            minValue = this.points[i].y;
            value = minValue;
          } else if (this.points[i].series.name.includes("max")) {
            value = minValue + this.points[i].y;
            minValue = 0;
          }

          
          result += getTooltip( value, 
                                0, 
                                this.points[i].series,
                                data,
                                false);
          
        }
                  
        result += "</div>";
        return result;
      },
    },
  };   
}

/*
 * Percentage bar definition used for:
 * - Conduits
 * - Legendary Items
 * - Trinkets
 * - ....
 */
function getChartDefinitionPercentage(wowheadTooltips, data, legendTitle, yAxisTitle, chartId, maxEntries) {
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
      max: maxEntries,
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
        var result = '<div class="chartHover">'
                    + '<div class="chartHoverLine">' 
                    + this.x
                    + "</div>";
  
        for (var i = this.points.length - 1; i >= 0; i--) {
          result += getTooltip( this.points[i].y, 
                                (( data[jsonData][jsonBase][DPS] / 100 ) * this.points[i].y), 
                                this.points[i].series,
                                data,
                                true);
        }

        result += "</div>";
        return result;
      },
    },
  };   
}

/*
 * Single bar definition used for:
 * - Covenants
 * - Legendaries
 * - Soulbinds
 * - Conduit Combos
 * - Soulbind Traits
 * - Soulbinds Launch
 * - Soulbinds Prog
 * - Racials
 * - Talents
 * - Trinket Combos
 * - ....
 */
function getSingleBarDefinition(wowheadTooltips, data, legendTitle, yAxisTitle, showLegend, xPadding, chartId, maxEntries) {
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
      max: maxEntries,
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
        var result = '<div class="chartHover">'
              + '<div class="chartHoverLine">' 
              + this.x 
              + "</div>";
        for (var i = this.points.length - 1; i >= 0; i--) {
          result += getTooltip( this.points[i].y, 
                                ((data[jsonData][jsonBase][DPS] / 100) * this.points[i].y), 
                                this.points[i].series,
                                data,
                                true);
        }
        result += "</div>";
        return result;
      },
    },
  };   
}

function getTooltip(percentage, dpsIncrease, series, data, showBase) {
  result = "";
  if (percentage != 0) {
    result = '<div><span class="chartHoverSpan" style="border-left: 9px solid ' 
              + series.color
              + ";" 
              + '">' 
              + series.name;

    if(showBase) {
      result += " ( " + data[jsonData][jsonBase][DPS] + " base )";
    }
    result += "</span>:&nbsp;&nbsp;";

    if(dpsIncrease != 0) {
      result += "+ "
              + Intl.NumberFormat().format(dpsIncrease) 
              + space + DPS.toLowerCase()
              + space + dash + space;
    }
    result += percentage.toFixed(2);
    if (percentage > 0) {
      result += '% (Increase)';
    } else {
      result += '% (decrease)';
    }
  }

  return result;
}