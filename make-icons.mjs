import { chromium } from 'playwright-core';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';
const DIR = path.dirname(fileURLToPath(import.meta.url));
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage({ viewport: { width: 512, height: 512 } });
await page.goto(pathToFileURL(path.join(DIR, 'icon-src.html')).href);
await page.waitForTimeout(500);
// [file, size, logo width as share of the square]
for (const [file, size, share] of [
  ['icon-512.png', 512, 94], ['icon-192.png', 192, 94],
  ['icon-maskable-512.png', 512, 70], ['apple-touch-icon.png', 180, 94], ['favicon-32.png', 32, 100],
]) {
  await page.setViewportSize({ width: size, height: size });
  await page.evaluate(([s, sh]) => {
    const ic = document.getElementById('icon'); ic.style.width = s + 'px'; ic.style.height = s + 'px';
    document.getElementById('lg').style.width = sh + '%';
  }, [size, share]);
  await page.waitForTimeout(150);
  await (await page.$('#icon')).screenshot({ path: path.join(DIR, file) });
}
await browser.close();
console.log('icons done');
