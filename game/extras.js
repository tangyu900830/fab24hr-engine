/* 跨章的東西：茶水間（免費咖啡、餅乾、八卦）、Maggie 離職、被資遣（人資 Tina）、結算畫面「接著玩別的故事」。
   這個檔最後載入，會包住前面各章的 end 事件與 Maggie 的事件。
   ST.d 記：gos／gi（八卦指數、第幾則）、cof／cok（這個時刻喝過咖啡／吃過餅乾）、neg（選到很差的選項的次數）、
   fired（被資遣）、fireResp、mgone／mwhy（Maggie 已離職／原因 hard、plan）、nch（這次連續玩完幾章）。 */

/* ───────── 走到一個地方，到了再做事 ───────── */
function pmxVisit(id, fn) {
  if (busy || !ST.on) return true;
  const p = STORY.places[id].at, me = W && W.snap().me;
  if (!W || Math.hypot(me[0] - p[0], me[1] - p[1]) < 2.4) {fn(); return true}
  const q0 = ST.q;
  W.walkXZ('me', p[0], p[1], () => {if (ST.on && ST.q === q0 && !busy) fn()});
  return true;
}
const pmxFree = () => {busy = false; showGuide(); if (W && STORY.segs[ST.seg]) STORY.segs[ST.seg].scene()};

/* ───────── 茶水間：同事一個一個來喝咖啡，這時候可以聊天 ───────── */
/* 八卦 x：不適合說這一則的人（當事人）。有的是吵架，有的是戀愛，有的只是小事 */
const PMX_GOSSIP = [
  {t: '財務的 Mia 跟採購的 Jay 在偷偷談戀愛，連午餐都故意錯開時間去。結果昨天有人在停車場，看到他們分同一杯珍奶。', x: ['mia', 'jay']},
  {t: '聽說 KP 跟 Nora 副總最近為了預算吵得不太愉快。KP 昨天從副總辦公室出來，臉很臭。', x: []},
  {t: '你知道 Ella 最近都提早下班嗎？聽說她在偷偷準備考證照，但是不想讓主管知道。', x: ['ella']},
  {t: 'Sam 每天最早到，不是因為認真。是因為他在公司後面的巷子口，每天餵同一隻流浪貓。', x: ['sam']},
  {t: 'Kai 跟 Lena 上次為了展覽預算，在會議室差點吵起來，最後是 Walter 出面打的圓場。', x: []},
  {t: '產線的 Ray 最近常常藉口「巡線」跑去品保那邊。大家都猜他是為了 Ella，但他自己死不承認。', x: ['ella']},
  {t: 'Maggie 的餅乾是她自己週末烤的。她從來沒說過，但鐵盒裡的食譜小卡，被人看到過。', x: []},
  {t: 'Walter 總裁表面不太管事，其實誰的報告準不準時，他都記得。', x: []},
  {t: '聽說 Maggie 最近被別的公司挖角了，不知道是真是假。', x: []},
  {t: 'Hank 跟 Lena 上次一起去展覽，回來之後兩個人都很少講話。有人說是吵架，有人說是在曖昧，沒有人問得出來。', x: ['hank', 'lena']},
  {t: '倉庫的 Ben 每天午休都躲在後面講電話，語氣超甜。大家都在猜對象是誰。', x: []},
  {t: 'Zoe 偷偷在接外面的設計案，晚上都在改稿。小心，不要讓 Lena 知道。', x: ['zoe']},
  {t: '聽說 Jay 和 Owen 上次殺價殺到面紅耳赤，結果現在變成會一起吃宵夜的朋友。', x: ['jay']}];
/* 有用的提示：每個人說的不一樣。Ian 一遇到就說他要的是什麼 */
const PMX_TIPS = {
  1: ['規格如果不確定，直接打電話問客戶現場的人，比聽轉述準。', '做完線要用實機測，不然就是賭運氣。測不測，客戶現場會告訴你。'],
  2: ['型錄開工之前，先確認規格是不是 Ethan 的最新版。數字錯一個，客戶就會拿去用。', '開會要留紀錄，決議寫下來。不然下一次，大家都記得不一樣的版本。'],
  3: ['新品的 EVT，目的是找問題，不是證明沒問題。問題多不可怕，可怕的是沒人列清單。', '新品上市前，要想清楚是賣給誰。換個產業，同一台機器可能就有人要。'],
  4: ['客戶都會殺價。Cora 的預算大概在六百美金上下，她的採購喜歡拿數量換折扣，別直接降價。', '毛利不能太低，不然 KP 也會問你。底線先算好，再去談。']};
/* 每個時刻的提示（接下來該做什麼）和消息（跟現在的劇情有關的新鮮事）。key 是場景 id */
const PMX_SEG = {
  open: ['先去找 KP 之前，想好「問題是什麼、你打算怎麼做」。他最不喜歡只丟問題的人。', '聽說 Kai 昨晚被 SI 的 Victor 罵到凌晨兩點，今天火氣很大。'],
  adp1: ['轉接頭只是暫時的。口頭同意不算數，一定要請 SI 寫下書面同意。', 'Victor 那邊的採購最近換人了，新的很愛翻舊帳。'],
  adp2: ['客戶已經不接受轉接頭了。接下來要拿出正式的處理方案，別再拖。', '聽說 Victor 已經問過法務，賠償的事可能不是小事。'],
  adp3: ['Walter 看的是事實和下一步。先講發生什麼事，再講你要怎麼做。', 'Walter 今天特地取消了午餐行程，大家都知道事情不小。'],
  spl1: ['客戶的機型要一個一個問，Mr. Huang 最好講話，先從他開始。', 'Mr. Huang 現場今天剛好有人在，電話應該打得通。'],
  ret1: ['規格以實機為準。去找 Grace 把實機接上電表逐項量，不要只聽業務轉述。', 'Grace 那邊的樣品機這週剛好沒有人借。'],
  ret2: ['線材廠報價出來，要拿給 KP 批准。MOQ 可以跟 Amy 談，不要硬碰硬。', 'Amy 說她們廠這個月產能有空，交期可能壓得下來。'],
  ret3: ['線做好了，出貨前一定要用樣品機實測，不要只看標籤和長度。', '聽說最近線材廠有一批線被品保退貨，大家都在小心。'],
  redo1: ['被退回就是規格寫錯。這次每一項都跟 Grace 一起量，不要再跳步驟。', '聽說 KP 這次真的火了，連 Maggie 都不敢隨便說話。'],
  redo2: ['重做的線拿給 Grace 測，這次不能省。', 'Amy 說她們這次特別加了一道檢查。'],
  ret4: ['寄件方式要看客戶急不急：空運貴但快，一般出貨便宜但要等。先問 Kai 客戶能等多久。', 'Kai 說 Victor 已經天天催了。'],
  ret5: ['收尾前，把這次的教訓寫成報告：規格怎麼確認、怎麼測、怎麼留紀錄。', '聽說 Walter 想把這次的處理方式，變成公司的標準流程。'],
  c2a: ['型錄要先弄清楚範圍：KP 要什麼、幾頁、給誰看。把決議寫下來。', '聽說 Kai 這次丟單，是因為型錄上有一個舊數字。'],
  c2b: ['啟動會議要留會議紀錄。決議寫下來，下次大家才不會各說各話。', 'Lena 最近又有新的方向，Zoe 已經改了三版。'],
  c2c: ['規格要找 Ethan 確認最新版，不要拿舊資料。', 'Ethan 這週在改一個 ECN，有些規格可能剛剛變了。'],
  c2d: ['第二次會議，有人會想加頁。拿出上次的紀錄，要加頁就要決定拿掉什麼。', 'Hank 說他有兩個客戶想要零售版的型錄。'],
  c2e: ['要渲染圖，先給 Ian 一頁 brief。最好約 Lena 和 Ian 三個人一起對。', 'Ian 手上同時有三個部門的案子，排程很滿。'],
  c2f: ['付印前，每個數字都再跟 Ethan 的最新規格對一次。', '印刷廠說，晚一天送件，就要多等三天。'],
  c2g: ['型錄交出去了。收尾時，把這次哪裡卡住寫下來，下次就能更快。', 'Kai 說有幾個客戶已經在問新型錄了。'],
  c3a: ['EVT 是找問題，不是證明沒問題。問題列清單、分輕重，PVT 前必修的先修。包材先跟 Leo 談，再去工廠做落摔。', '聽說副總很看重 QX-7。競爭對手也快推出類似的無風扇機種，市場預期今年這個品類會成長一成以上。'],
  c3b: ['PVT 的老化測試是把早夭的機器先挑出來，不要急著縮短。', '產線的 Ray 說，這批試產的產線比預期順。'],
  c3d: ['上市了卻沒訂單，先別急著砸錢。去問 Kai 和 Hank，客戶到底卡在哪。', '聽說 Hank 的零售客戶，最近在找沒有風扇的機器。'],
  c3e: ['同一台機器可以換個產業賣。跨產業的商機，記得算成本與毛利。', '聽說智慧交通那邊最近有標案，要找耐震、耐熱的工控機。'],
  c3f: ['Nora 只看數字和下一步。先講累計的事實，再講計畫，不要只報好消息。', '聽說 Nora 副總這季的目標，被董事會盯得很緊。'],
  c4a: ['業務轉述的需求不一定完整。有疑問就直接跟客戶 Cora 確認，不要靠轉述。', '聽說 Cora 他們公司今年要擴產，預算比去年多。'],
  c4b: ['問供應商要問清楚客製的成本、NRE 和交期。Owen 會先喊高價，別直接接受。', 'Owen 說他們機殼廠這個月開模排程有空，可以壓一點價。'],
  c4c: ['報價要用目標毛利率反推：售價 = 成本 ÷（1 − 毛利率）。先定底線再報。', '聽說 Mia 說，這季毛利率太低的案子，要多簽一關。'],
  c4d: ['Cora 會殺價。別直接降價，拿數量或付款條件換折扣，毛利率要守住底線。', 'Cora 的採購說，她們也在比別家的報價。'],
  c4e: ['向 KP 報告時，先講毛利率和風險。毛利太低，不要等被問才講。', 'KP 今天心情看起來還可以。']};
const PMX_IAN = '我要的是一頁 Brief：要什麼、給誰看、幾張、什麼時候要。三句話就夠，不要丟一堆檔案給我。';
const PMX_VIS = ['mia', 'ian', 'jay', 'zoe', 'sam', 'ella', 'hank', 'lena'];
const PMX_NOTIP = {zoe: 1, lena: 1};   /* 行銷通常不會給有用的建議，只會聊八卦 */   /* 輪流來喝咖啡的人 */
const PMX_STORY = {ian: 1, hank: 1, zoe: 1, lena: 1};   /* 這幾個人是故事裡的人：只在他們不在場景裡的時候才會來喝咖啡 */
const pmxKV = {id: null, st: '', until: 0, n: 0, back: false};   /* 現在在咖啡機旁的訪客 */
const pmxPantryOpen = () => pmxKV.id && pmxKV.st === 'drink' && W && W.snap().vis[pmxKV.id];

function pmxPantry() {
  return pmxVisit('pantry', () => {
    busy = true; showGuide();
    const v = pmxPantryOpen() ? pmxKV.id : null, nm = v ? STORY.cast[v].name : '';
    const ch = [['倒一杯免費咖啡', () => pmxCoffee()], ['拿一片餅乾', () => pmxCookie()]];
    if (v) ch.push(['和 ' + nm + ' 聊聊（八卦指數 ' + (ST.d.gos || 0) + '）', () => pmxChat(v)]);
    ch.push(['走開', pmxFree]);
    say([['sys', '茶水間的咖啡機旁貼著「免費」。吧台上有一盤手工餅乾。' + (v ? nm + ' 端著杯子站在旁邊，看起來不太趕時間。' : '現在沒有人停下來聊天。')]], null, {choice: ch});
  });
}
function pmxCoffee() {
  if (ST.d.cof === ST.seg) {say([['sys', '你剛喝過一杯了。再喝下去，今晚會睡不著。']], pmxFree); return}
  ST.d.cof = ST.seg; pmBump('energy', 8); toast('免費咖啡', '精力回復了一點');
  say([['sys', '咖啡機轟轟響了一陣，一杯熱咖啡掉進杯子裡。香味出來的時候，肩膀鬆了一點。']], pmxFree);
}
function pmxCookie() {
  if (ST.d.cok === ST.seg) {say([['sys', '盤子裡的餅乾，已經被你拿過一片了。']], pmxFree); return}
  ST.d.cok = ST.seg; pmBump('energy', 4); toast('餅乾', '精力回復了一點');
  say([['sys', '餅乾還有一點溫度，不知道是誰烤的。你咬了一口，好吃。']], pmxFree);
}
function pmxChat(who) {
  const n = ST.d.gos || 0, nn = n + 1;
  /* 指數到 2 以上：有用的提示。聊太多（單數、五以上）會被覺得太八卦 */
  const kind = nn >= 2 && nn % 2 === 0 && !PMX_NOTIP[who] ? 'tip' : nn >= 5 && nn % 2 === 1 ? 'sour' : 'gossip';
  ST.d.gos = nn;
  let L;
  if (kind === 'tip') {
    const T = PMX_TIPS[ST.d.chapter] || PMX_TIPS[1], ti = ST.d.ti || 0, SG = PMX_SEG[ST.seg]; ST.d.ti = ti + 1;
    L = who === 'ian' ? [['ian', '你是 PM 吧？欸，我順便跟你說一件事。'], ['ian', PMX_IAN]]
      : [[who, '欸，我跟你說一件有用的。'], [who, SG ? SG[0] : T[ti % T.length]]];
    L.push(['sys', '你把這句話記了下來。和同事交流，總是會有一些收穫。']);
  } else if (kind === 'sour') {
    L = [[who, '（笑了一下）你怎麼什麼都想問？'], ['sys', '你發現旁邊的人換了話題，聲音也壓低了。你好像打聽太多了。']];
  } else {
    const ok = PMX_GOSSIP.filter(g => g.x.indexOf(who) < 0), gi = ST.d.gi || 0, SG = PMX_SEG[ST.seg]; ST.d.gi = gi + 1;
    L = [[who, '你也來倒咖啡？我跟你說一件事，不要說是我說的。'], [who, SG && gi % 2 === 0 ? SG[1] : ok[gi % ok.length].t]];
  }
  say(L, () => {
    if (kind === 'sour') pm({trust: -3}, '同事覺得你太八卦。');
    else if (kind === 'tip') pm({trust: 1, cust: 2}, '和同事交流的收穫');
    toast('八卦指數 ' + nn, kind === 'tip' ? '這次聽到有用的資訊' : kind === 'sour' ? '打聽太多，信任降低' : '又聽到一件事');
    if (ST.d.chapter === 5) {pm5Add('cl', 10); pm5Check(pmxFree)} else pmxFree();
  }, {end: '離開'});
}

/* 訪客的來去：從走廊走進茶水間，停下來喝一陣子咖啡，再走回去 */
function pmxVisitors(now) {
  if (!W || !ST.on) return;
  const k = pmxKV;
  if (!k.id) {
    if (now < k.until) return;
    let id = null;
    for (let i = 0; i < PMX_VIS.length && !id; i++) {
      const c = PMX_VIS[(k.n + i) % PMX_VIS.length];
      if (!W.has(c)) continue;
      if (PMX_STORY[c] && W.snap().vis[c]) continue;   /* 故事裡正在場的人不來 */
      id = c;
    }
    k.n++;
    if (!id) {k.until = now + 4000; return}
    k.id = id; k.st = 'in'; k.seg = ST.seg; k.back = !!(PMX_STORY[id]);
    W.put(id, ['fc', 'a2c', 'a1r'][k.n % 3]); W.show(id, true); W.speed(id, .7); W.walk(id, 'pt1');
    return;
  }
  if (k.seg !== ST.seg && PMX_STORY[k.id]) {k.id = null; k.until = now + 8000; return}   /* 換了場景：故事的人交給場景 */
  if (W.moving(k.id)) return;
  if (k.st === 'in') {k.st = 'drink'; k.until = now + 15000 + Math.random() * 6000; return}
  if (k.st === 'drink') {
    if (busy || now < k.until) return;   /* 跟他講話的時候不走 */
    k.st = 'out'; W.walk(k.id, 'fc'); return;
  }
  if (k.st === 'out') {
    W.show(k.id, false);
    k.id = null; k.until = now + 9000 + Math.random() * 9000;
  }
}

/* ───────── Maggie 的座位（她離職之後） ───────── */
function pmxMdesk() {
  if (!ST.d.mgone) return false;
  return pmxVisit('mdesk', () => {
    busy = true; showGuide();
    const hard = ST.d.mwhy === 'hard';
    say([['sys', hard
      ? 'Maggie 的座位空著。桌上只剩一個空的餅乾鐵盒，和一張沒撕下來的便利貼，上面寫著：「新人手冊 → 給他」。'
      : 'Maggie 的座位空著。桌上留了一個餅乾鐵盒，裡面還有幾片，旁邊貼著一張便利貼：「加油，你可以的。」'],
      ['sys', hard ? '你站了很久。你想起每一次她遞過來的餅乾，和那些你沒有好好聽進去的話。' : '你站了一會兒。座位很安靜，你突然很想再聽她說一次「慢慢來」。']],
    () => {if (ST.d.mdk !== ST.seg) {ST.d.mdk = ST.seg; pmBump('energy', hard ? -4 : -2); toast(hard ? '內疚' : '惆悵', '精力 ↓')} pmxFree()}, {end: '離開'});
  });
}

/* 把這三個地方接進走動的介面：靠近就出現按鈕、點了才走過去 */
const pmxTalk0 = STORY.talk;
const PMX_KIT = {mia: 1, jay: 1, ella: 1, sam: 1};
const PMX_MOVER = {ben: 1, joe: 1, sue: 1, max: 1, dan: 1};
const PMX_AMB = {
  ben: ['（抱著一箱零件）借過借過，這箱要趕在下午送進線上！'], joe: ['（抱著箱子，沒有停）等一下，這箱成品要送去倉庫。'],
  sue: ['（腳步很快）物料單上少了一箱，我去倉庫翻翻看。'], max: ['（插車停了一下）小心！這棧板很重，走旁邊。'], dan: ['（按了兩聲喇叭）讓一下，這台剎車沒有那麼快。'],
  ray: ['這禮拜的出貨量比上禮拜多了一成，大家都在拚。你也是來催貨的嗎？', '剛剛 Kim 說的那個笑話，我笑了十分鐘。'],
  kim: ['我們這條線今天很順，希望下午也一樣。', '領班請我們喝飲料了，你要不要也來一杯？']};
const PM5_PLACE = ['wc', 'shop_bento', 'shop_dumpling', 'shop_buffet', 'shop_mart'];
STORY.talk = id => {
  if (id === 'wc') {if (ST.d.chapter === 5) return pm5Wc(); return pmxVisit('wc', () => {busy = true; showGuide(); say([['sys', '你洗了手，回座位。']], pmxFree, {end: '好'})})}
  if (PM5_SHOP[id]) return pm5Shop(id);
  if (PM5_OWN[id]) return pm5Shop(PM5_OWN[id]);
  if (ST.d.chapter === 5 && id === 'warehouse' && !busy) return pm5Wh();
  if (ST.d.chapter === 5 && pm5Talk(id)) return true;
  if (id === 'pantry' || PMX_KIT[id] || (id === pmxKV.id && pmxPantryOpen())) return pmxPantry();
  if (PMX_AMB[id] && !busy && ST.on) {
    busy = true; showGuide(); const L = PMX_AMB[id]; ST.amt = (ST.amt || 0) + 1;
    say([[id, L[ST.amt % L.length]]], () => {busy = false; showGuide()}, {end: '離開'}); return true;
  }
  if (id === 'mdesk' && ST.d.mgone) return pmxMdesk();
  const r = pmxTalk0(id);
  if (r && id === 'maggie' && !ST.d.mgone) ST.d.mint = (ST.d.mint || 0) + 1;   /* 又去找她：她又被打斷了一次 */
  return r;
};
const pmxNear0 = MOVE.near;
MOVE.near = () => {
  const r = pmxNear0();
  if (r && (PMX_MOVER[r[0]] || r[0] === 'ray' || r[0] === 'kim')) return null;   /* 路過搬貨、聊天的人不跳按鈕 */
  if (r || !W || !ST.on) return r;
  const s = W.snap(), at = id => Math.hypot(STORY.places[id].at[0] - s.me[0], STORY.places[id].at[1] - s.me[1]);
  for (const p of PM5_PLACE) if (at(p) < 2.2) return [p, STORY.places[p].name];
  if (at('pantry') < 2.4) return ['pantry', pmxPantryOpen() ? '茶水間：咖啡・聊天' : '茶水間：咖啡・餅乾'];
  if (ST.d.mgone && at('mdesk') < 2.0) {
    if (ST.d.mtoast !== ST.seg) {ST.d.mtoast = ST.seg; toast('Maggie 的座位', ST.d.mwhy === 'hard' ? '空的。你的腳步慢了下來。' : '空的。桌上還留著一個餅乾盒。')}
    return ['mdesk', 'Maggie 的座位'];
  }
  return null;
};

/* ───────── Maggie 離職的時候，她的事件全部跳過 ───────── */
STORY.beats.forEach(b => {if (b.to === 'maggie') {const w = b.when; b.when = () => !ST.d.mgone && (!w || w())}});

/* ───────── 被資遣、Maggie 離職：包住每一章的結尾 ───────── */
/* 資遣：要很嚴重才會發生。至少三次很差的選擇，而且團隊信任掉到 22 以下。第一章（線材風波）不會 */
const pmxFired = () => !!ST.d.fired || !!ST.d.sfire || (ST.d.chapter !== 1 && (ST.d.neg || 0) >= 3 && pmStat('trust') <= 22);
/* Maggie 的壓力：一直被打擾（每次你去找她、每次有人插進來）加上你搞砸的事。壓力太大，她會撐不住 */
const pmxStress = () => (ST.d.mint || 0) + 2 * (ST.d.neg || 0);
const pmxHard = () => pmxStress() >= 12;
const pmxLeave = () => !pmxFired() && !ST.d.mgone && (pmxHard() || (ST.d.nch || 0) >= 2);
/* 去找 Maggie 的時候，常常有人插進來。每找一次，她的壓力就多一點 */
const PMX_INT = [
  ['Maggie 的分機響了，她說了聲「等我一下」，講完電話才轉過來。', '有人從隔板探頭問 Maggie 一個問題，她回答完，才轉向你。', 'Maggie 的螢幕右下角跳出三個通知，她按掉，才轉過來。'],
  ['Maggie 剛掛上電話，又有人拿著文件站在她桌邊。她抬手示意你等一下。', 'Maggie 一邊回訊息，一邊聽你說話，講到一半又被叫去接電話。'],
  ['Maggie 的桌上堆著三份待簽的文件，電話又響了。她揉了揉太陽穴，才轉向你。', 'Maggie 的杯子是空的，午餐的便當還沒打開。這是她今天第四次被打斷，語氣卻還是很溫和。']];
STORY.beats.forEach(b => {
  if (b.to === 'maggie' && b.lines) {
    if (/^c\d/.test(b.seg)) {   /* 其他章的 Maggie：如果之前得罪過她，她一樣不太想理你 */
      const g = b.lines, p = b.post; b.lines = () => ST.d.cold ? pmM() : g();
      if (p) b.post = () => ST.d.cold ? [] : p();
    }
    const f = b.lines;
    b.lines = () => {
      const L = f(), n = ST.d.mint = (ST.d.mint || 0) + 1, P = PMX_INT[n >= 8 ? 2 : n >= 4 ? 1 : 0];
      if (n >= 2 && n % 2 === 0) {L.unshift(['sys', P[n % P.length]]); toast('Maggie 又被打斷了', n >= 8 ? '她看起來很累' : '她的手邊事情越堆越多')}
      return L;
    };
  }
});
STORY.beats.filter(b => b.end).forEach(b => {const w = b.when; b.when = () => !pmxFired() && !pmxLeave() && (!w || w())});

/* 故事越解越多，團隊越來越信任你：每走完一個時刻（換到下一個場景），團隊信任 +2（第一個場景不算） */
Object.keys(STORY.segs).forEach(k => {
  const G = STORY.segs[k];
  if (k === 'menu' || !G.scene) return;
  const f = G.scene;
  G.scene = function () {
    const L = ST.d.sgs = ST.d.sgs || [];
    if (L.indexOf(k) < 0) {L.push(k); if (L.length > 1) pmBump('trust', 2)}
    return f.apply(this, arguments);
  };
});

STORY.segs.hr = {name: '人資面談', sub: '大會議室 A。KP 旁邊，坐著人資 Tina。', get t() {return ST.clock + 40}, mood: 'day', scene() {pmCast({kp: 'mt2', tina: 'mt1'})}};
STORY.segs.mgb = {name: 'Maggie 的最後一天', sub: '下班前。', get t() {return ST.clock + 40}, mood: 'eve', scene() {pmCast({})}};

STORY.beats.push.apply(STORY.beats, [
  {seg: 'hr', to: 'meeting', guide: 'KP 請你去大會議室 A 一趟', when: pmxFired,
    ring: ['KP（主管）', '「請你來大會議室 A 一趟。」', '過去看看'],
    lines: () => [['sys', '你走進大會議室 A。KP 坐在長桌一邊，旁邊是人資 Tina，桌上放著一個資料夾。'],
      ['kp', '請坐。今天找你來，是要正式跟你說一件事。'],
      ['kp', '這段時間發生了幾件事：' + pmxReasons().slice(-3).join('；') + '。'],
      ['kp', '這些事，我們談過很多次，同樣的狀況還是一再發生。團隊對你的信任，已經沒有辦法再補回來了。'],
      ['kp', '公司決定，終止你的勞動契約。這不是我一個人的決定，我也是最後才同意的。'],
      ['tina', '我是 Tina。依規定，會給你預告期和資遣費，細節我整理成書面了，會一項一項跟你說明，你可以慢慢看。']],
    mini(done) {
      say([['sys', '你的手心在冒汗。你需要說些什麼。']], null, {choice: [
        ['我明白了。可以請你告訴我，哪些地方是我可以學的嗎？', () => {ST.d.fireResp = 'learn'; ST.d.fired = true; done()}],
        ['可以再給我一次機會嗎？我真的會改。', () => {ST.d.fireResp = 'beg'; ST.d.fired = true; done()}],
        ['這不公平！我明明已經很努力了！', () => {ST.d.fireResp = 'angry'; ST.d.fired = true; done()}]]});
    },
    post: () => ST.d.fireResp === 'learn'
      ? [['kp', '（沉默了一下）你問這個問題，比我預期的還成熟。三件事：先問清楚再動手，做完要驗證，出事先講。'],
        ['kp', '不是你沒有能力。是你一直在趕，沒有給自己停下來確認的空間。']]
      : ST.d.fireResp === 'beg'
        ? [['kp', '我們給過機會，不只一次。（輕輕搖頭）我很抱歉。'], ['tina', '我理解。這件事不會因為任何人的情緒改變，但我會陪你把手續辦完。']]
        : [['kp', '我知道你很努力，我看見了。但努力，不等於結果。'], ['tina', '我知道這很難受。請先喝口水，我們慢慢來。']]},
  {seg: 'hr', to: 'maggie', guide: '去跟 Maggie 道別', when: () => pmxFired() && !ST.d.mgone,
    lines: () => [['sys', '你收拾好抽屜。Maggie 的椅子慢慢滑過來。'],
      ['maggie', '我聽說了。（停了一下）我來送你。'],
      ['maggie', ST.d.fireResp === 'angry' ? '你剛剛很生氣，我懂。但我希望你之後想起這段日子，不是只有生氣。' : '你剛剛有好好聽完，這很不容易。'],
      ['maggie', '被罵不代表你做錯，被資遣也不代表你這個人不行。下一份工作，你會帶著這次的教訓走得比別人更穩。'],
      ['sys', 'Maggie 把餅乾鐵盒裡剩下的，用紙巾包好，輕輕放進你的紙箱。'],
      ['maggie', '路上慢慢吃。']]},
  {seg: 'hr', end: true, when: pmxFired,
    lines: () => [['sys', '你把識別證放在桌上，抱著小紙箱走出大門。回頭看了一眼，辦公室的燈還亮著。']]},

  {seg: 'mgb', to: 'maggie', guide: 'Maggie 想在下班前跟你說話', when: () => pmxLeave(),
    ring: ['Maggie', '「下班前，有空嗎？我有話想跟你說。」', '過去看看'],
    lines: () => {
      const hard = pmxHard(); ST.d.mwhy = hard ? 'hard' : 'plan';
      return hard
        ? [['sys', '下班前，Maggie 把椅子轉過來。她的眼睛底下有很明顯的黑眼圈，桌上的便當還沒打開。'],
          ['maggie', '有件事，我想親口跟你說。我下個月要調去別的單位了。'],
          ['maggie', '這陣子，我的電話、訊息、一個接一個插進來的問題，從早到晚沒有停過。我自己的案子，好幾次是下班之後才開始做。'],
          ['maggie', '帶你，我是願意的。只是每次剛要專心，就被打斷，再把腦袋裡的東西一點一點拼回去。我撐不住了。這不是誰的錯。']]
        : [['sys', '下班前，Maggie 把椅子轉過來，手裡拿著餅乾鐵盒。'],
          ['maggie', '我要跟你說一件好事，也是一件有點捨不得的事。我拿到另一家公司的產品總監職缺，下個月到職。'],
          ['maggie', '這幾次案子，我看著你跌倒、站起來。你已經不是剛來的那個新人了。']];
    },
    mini(done) {
      say([['sys', ST.d.mwhy === 'hard' ? '你想起這陣子，每一次去找她，旁邊總有人在等。你不知道該說什麼。' : '你的喉嚨有點緊。']], null, {choice: ST.d.mwhy === 'hard'
        ? [['對不起，我也是其中一個打斷你的人。', () => {ST.d.mresp = 'sorry'; done()}], ['我會記得你教過我的東西。', () => {ST.d.mresp = 'thanks'; done()}], ['請你再考慮一下。', () => {ST.d.mresp = 'stay'; done()}]]
        : [['恭喜你！我會想念你的。', () => {ST.d.mresp = 'thanks'; done()}], ['你走了，我怎麼辦？', () => {ST.d.mresp = 'stay'; done()}], ['謝謝你，真的。', () => {ST.d.mresp = 'sorry'; done()}]]});
    },
    post: () => ST.d.mwhy === 'hard'
      ? (ST.d.mresp === 'sorry' ? [['maggie', '不用道歉。你問我問題，我是開心的。只是我同時要回答太多人。']]
        : ST.d.mresp === 'thanks' ? [['maggie', '（眼眶有點紅）嗯。好好照顧自己。']] : [['maggie', '我考慮過了。謝謝你還願意這樣說。']])
      : (ST.d.mresp === 'thanks' ? [['maggie', '我也會想念這個位子。']] : ST.d.mresp === 'stay' ? [['maggie', '你比你自己以為的強，記得這一點。']] : [['maggie', '不用謝。把餅乾鐵盒留給你。']]),
    after() {ST.d.mgone = true; pmBump('energy', ST.d.mwhy === 'hard' ? -8 : -4)}},
  {seg: 'mgb', end: true, when: () => !!ST.d.mgone && !pmxFired(),
    lines: () => ST.d.mwhy === 'hard'
      ? [['sys', '隔天，Maggie 的座位空了。桌上只剩一個空的餅乾鐵盒，和一張沒撕下來的便利貼。你經過的時候，腳步慢了下來。'], ['sys', '你想起那些你沒有好好聽進去的話。']]
      : [['sys', '隔天，Maggie 的座位空了。桌上留了一個餅乾鐵盒，和一張便利貼：「加油，你可以的。」你經過的時候，笑了一下，又有點鼻酸。']]}
]);

/* ───────── 結算：資遣的結算卡，以及「接著玩別的故事」 ───────── */
/* 為什麼被資遣：把「這次做不好的事」整理成一串 */
const pmxReasons = () => {
  const r = (ST.d.bad || []).filter((x, i, A) => A.indexOf(x) === i);
  return r.length ? r : ['在重要的時刻，多次做了讓團隊失去信任的選擇'];
};
function pmxFiredEnding() {
  const d = ST.d, weeks = Math.max(1, Math.ceil((d.day || 0) / 7)), cookies = d.cookies || 0, R = pmxReasons();
  return {
    title: '資遣通知', led: '被資遣', sub: '人資 Tina 把文件推到你面前。',
    more: R.slice(-3),
    tl: [['Day 1', '接手'], ['Day ' + Math.max(1, weeks * 7), '資遣面談']],
    stats: [['團隊信任', pmShow('trust')], ['在公司（週）', String(weeks)], ['餅乾', String(cookies)]],
    lines: ['這次被資遣的原因：'].concat(R.map(x => '・' + x)).concat([
      d.fireResp === 'learn' ? '面談的時候，你問了 KP 哪些地方可以學。這是你當天做得最好的一件事。' : d.fireResp === 'beg' ? '你請求再給一次機會。KP 說，機會不是沒給過。' : '你當場說「這不公平」，Tina 靜靜等你說完。',
      'Maggie 說過：被罵不代表你做錯，被資遣也不代表你這個人不行。下一份工作，你會帶著這次的教訓。',
      '這是一個遊戲。做錯的決定，是為了讓你看見後果；真正的職場，不會只因為幾個選擇就決定一個人。']),
    share: '《PM 的一天》：因為「' + R[R.length - 1] + '」等事情沒做好，我被資遣了。'
  };
}
const pmxEnding0 = STORY.ending;
STORY.ending = () => {
  const d = ST.d, E = d.fired && d.chapter !== 5 ? pmxFiredEnding() : pmxEnding0();
  d.nch = (d.nch || 0) + 1;
  if (!d.fired && d.mgone && d.mwhy && d.nch >= 1 && !d.mshown) {
    d.mshown = true;
    E.lines = (E.lines || []).concat([d.mwhy === 'hard' ? 'Maggie 在這之後調走了。她的座位空了，你經過的時候，會慢下腳步。' : 'Maggie 去了新的地方。她的座位空了，餅乾鐵盒還留著。']);
  }
  if (!d.fired) E.next = PMCH.filter(c => c.id !== d.chapter).map(c => ['接著玩：' + c.s, () => pmxPlay(c.id)]);   /* 被資遣了就不能接著玩別的故事，只能再玩一次 */
  return E;
};
/* 直接開始另一個故事（保留：Maggie 是否離職、這次連續玩了幾章、八卦指數） */
function pmxPlay(id) {
  const o = ST.d, keep = {chapter: id, nch: o.fired ? 0 : o.nch || 0, gos: o.gos || 0, gi: o.gi || 0, ti: o.ti || 0, mint: o.mint || 0, cold: o.cold || 0, coldN: o.coldN || 0};   /* 上一章得罪了 Maggie，下一章她還記得 */
  if (o.mgone && !o.fired) {keep.mgone = true; keep.mwhy = o.mwhy; keep.mshown = true}
  Object.assign(ST, {d: keep, talks: 0}); boot0(ST.name);
  ST.q = nextIndex(0);
  const seg = STORY.beats[ST.q].seg; ST.clock = STORY.segs[seg].t || 0; save();
  enterSeg(seg, () => keep.mgone
    ? say([['sys', keep.mwhy === 'hard' ? '你走進辦公室。Maggie 的座位是空的。你不太敢看它。' : '你走進辦公室。Maggie 的座位是空的，桌上的餅乾鐵盒還在。']], beginBeat)
    : keep.cold ? say([['sys', '你走進辦公室。Maggie 看了你一眼，又把視線轉回螢幕。上次你說的話，她還記得。']], beginBeat)
    : beginBeat());
}

/* ───────── 工廠與倉庫的人流：所有章節都有 ─────────
   搬運的人抱著箱子在工廠和倉庫之間來回（成品往倉庫、物料往工廠），兩位司機開電動插車載整棧板，
   門口另外有兩個人站著聊天。每一步 = [走到哪, 出發時有沒有抱著貨, 到了之後做什麼] */
const PMX_PLAN = {
  joe: [['fac1', 1], ['wh1', 1], ['whs', 0], ['whf', 0]],
  sue: [['wh1', 1], ['whf', 1], ['fac1', 0], ['whf', 0]],
  ben: [['whk', 1], ['wh1', 1], ['whf', 0], ['wh1', 0]],
  max: [['fac1', 1], ['whf', 1], ['wh1', 1], ['whk', 0], ['wh1', 0], ['whf', 0]],
  dan: [['wh1', 1], ['whf', 1], ['fac1', 1], ['whf', 0], ['wh1', 0]]};
const pmxAmb = {};
function pmxCrew(now) {
  if (!W) return;
  Object.keys(PMX_PLAN).forEach(id => {
    if (!W.has(id)) return;
    const a = pmxAmb[id] || (pmxAmb[id] = {i: id === 'sue' || id === 'dan' ? 2 : 0, wait: 0});
    if (W.moving(id) || now < a.wait) return;
    const P = PMX_PLAN[id], st = P[a.i++ % P.length];
    W.carry(id, !!st[1]); W.walk(id, st[0]);
    a.wait = now + 500 + Math.random() * (st[1] ? 600 : 2200);
  });
}
setInterval(() => {
  if (!W) return;
  const now = Date.now();
  try {pmxCrew(now); pmxVisitors(now); pm5Patrol(now)} catch (e) {}
}, 400);
