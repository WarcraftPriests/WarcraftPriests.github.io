
function getDefaultDotDefinition(chartName) {
  return defaultDotDefinition = {
    chart: {
      renderTo: 'Chart-Display-div',
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
      text: chartName, //"Title placeholder",
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