# WarcraftPriests.github.io

Host Page for WCP charts

https://warcraftpriests.github.io/

## Development setup

### Prerequisites

Install dependencies with npm and copy the Highcharts sources:
```sh
npm install         # pulls highcharts and http-server into node_modules
npm run copy-highcharts # copies the two JS files into js/vendor/highcharts
```
The `prepare` script runs automatically after `npm install`, so the copy step happens on every fresh checkout.

### Running locally

Because the site uses ES6 modules, it must be served over HTTP (not `file://` protocol). Start the dev server:

```sh
npm start           # starts http-server on http://localhost:8080
```

Then open `http://localhost:8080` in your browser. ES6 modules now load correctly.

### Testing & linting

```sh
npm test            # runs Jest test suite (198 tests)
npm run lint        # runs ESLint on all JS files
```

## Architecture

The application has been migrated to **ES6 modules** for better code organization and maintainability:

- **`js/main.entry.module.js`**: Bootstrap entry point that imports all modules and exposes APIs to the window global bridge for backward compatibility
- **`js/internal/state/AppState.module.js`**: Singleton state management
- **`js/internal/helper/`**: Utility modules (Constants, Converter, Normalizers, Parameterized, ColorHelper, DomRenderHelper, etc.)
- **`js/internal/button/Buttons.module.js`**: UI button creation and event handling
- **`js/internal/chart/`**: Chart rendering and data pipeline (Chart.module.js, DataHelper.module.js, Definitions.module.js, etc.)
- **`js/internal/csv/Csv.module.js`**: CSV data parsing
- **`js/internal/yaml/`**: YAML configuration and talent loading

All modules are strict-mode compliant and use explicit imports/exports.