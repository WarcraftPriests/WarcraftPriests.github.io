import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const files = ['highcharts.js', 'highcharts-3d.js'];
const srcDir = path.join(__dirname, '..', 'node_modules', 'highcharts');
const dstDir = path.join(__dirname, '..', 'src', 'vendor', 'highcharts');

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
