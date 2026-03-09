import * as Constants from '../../helper/Constants.module.js';

// Destructure commonly used constants for convenience
const {
  defaultBackgroundColor,
  defaultFontColor,
  defaultAxisColor,
  lightColor,
  mediumColor,
  darkColor,
  gridLineColor,
  fontSize,
  fontWeightBold,
  legendTitleTextDps,
  tooltipHeaderFormat,
  tooltipPointFormat,
  plotOptionsPointFormat,
  alignRight,
  alignMiddle,
  stackingNormal,
  legendTitleTextSteps,
  chartType,
  defaultHeader,
  whiteText,
  legendLayoutVertical,
  legendTitleTextItemLevel,
  increase,
  decrease,
  dpsIncrease,
  dash,
  space,
  DPS,
  jsonData,
  jsonBase
} = Constants;

/*
 * Dot chart definition used for:
 * - Stats
 */
export function getDefaultDotDefinition(chartId) {
  return {
    chart: {
      renderTo: chartId,
      type: 'scatter3d',
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
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
      itemStyle: { 'color': defaultFontColor },
      itemHoverStyle: { 'color': defaultFontColor }
    },
    plotOptions: {
      series: {
        dataLabels: {
          allowOverlap: true,
          style: {
            color: defaultFontColor,
            fontSize: fontSize,
            fontWeight: fontWeightBold,
            fontWeight: '400',
            textOutline: ''
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
      text: '',
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
                <td>' + Math.round((100 / this.dpsBase) * (this.dps - this.dpsBase) * 100) / 100 + '%</td>\
              </tr>\
              <tr>\
                <th >Crit</th>\
                <td>' + this.statCrit + '</td>\
                <td>' + this.statCritPercent + '%</td>\
              </tr>\
              <tr>\
                <th>Haste</th>\
                <td>' + this.statHaste + '</td>\
                <td>' + this.statHastePercent + '%</td>\
              </tr>\
              <tr>\
                <th>Mastery</th>\
                <td>' + this.statMastery + '</td>\
                <td>' + this.statMasteryPercent + '%</td>\
              </tr>\
              <tr>\
                <th>Versatility</th>\
                <td>' + this.statVers + '</td>\
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
      title: '',
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
      title: '',
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
      title: '',
      labels: {
        enabled: false,
      },
      reversed: false,
      gridLineWidth: 1,
      gridLineColor: mediumColor,
    },
    accessibility: {
      enabled: true,
    },
  };
}

/*
 * Multiple bar definition used for:
 * - Covenants Choice
 * - ...
 */
export function getMultipleBarChartDefinition(wowheadTooltips, data, legendTitle, yAxisTitle, chartId, maxEntries) {
  return {
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
      /*
       * Highcharts 12 interprets `min`/`max` on a
       * category axis as indexes.  Previous versions
       * allowed strings and sometimes auto‑corrected when
       * you passed a count rather than an index.  When we
       * migrated from v8 the chart started growing past
       * its container because the extremes were being
       * calculated incorrectly.  Explicitly pin both
       * ends as numbers and do _not_ decrement the value
       * upstream (see updateChart in Chart.js).
       */
      min: 0,
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
      /* use a real number here; strings are ignored in v12 */
      min: 0,
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
      reversed: false,
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
        turboThreshold: 10000,
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
        // for percentage charts with numeric levels we compute stacked
        // data as incremental differences; the tooltip should show the
        // cumulative percent increase relative to the base DPS rather
        // than the small delta used for drawing.  we add a running total
        // as we walk the points so each line gives the value you'd get
        // by hovering the bar up to that segment.
        var result = '<div class="chartHover">'
              + '<div class="chartHoverLine">' 
              + this.x
              + '</div>';
        var running = 0;
        for (var i = 0; i < this.points.length; i++) {
          if (this.points[i].y != 0) {
            running += this.points[i].y;
            result += getTooltip(running,
              ((data[jsonData][jsonBase][DPS] / 100) * running),
              this.points[i].series,
              data,
              true);
          }
        }

        result += '</div>';
        return result;
      },
    },
    accessibility: {
      enabled: true,
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
export function getChartDefinitionPercentage(wowheadTooltips, data, legendTitle, yAxisTitle, chartId, maxEntries) {
  return {
    chart: {
      renderTo: chartId,
      type: chartType,
      backgroundColor: defaultBackgroundColor,
      spacingRight: 40,
      marginRight: 40,
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
      /* ensure numeric boundaries; Highcharts 12 treats min/max as indexes */
      min: 0,
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
        overflow: 'allow',
        crop: false,
        allowOverlap: true,
        align: 'right',
        x: -6,
        formatter: function() {
          return this.total ? this.total.toFixed(2) + '%' : '';
        },
        style: {
          fontWeight: fontWeightBold,
          color: defaultFontColor,
          fontSize: 14,
        },
      },
      gridLineColor: gridLineColor,
      /* numeric zero is required in v12, string values are ignored */
      min: 0,
      allowDecimals: true,
      endOnTick: true,
      maxPadding: 0.25,
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
      reversed: false, // show lowest levels first to match stacking order
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
      outside: false,
      positioner: function (labelWidth, labelHeight, point) {
        var chart = this.chart;
        var plotLeft = chart.plotLeft;
        var plotTop = chart.plotTop;
        var plotWidth = chart.plotWidth;
        var plotHeight = chart.plotHeight;
        
        // For horizontal bar charts, position tooltip to the left if it would overflow
        var tooltipX = point.plotX + plotLeft + 10;
        var tooltipY = point.plotY + plotTop - labelHeight / 2;
        
        // If tooltip would go off the right edge, position it to the left of the point
        if (tooltipX + labelWidth > plotLeft + plotWidth) {
          tooltipX = point.plotX + plotLeft - labelWidth - 10;
        }
        
        // Keep tooltip within vertical bounds
        if (tooltipY < plotTop) {
          tooltipY = plotTop;
        } else if (tooltipY + labelHeight > plotTop + plotHeight) {
          tooltipY = plotTop + plotHeight - labelHeight;
        }
        
        return { x: tooltipX, y: tooltipY };
      },
      headerFormat: tooltipHeaderFormat, 
      style: {
        color: defaultFontColor,
      },
      pointFormat: tooltipPointFormat,
      padding: 5,
      formatter: function () {
        // for percentage charts with numeric levels we compute stacked
        // incremental data; the tooltip should show the cumulative percent
        // increase relative to the base DPS. iterate from bottom to top
        // (lowest level first) for natural order.
        var result = '<div class="chartHover">'
                    + '<div class="chartHoverLine">' 
                    + this.x
                    + '</div>';
        var running = 0;
        for (var i = 0; i < this.points.length; i++) {
          if (this.points[i].y != 0) {
            running += this.points[i].y;
            result += getTooltip(running,
              ((data[jsonData][jsonBase][DPS] / 100) * running),
              this.points[i].series,
              data,
              true);
          }
        }

        result += '</div>';
        return result;
      },
    },
    accessibility: {
      enabled: true,
    },
  };   
}

/*
 * Single bar definition used for:
 * - Racials
 * - Talents
 * - Trinket Combos
 * - ....
 */
export function getSingleBarDefinition(wowheadTooltips, data, legendTitle, yAxisTitle, showLegend, xPadding, chartId, maxEntries) {
  return {
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
      min: 0,
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
        formatter: function() {
          return this.total ? this.total.toFixed(2) + '%' : '';
        },
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
      reversed: false,
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
              + '</div>';
        for (var i = this.points.length - 1; i >= 0; i--) {
          result += getTooltip(this.points[i].y, 
            ((data[jsonData][jsonBase][DPS] / 100) * this.points[i].y), 
            this.points[i].series,
            data,
            true);
        }
        result += '</div>';
        return result;
      },
    },
    accessibility: {
      enabled: true,
    },
  };   
}

export function getTooltip(percentage, dpsIncrease, series, data, showBase) {
  var result = '';
  if (percentage != 0) {
    result = '<div><span class="chartHoverSpan" style="border-left: 9px solid ' 
              + series.color
              + ';' 
              + '">' 
              + series.name;

    if (showBase) {
      result += ' ( ' + data[jsonData][jsonBase][DPS] + ' base )';
    }
    result += '</span>:&nbsp;&nbsp;';

    if (dpsIncrease != 0) {
      result += '+ '
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