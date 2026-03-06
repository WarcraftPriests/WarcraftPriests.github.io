# WarcraftPriests.github.io

Host Page for WCP charts

https://warcraftpriests.github.io/

## Development setup

The charts use Highcharts. Instead of loading from the CDN during
development (which returns 403 when opened via `file://`), we vendor the
scripts locally.

Install dependencies with npm and copy the Highcharts sources:
```sh
npm install         # pulls highcharts into node_modules
npm run copy-highcharts # copies the two JS files into js/vendor/highcharts
```
The `prepare` script runs automatically after `npm install`, so the
copy step happens on every fresh checkout.