#!/bin/sh

rm js/internal/chart/ChartImport.js

## Adds helper
cat js/internal/helper/Converter.js >> js/internal/chart/ChartImport.js
sed -i -e '$a\' js/internal/chart/ChartImport.js
sed -i -e '$a\' js/internal/chart/ChartImport.js
cat js/internal/helper/Constants.js >> js/internal/chart/ChartImport.js
sed -i -e '$a\' js/internal/chart/ChartImport.js
sed -i -e '$a\' js/internal/chart/ChartImport.js

## Adds Chart
cat js/internal/chart/Chart.js >> js/internal/chart/ChartImport.js
sed -i -e '$a\' js/internal/chart/ChartImport.js
sed -i -e '$a\' js/internal/chart/ChartImport.js

## Adds chart helper
cat js/internal/chart/helper/ColorHelper.js >> js/internal/chart/ChartImport.js
sed -i -e '$a\' js/internal/chart/ChartImport.js
sed -i -e '$a\' js/internal/chart/ChartImport.js
cat js/internal/chart/helper/DataHelper.js >> js/internal/chart/ChartImport.js
sed -i -e '$a\' js/internal/chart/ChartImport.js
sed -i -e '$a\' js/internal/chart/ChartImport.js
cat js/internal/chart/helper/WowheadHelper.js >> js/internal/chart/ChartImport.js
sed -i -e '$a\' js/internal/chart/ChartImport.js
sed -i -e '$a\' js/internal/chart/ChartImport.js

## Adds chart defintions
cat js/internal/chart/definitions/Definitions.js >> js/internal/chart/ChartImport.js
sed -i -e '$a\' js/internal/chart/ChartImport.js
sed -i -e '$a\' js/internal/chart/ChartImport.js

cat js/yaml/yaml.min.js >> js/internal/chart/ChartImport.js
sed -i -e '$a\' js/internal/chart/ChartImport.js
sed -i -e '$a\' js/internal/chart/ChartImport.js

cat js/internal/helper/ChartImportBasic.js >> js/internal/chart/ChartImport.js
sed -i -e '$a\' js/internal/chart/ChartImport.js
sed -i -e '$a\' js/internal/chart/ChartImport.js