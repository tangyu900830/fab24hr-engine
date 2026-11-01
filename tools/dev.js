#!/usr/bin/env node
/* 開發用：建置一次、在 http://localhost:8080 開起來；engine/ 或 game/ 的檔存檔就重建（重新整理頁面就看得到）。
     node tools/dev.js [遊戲的資料夾，預設 game]      PORT=3000 換埠號
   啟動時多印一行作者的贊助連結（只印在這裡，不進遊戲畫面）。訊息：中文的專案印中文，韓文的印韓文，其他印英文。 */
const fs = require('fs'), path = require('path'), http = require('http'), { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), PUB = path.join(ROOT, 'public'), GAME = process.argv[2] || 'game', PORT = +process.env.PORT || 8080;
const FUND = 'https://buymeacoffee.com/mclty';
let LG = ''; try { LG = JSON.parse(fs.readFileSync(path.resolve(ROOT, GAME, 'game.json'), 'utf8')).lang || '' } catch (e) {}
const say = (en, zh, ko) => /^zh/.test(LG) ? zh : LG === 'ko' && ko ? ko : en;
const build = () => { const r = spawnSync(process.execPath, [path.join(__dirname, 'build.js'), GAME], { stdio: 'inherit' }); return r.status === 0 };
build();
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml' };
http.createServer((req, res) => {
  let f = decodeURIComponent((req.url || '/').split('?')[0]);
  if (f.endsWith('/')) f += 'index.html';
  const p = path.join(PUB, path.normalize(f).replace(/^(\.\.[/\\])+/, ''));
  if (!p.startsWith(PUB) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); res.end('not found'); return }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(p)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(p).pipe(res);
}).listen(PORT, () => console.log(say('dev: http://localhost:' + PORT + '/   (saving a file rebuilds; reload the page to see it; Ctrl+C to stop)', 'dev：http://localhost:' + PORT + '/   （存檔就重建，重新整理頁面就看得到；Ctrl+C 結束）', 'dev: http://localhost:' + PORT + '/   (파일을 저장하면 다시 빌드해요. 페이지를 새로고침하면 보여요. 끝내려면 Ctrl+C)')
  + '\n' + say('The fab24hr engine is free for noncommercial use. If it saves you time, you can buy the author a coffee: ', 'fab24hr 框架在非商業用途免費。如果它幫你省了時間，可以請作者喝杯咖啡：', 'fab24hr 엔진은 비상업적 용도라면 무료예요. 시간을 아꼈다면 제작자에게 커피 한 잔 사 줄 수 있어요: ') + FUND));
let t = 0;
for (const d of ['engine', 'engine/lang', GAME, path.join(GAME, 'lang')]) {
  const dir = path.resolve(ROOT, d);
  if (fs.existsSync(dir)) fs.watch(dir, () => { clearTimeout(t); t = setTimeout(() => { if (build()) console.log(say('dev: rebuilt', 'dev：重建好了', 'dev: 다시 빌드했어요')) }, 200) });
}
