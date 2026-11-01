#!/usr/bin/env node
/* Switch the project's language in one step.  ／  一次切換專案的語言。  ／  프로젝트 언어를 한 번에 바꿔요.
     node tools/lang.js zh-Hant | en | ko   (npm run zh ／ npm run en ／ npm run ko)
     中文預設是繁體中文（zh-Hant）。簡體中文（zh-Hans）只在使用者明確要求時用：node tools/lang.js zh-Hans
   - Sets "lang" in game/game.json: the interface language. Write your game's own text in it.
     設定 game/game.json 的 "lang"：畫面的語言。遊戲自己的字就用這個語言寫。
   - If game/ is still an untouched sample, it is replaced by the sample in that language (samples/<lang>/).
     game/ 還是原封不動的範例時，換成那個語言的範例。
   - If you have changed game/, your files stay as they are; only "lang" changes.
     game/ 已經改過的話，檔案不動，只改 "lang"。 */
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), GAME = path.join(ROOT, 'game'), SAMPLES = path.join(ROOT, 'samples');
const want = process.argv[2], OK = { en: 'en', 'zh-Hant': 'zh-Hant', 'zh-Hans': 'zh-Hant', ko: 'ko' };   /* 語言 → 用哪一份範例 */
if (!OK[want]) { console.error('usage: node tools/lang.js en | zh-Hant | zh-Hans | ko'); process.exit(2) }
const zh = /^zh/.test(want), ko = want === 'ko', say = (en, z, k) => console.log(zh ? z : ko ? k : en);
const files = d => fs.existsSync(d) ? fs.readdirSync(d).filter(f => fs.statSync(path.join(d, f)).isFile()).sort() : [];
/* 內容一樣（game.json 的 lang 不算：切過語言的範例還是範例） */
const body = (d, f) => { const s = fs.readFileSync(path.join(d, f)); if (f !== 'game.json') return s.toString('base64'); try { const o = JSON.parse(s); delete o.lang; return JSON.stringify(o) } catch (e) { return s.toString('base64') } };
const same = (a, b) => { const A = files(a), B = files(b); return A.length === B.length && A.every((f, i) => f === B[i] && body(a, f) === body(b, f)) };
const pristine = fs.readdirSync(SAMPLES).find(s => same(GAME, path.join(SAMPLES, s)));
if (pristine) {
  for (const f of files(GAME)) fs.unlinkSync(path.join(GAME, f));
  for (const f of files(path.join(SAMPLES, OK[want]))) fs.copyFileSync(path.join(SAMPLES, OK[want], f), path.join(GAME, f));
}
const cfgFile = path.join(GAME, 'game.json'), cfg = JSON.parse(fs.readFileSync(cfgFile, 'utf8'));
cfg.lang = want;
fs.writeFileSync(cfgFile, JSON.stringify(cfg, null, 2) + '\n');
if (pristine) say('game/ was the untouched sample: replaced with the ' + OK[want] + ' sample. Interface language: ' + want + '.',
  'game/ 原本是沒改過的範例，已換成 ' + OK[want] + ' 的範例。畫面語言：' + want + '。' + (want === 'zh-Hans' ? '\n範例的字是繁體中文：請你的 AI 工具把 game/ 裡的字轉成簡體。' : ''),
  'game/ 폴더가 손대지 않은 예제여서 한국어 예제로 바꿨어요. 화면 언어: 한국어(ko).');
else say('Your game files were kept. Interface language set to ' + want + '. Write (or translate) your game text in this language.',
  '你的遊戲檔都留著，只把畫面語言改成 ' + want + '。遊戲裡的字請用這個語言寫（或請 AI 工具翻譯）。',
  '게임 파일은 그대로 두고 화면 언어만 한국어(ko)로 바꿨어요. 게임 속 글은 한국어로 쓰거나 번역해 주세요(AI 도구에 맡겨도 돼요).');
say('Next: npm run build, then npm test.', '接下來：npm run build，再 npm test。', '다음: npm run build, 그다음 npm test.');
