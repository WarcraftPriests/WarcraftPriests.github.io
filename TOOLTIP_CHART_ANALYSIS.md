# Tooltip and Series Data Build Analysis

## Overview
This document details all locations where tooltips and series data are built for charts, including how talent import links are rendered in the tooltip HTML.

---

## 1. buildChartLineWithWowheadLine Function

**File:** [js/internal/chart/helper/WowheadHelper.js](js/internal/chart/helper/WowheadHelper.js#L142)

### Function Definition (Lines 142-170)
```javascript
function buildChartLineWithWowheadLine(dpsName, itemId, url, currentResult, ilvl = 289) {
  var result = currentResult;
  if (currSimsBtn == 'talents' || currSimsBtn == 'talents_top') {
    link = talentData['builds'][dpsName];
    generated_link = talentData['generated'][dpsName];
    if (link) {
      result += '<a class="tooltipLink" href="' + link + '" onclick="copyURI(event)" title="Click here to copy Talent Import string"> ' + dpsName + ' </a>';
    } else if (generated_link) {
      result += '<a class="tooltipLink" href="' + generated_link + '" onclick="copyURI(event)" title="Click here to copy Talent Import string"> ' + dpsName + ' </a>';
    } else {
      result += dpsName;
    }
  } else {
    if (currSimsBtn == 'trinkets' || currSimsBtn == 'trinket_combos') {
      result += '<a style="color: white; font-size: 16px; padding: 3px; cursor: default" href="' + url + itemId + '?ilvl=' + ilvl + '"';
    } else {
      result += '<a style="color: white; font-size: 16px; padding: 3px; cursor: default" href="' + url + itemId + '"';
    }
    result += ' target="_blank"';
    result += '>';
    result += dpsName;
    result += '</a>';
  }
  
  return result;
}
```

### Key Features:
- **For talents/talents_top:** Looks up talent import links from `talentData['builds'][dpsName]` or `talentData['generated'][dpsName]`
- **Generates HTML links** with class `tooltipLink` for talent imports
- **For other types (trinkets, consumables, etc.):** Creates wowhead item links with proper styling
- **Returns HTML string** to be used as category label or tooltip content

### Calling Locations in WowheadHelper.js:
1. Line 40: Called from `buildChartLine()` for consumables, enchants, racials
2. Line 46: Called from `buildChartLine()` for talents/talentsTop
3. Line 66: Called from `buildChartLineForTrinketCombos()` with ilvl parameter
4. Line 95: Called from `buildChartLineForTrinkets()`
5. Line 103: Called from `buildChartLineForBasic()` for conduitsTop

---

## 2. Series.name Population

### Location 1: Single Bar Chart
**File:** [js/internal/chart/helper/DataHelper.js](js/internal/chart/helper/DataHelper.js#L41-L45)

```javascript
chartForSingle.addSeries({
  data: result,
  name: DPS,  // series.name = "DPS" (from Constants.js)
  showInLegend: showInLegend,
}, false);
```

### Location 2: Percentage Chart with Numeric Steps
**File:** [js/internal/chart/helper/DataHelper.js](js/internal/chart/helper/DataHelper.js#L113-L118)

```javascript
seriesArray.forEach(function(series) {
  chartForPercentage.addSeries({
    data: series.data,
    name: series.name,  // series.name = level/step name (e.g., "418", "424", "437")
    showInLegend: true,
  }, false);
});
```

### Location 3: Multiple Bar Chart - Min/Max Conduits
**File:** [js/internal/chart/helper/DataHelper.js](js/internal/chart/helper/DataHelper.js#L192-L210)

```javascript
chartForMultipleBar.addSeries({
  color: getCovenantChoiceColor(AggregateConduits[i] + '_min'),
  data: minResults,
  name: getValue(Conduits, AggregateConduits[i]) + ' min',  // Dynamic conduit name
  stack: String(AggregateConduits[i]),
  showInLegend: true,
}, false);

chartForMultipleBar.addSeries({
  color: getCovenantChoiceColor(AggregateConduits[i] + '_max'),
  data: maxResults,
  name: getValue(Conduits, AggregateConduits[i]) + ' max',
  stack: String(AggregateConduits[i]),
  showInLegend: true,
}, false);
```

### Location 4: Dot/Stats Chart
**File:** [js/internal/chart/helper/DataHelper.js](js/internal/chart/helper/DataHelper.js#L407-L411)

```javascript
let series = {
  name: Intl.NumberFormat().format(maximalDps) + ' DPS',  // Formatted DPS value
  color: '#FF0000',
  data: []
};
// ...
chartForStats.addSeries(series, false);
chartForStats.addSeries({ name: Intl.NumberFormat().format(minimalDps) + ' DPS', color: '#00FFFF' }, false);
```

---

## 3. Tooltip HTML Rendering

### Tooltip Format Definitions
**File:** [js/internal/helper/Constants.js](js/internal/helper/Constants.js#L18-L19)

```javascript
const tooltipHeaderFormat = '<b>(point.x)</b>';
const tooltipPointFormat = '<span style=color: "{point.color}"><b>{series.name}</b></span>: <b>{point.y}</b><br/>';
```

### Tooltip Configuration in Chart Definitions
**File:** [js/internal/chart/definitions/Definitions.js](js/internal/chart/definitions/Definitions.js#L295-L306)

#### Line Chart Example (Getcha/Single DPS):
```javascript
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
    // Custom tooltip formatter
    var result = '<div class="chartHover">'
          + '<div class="chartHoverLine">' 
          + this.x  // X-axis category (wowhead tooltip HTML)
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
```

#### pointFormatter in Dot Chart
**File:** [js/internal/chart/definitions/Definitions.js](js/internal/chart/definitions/Definitions.js#L73-L108)

```javascript
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
```

---

## 4. getTooltip Helper Function

**File:** [js/internal/chart/definitions/Definitions.js](js/internal/chart/definitions/Definitions.js#L668-L700)

```javascript
function getTooltip(percentage, dpsIncrease, series, data, showBase) {
  result = '';
  if (percentage != 0) {
    result = '<div><span class="chartHoverSpan" style="border-left: 9px solid ' 
              + series.color
              + ';' 
              + '">' 
              + series.name;  // Uses series.name populated via addSeries

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
```

---

## 5. X-Axis Category Labels with Wowhead HTML

**File:** [js/internal/chart/definitions/Definitions.js](js/internal/chart/definitions/Definitions.js#L168-L170)

```javascript
xAxis: {
  categories: wowheadTooltips,  // Array of HTML strings from buildWowheadTooltips()
  useHTML: true,  // Enables HTML rendering in axis labels
  // ...
  labels: {
    x: -40,
    useHTML: true,  // Explicitly enables useHTML for category labels
    // ...
  },
},
```

---

## 6. Wowhead Tooltip Building Flow

### buildWowheadTooltips Function
**File:** [js/internal/chart/helper/WowheadHelper.js](js/internal/chart/helper/WowheadHelper.js#L4-L25)

```javascript
function buildWowheadTooltips(data, breakConidition, simsBtn) {
  var result = [];

  for (dpsName of data[jsonSortedDataKeys]) {
    var id = data[jsonIds][dpsName]; 
    
    if (id == null) {
      id = '';
    }

    if (simsBtn == consumables || simsBtn == alchemy || simsBtn == enchants || simsBtn == gems || simsBtn == specialGear) {
      url = wowheadUrl + wowheadItemPath;
    } else if (configData[sims][simsBtn.replaceAll('_', '-')]['lookupType'] == 'spell') {
      url = wowheadUrl + wowheadSpellPath;
    } else {
      url = wowheadUrl + wowheadItemPath;
    }
    
    result.push(buildChartLine(dpsName, id, url, simsBtn, data));
  }
  
  return result;
}
```

### buildChartLine Function
**File:** [js/internal/chart/helper/WowheadHelper.js](js/internal/chart/helper/WowheadHelper.js#L29-L50)

```javascript
function buildChartLine(dpsName, itemId, url, simsBtn, data = null) {
  result = '';
  result += '<div style="display:inline-block; margin-bottom:-3px">';
  if (simsBtn == null
    || simsBtn == undefined
    || simsBtn == trinkets 
    || simsBtn == consumables
    || simsBtn == enchants
    || simsBtn == racials) {
    result = buildChartLineWithWowheadLine(dpsName, itemId, url, result);
  } else if (simsBtn != null && simsBtn != undefined && (simsBtn == talents || simsBtn == talentsTop)) {
    result = buildChartLineForTalents(dpsName, result);
  } else if (simsBtn != null && simsBtn != undefined && simsBtn == 'trinket_combos') {
    result = buildChartLineForTrinketCombos(dpsName, result, data ? data[jsonIds] : null);
  } else {
    result = buildChartLineWithWowheadLine(dpsName, itemId, url, result);
  }
  return result;
}
```

---

## 7. Talent Import Links - Home Page Template

**File:** [index.html](index.html#L64)

```html
<div id="talent-build-content-div" class="talentBuildContent">
  <div id="talent-build-id-div" class="talentBuildId">
    <span><a class="tooltipLink" href="%talentId%" onclick="copyURI(event)" title="Click here to copy Talent Import string">Talent Import String: %talentId%</a></span>
  </div>
  <div><iframe src="https://www.raidbots.com/simbot/render/talents/%talentId%?level=70&amp;width=208&amp;mini=1" width="208" height="125"></iframe></div>
</div>
```

---

## 8. Summary: Tooltip HTML with Talent Import Links

### Generation Path:
1. **Source Data:** `talentData['builds'][dpsName]` or `talentData['generated'][dpsName]`
2. **Building:** `buildChartLineWithWowheadLine()` creates HTML `<a>` tags with class `tooltipLink`
3. **HTML Format:** 
   ```html
   <a class="tooltipLink" href="[TALENT_IMPORT_STRING]" onclick="copyURI(event)" title="Click here to copy Talent Import string"> [TALENT_NAME] </a>
   ```
4. **Rendering:** Placed as x-axis category labels with `useHTML: true` in chart config
5. **Display:** Series.name is populated via `addSeries({name: ...})` and appears in custom tooltip formatter

### Key Files Summary:
| File | Purpose |
|------|---------|
| [WowheadHelper.js](js/internal/chart/helper/WowheadHelper.js) | Builds tooltip HTML with talent/item import links |
| [DataHelper.js](js/internal/chart/helper/DataHelper.js) | Builds chart data and defines series with names |
| [Definitions.js](js/internal/chart/definitions/Definitions.js) | Chart configuration, tooltip formatters, getTooltip helper |
| [Constants.js](js/internal/helper/Constants.js) | Tooltip format string constants |
| [index.html](index.html) | Display template for talent import links |
