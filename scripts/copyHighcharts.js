const fs = require('fs');
const path = require('path');

const files = ['highcharts.js', 'highcharts-3d.js'];
const srcDir = path.join(__dirname, '..', 'node_modules', 'highcharts');
const dstDir = path.join(__dirname, '..', 'js', 'vendor', 'highcharts');

if (!fs.existsSync(dstDir)) {
  fs.mkdirSync(dstDir, { recursive: true });
}

files.forEach(f => {
  const src = path.join(srcDir, f);
  const dst = path.join(dstDir, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log(`Copied ${f}`);
  } else {
    console.warn(`Source file missing: ${src}`);
  }
});
