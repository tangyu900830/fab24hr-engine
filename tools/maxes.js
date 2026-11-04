/* 算每一章每個數值「最好的選法最高能到幾分」（結算畫面顯示 N/最高分 用）。用法：node tools/maxes.js */
const { chromium } = require('playwright-core');
(async () => {
  const br = await chromium.launch({ args: ['--no-sandbox'] });
  const pg = await br.newPage();
  await pg.goto('file://' + process.cwd() + '/out/test.nd.html');
  await pg.waitForFunction(() => window.__t && !document.getElementById('home').hidden);
  await pg.evaluate(() => window.__t.start('T'));
  const out = {};
  for (const ch of [1, 2, 3, 4]) out[ch] = await pg.evaluate(([c, g]) => window.__t.sim(c, g), [ch, +process.argv[2] || 1]);
  console.log(JSON.stringify(out));
  await br.close();
})();
