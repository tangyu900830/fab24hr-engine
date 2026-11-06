/* ───────── 蒐集與隨機：今日突發事件、辦公室八卦（跨章的支線）、成就與結局 ───────── */
/* 存檔（瀏覽器的 localStorage，讀不到就只存在這一次） */
let pmzM = null;
function pmzMeta() {
  if (pmzM) return pmzM;
  let o = null; try {o = JSON.parse(localStorage.getItem('pmday-meta') || 'null')} catch (e) {}
  pmzM = Object.assign({ach: {}, ends: {}, chDone: {}, inc: {}, arc: {}}, o || {});
  pmzM.arc.kl = pmzM.arc.kl || {s: 0}; pmzM.arc.bv = pmzM.arc.bv || {s: 0};
  return pmzM;
}
function pmzSave() {try {localStorage.setItem('pmday-meta', JSON.stringify(pmzM))} catch (e) {}}

/* ── 成就 ── */
const PMZ_ACH = [
  ['first', '第一天上班', '完成任何一個故事'], ['all5', '全勤', '五個故事都玩完（沒被資遣）'], ['chain3', '一口氣', '一次連續玩三個故事'],
  ['fired', '被請出門', '被資遣或開除一次'], ['maggie', '她調走了', 'Maggie 因為你離開了'], ['inc5', '見多識廣', '遇過五種不同的突發事件'],
  ['thief', '薪水大盜', '第五章摸魚超過 150 分鐘，沒被開除'], ['angel', '認真的好員工', '第五章摸魚不到 30 分鐘'], ['sly', '摸魚高手', '第五章摸魚超過 50 分鐘，卻一次都沒被罵'],
  ['honest', '老實人', '第五章被問起進度時，老實說「還沒做」'], ['subfull', '餐補剛剛好', '第五章午餐剛好用掉 130 元餐補，沒多付、沒浪費'], ['conv', '超商達人', '第五章午餐在超商解決'],
  ['props4', '全副武裝', '第五章買齊四種摸魚道具'], ['keep', '守口如瓶', 'Ken 和 Lily 的祕密，你一個字都沒說'], ['big', '大嘴巴', '把 Ken 和 Lily 的祕密說給別人聽'],
  ['peace', '和事佬', '在 Bo 和 Vera 吵架時，進去勸'], ['gossip', '辦公室通', '兩條八卦的後續你都看完了'], ['ends10', '結局收藏家', '看過 10 種不同的結局']];
function pmzUnlock(id) {
  const m = pmzMeta(); if (m.ach[id]) return false;
  m.ach[id] = 1; pmzSave();
  const a = PMZ_ACH.find(x => x[0] === id); if (a) {toast('🏆 成就解鎖：' + a[1], a[2]); (ST.d.newAch = ST.d.newAch || []).push(a[1])}
  return true;
}
/* ── 結局收藏（標題 → 第幾章） ── */
const PMZ_ENDS = [
  [1, '線材又錯了一次'], [1, '繞了一大圈，還是把線換對了'], [1, '差點又錯一次，幸好有人把關'], [1, '這次運氣好，下次要測'], [1, '先搞清楚，再動手'], [1, '把事情做對'],
  [2, '漂亮的型錄，裡面有一個舊數字'], [2, '把「誰決定什麼」寫下來'], [2, '規格是對的，頁數爆了'], [2, '做完了，也累壞了'],
  [3, 'QX-7 淨賺'], [3, 'QX-7 還沒回本'],
  [4, '價格守住了，客戶也簽了'], [4, '成交，利潤站得住'], [4, '成交了，但毛利太低'], [4, '成交了，卻是虧的'], [4, '報價太高，客戶走了'],
  [5, '認真的好員工'], [5, '偶爾放空'], [5, '資深摸魚人'], [5, '薪水小偷'], [5, '摸魚摸得太兇，被請回家'],
  [1, '資遣通知'], [2, '資遣通知'], [3, '資遣通知'], [4, '資遣通知']];
const pmzEndKey = (ch, t) => ch + ':' + (t.indexOf('QX-7 淨賺') === 0 ? 'QX-7 淨賺' : t);
function pmzRecord(E) {
  const d = ST.d, m = pmzMeta(), ch = d.chapter, fired = !!d.fired;
  if (d.recorded) return; d.recorded = true;
  m.ends[pmzEndKey(ch, E.title || '')] = 1;
  if (!fired) m.chDone[ch] = 1;
  pmzUnlock('first');
  if (fired) pmzUnlock('fired');
  if (!fired && [1, 2, 3, 4, 5].every(c => m.chDone[c])) pmzUnlock('all5');
  if ((d.nch || 0) >= 3) pmzUnlock('chain3');
  if (d.mgone) pmzUnlock('maggie');
  if (ch === 5) {
    const sl = d.sl || 0, eat = d.eat, P = d.props || {};
    if (!fired && sl >= 150) pmzUnlock('thief');
    if (!fired && sl < 30) pmzUnlock('angel');
    if (!fired && sl >= 50 && !(d.sc || 0)) pmzUnlock('sly');
    if (d.pend) pmzUnlock('honest');
    if (eat && eat.used === 130 && !eat.self && !eat.waste) pmzUnlock('subfull');
    if (eat && eat.shop === PM5_SHOP.shop_mart.n) pmzUnlock('conv');
    if (P.ear && P.folder && P.sign && P.coffee) pmzUnlock('props4');
  }
  if (Object.keys(m.ends).length >= 10) pmzUnlock('ends10');
  pmzSave();
}
STORY.ending = (function (prev) {
  return function () {
    const E = prev(), d = ST.d; pmzRecord(E);
    if (d.newAch && d.newAch.length) {E.lines = (E.lines || []).concat(['🏆 這次解鎖的成就：' + d.newAch.join('、')]); E.more = (E.more || []).concat(['🏆 ' + d.newAch.join('、')])}
    return E;
  };
})(STORY.ending);
/* 選單上的「成就與結局」 */
function pmzSum() {const m = pmzMeta(); return Object.keys(m.ach).length + '/' + PMZ_ACH.length + ' 成就　' + PMZ_ENDS.filter(e => m.ends[pmzEndKey(e[0], e[1])]).length + '/' + PMZ_ENDS.length + ' 結局'}
function pmzShow(back) {
  const m = pmzMeta(), ch = {1: '第一章', 2: '第三章', 3: '第二章', 4: '第四章', 5: '第五章'};
  const A = PMZ_ACH.map(a => m.ach[a[0]] ? '<p>🏆 <b>' + a[1] + '</b>　' + a[2] + '</p>' : '<p style="opacity:.55">🔒 ？？？　' + a[2] + '</p>').join('');
  const E = PMZ_ENDS.map(e => m.ends[pmzEndKey(e[0], e[1])] ? '<p>📖 ' + ch[e[0]] + '・' + e[1] + '</p>' : '<p style="opacity:.55">📖 ' + ch[e[0]] + '・？？？</p>').join('');
  setPanel('<p><b>' + pmzSum() + '</b></p><p><b>成就</b></p>' + A + '<p><b>結局</b></p>' + E + nextBtn('返回'), '成就與結局');
  $('#next').onclick = () => {hidePanel(); back()};
}

/* ── 今日突發事件：每一章會抽一件。選項影響的數字，第一～四章用 pm()，第五章用摸魚分鐘或護身符 ── */
const PMZ_INC = [
  {id: 'erp', lines: [['sys', '上午第一件事：系統登不進去。整層樓都在抱怨。'], ['tina', '（遠遠喊）IT 在處理！大家先不要一直重新整理！']], ch: [
    ['耐心等，順便整理桌面', {energy: 2}, '十五分鐘後系統好了。你的桌面乾淨了，信箱還是爆的。'],
    ['趁機問 Tina 怎麼自己查權限', {trust: 2, energy: -1}, 'Tina 很驚訝有人想學。她畫了一張流程圖給你。'],
    ['直接去問 KP 怎麼辦', {trust: -2}, 'KP 看了你一眼：「你覺得我會修系統嗎？」']]},
  {id: 'printer', lines: [['sys', '影印機又卡紙了。它旁邊站著三個人，沒有一個人要動手。'], ['jay', '（小聲）上次我修，現在大家都覺得我會修。']], ch: [
    ['捲起袖子打開，把紙拉出來', {trust: 2, energy: -2}, '紙是出來了，你手上都是碳粉。三個人同時說「謝謝」，然後各自印了十張。'],
    ['貼一張「故障」，走開', {trust: -1}, '十分鐘後，那張紙上多了三個人的簽名：「同意。」'],
    ['打電話給總務', {energy: 1}, '總務說下午派人來。下午，它還是卡著。']]},
  {id: 'coffee', lines: [['sys', '茶水間的咖啡豆見底了。'], ['mia', '誰是最後一個倒咖啡的人？我不說名字。']], ch: [
    ['下樓買豆子，順便放風', {trust: 2, energy: 3}, '你提著兩包豆子回來。全辦公室對你的好感，上升了一格。'],
    ['假裝沒看到', {energy: -1}, '十點半，整層樓的人都在你身後嘆氣。'],
    ['說「我來訂」，然後忘記', {trust: -1}, '三天後，咖啡豆還沒來。大家記得是誰說的。']]},
  {id: 'call', lines: [['sys', '桌上電話響了。一個你不認識的客戶，劈頭就問：「你們的產品，可以防水嗎？」'], ['sys', '這不是你這條產品線的。']], ch: [
    ['耐心回答，轉給對的人', {cust: 2, energy: -2}, '你花了十分鐘。客戶最後說：「你是我今天遇到最有禮貌的人。」'],
    ['說「這不是我負責的」，掛電話', {cust: -2}, '對方沉默了兩秒：「好，那我會跟你們老闆說。」'],
    ['記下來，下午回他', {cust: 1, energy: -1}, '你下午回電，他已經去開會了。']]},
  {id: 'favor', lines: [['sys', '品保的 Ella 抱著一疊紙走過來，眼睛有點紅。'], ['ella', '你可以幫我看一份規格嗎？我連續看了兩天，我已經分不清 5V 和 12V。']], ch: [
    ['接過來，幫她看一下', {trust: 3, energy: -3}, '你看了四十分鐘，找到兩個錯字。Ella 說她欠你一次。'],
    ['說「我現在有點忙」', {trust: -1}, 'Ella 點點頭，把那一疊紙放回懷裡，走回去了。'],
    ['建議她先休息，晚點再看', {trust: 1, energy: 1}, '她愣了一下，然後說：「你是第一個叫我休息的人。」']]},
  {id: 'rain', lines: [['sys', '外面下大雨。外送員一個接一個衝進辦公室，整層樓都是便當的味道。'], ['sys', '有人在你桌上放了一個你沒點的便當。']], ch: [
    ['問是誰放的，還回去', {trust: 1}, '是外送員送錯樓層了。他連說了三聲抱歉。'],
    ['吃掉，等有人來找再說', {energy: 3, trust: -2}, '吃到一半，隔壁桌的人走過來：「我的雞腿便當呢？」'],
    ['放在公共桌，標「無主便當」', {trust: 2, energy: 1}, '五分鐘後，它被某個人帶走了。整層樓都在笑。']]},
  {id: 'drill', lines: [['sys', '警報響了。消防演習。'], ['kai', '（探頭）所有人下樓集合，現在！'], ['sys', '你的螢幕上，還有一封寫到一半的信。']], ch: [
    ['存檔，跟著大家下樓', {trust: 1, energy: 1}, '你在樓下站了二十分鐘，聊了三個你從來沒聊過的同事。'],
    ['繼續把信寫完', {trust: -2, energy: -1}, '總務拿著名單找到你：「你是最後一個。你還在打字？」'],
    ['躲進茶水間', {trust: -3}, '總務在茶水間找到你。你的名字，被記在一張紙上。']]},
  {id: 'meeting', lines: [['sys', '你的行事曆跳出一則：「十分鐘後：臨時會議」。沒有議程。'], ['kp', '（從會議室探頭）大家都在，你也來。']], ch: [
    ['帶著筆電去，認真記', {trust: 2, energy: -2}, '會議開了四十分鐘，結論是「下次再討論」。你的筆記是全場最完整的。'],
    ['去，但一直滑手機', {trust: -1, energy: 0}, '你以為沒人發現。KP 在會後留下一句：「下次，記得關靜音。」'],
    ['說「我有客戶電話」，不去', {trust: -2, cust: 1}, '你真的有一通電話。KP 的表情，你看不出來。']]}];
/* 第五章的突發事件：選項會動到摸魚分鐘、巡查的門檻，或是替你擋一次罵 */
const PM5_INC = [
  {id: 'ac', lines: [['sys', '辦公室的冷氣壞了。二十七度。每個人都在扇風。']], ch: [
    ['去茶水間吹冷氣，十分鐘', () => {pm5Add('cl', 10)}, '茶水間裡擠了六個人。大家都說自己「只是來裝水」。'],
    ['忍著，繼續做事', () => {ST.d.nx = (ST.d.nx == null ? 30 : ST.d.nx) + 10}, '你滿頭大汗地看著螢幕。KP 路過，居然對你點了個頭。']]},
  {id: 'mood', lines: [['sys', 'KP 今天心情特別好。他提著兩大袋手搖飲，一桌一桌地放。'], ['kp', '今天天氣好，大家辛苦了。']], ch: [
    ['謝謝，收下', () => {ST.d.shield = 1}, '你喝了一口。KP 看著你：「這一杯，算我欠你的。」（這次被罵，他會手下留情一次）'],
    ['婉拒，說我自己有水', () => {}, 'KP 愣了一下，然後把飲料放在隔壁桌。你的水壺，是空的。']]},
  {id: 'intern', lines: [['sys', '一位實習生走過來，手上拿著一份你看不懂的表格。'], ['sys', '「請問，這個『成本』要填在哪裡？」']], ch: [
    ['認真教他，教到他會為止', () => {ST.d.sl = Math.max(0, (ST.d.sl || 0) - 10); ST.d.nx = (ST.d.nx == null ? 30 : ST.d.nx) + 10}, '你教得很認真。KP 路過，在你身後停了三秒，點點頭。（摸魚紀錄少了 10 分鐘）'],
    ['指向 Ken：「問他，他比較熟。」', () => {}, 'Ken 抬頭看了你一眼，那一眼，你記住了。']]},
  {id: 'allhands', lines: [['sys', '「全體會議，五分鐘後，大會議室。」不知道誰說的，總之大家都站起來了。']], ch: [
    ['坐前排，認真記', () => {ST.d.sl = Math.max(0, (ST.d.sl || 0) - 5)}, '會議很長，你的筆記很漂亮。（摸魚紀錄少了 5 分鐘）'],
    ['坐最後一排，偷滑手機', () => {pm5Add('wl', 10)}, '你滑到一則很好笑的影片，差點笑出來，咬著嘴唇憋住。']]}];
function pmzIncident(done) {
  const d = ST.d, five = d.chapter === 5, pool = five ? PM5_INC : PMZ_INC, e = pool[Math.floor(Math.random() * pool.length)], m = pmzMeta();
  m.inc[e.id] = 1; pmzSave(); if (Object.keys(m.inc).length >= 5) pmzUnlock('inc5');
  say([['sys', '【今日突發事件】']].concat(e.lines), null, {choice: e.ch.map(c => [c[0], () => {
    if (five) c[1](); else pm(c[1], '突發事件');
    say([['sys', c[2]]], done, {end: '好，繼續'});
  }])});
}

/* ── 辦公室八卦：會一步一步長下去的兩條支線（跨章記得，一章最多走一步）。選擇記在 meta 裡 ── */
const PMZ_ARC = {
  kl: [
    {lines: [['sys', '茶水間。Lily 和 Ken 站得有點近，看到你進來，兩個人同時往後退了半步。'], ['lily', '（很自然）我在跟 Ken 討論採購單。'], ['ken', '對。採購單。非常重要的採購單。']], ch: [
      ['假裝完全相信', c => {}, '你點點頭，倒了咖啡。身後傳來很大聲的「哈哈哈」。'],
      ['「喔——採購單——」（拉長音）', c => {c.tease = 1}, 'Lily 瞪了你一眼。Ken 的耳朵紅到脖子。']]},
    {lines: [['lily', '（壓低聲音，把你拉到走廊角落）我跟你說一件事……你不要說出去。'], ['lily', '我跟 Ken 在一起了，上個月開始。我們不想被問。']], ch: [
      ['答應：我什麼都不會說', c => {c.keep = 1}, 'Lily 鬆了一口氣，緊緊握了一下你的手。'],
      ['恭喜！但我可能會忍不住', c => {c.keep = 0}, 'Lily 睜大眼睛：「你不能忍不住。」'],
      ['這種事，大家遲早會知道', c => {c.keep = -1}, 'Lily 沉默了一下：「……你說得對。但不是從你這裡知道。」']]},
    {lines: [['anna', '欸，你有沒有覺得 Ken 跟 Lily 最近怪怪的？你一定知道什麼。'], ['sys', 'Anna 的眼睛亮亮的。她是整層樓消息最快的人。']], ch: [
      ['不知道。真的。', c => {c.held = 1}, 'Anna 瞇起眼睛看你三秒，然後走開了。你的手心全是汗。'],
      ['（小聲）你別說是我說的……', c => {c.leak = 1}, 'Anna 眼睛瞬間亮了：「我就知道！」她的腳步，比你說話的速度還快。'],
      ['你直接去問他們啊', c => {}, 'Anna 想了想：「也對。」她真的去問了。']]},
    {end: 1, fx: c => c.leak ? [['sys', 'Lily 這幾天沒有跟你說話。Ken 在你桌上留了一張便利貼：「下次，請你先問我們。」']] : c.held || c.keep === 1 ? [['sys', '週五，Ken 和 Lily 在全公司面前宣布了。散會的時候，Ken 偷偷把一盒鳳梨酥放在你桌上，沒有署名。']] : [['sys', '週五，Ken 和 Lily 在茶水間公開了。大家鼓掌，你也鼓掌。你還是有點不知道自己該站在哪邊。']]}],
  bv: [
    {lines: [['sys', '你經過會議室，門縫裡傳出很大的聲音。'], ['bo', '你把我的馬克杯放進資源回收？！'], ['vera', '它上面寫的是「RECYCLE ME」。']], ch: [
      ['敲門進去勸架', c => {c.side = 'peace'}, '兩個人同時轉頭看你。氣氛，瞬間凍住，然後他們默默各退一步。'],
      ['默默走開', c => {c.side = 'away'}, '你走遠了，聲音還跟了十公尺。']]},
    {lines: [['bo', '（把你拉到茶水間）你說，Vera 是不是故意的？那是我的杯子，我用了三年。'], ['sys', 'Bo 的眼眶，竟然有點濕。']], ch: [
      ['站 Bo：她應該先問你', c => {c.pick = 'bo'}, 'Bo 感動地拍了拍你的肩膀。'],
      ['站 Vera：杯子上寫的字有點誤導', c => {c.pick = 'vera'}, 'Bo 的表情像被燙到。'],
      ['兩邊都不站，先喝咖啡', c => {c.pick = 'none'}, 'Bo 沒好氣：「你是瑞士人嗎？」']]},
    {lines: [['vera', '（把你叫到一旁，攤開一張發票）你看。這兩個杯子是同一天、同一家廠商送的贈品。'], ['sys', '一個寫「RECYCLE ME」。另一個，寫的是「RECYCLE ME TOO」。']], ch: [
      ['幫他們各買一個新杯子', c => {c.cup = 'new'}, '你在茶水間放了兩個一模一樣的杯子。沒有人說是誰買的。'],
      ['拍下兩個杯子的合照，傳到群組', c => {c.cup = 'photo'}, '那張照片被按了二十三個讚。Bo 和 Vera 同時回覆：「刪掉。」']]},
    {end: 1, fx: c => [['sys', 'Bo 和 Vera 現在每天一起去茶水間，兩個杯子並排放在洗手台。有人問為什麼，他們異口同聲：「我們是工作夥伴。」']].concat(c.side === 'peace' ? [['sys', '他們都記得，那天是你先敲了會議室的門。']] : [])}]};
function pmzArcNext() {
  const m = pmzMeta(), K = ['kl', 'bv'].filter(k => m.arc[k].s < PMZ_ARC[k].length);
  if (!K.length) return null;
  K.sort((a, b) => m.arc[a].s - m.arc[b].s);
  return K[0];
}
function pmzArcRun(k, done) {
  const m = pmzMeta(), c = m.arc[k], st = PMZ_ARC[k][c.s];
  const fin = () => {
    c.s += 1; pmzSave();
    if (c.s >= PMZ_ARC[k].length) {
      if (k === 'kl') pmzUnlock(c.leak ? 'big' : (c.held || c.keep === 1) ? 'keep' : 'first');
      if (k === 'bv' && c.side === 'peace') pmzUnlock('peace');
      if (m.arc.kl.s >= PMZ_ARC.kl.length && m.arc.bv.s >= PMZ_ARC.bv.length) pmzUnlock('gossip');
    }
    done();
  };
  if (st.end) {say([['sys', '【辦公室八卦・後續】']].concat(st.fx(c)), fin, {end: '原來是這樣'}); return}
  say([['sys', '【辦公室八卦】']].concat(st.lines), null, {choice: st.ch.map(o => [o[0], () => {o[1](c); say([['sys', o[2]]], fin, {end: '嗯'})}])});
}
/* 第五章裡，同事說的話會跟著八卦的進度走 */
function pmzArcLine(id) {
  const a = pmzMeta().arc, kl = a.kl.s, bv = a.bv.s;
  if ((id === 'ken' || id === 'lily') && kl >= 1) return id === 'ken' ? (kl >= 3 ? '（對你笑了一下）今天的便當，我請。你別客氣。' : '（壓低聲音）你……不要跟別人說，好嗎。') : (kl >= 3 ? '我們現在不用躲了。真的很輕鬆。' : '（臉紅）你聽到的，都是誤會。');
  if ((id === 'bo' || id === 'vera') && bv >= 1) return id === 'bo' ? (bv >= 3 ? '我跟 Vera 約了一起去買杯子。你不要笑。' : '我還在想那個杯子的事。') : (bv >= 3 ? '那個發票，我一直留著。算是紀念。' : '我沒有故意的。我只是……太相信字。');
  return null;
}

/* ── 什麼時候出：每一章第 3 件事之前一件突發事件；第 7 件事之前一段八卦後續（有的話） ── */
STORY.onBeat = function (b) {
  const d = ST.d;
  if (!d.chapter || b.end || b.ring || b.seg === 'hr' || b.seg === 'menu' || d.fired || d.sfire) return false;
  d.bc = (d.bc || 0) + 1;
  const go = () => {busy = false; showGuide(); beginBeat()};
  if (d.bc >= 3 && !d.incA) {d.incA = 1; busy = true; showGuide(); pmzIncident(go); return true}
  if (d.bc >= 7 && !d.incB) {const k = pmzArcNext(); d.incB = 1; if (k) {busy = true; showGuide(); pmzArcRun(k, go); return true}}
  return false;
};

/* 選單上多一個「成就與結局」（story.js 不能直接用這個檔的名字，要不然載入順序會倒過來，所以用 STORY 轉手） */
STORY.menuExtra = menu => [['成就與結局（' + pmzSum() + '）', () => pmzShow(menu)]];
