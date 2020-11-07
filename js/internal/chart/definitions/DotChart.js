const light_color = "#eeeeee";
const medium_color = "#999999";
const dark_color = "#343a40";
const font_size = "1.1rem";

var defaultDotDefinition = {
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
      beta: 30,
      depth: 700,
      fitToPlot: false,
    }
},
legend: {
  enabled: false,
  backgroundColor: dark_color,
  borderColor: medium_color,
  borderWidth: 1,
  align: "right",
  verticalAlign: "middle",
  layout: "vertical",
  itemStyle: { "color": light_color },
  itemHoverStyle: { "color": light_color }
},
plotOptions: {
  series: {
    dataLabels: {
      allowOverlap: true,
      style: {
        color: light_color,
        fontSize: font_size,
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
  text: "", //"Title placeholder",
  useHTML: true,
  style: {
    color: light_color
  }
},
subtitle: {
  text: "",
  useHTML: true,
  style: {
    color: light_color,
    fontSize: font_size
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
  borderColor: dark_color,
},
xAxis: {
  min: -5,
  max: 15,
  //tickInterval: 20,
  startOnTick: true,
  endOnTick: true,
  title: "",
  labels: {
    enabled: false,
  },
  gridLineWidth: 1,
  gridLineColor: medium_color,
},
yAxis: {
  min: -5,
  max: 15,
  //tickInterval: 20,
  startOnTick: true,
  endOnTick: true,
  title: "",
  labels: {
    enabled: false,
  },
  gridLineWidth: 1,
  gridLineColor: medium_color,
},
zAxis: {
  min: 0,
  max: 20,
  //tickInterval: 1,
  startOnTick: true,
  endOnTick: true,
  title: "",
  labels: {
    enabled: false,
  },
  reversed: true,
  gridLineWidth: 1,
  gridLineColor: medium_color,
},
};