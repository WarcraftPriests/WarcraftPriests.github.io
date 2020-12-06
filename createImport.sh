#!/bin/sh


## Adds helper
cat js/internal/helper/Converter.js > js/chart_import.js
sed -i -e '$a\' js/chart_import.js
sed -i -e '$a\' js/chart_import.js
cat js/internal/helper/Constants.js >> js/chart_import.js
sed -i -e '$a\' js/chart_import.js
sed -i -e '$a\' js/chart_import.js

## Adds Chart
cat js/internal/chart/Chart.js >> js/chart_import.js
sed -i -e '$a\' js/chart_import.js
sed -i -e '$a\' js/chart_import.js

## Adds chart helper
cat js/internal/chart/helper/ColorHelper.js >> js/chart_import.js
sed -i -e '$a\' js/chart_import.js
sed -i -e '$a\' js/chart_import.js
cat js/internal/chart/helper/DataHelper.js >> js/chart_import.js
sed -i -e '$a\' js/chart_import.js
sed -i -e '$a\' js/chart_import.js
cat js/internal/chart/helper/WowheadHelper.js >> js/chart_import.js
sed -i -e '$a\' js/chart_import.js
sed -i -e '$a\' js/chart_import.js

## Adds chart defintions
cat js/internal/chart/definitions/Definitions.js >> js/chart_import.js
sed -i -e '$a\' js/chart_import.js
sed -i -e '$a\' js/chart_import.js

cat js/internal/csv/Csv.js >> js/chart_import.js
sed -i -e '$a\' js/chart_import.js
sed -i -e '$a\' js/chart_import.js

cat js/yaml/yaml.min.js >> js/chart_import.js
sed -i -e '$a\' js/chart_import.js
sed -i -e '$a\' js/chart_import.js

cat js/internal/helper/ChartImportBasic.js >> js/chart_import.js
sed -i -e '$a\' js/chart_import.js
sed -i -e '$a\' js/chart_import.js