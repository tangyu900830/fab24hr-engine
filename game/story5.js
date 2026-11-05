/* 第五章「薪水小偷」（約 5–8 分鐘）。
   一個上班日：有幾件小事要做（查成本、在系統維護價格、去倉庫盤點），其餘時間隨你。
   可以摸魚的地方：洗手間、茶水間、辦公室裡到處聊天、倉庫（滑手機）、午休拖太久。
   摸魚到一個程度，KP 會來巡查，問你上面小事的進度：答得出來就放過，答不出來就被罵；被罵三次就被開除。
   午休可以到餐廳街（四家店，每一家都可以走進去看菜單），看你怎麼把公司餐補（一餐 NT$130）用得最划算。
   辦公室裡坐滿了人（座位同事都可以聊天），KP 會在辦公室裡到處走，遇到你就停下來問一件事；午休時一半的人去餐廳街吃飯，KP 也坐在那裡。
   餐廳街有排隊被插隊、隔壁桌八卦的小插曲。高層區（副總、總裁）在主辦公室正下方。
   結算畫面跟別章不同：今天賺了多少、偷了多少、餐補用得怎麼樣，也用月薪換算成錢。
   ST.d 記：sal（月薪）、sl（摸魚分鐘）、tl／cl／wl／ll（洗手間／聊天／倉庫滑手機／午休超時）、insp（巡查次數）、ok5（答出來幾次）、sc（被罵幾次）、
   t1／t2／t3（三件小事的結果）、eat（午餐）、lm（午休用掉的分鐘）、sfire（被開除）。 公司、人名、店名都是虛構的。 */

const PM5_SUB = 130;   /* 公司餐補，一餐 */
const PM5_COST = 418;  /* QX-7 現在的成本（美元） */
const pm5Ch = b => {const w = b.when; b.when = () => ST.d.chapter === 5 && !ST.d.sfire && (!w || w()); return b};
const pm5N = n => 'NT$ ' + Math.round(n).toLocaleString('en-US');
const pm5Min = () => (ST.d.sal || 60000) / 22 / 480;   /* 每分鐘薪水 */

/* 辦公室裡坐著的人（座位點見 office.js）。午休：一半的人去餐廳街吃飯，KP 也坐在那裡 */
const PM5_DESK = {kai: 'kaiD', hank: 'hkD', lena: 'mk2', zoe: 'mk1', ian: 'id1', leo: 'leoD', tom: 's2', anna: 's1', ken: 's3', lily: 's4', bo: 's5', vera: 's6'};
const PM5_BOSS = {nora: ['vp', 0], walter: ['ceo', 0], fu: 'o1', zhang: 'o2', yi: 'o3', kc: 'o4'};
const PM5_LUNCH = {tom: ['u1', Math.PI], anna: ['u2', Math.PI], lena: ['u3', Math.PI], bo: ['u4', Math.PI], ken: ['d1', 0], kp: ['d2', 0], lily: ['d3', 0], vera: ['d4', 0]};   /* 上排的桌子坐在南邊、面向北；下排坐在北邊、面向鏡頭 */
function pm5Cast(lunch) {
  const o = Object.assign({}, PM5_DESK, PM5_BOSS);
  if (lunch) Object.keys(PM5_LUNCH).forEach(id => {o[id] = PM5_LUNCH[id]});
  pmCast(o);
}
STORY.segs.w5a = {name: '薪水小偷', sub: '週三早上。又是上班的一天。', t: 525, mood: 'day', scene() {pm5Cast(false)}};
STORY.segs.w5b = {name: '午休', sub: '十二點。公司餐補一餐 NT$130。', t: 720, mood: 'day', scene() {pm5Cast(true)}};
STORY.segs.w5c = {name: '下午', sub: '午休之後，最容易想睡。', get t() {return Math.max(810, ST.clock)}, mood: 'day', scene() {pm5Cast(false)}};
STORY.segs.w5d = {name: '下班前', sub: '五點半，KP 還在。', get t() {return Math.max(1020, ST.clock)}, mood: 'eve', scene() {pm5Cast(false)}};

/* ───────── 摸魚：加上分鐘、時鐘往前，然後看 KP 會不會來 ───────── */
const PM5_LABEL = {tl: '洗手間', cl: '聊天', wl: '倉庫', ll: '午休超時'};
function pm5Add(k, m) {
  const d = ST.d; d[k] = (d[k] || 0) + m; d.sl = (d.sl || 0) + m; ST.clock += m; if (typeof hud === 'function') hud();
  toast('摸魚 +' + m + ' 分鐘', '偷了 ' + pm5N(m * pm5Min()));
}
/* 巡查：摸魚超過下一道門檻，KP 就走過來問進度 */
function pm5Qs() {
  const d = ST.d;
  return [
    {k: 't1', done: d.t1 !== undefined, q: 'QX-7 現在的成本，系統上是多少？', ok: d.t1 === 'ok', right: 'USD ' + PM5_COST, mine: d.t1 === 'bad' ? 'USD ' + d.c5 : null, wrong: ['大概四百多吧', 'USD 450 左右，我再確認一下']},
    {k: 't2', done: d.t2 !== undefined, q: 'QX-7 的售價，你維護成多少了？毛利率目標是 25%。', ok: d.t2 === 'ok', right: 'USD 557（成本 ÷ 0.75）', mine: d.t2 === 'bad' ? 'USD 523' : null, wrong: ['我還在算……', '照上次的價格，沒有動']},
    {k: 't3', done: d.t3 !== undefined, q: '倉庫的庫存，你數過了嗎？實際有幾台？', ok: d.t3 === 'ok', right: '96 台，系統上少了 4 台，我已經通報了', mine: null, wrong: ['系統上寫一百台', '我剛從倉庫回來，應該沒問題']}];
}
function pm5Ask(next, q, intro) {
  const d = ST.d;
  d.metT = Date.now();
  const L = intro.concat([['kp', q.q]]);
  if (!q.done) {   /* 這件事還沒做：老實說就放過，吹牛就被罵 */
    const pend = {t1: '成本', t2: '售價', t3: '庫存'}[q.k];
    say(L, null, {choice: [
      ['還沒，我現在就去做', () => say([['kp', '好。老實講，比假裝做完好。快去。']], () => pm5Back(next), {end: '馬上去'})],
      ['做好了，我正在最後確認一下' + pend, () => pm5Fail(next, q)]]});
    return;
  }
  const right = q.ok ? [[q.right, () => {d.ok5 = (d.ok5 || 0) + 1; d.nx = (d.sl || 0) + 45; pm5Pass(next)}]] : [];
  const mine = !q.ok && q.mine ? [[q.mine, () => pm5Fail(next, q, true)]] : [];
  const wrong = q.wrong.map(w => [w, () => pm5Fail(next, q)]);
  say(L, null, {choice: right.concat(mine, wrong)});
}
function pm5Check(next) {
  const d = ST.d, thr = d.nx == null ? 30 : d.nx;
  if ((d.sl || 0) < thr || (d.insp || 0) >= 4 || d.sfire) {next(); return}
  d.insp = (d.insp || 0) + 1;
  const Q = pm5Qs(), q = Q[(d.insp - 1) % Q.length], me = W && W.snap().me;
  const ask = () => pm5Ask(next, q, [['sys', '你一抬頭，KP 不知道什麼時候已經站在你旁邊。'], ['kp', '（看了看四周）你這陣子，好像一直不在位子上。']]);
  say([['sys', '背後傳來腳步聲，越來越近。']], () => {
    if (W) W.walkXZ('kp', me[0] + 1.3, me[1] + .2, ask); else ask();
  });
}
/* KP 在辦公室裡到處走：路上遇到你，就停下來問一件事（每隔一陣子最多一次） */
const PM5_PATROL = ['a2c', 'a2m', 'fm', 'a1m', 'fl', 'a2l', 'a1r', 'fr', 'fc', 'a2r', 'kpdoor', 'a1l'];
function pm5Meet() {
  const d = ST.d; d.met = (d.met || 0) + 1; busy = true; showGuide();
  const Q = pm5Qs(), q = Q[(d.qi = (d.qi || 0) + 1) % Q.length], p = W.snap().kp;
  W.walkXZ('kp', p[0], p[1]);
  if (W.face) W.face('kp', 'me');
  pm5Ask(pmxFree, q, [['sys', ST.seg === 'w5b' ? 'KP 坐在窗邊，抬頭看見你。' : 'KP 迎面走過來，在你面前停下。'], ['kp', ST.seg === 'w5b' ? '午休還在想工作的事嗎？剛好。' : '剛好遇到你。']]);
}
function pm5Patrol(now) {
  const d = ST.d;
  if (!W || !ST.on || d.chapter !== 5 || d.sfire || busy || !W.has('kp')) return;
  const seg = ST.seg;
  if (seg !== 'w5a' && seg !== 'w5b' && seg !== 'w5c') return;
  const P = pm5P || (pm5P = {i: 0, wait: 0});
  if (seg !== 'w5b' && !W.moving('kp') && now > P.wait) {
    const n = PM5_PATROL[(P.i += 1 + Math.floor(Math.random() * 3)) % PM5_PATROL.length];
    W.walk('kp', n); P.wait = now + 800 + Math.random() * 2500;
  }
  const s = W.snap();
  if (!s.kp || !s.me || Math.hypot(s.kp[0] - s.me[0], s.kp[1] - s.me[1]) > 2.0) return;
  if (now - (d.metT || 0) < 45000 || (d.met || 0) >= 6) return;
  if (!d.t0) {d.t0 = now; return}
  if (now - d.t0 < 15000) return;
  pm5Meet();
}
let pm5P = null;
function pm5Back(fn) {fn()}
function pm5Pass(next) {
  say([['kp', '（點了點頭）嗯。可以。'], ['kp', '你要是每次都這樣，我就不用站在這裡了。']], () => pm5Back(next), {end: '謝謝主管'});
}
function pm5Fail(next, q, wrongNum) {
  const d = ST.d; d.sc = (d.sc || 0) + 1; d.nx = d.sl + 25; (d.bad = d.bad || []).push('上班時間一再摸魚，被主管問起「' + q.q.slice(0, -1) + '」卻答不出來');
  const L = [['kp', wrongNum ? '你記錯了。這種數字，你自己應該最清楚。' : '答不出來？你這一個早上，到底在做什麼？'],
    ['kp', d.sc >= 3 ? '這已經是第三次了。你跟我來一下。' : d.sc === 2 ? '這是第二次。再有一次，我們就不用談了。' : '我今天先當作沒看到。下次，我要看到進度。']];
  say(L, () => {
    if (d.sc >= 3) {
      d.sfire = true; if (W) W.walk('kp', 'kp');
      busy = false; ST.q = Math.max(0, STORY.beats.findIndex(x => x.seg === 'hr') - 1); advance();   /* 後面的事全部跳過，直接去人資面談（人資的 beat 排在第五章前面，所以要把進度退回去） */
    } else pm5Back(next);
  }, {end: d.sc >= 3 ? '……' : '對不起，我馬上做'});
}

/* ───────── 洗手間、倉庫、聊天 ───────── */
STORY.places.wc = {name: '洗手間', at: [12.4, 4.7], mark: [12.4, 2.8, 4.3], go: '去洗手間'};
function pm5Wc() {
  return pmxVisit('wc', () => {
    busy = true; showGuide();
    say([['sys', '洗手間裡很安靜。隔間的門，是一個很好的藏身處。']], null, {choice: [
      ['正常上廁所，五分鐘', () => {say([['sys', '你洗了手，回座位。']], () => {pm5Add('tl', 5); pm5Check(pmxFree)})}],
      ['鎖在隔間裡滑手機，十五分鐘', () => {say([['sys', '你坐在馬桶蓋上，把今天的限時動態全部看完了。']], () => {pm5Add('tl', 15); pm5Check(pmxFree)})}],
      ['蹲到腳麻，順便回訊息，三十分鐘', () => {say([['sys', '腳麻的時候，你覺得這好像不是最划算的投資。']], () => {pm5Add('tl', 30); pm5Check(pmxFree)})}],
      ['不上了，離開', pmxFree]]});
  });
}
function pm5Wh() {
  return pmxVisit('warehouse', () => {
    busy = true; showGuide();
    say([['sys', '倉庫的貨架很高，後面有一塊沒有人看得到的地方。']], null, {choice: [
      ['拿著盤點表，躲到貨架後面滑手機，二十分鐘', () => {say([['sys', '有人推著棧板經過，你立刻低頭假裝在數箱子。']], () => {pm5Add('wl', 20); pm5Check(pmxFree)})}],
      ['假裝巡視，邊走邊看影片，三十五分鐘', () => {say([['sys', '你走得很慢。這是你今天最像在工作的一次。']], () => {pm5Add('wl', 35); pm5Check(pmxFree)})}],
      ['離開', pmxFree]]});
  });
}
const PM5_CHAT = {
  maggie: ['你昨天看的那個劇，結局到底怎樣？我不要被雷。', '午休我們一起去吃飯吧？我有一間店想推薦。'],
  ethan: ['你知道我的鍵盤為什麼比較貴嗎？來，我跟你講……', '這個週末我想去爬山，你要不要一起？'],
  grace: ['我們組新來的那個，咖啡都自己帶。你覺得這樣算不合群嗎？', '欸，你的手機桌布是什麼？給我看。'],
  kai: ['你知道哪家的鹽酥雞最好吃嗎？我客戶跟我說的，我跟你說……', '我這禮拜跑客戶，跑到腳底長繭。'],
  hank: ['我跟你說，我昨天在高鐵上遇到我國中同學……', '你有沒有想過要換手機？我一直在看新款。'],
  lena: ['我最近想學衝浪，你覺得會不會太晚了？', '你看過這個新的展覽嗎？超級好看。'],
  zoe: ['你的 PPT 配色我可以幫你改，只是要等下班。', '你看到昨天那則新聞了嗎？'],
  ian: ['我的渲染圖又被改了，我們去茶水間喘口氣。', '你知道這個字型為什麼很貴嗎？'],
  ben: ['（把箱子放下）今天比較閒，聊兩句沒關係。', '我昨天排隊買了一個很難買的便當。'],
  joe: ['你們辦公室那邊，是不是都比較好混？', '我們這邊最怕主管來。'],
  sue: ['哎，你也出來摸魚啊？', '我剛剛看到 KP 往這個方向走……開玩笑的。'],
  max: ['（把插車熄火）這台昨天我又被罵了，你有沒有零食？', '我開這台開了八年，連做夢都在倒車。'],
  dan: ['（按掉引擎）你要搭便車嗎？不行啦，會被罵。', '倉庫最涼的地方是第三排，你不要說是我說的。'],
  ray: ['你看，大家都很忙，只有我在聊天。這就是領班的特權。', '剛剛 Kim 說的那個笑話，我笑了十分鐘。'],
  kim: ['我們這條線今天很順，順到我快睡著了。', '你有沒有看到領班昨天穿的鞋子？'],
  mia: ['（端著杯子）財務部最大的福利，就是離老闆很遠。', '我午休都在看股票，不要跟別人說。'],
  jay: ['你知道供應商送的月餅最後都去哪了嗎？都進我肚子了。', '殺價是一種藝術，摸魚也是。'],
  sam: ['（把螢幕轉過來）你要看我最近在玩的遊戲嗎？', '我的網路隨時都可以斷。你說，我是不是很有權力？'],
  ella: ['我們品保最大的特權，是可以假裝在檢查。', '我昨天午休睡了兩個小時，沒有人發現。'],
  tom: ['（頭也不抬）我的程式在 build，還有二十分鐘。這二十分鐘，我可以跟你聊天。', '你有沒有發現，Anna 每次講電話都會變成另一個人？', '我昨天看到 Ethan 跟 Vera 在茶水間講悄悄話。我什麼都沒看到。'],
  anna: ['（摀住話筒）等一下，客戶在罵我，我讓他罵三分鐘。你說，你說。', '我跟你說，Ken 每次幫我訂便當都會多訂一份，然後說「剩的」。你覺得呢？', '昨天 Bo 跟 Vera 在會議室吵架，整層都聽到，只有他們兩個不知道。'],
  ken: ['你們有人要訂飲料嗎？我先問，我不一定會請。', '我偷偷跟你講，Lily 上週五有穿裙子。你別說是我說的。', '我們這層樓最大的祕密是什麼？是我知道每個人的便當口味。'],
  lily: ['我跟你說，那個供應商昨天寄了一個「恭喜發財」的月曆，現在才十一月。', '（小聲）Ken 最近一直找我吃飯，你覺得他是不是對我有意思？', '我桌上有三種堅果，你要哪一種？'],
  bo: ['我上午把測試機弄壞了兩台。Tom 說這是我的專長。', '你不要點那個紅色按鈕。我是說，你可以點，我不會看。', '我跟 Vera 吵架不是因為工作，是因為她把我的馬克杯放到了「資源回收」。'],
  vera: ['（翻著合約，沒抬頭）我有在聽。你說。', '我其實不喜歡開會。但沒有人問我喜不喜歡。', '你知道為什麼合約都那麼長嗎？因為每個人都想多加一句。'],
  nora: ['（看了你一眼，把螢幕轉開）這個時間，你不在位子上，應該有很好的理由。', '我桌上這盆植物是 Walter 送的，說要「為公司帶來運氣」。三個月了，它比我們都健康。'],
  walter: ['（放下茶杯）你是……產品部的？我記得你的名字，下次再告訴你。', '這間辦公室，是整層樓最安靜的地方。也是最容易讓人想睡的地方。']};
const PM5_OWN = {fu: 'shop_bento', zhang: 'shop_dumpling', yi: 'shop_buffet', kc: 'shop_mart'};
function pm5Talk(id) {
  const L = PM5_CHAT[id];
  if (!L || ST.d.chapter !== 5 || busy || !ST.on) return false;
  busy = true; showGuide(); ST.d.cn = (ST.d.cn || 0) + 1;
  say([[id, L[ST.d.cn % L.length]], ['sys', '你們就這樣聊了十分鐘。']], () => {pm5Add('cl', 10); pm5Check(pmxFree)}, {end: '聊完了'});
  return true;
}

/* ───────── 餐廳街：四家店，每一家都可以進去看菜單 ───────── */
const PM5_SHOP = {
  shop_bento: {n: '大福便當', says: '來，要吃什麼？都是現做的。', items: [['排骨便當', 100, 2, '排骨很大片，但飯有點少。'], ['雙拼便當（排骨＋雞腿）', 130, 3, '兩種主菜，三樣配菜，吃得很撐。'], ['雙拼便當＋滷蛋＋豆乾', 160, 3, '超級豐富，但超出餐補了。']]},
  shop_dumpling: {n: '老張水餃', says: '水餃現包的，酸辣湯要趁熱喝。', items: [['水餃 10 顆', 70, 1, '一份很輕巧。'], ['水餃 10 顆＋酸辣湯', 105, 2, '酸酸辣辣，剛好。'], ['水餃 20 顆', 130, 2, '剛好一餐的量。'], ['水餃 20 顆＋酸辣湯', 165, 3, '很撐，但要自己補錢。']]},
  shop_buffet: {n: '家常自助餐', says: '自己夾，秤重計價。', items: [['少少一盤', 90, 1, '你夾得很克制。'], ['中等一盤（三菜一肉）', 130, 2, '剛剛好，沒有浪費。'], ['滿盤，什麼都夾', 175, 3, '吃得很爽，但要多付一些。']]},
  shop_mart: {n: '全時超商', says: '歡迎光臨。便當要加熱嗎？', items: [['微波便當＋熱咖啡', 130, 2, '剛好湊滿餐補，咖啡還是熱的。'], ['便當＋飯糰＋茶葉蛋＋咖啡', 180, 3, '吃得很滿足，但錢包有點痛。'], ['兩個飯糰＋一瓶飲料', 90, 1, '很輕巧，也浪費了餐補。']]}};
function pm5Shop(id) {
  const S = PM5_SHOP[id];
  if (ST.d.chapter !== 5) {   /* 不是午休：只能看看 */
    return pmxVisit(id, () => {busy = true; showGuide(); say([['sys', S.n + '的老闆朝你點點頭。現在不是你要來的時候。']], pmxFree, {end: '離開'})});
  }
  return pmxVisit(id, () => {
    busy = true; showGuide();
    const d = ST.d, first = !(d.seen = d.seen || {})[id]; d.seen[id] = 1;
    if (d.eat) {say([['sys', '你已經吃過午餐了。']], pmxFree); return}
    if (first) d.lm = (d.lm || 0) + 5;
    const ch = S.items.map(it => [it[0] + '　NT$' + it[1], () => pm5Eat(id, it)]).concat([['再去看看別家', pmxFree]]);
    const open = () => say([['sys', '你走進' + S.n + '。'], ['sys', S.says], ['sys', '公司餐補：一餐 NT$' + PM5_SUB + '。超過的部分，自己付；沒用完，不會退。']], null, {choice: ch});
    const n = Object.keys(d.seen).length;
    if (first && n === 1) pm5EvQueue(open);
    else if (first && n === 2) pm5EvGossip(open);
    else open();
  });
}
function pm5Eat(id, it) {
  const d = ST.d, total = it[1], used = Math.min(total, PM5_SUB), self = Math.max(0, total - PM5_SUB), waste = PM5_SUB - used;
  d.eat = {shop: PM5_SHOP[id].n, item: it[0], total, used, self, waste, full: it[2]}; d.lm = (d.lm || 0) + 20;
  const verdict = self === 0 && waste === 0 && it[2] >= 2 ? '用得剛剛好，吃得又飽。這就是最划算的一餐。'
    : self > 0 ? '你多付了 NT$' + self + '，但吃得很滿足。'
    : waste > 0 ? '餐補有 NT$' + waste + ' 沒用到，過期就沒了。' : '用滿了餐補，只是沒有很飽。';
  say([['sys', it[3]], ['sys', verdict]], () => {
    const over = Math.max(0, (d.lm || 0) + 10 - 60);   /* 加上來回走路十分鐘 */
    if (over > 0) {pm5Add('ll', over)}
    pm5Check(() => {busy = true; pm5Release()});
  }, {end: '吃飽了，回去'});
}
/* 餐廳街的小插曲：排隊被插隊、隔壁桌的八卦 */
function pm5EvQueue(open) {
  const d = ST.d;
  say([['sys', '你剛排到櫃台前，一個人從旁邊擠到你前面。'], ['sys', '「老闆，一個排骨便當，快一點，我趕時間！」他連頭都沒回。']], null, {choice: [
    ['「不好意思，後面還有人在排隊。」', () => say([['sys', '那個人愣了一下，不好意思地退到後面。'], ['sys', '老闆朝你眨眨眼，偷偷在你的餐盒多放了一顆滷蛋。']], open, {end: '謝謝'})],
    ['算了，反正不急', () => {d.lm = (d.lm || 0) + 5; say([['sys', '你默默站到後面。多等了五分鐘，肚子叫了兩次。']], open, {end: '嗯'})}]]});
}
function pm5EvGossip(open) {
  const d = ST.d;
  say([['anna', '欸欸，過來坐！我跟你說一件事。'], ['lena', '（壓低聲音）Ken 跟 Lily 每天都剛好同一個時間去倒水，你不覺得很奇怪嗎？'],
    ['anna', '還有，昨天 Bo 跟 Vera 在會議室吵到整層都聽到。聽說是因為一個馬克杯。'], ['sys', '你往旁邊一看，Ken 和 Lily 就坐在不遠的那一桌。他們正好同時抬起頭。']], null, {choice: [
    ['坐下來多聽一點', () => {d.lm = (d.lm || 0) + 10; say([['sys', '你聽了十分鐘。這十分鐘裡，沒有一件事跟 QX-7 有關。']], open, {end: '好像該去買飯了'})}],
    ['笑一笑，說我先去買飯', open]]});
}
let pm5Hub = null;   /* 午休那一件事的 done：吃完午餐才呼叫 */
function pm5Release() {if (pm5Hub && ST.d.eat) {const f = pm5Hub; pm5Hub = null; busy = true; f()} else pmxFree()}

/* ───────── 故事 ───────── */
STORY.beats.push.apply(STORY.beats, [
  {seg: 'w5a',
    lines: () => [['sys', '週三早上，八點四十五分。你打了卡，坐下來。'], ['sys', '今天有幾件小事要做。除此之外，你只想知道一件事：怎麼把這八小時，過得最划算。']],
    mini(done) {
      say([['sys', '先決定一下：你的月薪是多少？（這是遊戲，結算的時候會幫你換算）']], null, {fixed: true, choice: [
        ['NT$ 45,000', () => {ST.d.sal = 45000; done()}], ['NT$ 60,000', () => {ST.d.sal = 60000; done()}],
        ['NT$ 80,000', () => {ST.d.sal = 80000; done()}], ['NT$ 120,000', () => {ST.d.sal = 120000; done()}]]});
    },
    post: () => [['sys', '一個月 22 天、一天 8 小時：你每分鐘賺 NT$ ' + pm5Min().toFixed(1) + '，每小時 ' + pm5N(pm5Min() * 60) + '。'],
      ['sys', '洗手間、茶水間、倉庫、跟同事聊天、午休慢慢吃……每一分鐘，都可以算成錢。']]},
  {seg: 'w5a', to: 'desk', guide: '回座位，看 KP 留的待辦',
    lines: () => [['sys', '你的螢幕上貼著一張 KP 留的便利貼：'], ['kp', '1. 確認 QX-7 現在的成本。　2. 在系統維護 QX-7 的售價（毛利率目標 25%）。　3. 下午去倉庫確認庫存。'],
      ['sys', '三件都是小事。你可以現在就做完，也可以……等一下再說。想離開座位去哪裡，都可以走過去。']]},
  {seg: 'w5a', to: 'desk', guide: '在系統裡確認 QX-7 現在的成本',
    lines: () => [['sys', '成本表打開了：主機板 USD 210、鋁殼 USD 95、電源與線材 USD 38、包材 USD 25、組裝與測試 USD 50。']],
    mini(done) {
      say([['sys', '加起來，QX-7 現在每台成本是多少？']], null, {choice: [
        ['USD 418', () => {ST.d.t1 = 'ok'; ST.d.c5 = 418; done()}], ['USD 380（忘了包材與組裝）', () => {ST.d.t1 = 'bad'; ST.d.c5 = 380; done()}], ['USD 448（組裝算了兩次）', () => {ST.d.t1 = 'bad'; ST.d.c5 = 448; done()}]]});
    },
    post: () => [['sys', ST.d.t1 === 'ok' ? '你把數字抄在便利貼上。很簡單的事，沒錯。' : '你把數字記下來，關掉視窗。好像哪裡怪怪的，但你沒有再看一次。']]},
  {seg: 'w5a', to: 'desk', guide: '在系統裡維護 QX-7 的售價',
    lines: () => [['sys', '價格維護頁面。成本欄位寫著 ' + (ST.d.t1 === 'bad' ? 'USD ' + ST.d.c5 : 'USD 418') + '。你需要填一個售價，讓毛利率剛好是 25%。']],
    mini(done) {
      say([['sys', '售價 = 成本 ÷（1 − 毛利率）。你要填多少？']], null, {choice: [
        ['USD 557（418 ÷ 0.75）', () => {ST.d.t2 = ST.d.t1 === 'ok' ? 'ok' : 'bad'; done()}], ['USD 523（418 × 1.25）', () => {ST.d.t2 = 'bad'; done()}], ['USD 418（先填成本價，之後再改）', () => {ST.d.t2 = 'bad'; done()}]]});
    },
    post: () => [['sys', ST.d.t2 === 'ok' ? '你按下「儲存」。系統顯示：價格已更新。' : '你按下「儲存」。系統沒有報錯，但你心裡有一點不確定。']]},
  /* 午休 */
  {seg: 'w5b', to: 'foodc', guide: '午休：去餐廳街，每家店都進去看看，選一個最划算的午餐',
    lines: () => ST.d.hubOn ? [] : [['sys', '十二點整。公司餐補，一餐 NT$' + PM5_SUB + '。'], ['sys', '大廳外面是餐廳街：便當、水餃、自助餐、超商。每一家都可以走進去看菜單。午休一小時，逛得越久，越吃不完。']],
    mini(done) {ST.d.hubOn = true; pm5Hub = done; busy = false; showGuide(); if (ST.d.eat) pm5Release()},
    post: () => ST.d.eat ? [['sys', '午休結束。你抹抹嘴，回到座位。']] : []},
  /* 下午 */
  {seg: 'w5c', to: 'warehouse', guide: '去倉庫，確認庫存',
    lines: () => [['ben', '（拿著清單）系統上顯示 QX-7 在庫一百台。你要不要自己數？']],
    mini(done) {
      say([['sys', '貨架很高，一箱一箱數很累。你要怎麼做？']], null, {choice: [
        ['一箱一箱數，順便核對標籤', () => {ST.d.t3 = 'ok'; done()}], ['看一下系統就簽名', () => {ST.d.t3 = 'bad'; done()}], ['請 Ben 告訴你數字，你簽名', () => {ST.d.t3 = 'bad'; done()}]]});
    },
    post: () => ST.d.t3 === 'ok' ? [['ben', '（驚訝）真的有人數啊……一共九十六台。系統上多了四台，我之前就懷疑。'], ['sys', '你把差異回報給 Ben。三件小事，你都做完了。']]
      : [['sys', '你簽了名，把清單交回去。三件小事都做完了，只是倉庫的數字，你其實沒有真的看。']]},
  {seg: 'w5d', to: 'kp', guide: '下班前，KP 找你',
    lines: () => {
      const d = ST.d, sl = d.sl || 0;
      return [['kp', '今天的三件事，我看過了。'],
        ['kp', d.t1 === 'ok' && d.t2 === 'ok' && d.t3 === 'ok' ? '都對。好。' : '有幾個地方，我之後再跟你確認。'],
        ['kp', sl < 40 ? '今天你一直都在位子上。繼續保持。' : sl < 120 ? '我今天有看到你走來走去。事情做完就好。' : '我有看到你一直不在位子上。我不說破，但我記得。']];
    }},
  {seg: 'w5d', end: true,
    lines: () => [['sys', '你打了下班卡。夕陽把整層樓染成橘色。'], ['sys', '這一天，你賺了多少、偷了多少，等一下一起算。']]}
].map(pm5Ch));

STORY.places.foodc = {name: '餐廳街', at: [-18.8, 3.4], mark: [-18.8, 2.8, 3.4], go: '去餐廳街'};

/* 第五章的結算卡 */
STORY.ending5 = function () {
  const d = ST.d, sl = d.sl || 0, per = pm5Min(), day = (d.sal || 60000) / 22, stolen = sl * per, earned = Math.max(0, day - stolen), eat = d.eat;
  const fired = !!d.fired;
  const title = fired ? '摸魚摸得太兇，被請回家' : sl < 30 ? '認真的好員工' : sl < 80 ? '偶爾放空' : sl < 150 ? '資深摸魚人' : '薪水小偷';
  const parts = [['洗手間', d.tl || 0], ['聊天', d.cl || 0], ['倉庫滑手機', d.wl || 0], ['午休超時', d.ll || 0]].filter(p => p[1]);
  const lines = [
    '你的月薪 ' + pm5N(d.sal || 60000) + '，每天 ' + pm5N(day) + '，每分鐘 NT$ ' + per.toFixed(1) + '。',
    sl ? '今天你摸魚 ' + sl + ' 分鐘（' + parts.map(p => p[0] + ' ' + p[1] + ' 分').join('、') + '），等於偷了公司 ' + pm5N(stolen) + '。' : '今天你一分鐘都沒有摸魚，一毛錢也沒偷。',
    '實際工作時間換算，你今天真正賺到 ' + pm5N(earned) + '。',
    eat ? '午餐在「' + eat.shop + '」吃「' + eat.item + '」，花 NT$' + eat.total + '：餐補用掉 NT$' + eat.used + '／' + PM5_SUB + (eat.self ? '，自己多付 NT$' + eat.self : '') + (eat.waste ? '，浪費了 NT$' + eat.waste : '') + (eat.self === 0 && eat.waste === 0 && eat.full >= 2 ? '。用得剛剛好，吃得又飽。' : '。')
      : '你今天沒有去吃公司餐補，白白放棄了 NT$' + PM5_SUB + '。',
    '主管來巡查 ' + (d.insp || 0) + ' 次，你答出來 ' + (d.ok5 || 0) + ' 次，被罵 ' + (d.sc || 0) + ' 次。',
    '如果每天都像今天：一個月你會偷 ' + pm5N(stolen * 22) + '，一年 ' + pm5N(stolen * 22 * 12) + '。',
    fired ? '你被開除了。這個月的薪水，大概拿不到完整的了。' : sl >= 150 ? '這是遊戲。真實的公司，通常比 KP 還敏感。' : '三件小事你都做了。其他的時間，你自己決定怎麼花。'];
  return {
    title, led: '薪水小偷', sub: '第五章結束。八小時，換算成錢。',
    more: ['今天賺到 ' + pm5N(earned), '偷了 ' + pm5N(stolen) + '（' + sl + ' 分鐘）'],
    tl: [['08:45', '打卡'], ['12:00', '午休'], ['17:30', fired ? '被請回家' : '下班']],
    stats: [['今天薪水', pm5N(day)], ['實際賺到', pm5N(earned)], ['偷走', pm5N(stolen)], ['摸魚', sl + ' 分鐘'], ['餐補', eat ? eat.used + '/' + PM5_SUB : '0/' + PM5_SUB], ['被罵', (d.sc || 0) + ' 次']],
    lines,
    share: '《PM 的一天》第五章「' + title + '」：今天摸魚 ' + sl + ' 分鐘，偷了 ' + pm5N(stolen) + '，餐補用了 ' + (eat ? eat.used : 0) + '/' + PM5_SUB + '。'
  };
};
