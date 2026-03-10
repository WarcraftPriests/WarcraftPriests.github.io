# WarcraftPriests.github.io

Host Page for WCP charts

https://warcraftpriests.github.io/

## Development setup

### Prerequisites

Install dependencies with npm and copy the Highcharts sources:
```sh
npm install         # pulls highcharts and http-server into node_modules
npm run copy-highcharts # copies the two JS files into src/vendor/highcharts
```
The `prepare` script runs automatically after `npm install`, so asset setup happens on every fresh checkout:

- Highcharts files are copied into `src/vendor/highcharts`
- Tailwind is compiled into `css/tailwind.generated.css`

### Running locally

Because the site uses ES6 modules, it must be served over HTTP (not `file://` protocol). Start the dev server:

```sh
npm start           # starts http-server on http://localhost:8080
```

Then open `http://localhost:8080` in your browser. ES6 modules now load correctly.

### Tailwind workflow

Tailwind now compiles locally (no CDN runtime script). Useful commands:

```sh
npm run build:tailwind   # one-time build for production/static deploy
npm run watch:tailwind   # rebuild Tailwind on file changes
```

### Testing & linting

```sh
npm test            # runs Jest test suite
npm run lint        # runs ESLint on all JS files
```

## Architecture

The application has been migrated to **ES6 modules** for better code organization and maintainability:

- **`src/main.entry.module.js`**: Bootstrap entry point that imports modules and exposes app APIs to `window`
- **`src/services/state/AppState.module.js`**: Singleton state management
- **`src/services/url/Parameterized.module.js`**: URL query parsing and manipulation
- **`src/utils/`**: Utility modules (Constants, Converter, Normalizers, ColorHelper, DomRenderHelper, etc.)
- **`src/modules/buttons/Buttons.module.js`**: UI button creation and event handling
- **`src/modules/chart/`**: Chart rendering and data pipeline (Chart.module.js, DataHelper.module.js, Definitions.module.js, etc.)
- **`src/modules/csv/Csv.module.js`**: CSV parsing and chart table rendering
- **`src/modules/talents/TalentBuild.module.js`**: Talent import rendering and template handling
- **`src/vendor/`**: Vendored browser libraries (Highcharts and YAML)

All modules are strict-mode compliant and use explicit imports/exports.