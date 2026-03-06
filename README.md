# WarcraftPriests.github.io

## Development setup

The charts use Highcharts 8.2.2. Instead of loading from the CDN during
development (which returns 403 when opened via `file://`), we vendor the
scripts locally.

1. Install dependencies with npm and copy the Highcharts sources:
   ```sh
   npm install         # pulls highcharts@8.2.2 into node_modules
   npm run copy-highcharts # copies the two JS files into js/vendor/highcharts
   ```
   The `prepare` script runs automatically after `npm install`, so the
   copy step happens on every fresh checkout.
2. The HTML already references the vendor directory; simply run a local server
   (e.g. `python -m http.server`) or open in your browser.

You can also manually grab the files from the CDN if you prefer not to use
npm.


Host Page for WCP charts

https://warcraftpriests.github.io/
