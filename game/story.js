/* PM 的一天：第一章「線材風波」。
   一條主線：出事 → 你選一種做法 → 各自的後果 → 全部接到「做一條對的線」→ 驗證 → 出貨 → 客戶回饋。
   三種做法：
     return  全數回收，換成正確的線（直接進入做線流程）
     adapter 先附 Type-C 轉接頭出貨 → 兩週後客戶不接受、SI 要求賠償 → KP 與 Kai 吵到總裁 → 總裁決定換線 → 做線流程
     split   先逐一問客戶的機型 → 確認全部都要換，而且問出了正確規格 → 做線流程
   ST.d 記玩家選了什麼：path（做法）、written（有沒有請 SI 書面同意）、specKnown（問過機型）、careful（規格有沒有逐項量）、
   tested（出貨前有沒有用樣品機測）、moq（怎麼降 MOQ）、result（clean / lucky / redo / fail）、day（過了幾天）、
   四個數值 trust／cust／profit／energy、owed（被罵了還沒被安慰的次數）、cookies（吃了幾片餅乾）。
   餅乾規則：Maggie 只在你被罵的時候才給。每一次被罵之後，下一次回座位才會有。 */

/* ── 四個數值 ── */
const PMBASE = {trust: 50, cust: 50, profit: 50, energy: 70};
const PMNAME = {trust: '信任', cust: '客戶', profit: '利潤', energy: '精力'};
const PMNAME3 = {trust: '信任', cust: '市場', profit: '成本', energy: '精力'};
const PMNAME4 = {trust: '信任', cust: '客戶', profit: '毛利', energy: '精力'};
const PMNAME2 = {trust: '信任', cust: '業務滿意', profit: '成本', energy: '精力'};
/* 每章每個數值「最好的選法最高能到幾分」。由 tools/maxes.js 算出來（改了選項的分數要重算）。體力每個時刻都能喝咖啡補，所以是 100 */
const PMMAX = {1: {trust: 100, cust: 76, profit: 41, energy: 100}, 2: {trust: 100, cust: 54, profit: 53, energy: 100},
  3: {trust: 92, cust: 75, profit: 62, energy: 100}, 4: {trust: 79, cust: 65, profit: 63, energy: 100}};
const pmShow = k => pmStat(k) + '/' + Math.max(pmStat(k), (PMMAX[ST.d.chapter] || {})[k] || 100);
const pmStat = k => ST.d[k] == null ? PMBASE[k] : ST.d[k];
function pmBump(k, v) {ST.d[k] = Math.max(0, Math.min(100, pmStat(k) + v))}
const pmMark = v => v >= 8 ? '↑↑' : v > 0 ? '↑' : v <= -8 ? '↓↓' : v < 0 ? '↓' : '';
/* 一次改幾個數值，並在畫面上跳一下變化 */
function pm(o, note, why) {
  const parts = [];
  if (o.trust <= -4) {ST.d.neg = (ST.d.neg || 0) + 1; if (why) (ST.d.bad = ST.d.bad || []).push(why)}   /* 選到很差的選項的次數（資遣、Maggie 離職會看它） */
  Object.keys(o).forEach(k => {pmBump(k, o[k]); const a = pmMark(o[k]); if (a) parts.push((ST.d.chapter === 4 ? PMNAME4 : ST.d.chapter === 3 ? PMNAME3 : ST.d.chapter === 2 ? PMNAME2 : PMNAME)[k] + ' ' + a)});
  if (parts.length) toast(parts.join('　'), note || '');
}
/* 被罵了一次（記下來，下次 Maggie 才會拿出餅乾） */
const pmOwe = () => {ST.d.owed = (ST.d.owed || 0) + 1};
function pmCookie() {
  if (ST.d.cold) return;
  if (!ST.d.gv) {ST.d.owed = Math.max(0, (ST.d.owed || 0) - 1); pmBump('energy', 6); toast('鼓勵 +1', '精力回復了一點'); return}
  ST.d.owed = Math.max(0, (ST.d.owed || 0) - 1); ST.d.cookies = (ST.d.cookies || 0) + 1;
  pmBump('energy', 12); toast('餅乾 +1', '精力回復了一點');
}
/* 過了幾天。時鐘用「從第一天算起的分鐘」，字卡上只會顯示幾點 */
const pmDay = (h, m, plus) => ((ST.d.day || 0) + (plus || 0)) * 1440 + h * 60 + (m || 0);
/* 把人擺回預設的位置；o 裡有寫的就照 o（null 是不在場） */
function pmCast(o) {
  if (!W) return;
  const base = {kp: 'kp', maggie: ST.d.mgone ? null : 'maggie', ethan: 'ethan', grace: 'hk', kai: null, walter: null, victor: null, lena: null, zoe: null, ian: null, nora: null, hank: null, tina: null, leo: null,
    tom: null, anna: null, ken: null, lily: null, bo: null, vera: null, fu: null, zhang: null, yi: null, kc: null};
  Object.assign(base, o);
  Object.keys(base).forEach(id => {const v = base[id]; if (v) {W.put(id, Array.isArray(v) ? v[0] : v, Array.isArray(v) ? v[1] : undefined); W.show(id, true)} else W.show(id, false)});
}
/* Maggie 不會每次都發餅乾：被說了的時候，三次裡只有一次拿出餅乾，其餘是一句鼓勵。
   做法：包住 Maggie 那件事的 lines，裡面提到餅乾的那幾行，輪到沒有餅乾的時候換成一句鼓勵的話 */
const PMCOOKW = ['餅乾', '抽屜', '咬了一口', '拿出來', '吃一片', '吃吧'];
const PMCOOK = {test: t => PMCOOKW.some(w => t.indexOf(w) >= 0)};
const PMCHEER = ['你比你自己以為的撐得更久。我當 PM 的第二年，比你狼狽多了。', '被說了，不代表你做錯。把能改的記下來，就夠了。',
  '這件事你處理得比上個月好很多，你自己可能沒發現。', '你剛剛站得住。這比一次做對更難。', '不用每次都做到最好。每次比上一次清楚一點，就是進步。'];
function pmGiveWrap(b) {
  const f = b.lines; if (!f) return;
  b.lines = () => {
    const L = f(), i = L.findIndex(l => PMCOOK.test(l[1]));
    if (i < 0) {ST.d.gv = false; return L}
    const n = ST.d.sc || 0; ST.d.sc = n + 1; ST.d.gv = n % 3 === 0;
    if (ST.d.gv) return L;
    const M = L.filter(l => !PMCOOK.test(l[1]));
    M.splice(Math.min(i, M.length), 0, ['maggie', PMCHEER[n % PMCHEER.length]]);
    return M;
  };
}

/* 得罪了 Maggie：她的每一段話都換成冷淡的一句，也不再給餅乾 */
function pmM(lines) {
  if (!ST.d.cold) return lines;
  const K = [[['sys', 'Maggie 頭也沒抬，盯著螢幕。'], ['maggie', '喔，是你啊。我還以為你自己什麼都搞得定，不需要問人。']],
    [['sys', 'Maggie 的椅子連轉都沒轉。'], ['maggie', '你上次不是說我講的你都懂了嗎？那還來問什麼。']],
    [['sys', 'Maggie 在回信，連眼角都沒瞄你。'], ['maggie', '不好意思，我的時間比較適合拿去幫比較需要的人。']]];
  return K[(ST.d.coldN = ((ST.d.coldN || 0) + 1)) % 3];
}
const pmWho = () => ({return: '全數回收', adapter: '先附轉接頭', split: '先逐一問機型'})[ST.d.path] || '';

STORY.segs = {
  open: {name: '接手的爛攤子', sub: '週二早上。你接手這條工業電腦產品線的第二個禮拜。', t: 520, mood: 'day', scene() {pmCast({})}},
  adp1: {name: '轉接頭方案', sub: '先讓客戶上線，再補正式的線。', get t() {return pmDay(14, 0)}, mood: 'day', scene() {pmCast({})},
    note: '重要的同意，要留下書面。口頭說「OK」，出事的時候就會變成「我沒說過」。'},
  adp2: {name: '兩週後', sub: '轉接頭出貨後的第二個禮拜。', get t() {return pmDay(10, 30)}, mood: 'day', scene() {pmCast({victor: 'mt1', kp: 'mt2', kai: 'mt3'})}},
  adp3: {name: '總裁的決定', sub: '事情鬧到了最上面。', get t() {return pmDay(17, 0)}, mood: 'eve', scene() {pmCast({walter: 'mtw', kp: 'mt1', kai: 'mt3'})}},
  spl1: {name: '逐一問客戶', sub: '你一通一通電話問下去。', t: 630, mood: 'day', scene() {pmCast({kai: 'kaiD'})}},
  ret1: {name: '怎麼做一條對的線', sub: '換線不是去店裡買一條回來。', get t() {return pmDay(9, 0)}, mood: 'day', scene() {pmCast({})}},
  ret2: {name: '線材廠的報價', sub: '規格表送出去了。', get t() {return pmDay(14, 0)}, mood: 'day', scene() {pmCast({})},
    note: '規格以實機為準，不以客戶或業務口述的為準。'},
  ret3: {name: '三週後', sub: '線材廠通知：貨到了。', get t() {return pmDay(10, 0)}, mood: 'day', scene() {pmCast({})}},
  redo1: {name: '被退回來的線', sub: '等了三週，等到一條不能用的線。', get t() {return pmDay(11, 0)}, mood: 'day', scene() {pmCast({})}},
  redo2: {name: '再兩週後', sub: '重做的線到了。', get t() {return pmDay(10, 0)}, mood: 'day', scene() {pmCast({})}},
  ret4: {name: '寄出', sub: '線材通過了，接下來要安排寄出。', get t() {return pmDay(14, 0)}, mood: 'day', scene() {pmCast({kai: 'kaiD'})},
    note: '出貨前用樣品機實測，是最後一道關。跳過它，錯誤就會直接送到客戶手上。'},
  ret5: {name: '一週後', sub: '客戶的回饋來了。', get t() {return pmDay(10, 0)}, mood: 'day', scene() {pmCast({})}}
};

/* ── 向 Maggie 請教（可以重複問，直到你覺得夠了）── */
function pmMentor(done) {
  if (ST.d.cold) {
    say([['maggie', '（沒有抬頭）流程就是：確認規格、打樣、報價、請示、下單、等貨、實測。細節自己問 Ethan 和 Grace。'],
      ['sys', '你想再問，Maggie 已經戴上耳機。']], done);
    return;
  }
  const Q = [
    ['一條線要怎麼做出來？', [
      ['maggie', '先跟 RD 和電腦 Team 確認規格：接頭、功率、長度。然後找線材廠打樣、報價，請 KP 批准，談 MOQ，下單量產，等貨。'],
      ['maggie', '貨到了，還要拿樣品機實測，才能出貨。每一步都不能跳。跳過的那一步，通常就是之後出事的那一步。']]],
    ['要跟誰確認規格？', [
      ['maggie', '線材設計找 Ethan，他是 RD。實機的供電規格找 Grace，她是另一個電腦 Team 的 PM，手上有樣品機。'],
      ['maggie', '記得，規格要以實機為準，不是以客戶或業務說的為準。大家都會說「Type-C 就好」，但這句話不夠。']]],
    ['MOQ 是什麼？怎麼辦？', [
      ['maggie', '線材廠規定最少要買幾條才肯做。你要的可能才幾百條，他們開口就是幾千條。'],
      ['maggie', '量太大，KP 不會批；硬砍，廠商不理你。有兩個辦法：付較高的單價換較小的量，或是找別的產品線一起用同一款線，把量湊起來。']]],
    ['我要等多久？', [
      ['maggie', '規格確認一兩天，打樣一個禮拜，量產兩到三個禮拜，再加上運送。'],
      ['maggie', 'KP 的耐心，大概比這個短。所以這幾週，你要主動跟 KP、Kai 和 Victor 報進度，不要等他們來問。']]]
  ];
  const asked = {};
  const ask = () => {
    const left = Q.map((q, i) => i).filter(i => !asked[i]);
    say([['maggie', left.length ? '還有什麼想問的嗎？' : '那你應該都問完了。去吧。']], null, {choice:
      left.map(i => [Q[i][0], () => {asked[i] = 1; say(Q[i][1], ask)}]).concat([['好，我知道了。先去找 Ethan 和 Grace', done]])});
  };
  ask();
}

STORY.beats = [
  /* ───────── 第一幕：出事 ───────── */
  {seg: 'open', to: 'maggie', guide: '跟你的導師 Maggie 打招呼',
    lines: () => [['sys', '週二早上八點四十。你接手這條工業電腦產品線的第二個禮拜，桌上還堆著上一任 PM 留下的便利貼。'],
      ['maggie', '早安。第二週了，還撐得住嗎？'],
      ['me', '撐得住。就是便利貼比待辦清單還多。'],
      ['maggie', '正常。前任走得急，東西沒交接乾淨。有不懂的、不好意思問別人的，都可以來問我。'],
      ['maggie', '我先提醒你：Kai 昨晚在群組裡發了三次「急」。今天早上大概不會太平靜。'],
      ['me', '……我先把咖啡喝完。']],
    mini(done) {
      say([['maggie', '我先提醒你一句：KP 今天心情不會好，Kai 也是。你要不要先看一下他們昨天傳的訊息，我可以跟你一起看。']], null, {choice: [
        ['謝謝，那我們一起看一下', () => {pm({trust: 2}); done()}],
        ['我晚點再看，先去忙我的', () => done()],
        ['不用啦，我自己會處理，妳不用一直盯著我', () => {ST.d.cold = true; pm({trust: -2}, '你說了一句不該說的話。'); done()}]]});
    },
    post: () => ST.d.cold
      ? [['maggie', '（頓了一下）……好。你自己處理。'], ['sys', 'Maggie 低頭回到螢幕前，沒有再看你一眼。']]
      : [['maggie', '好。有需要隨時叫我。']],
    after() {pmCast({kai: 'kpd'})}},
  {seg: 'open', to: 'kp', guide: '去 KP 的辦公室門口，看看發生什麼事',
    ring: ['Kai（業務）', '「KP 那邊你現在馬上過去！客戶那邊出事了！」', '過去看看'],
    lines: () => {
      if (W) {W.put('kai', 'kpd'); W.show('kai', true)}
      return [['sys', '你走進 KP 的辦公室。Kai 已經站在裡面，聲音大到半層樓都聽得見。'],
        ['kai', 'KP！我賣給 SI 的那批工業平板，SI 送到終端客戶現場才發現——線材根本不相容！'],
        ['kai', '我們隨貨附的是 DC 圓頭線！客戶的設備只吃 Type-C 供電！整批貨卡在現場，一台都開不了機！'],
        ['kp', '（皺眉）Kai，你小聲一點。'],
        ['kai', '小聲？我小聲得下來嗎！Victor 昨晚打給我三次，我被他罵到凌晨兩點！客戶現場十幾個人站在那裡等，我連話都講不出來！'],
        ['kai', '規格表到底有沒有人檢查過？！你們產品部每次出事，第一個接電話的都是我！'],
        ['kp', '（看了一眼手錶）我十點還有會。'],
        ['kai', '你還在看手錶？！這是今年最大的單！你知道我跑了多久嗎？！'],
        ['kp', 'Kai，夠了。'],
        ['kai', '（轉向你）還有你！你不是接手了嗎？到底有沒有看過規格表？！'],
        ['me', '我……還在看。'],
        ['kai', '還在看？！客戶現場等不了你「還在看」！'],
        ['kp', '（重重嘆了一口氣）Kai，你冷靜一點，坐下來。你也要聽，我們三個一起把事情講清楚。'],
        ['sys', 'Kai 退後半步，雙手抱胸，站在 KP 的桌子旁邊，狠狠瞪著你。'],
        ['kp', '這是前一個 PM 留下來的案子，現在你是窗口。'],
        ['kp', '我已經被問了一整個早上。我不想一直被問同一件事。你說，要怎麼處理？']];
    },
    mini(done) {
      say([['sys', 'KP 看著你，Kai 看著你。辦公室裡其他人也都假裝沒在看你。']], null, {choice: [
        ['全數回收，換成正確的線', () => {
          ST.d.path = 'return'; ST.d.replace = true; ST.d.rday = 0;
          pm({trust: 8, cust: -3, profit: -12, energy: -8}, '最乾淨的做法，也最貴。'); done()}],
        ['先附 Type-C 轉接頭出貨，之後補正式的線', () => {
          ST.d.path = 'adapter';
          pm({trust: -5, cust: -8, profit: -3, energy: -3}, '最快，但留下一個之後要還的債。', '為了趕時間選了最快的做法，留下一個之後要還的債'); done()}],
        ['先逐一問客戶的機型，再分批處理', () => {
          ST.d.path = 'split';
          pm({cust: 3, profit: -5, energy: -15}, '最準，但要花最多力氣。'); done()}]]});
    },
    post: () => ST.d.path === 'return'
      ? [['me', '全數回收，換成正確的線。重做線材要好幾個禮拜，這段時間我會每週向你們回報進度。'],
        ['kai', '好幾個禮拜？！客戶現場等得了好幾個禮拜嗎？！你是在開玩笑吧！'],
        ['kp', 'Kai，閉嘴。'],
        ['kp', '做對比做快重要。時程排出來，下午給我。'],
        ['sys', 'Kai 把手上的資料夾摔在桌上，轉身就走。KP 揉著眉心，一句話也沒再說。']]
      : ST.d.path === 'adapter'
        ? [['me', '先附 Type-C 轉接頭，讓客戶今天就能開機，正式的線我再補。'],
          ['kai', '這個可以！這個我可以跟 Victor 講！'],
          ['kp', '轉接頭只是權宜之計。我要看到補線的日期。'],
          ['kp', '還有，這個方案是你提的，出問題你自己扛。'],
          ['sys', 'Kai 鬆了一口氣，手機已經拿在手上，邊走邊撥。']]
        : [['me', '我不確定每種機型是不是都受影響。我先逐一確認，需要換的才換。'],
          ['kai', '現在才要確認？！客戶在現場等欸！'],
          ['kp', '……他說得有道理。你今天之內給我一個答案。我不想明天又被問。'],
          ['sys', 'Kai 哼了一聲，往自己的座位走去，腳步重得每個人都聽得見。']],
    after() {pmOwe(); if (W) W.walk('kai', 'kaiD')}},
  {seg: 'open', to: 'maggie', guide: '回座位，Maggie 在對你招手',
    lines: () => [['sys', '你回到座位，整個人癱在椅子上。耳朵還在嗡嗡響。'],
      ['maggie', '我聽到了。半層樓都聽到了。'],
      ['maggie', '被那樣罵，誰都會愣住。來，這個給你。'],
      ['sys', 'Maggie 從抽屜深處拿出一小盒餅乾。你咬了一口，奶油的，有點碎，剛剛好。'],
      ['me', '……謝謝。'],
      ['maggie', '我只在有人被罵慘的時候才拿出來，所以你最好少吃到。']].concat(
      ST.d.path === 'return'
        ? [['maggie', '你選了最乾淨的做法，也是最麻煩的。換線不是去店裡買一條回來，要跟 RD、電腦 Team 確認規格，還要找線材廠打樣、報價，等好幾個禮拜。'],
          ['maggie', '別急。明天早上來找我，我們一步一步來。']]
        : ST.d.path === 'adapter'
          ? [['maggie', '轉接頭可以先救急。但有件事你要想清楚：Victor 同意了嗎？有留下白紙黑字嗎？'],
            ['maggie', '口頭說的，出事的時候就是「我沒說過」。']]
          : [['maggie', '一通一通問，很扎實，也很累。先去找 Kai 要客戶和機型清單。他現在在氣頭上，你說話可以放軟一點。']]),
    after() {pmCookie(); if (ST.d.path === 'return') ST.d.day = 1}},

  /* ───────── 轉接頭線 ───────── */
  {seg: 'adp1', to: 'warehouse', guide: '去倉庫領 Type-C 轉接頭', when: () => ST.d.path === 'adapter',
    lines: () => [['sys', '倉庫在辦公室後面，穿過後牆玻璃上的那扇門。門一推開，一排排橘色層架，空氣裡有紙箱和灰塵的味道。'],
      ['sys', '你在標著「配件」的那一排找到轉接頭，一盒一百個。你數了兩次，確定夠整批用。'],
      ['sys', '架子最下層，還堆著這批被退回來的 DC 圓頭線，一箱一箱，標籤上寫的都是同一個日期。你看了一眼，沒有多留。']]},
  {seg: 'adp1', to: 'desk', guide: '回座位，處理轉接頭出貨', when: () => ST.d.path === 'adapter',
    lines: () => [['sys', '下午兩點。Kai 說，他已經在電話裡跟 Victor 講過轉接頭的方案，Victor 說「應該可以」。'],
      ['sys', '轉接頭是你提的方案。出貨之前，還差一件事：SI 到底有沒有正式同意？']],
    mini(done) {
      say([['sys', '你打開信箱，游標停在一封空白的信上。']], null, {choice: [
        ['寫 email 給 Victor，請他書面確認同意', () => {ST.d.written = true; pm({energy: -3, trust: 3}); done()}],
        ['Kai 說電話裡講過了，直接出貨就好', () => {ST.d.written = false; pm({trust: -2}); done()}]]});
    },
    post: () => ST.d.written
      ? [['sys', '你寫了一封很短的信：「如電話所述，本批將附 Type-C 轉接頭出貨，正式線材後續補寄。請回信確認同意。」'],
        ['sys', '二十分鐘後，Victor 回信：「同意。」你把這封信歸進資料夾。轉接頭當天就寄出了。']]
      : [['kai', '放心啦，Victor 親口說的，OK 啦！'],
        ['sys', '你心裡有點不踏實，但時間不等人。轉接頭當天就寄出了。']],
    after() {ST.d.day = 14}},
  {seg: 'adp2', to: 'meeting', guide: '去大會議室 A', when: () => ST.d.path === 'adapter',
    ring: ['Kai（業務）', '「SI 的 Victor 殺過來了！大會議室 A，快！」', '過去看看'],
    lines: () => {
      if (W) {W.show('victor', true); W.show('kai', true)}
      return [['sys', '大會議室 A。Victor 沒有坐下，一直站著。Kai 靠在牆邊，KP 雙手抱胸，臉色很難看。'],
        ['victor', '我直接講重點。終端客戶不接受轉接頭。他們說接頭一碰就鬆，現場機台又有震動，兩個禮拜內已經斷電三次，產線停了。'],
        ['victor', '客戶發了正式函，要求賠償停機損失。我們跟客戶簽的是原廠線材，現在，棲光要賠償我們。'],
        ['kai', 'Victor，當初你也同意轉接頭的啊！'],
        ['victor', '我同意的是「暫時」，不是讓客戶用兩個禮拜！你們補的線呢？人呢？'],
        ['kp', '（聲音很冷）Victor，我們尊重你的立場。但轉接頭方案，是你們當時同意的。'],
        ST.d.written ? ['kp', '我手上有你們的回信。'] : ['kp', '……至少 Kai 說過，你在電話裡同意過。'],
        ST.d.written ? ['victor', '那封信寫的是「同意暫時使用」。你們心裡清楚。'] : ['victor', '電話裡講的不算數。白紙黑字在哪？'],
        ['kp', '（轉向你）你是窗口。你說。']];
    },
    mini(done) {
      say([['sys', '所有人都看著你。Victor 的手指在桌面上敲得很快。']], null, {choice: [
        ['拿出當初的書面同意，請 Victor 看清楚', () => {
          ST.d.stance = 'proof';
          if (ST.d.written) pm({trust: 8, cust: 2}); else {pm({trust: -10, cust: -5}, '', '先附轉接頭卻沒有留下書面同意，客戶翻臉時手上沒有任何紀錄'); pmOwe()}
          done()}],
        ['先道歉，承諾盡快換成正確的線', () => {ST.d.stance = 'sorry'; pm({cust: 8, trust: -3, profit: -5}); done()}],
        ['請 Victor 提供客戶的損失明細，再談賠償', () => {ST.d.stance = 'detail'; pm({trust: 2, cust: -5}); done()}]]});
    },
    post: () => (ST.d.stance === 'proof'
      ? (ST.d.written
        ? [['sys', '你把那封信投影到大螢幕上。Victor 看了很久。'],
          ['victor', '……「同意暫時使用」。好，這部分我認。但客戶那邊，你們自己去說。']]
        : [['sys', '你翻遍信箱，才想起來你根本沒寫過這封信。你的手停在滑鼠上。'],
          ['victor', '口頭的，不算數。'],
          ['kp', '（看了你一眼，沒說話。）']])
      : ST.d.stance === 'sorry'
        ? [['me', '這件事我們有責任。我們會盡快換成正確的線，請讓我們把事情處理好。'],
          ['victor', '我要的不是道歉，是賠償。']]
        : [['me', '能不能請你把客戶的停機時間和損失明細給我們？我們才算得清楚。'],
          ['victor', '（冷笑）你們現在才要算？']]).concat([
      ['victor', '我給你們兩天。兩天後我要看到正式的處理方案，不然我們走法律程序。'],
      ['sys', 'Victor 抓起外套，頭也不回地走了。會議室的玻璃門被他關得很大聲。'],
      ['kai', 'KP，你剛剛那樣講，Victor 以後還會跟我們買嗎？這單是我跑了半年才拿下來的！'],
      ['kp', '原則不能破。他當初同意，就不能現在反悔。'],
      ['kai', '原則？客戶現場斷電的時候，你跟他講原則有什麼用？！'],
      ['kp', 'Kai，你注意你的態度！'],
      ['kai', '我態度就這樣！你們產品部出的包，我來擦屁股，還要被你吼？！'],
      ['kp', '（拍桌）夠了！我沒有那麼多時間聽你吵！'],
      ['kai', '好，我不跟你吵。我去找 Walter！'],
      ['sys', 'Kai 轉身衝了出去。會議室裡只剩你和 KP。'],
      ['kp', '（深吸一口氣）……你別站在那裡發呆。總裁一定會找我們，準備好你要說什麼。']]),
    after() {
      if (W) {W.walk('victor', 'meetdoor', () => W.show('victor', false)); W.walk('kai', 'meetdoor', () => W.show('kai', false))}
    }},
  {seg: 'adp3', to: 'walter', guide: '向 Walter 說明事情經過', when: () => ST.d.path === 'adapter',
    lines: () => [['sys', '傍晚五點。大會議室 A，這次多了一個人。總裁 Walter 坐在長桌的一端，KP 和 Kai 站在兩邊，誰也不看誰。'],
      ['walter', '我聽 Kai 說完了。現在換你說，從頭。']],
    mini(done) {
      say([['walter', '你是這件事的窗口。你打算怎麼報告？']], null, {choice: [
        ['把問題、現況、建議和需要的時間，按順序講清楚', () => {ST.d.brief = 'clear'; pm({trust: 8}); done()}],
        ['說明這是前一任 PM 留下來的問題', () => {ST.d.brief = 'blame'; pm({trust: -10}, '', '遇到問題先說是前一任 PM 留下來的，沒有先處理'); done()}],
        ['先講客戶的損失，和我們能多快補救', () => {ST.d.brief = 'customer'; pm({trust: 4, cust: 4}); done()}]]});
    },
    post: () => (ST.d.brief === 'clear'
      ? [['walter', '嗯。條理清楚。']]
      : ST.d.brief === 'blame'
        ? [['walter', '我不要聽是誰的錯。我要聽怎麼處理。'], ['kp', '（低下頭，沒說話。）']]
        : [['walter', '客戶的損失我知道了。']]).concat([
      ['walter', '聽完了。轉接頭那一套不用再爭了。客戶現場要的是原廠等級的線，換正確的線給他們。'],
      ['walter', '賠償的部分，Kai 負責跟 Victor 談，KP 在旁邊把關。至於你——'],
      ['walter', '（看著你）一個禮拜內，我要看到正確線材的計畫。我不想看到第二次。'],
      ['walter', '還有，你們兩個。（看向 KP 和 Kai）要吵，進會議室、關上門吵，不要讓客戶聽見，也不要讓全公司聽見。'],
      ['kp', '……是。'],
      ['kai', '……知道了。'],
      ['sys', 'Walter 站起來，整理了一下袖口，離開了會議室。']]),
    after() {ST.d.replace = true; ST.d.rday = 14; pmOwe(); pm({profit: -10, trust: -3}, '賠償與加急，成本一起來了。'); if (W) W.walk('walter', 'meetdoor', () => W.show('walter', false))}},
  {seg: 'adp3', to: 'maggie', guide: '回座位，Maggie 在等你', when: () => ST.d.path === 'adapter',
    lines: () => [['sys', '你走回座位，腿有點軟。辦公室已經沒什麼人了。'],
      ['maggie', '我聽說總裁親自下來了。被他點名，還站得住，不簡單。'],
      ['maggie', '吃片餅乾，會不會好一點？（她遞了一片過來）這一份，你吃得名正言順。'],
      ['maggie', '轉接頭是你選的，後果你就得自己扛。'],
      ST.d.written ? ['maggie', '不過你至少留了書面。這個習慣，保持下去。'] : ['maggie', '不過你沒留書面。下次，不管誰說「OK 啦」，都先寫下來。'],
      ['maggie', '現在，真正的工作才開始。明天早上來找我，我們從怎麼做一條對的線開始。']],
    after() {pmCookie(); ST.d.day = 15}},

  /* ───────── 逐一問機型線 ───────── */
  {seg: 'spl1', to: 'kai', guide: '向 Kai 要客戶與機型清單', when: () => ST.d.path === 'split',
    lines: () => [['sys', 'Kai 坐在自己的位子上，臉還是很臭。'],
      ['kai', '清單在這。三個客戶，五種機型。我先講好，終端客戶那邊沒有人會乖乖告訴你型號，你要一台一台問。'],
      ['kai', '我只能幫你打給最熟的 Mr. Huang，其他人你自己去求。'],
      ['me', '好。我先打給 Mr. Huang。'],
      ['kai', '快一點！客戶現場在等欸！']]},
  {seg: 'spl1', when: () => ST.d.path === 'split',
    ring: ['Mr. Huang（終端客戶）', '你撥出去的電話，接通了。', ANSWER],
    lines: () => [['huang', '喂，我是黃廠長。你們棲光的人嗎？設備到了，開不了機，我現場十幾個人在等，你知道嗎？'],
      ['me', '黃先生，非常抱歉。我想確認現場有幾種機型，每一種的供電接頭和功率是什麼。'],
      ['huang', '我們有五種，我叫人去看銘牌。你等一下。'],
      ['sys', '話筒另一頭傳來翻箱子、報型號的聲音。你一台一台記下來。五種機型，全部都是 Type-C 供電，標著 PD、20 伏、45 瓦。'],
      ['huang', '所以你們附的 DC 圓頭線，一條都用不上。我只要設備能開機，不管是誰的錯，你自己看著辦。'],
      ['me', '我明白了。一條都用不上，所以要整批換，而且要符合這個規格。我會盡快給您時程。']],
    after() {ST.d.specKnown = true; pm({energy: -12, cust: 4}, '你問出了真正的規格。')}},
  {seg: 'spl1', to: 'kp', guide: '向 KP 報告結果', when: () => ST.d.path === 'split',
    lines: () => [['sys', '下午兩點。你整個上午的成果，只有一句話。'],
      ['me', 'KP，我問過了。五種機型全部都是 Type-C PD、20 伏、45 瓦，我們附的 DC 圓頭線一條都用不上。結論是全數回收，換正確的線。'],
      ['kp', '（看了看手錶）所以你花了一個早上，得到「全部都要換」。'],
      ['kp', '你早上直接回收不就好了？白白多花了半天，客戶又多等了半天。'],
      ['kai', '（從座位那邊喊）我早就說了啦！'],
      ['kp', '（嘆氣）……至少現在，你知道正確的規格了。去做吧。我不想再被問第二次。']],
    after() {pmOwe(); pm({trust: -3})}},
  {seg: 'spl1', to: 'maggie', guide: '回座位，Maggie 在等你', when: () => ST.d.path === 'split',
    lines: () => [['sys', '你回到座位，沒什麼力氣說話。'],
      ['maggie', '我看到 KP 的表情了。被這樣說，會很想反駁，對吧。'],
      ['maggie', '不過你問出了真正的規格，這比任何人嘴上的「我覺得」都有用。要不要吃個餅乾？也許會好一點。（她打開鐵盒）'],
      ['maggie', '現在你手上有正確的規格，下一步是怎麼做出一條線。明天早上來找我。']],
    after() {pmCookie(); ST.d.replace = true; ST.d.rday = 0; ST.d.day = 1}},

  /* ───────── 做一條對的線（三條線都走這裡）───────── */
  {seg: 'ret1', to: 'maggie', guide: '向 Maggie 請教：換線要怎麼做',
    lines: () => [['sys', ST.d.path === 'adapter' ? '隔天早上九點。總裁給的期限只剩一個禮拜。' : '隔天早上九點。這件事不能再拖。'],
      ['maggie', '來，坐。你要換的線，不是去店裡買一條。我們先講講流程。']],
    mini: pmMentor},
  {seg: 'ret1', to: 'ethan', guide: '找 Ethan（RD）談線材設計',
    lines: () => [['sys', 'Ethan 盯著雙螢幕，頭也沒抬。'],
      ['ethan', '你是新的 PM。線的事我聽說了。'],
      ['ethan', '線材設計我做得出來：Type-C 對 Type-C，要帶 e-marker，線徑依功率決定。你告訴我功率和長度，我才能畫。']].concat(ST.d.specKnown
      ? [['me', 'Type-C PD、20 伏、45 瓦。長度一點五公尺左右。'],
        ['ethan', '你問過客戶的機型了？嗯，數字很具體。我不替你猜，你再跟 Grace 拿實機對一次。']]
      : [['me', 'Kai 說客戶只寫了「Type-C 供電」……'],
        ['ethan', '這不夠。我不替你猜。你去問電腦 Team 的 Grace，她那邊有實機。規格要以實機為準。']])},
  {seg: 'ret1', to: 'grace', guide: '找 Grace（電腦 Team）確認實機的供電規格',
    lines: () => [['sys', 'Grace 的桌上擺著好幾台工業平板，旁邊是電表和一捆線。'],
      ['grace', 'Ethan 傳訊息給我了。你要換的線，是給哪一台用的？']].concat(ST.d.specKnown
      ? [['me', '五種機型，都是 Type-C PD、20 伏、45 瓦，一點五公尺以內。'],
        ['grace', '你問過客戶了？很好，那我拿實機對一下。'],
        ['sys', '她把平板接上電表，一項一項看過去。'],
        ['grace', '跟我量到的一樣。規格可以定了：Type-C PD、20 伏、45 瓦、帶 e-marker、一點五公尺以內。']]
      : [['me', 'Kai 說客戶那邊只寫「Type-C 供電」。'],
        ['grace', '只寫這樣不夠。功率多少？線多長？要不要 e-marker？規格表你要怎麼填？']]),
    mini(done) {
      if (ST.d.specKnown) {ST.d.careful = true; pm({trust: 3}, '規格是逐項對過的。'); done(); return}
      say([['sys', '規格表上的空格還空著。你的手停在鍵盤上。']], null, {choice: [
        ['先照 Kai 給的寫：Type-C 供電、30 瓦，省時間', () => {ST.d.careful = false; pm({energy: 2}); done()}],
        ['請 Grace 把實機接上電表，逐項量一次再填', () => {ST.d.careful = true; pm({energy: -8, trust: 2}); done()}]]});
    },
    post: () => ST.d.specKnown ? [] : (ST.d.careful
      ? [['sys', 'Grace 把平板一台一台接上電表，量一項，你就記一項。'],
        ['grace', 'Type-C PD、20 伏、45 瓦。電流不能低，不然平板會被限速。要帶 e-marker，線長一點五公尺以內。'],
        ['grace', '這樣，你的規格表才叫規格表。']]
      : [['grace', '（看了你一眼）……好。實機我只負責借你，規格表是你簽的字。'],
        ['sys', '你把規格表送出去。心裡閃過一點不安，但很快就被待辦清單蓋過去了。']]),
    after() {ST.d.day = (ST.d.day || 0) + 1}},

  /* KP 有時兇、有時會鼓勵：看你前面做得怎麼樣 */
  {seg: 'ret1', to: 'kp', guide: '向 KP 報告：規格確認得怎麼樣',
    lines: () => ST.d.careful
      ? [['sys', 'KP 叫住你，手上拿著咖啡，語氣和早上不太一樣。'],
        ['kp', '我聽 Grace 說，規格是你們一項一項對過的。'],
        ['kp', '昨天被 Kai 那樣吵，換別人可能早就亂了。你還是先把東西確認清楚，這樣很好。'],
        ['kp', '繼續。有卡住的地方，直接來講，我不會每次都吼你。']]
      : [['sys', 'KP 叫住你，臉上沒有笑。'],
        ['kp', '我聽 Grace 說，你的規格是照 Kai 給的寫的？'],
        ['kp', 'Kai 是業務，他的工作是賣，不是量電壓。你要自己確認，不要照單全收。'],
        ['kp', '這種事我不想講第二次。']],
    after() {ST.d.careful ? pm({trust: 4, energy: 4}, 'KP 難得說了句好話。') : (pmOwe(), pm({trust: -4}, '', '規格沒有自己逐項確認，照業務給的資訊就填'))}},
  {seg: 'ret2', when: () => true,
    ring: ['Amy（線材廠）', '「規格我看過了，報價出來了。」', ANSWER],
    lines: () => [['amy', '你好，我是 Amy，線材廠的業務。你們的規格我看過了，這樣的線我們做得出來。'],
      ['amy', '先打樣兩條，一個禮拜給你。量產的話，MOQ 是五千條，單價四十六塊。'],
      ['me', '五千條？我們只需要八百條。'],
      ['amy', '八百條的話，我這邊排產線不划算。MOQ 就是這樣。你要的話，我可以再幫你問工廠，但價格會不同。'],
      ['amy', '報價單我寄給你。你先跟主管確認吧。']]},
  {seg: 'ret2', to: 'kp', guide: '拿報價單去請示 KP',
    lines: () => [['sys', '你拿著報價單去找 KP。他剛好在看另一份文件，頭也沒抬。'],
      ['kp', '說。']],
    mini(done) {
      say([['kp', '你要我批什麼？']], null, {choice: [
        ['這是報價，請您批准下單五千條', () => {ST.d.ask = 'direct'; pmOwe(); pm({trust: -6, energy: -5}, '', '沒有準備就請 KP 批准下單五千條，被問到答不出來'); done()}],
        ['這是報價，但 MOQ 太高，我想先跟廠商談降 MOQ，再回來請您批准', () => {ST.d.ask = 'prepared'; pm({trust: 3}); done()}]]});
    },
    post: () => ST.d.ask === 'direct'
      ? [['kp', '五千條？我們只缺八百條。剩下四千多條，你打算放倉庫放到什麼時候？'],
        ['kp', '你有算過成本嗎？還是你以為我是銀行？'],
        ['kp', '拿回去，重算。下次拿來之前，先把功課做完！'],
        ['sys', '你的耳朵發燙。報價單被推了回來。']]
      : [['kp', '（終於抬頭）嗯，至少你知道 MOQ 是問題。'],
        ['kp', '去談。明天下班前，我要看到結果。我沒有時間一直等。']]},
  {seg: 'ret2', to: 'maggie', guide: '回座位，跟 Maggie 討論怎麼降 MOQ',
    lines: () => (ST.d.owed > 0
      ? [['sys', '你回到座位，耳朵還是紅的。'],
        ['maggie', '我看到了。被 KP 退件，不丟臉，每個 PM 都經歷過。'],
        ['maggie', '吃個餅乾會不會好一點？（她把鐵盒推到你面前）']]
      : [['sys', '你回到座位，鬆了一口氣。'],
        ['maggie', '不錯。你知道先想過再去請示，這一步，很多人會跳過。']]).concat([
      ['maggie', '降 MOQ 有兩個辦法。第一，付較高的單價換較少的量，最快，但利潤會被吃掉。'],
      ['maggie', '第二，找別的產品線一起用同一款線，把量湊起來。我幫你問過了，有一條產品線也要用 Type-C 線，湊到兩千條沒問題。'],
      ['maggie', '不過這個方法要多等幾天。看你要快，還是要省。']]),
    after() {if (ST.d.owed > 0) pmCookie()}},
  {seg: 'ret2',
    ring: ['Amy（線材廠）', '「你們的 MOQ 想得怎麼樣了？」', ANSWER],
    lines: () => [['amy', '我是 Amy。你說想談 MOQ，說說看？']],
    mini(done) {
      const opts = [
        ['MOQ 降到一千條，單價可以提高', () => {ST.d.moq = 'high'; pm({profit: -10}); done()}],
        ['同一款線，請你併另一條產品線的單，湊到兩千條', () => {ST.d.moq = 'share'; pm({profit: -3, trust: 3, energy: -3}); done()}],
        ['堅持只買八百條，單價不變', () => {ST.d.moq = 'stubborn'; pm({profit: -20, trust: -5}, '', '堅持只買八百條，不肯跟線材廠談 MOQ'); done()}]];
      /* 得罪了 Maggie，就沒人告訴你可以併單 */
      say([['amy', '你想怎麼談？']], null, {choice: ST.d.cold ? [opts[0], opts[2]] : opts});
    },
    post: () => ST.d.moq === 'high'
      ? [['amy', '一千條，單價五十八。這個我可以做主。']]
      : ST.d.moq === 'share'
        ? [['amy', '併單？可以。兩千條，單價四十九。'], ['amy', '不過要等另一條產品線確認訂單，多等幾天。']]
        : [['amy', '（沉默了一下）八百條的話，我只能當小批量處理，單價九十五。這是我最低的了。']]},
  {seg: 'ret2', to: 'kp', guide: '回報結果，請 KP 批准',
    lines: () => ST.d.moq === 'high'
      ? [['me', '一千條，單價五十八，總共五萬八千元。'],
        ['kp', '貴了一點。但量對了。批。']]
      : ST.d.moq === 'share'
        ? [['me', '和另一條產品線併單，兩千條，單價四十九。我們只負擔八百條，三萬九千兩百元。'],
          ['kp', '（難得點了點頭）這個做法，之後多用。批。']]
        : [['me', '八百條，單價九十五，總共七萬六千元。'],
          ['kp', '九十五？！你知道單價翻了一倍嗎？'],
          ['kp', '你是在逗我嗎？……算了。時間不等人，批。但下次不要再拿這種價格來。']],
    after() {if (ST.d.moq === 'stubborn') pmOwe(); ST.d.day = (ST.d.day || 0) + 21}},
  {seg: 'ret2', to: 'maggie', guide: '回座位', when: () => ST.d.owed > 0,
    lines: () => [['sys', '你回到座位，沒說話。'],
      ['maggie', '單價翻一倍……我只能說，你下次先來找我，我們可以一起想。'],
      ['maggie', '吃片餅乾，會不會好一點？（她遞了一片過來）這一次，吃完之後，你要記得：硬撐不是談判。']],
    after() {pmCookie()}},

  /* ───────── 三週後：貨到了，驗證 ───────── */
  {seg: 'ret3', to: 'warehouse', guide: '去倉庫領貨：點收新到的線材',
    lines: () => [['sys', '倉管把鐵門拉開，指了指棧板：「你的線到了，簽收一下。」'],
      ['sys', '一整個棧板的紙箱，外箱上印著線材廠的名字和你送出去的料號。你拆開一箱，一捆一捆的新線，標籤整整齊齊。'],
      ['sys', '你點了兩遍，數量沒錯。接下來的問題是：這些線，能不能真的用？']],
    after() {pm({energy: -2})}},
  {seg: 'ret3', to: 'grace', guide: '把線材拿到電腦 Team，用樣品機測試',
    lines: () => [['sys', '三週後，線材廠的貨到了。一個大紙箱放在你的座位旁邊，一捆一捆的新線，標籤上印著你送出去的規格。'],
      ['sys', '這三週，你每個禮拜都向 KP、Kai 和 Victor 報了進度。Kai 的訊息，一天比一天短。'],
      ['grace', '貨到了？拿來給我。']],
    mini(done) {
      say([['sys', 'Grace 的樣品機和電表都準備好了，就等你一句話。']], null, {choice: [
        ['請 Grace 用樣品機實際接上去，逐項測', () => {ST.d.tested = true; done()}],
        ['外觀和長度都對了，直接出貨', () => {ST.d.tested = false; pm({energy: 2}); done()}]]});
    },
    post: () => {
      const c = ST.d.careful, t = ST.d.tested;
      if (t && c) {
        ST.d.result = 'clean'; pm({trust: 5}, '通過。');
        return [['sys', 'Grace 把線接上樣品機，電表上的數字穩穩停在 45 瓦。她連續拔插了二十次，又拿線繞著手轉一圈拉扯。'],
          ['grace', '通過。電壓、電流都穩，插拔也沒問題。']];
      }
      if (t && !c) {
        ST.d.result = 'redo';
        return [['sys', 'Grace 把線接上樣品機。平板的充電燈亮了一下，又滅了。電表上的數字停在 15 瓦。'],
          ['grace', '這條線沒有 e-marker，平板只給你十五瓦，一直重開機。'],
          ['grace', '你的規格表上，沒寫要帶 e-marker，也沒寫要 45 瓦。這條線是照你的規格做的，所以……不是廠商的錯。'],
          ['sys', '你看著那條線，覺得三週的等待突然變得很重。']];
      }
      if (c) {
        ST.d.result = 'lucky';
        return [['sys', '你看了標籤，量了長度，每一條都有。Grace 在旁邊欲言又止。'],
          ['grace', '……你真的不測一下？'],
          ['me', '規格我都核對過了，應該沒問題。'],
          ['grace', '（聳肩）好吧。出事你不要找我。']];
      }
      ST.d.result = 'fail';
      return [['sys', '你看了標籤，量了長度，每一條都有，一條條裝箱。Grace 看著你，欲言又止，最後沒說話。']];
    }},
  {seg: 'redo1', to: 'kp', guide: '向 KP 報告：線材沒通過', when: () => ST.d.result === 'redo',
    lines: () => [['sys', '你硬著頭皮去找 KP。'],
      ['me', 'KP，線材測試沒通過。是我規格表沒寫清楚，沒有要求 e-marker，也沒有確認 45 瓦。'],
      ['kp', '……你說什麼？'],
      ['kp', '我等了三週。Kai 被 Victor 催了三週。你告訴我，這三週等到一條不能用的線？'],
      ['kp', '規格表是你簽的字！你連最基本的東西都沒確認！'],
      ['sys', 'KP 把筆重重放在桌上。你什麼也沒說，因為他說得對。'],
      ['kp', '重做。這次，每一個數字都要對。我不想再聽到「沒確認」這三個字。']],
    after() {pmOwe(); pm({trust: -12, profit: -10, cust: -5}, '三週，白等了。', '第一次的規格沒有寫對，讓整個專案白等了三週')}},
  {seg: 'redo1', to: 'maggie', guide: '回座位', when: () => ST.d.result === 'redo',
    lines: () => [['sys', '你回到座位，把頭埋進手裡。'],
      ['maggie', '我聽到了。這次是真的有錯，沒什麼好辯解的。'],
      ['maggie', '但你至少在出貨之前就抓到了。如果那條線送到客戶現場……'],
      ['maggie', '要不要吃個餅乾？也許會好一點。（她打開鐵盒）吃完，我們重新來一次。這次，每一項都跟 Grace 一起量。']],
    after() {pmCookie(); ST.d.careful = true; ST.d.redone = true; ST.d.day = (ST.d.day || 0) + 14}},
  {seg: 'redo2', to: 'grace', guide: '把重做的線拿給 Grace 測試', when: () => ST.d.result === 'redo',
    lines: () => [['sys', '兩週後。這次，你和 Grace 把實機、電表、規格表擺在一起，一項一項對。Ethan 重畫了線材，Amy 把交期壓到兩週。'],
      ['sys', '新的線接上樣品機，電表上的數字穩穩停在 45 瓦。插拔二十次，沒有問題。'],
      ['grace', '通過。'],
      ['grace', '這才叫一條線。']],
    after() {ST.d.tested = true; pm({trust: 5})}},

  /* ───────── 出貨與客戶回饋 ───────── */
  {seg: 'ret4', to: 'kai', guide: '請 Kai 安排寄出',
    lines: () => [['kai', ST.d.result === 'fail' || ST.d.result === 'lucky' ? '線沒問題了？終於！客戶那邊的人天天問我。' : '線過了？終於！客戶那邊的人天天問我。'],
      ['kai', '這批怎麼寄？空運一兩天到，運費很貴；一般出貨三五天，便宜，但客戶要再等。']],
    mini(done) {
      say([['kai', '你決定。']], null, {choice: [
        ['空運，讓客戶盡快上線', () => {ST.d.ship = 'air'; pm({profit: -6, cust: 4}); done()}],
        ['一般出貨，成本壓低', () => {ST.d.ship = 'normal'; pm({profit: -1}); done()}]]});
    },
    post: () => ST.d.ship === 'air'
      ? [['kai', '好，我馬上訂。我來跟 Victor 講：線，明天就到。']]
      : [['kai', '好吧。我跟 Victor 說三天內到，他應該會鬆口氣。']],
    after() {ST.d.day = (ST.d.day || 0) + 8}},
  {seg: 'ret5',
    ring: ['Mr. Huang（終端客戶）', '「線收到了。」', ANSWER],
    lines: () => {
      const r = ST.d.result;
      if (r === 'fail') return [['huang', '線收到了。……我接上去，充電燈亮一下就滅。你們是不是又搞錯了？'],
        ['huang', '我現場的人已經等了好幾個禮拜！你們到底有沒有測過？！'],
        ['sys', '你握著話筒，什麼也說不出來。']];
      if (r === 'redo') return [['huang', '線收到了。我自己接上去試的，電量滿滿。'],
        ['huang', '比我想的晚很多。但這次是對的。現場十五台，昨天下午全部上線了。'],
        ['huang', '我不管是誰的錯。你們能把事情處理到這樣，我記住了。']];
      return [['huang', '線收到了。我自己接上去試的，電量滿滿。'],
        ['huang', '現場十五台，昨天下午全部上線了。我不管是誰的錯，你們把事情處理到這樣，我記住了。']];
    },
    after() {
      const r = ST.d.result;
      if (r === 'fail') pm({cust: -25, trust: -10}, '客戶現場又斷電了。', '出貨前沒有實測，錯誤一路送到客戶現場');
      else if (r === 'redo') pm({cust: 6}, '遲了，但對了。');
      else if (r === 'lucky') pm({cust: 12}, '這次，運氣站在你這邊。');
      else pm({cust: 15, trust: 5}, '這就是做對的樣子。');
    }},
  {seg: 'ret5', to: 'kp', guide: '向 KP 報告：客戶出狀況', when: () => ST.d.result === 'fail',
    lines: () => [['kp', '我剛接到 Victor 的電話。'],
      ['kp', '你連樣品機都沒測就出貨？Grace 說，她問過你。'],
      ['kp', '這件事我現在不想跟你講理。你先回座位，把報告寫完：為什麼會又錯一次。']],
    after() {pmOwe(); pm({trust: -15}, '', '沒有用樣品機實測就出貨，同樣的錯誤再次發生')}},
  {seg: 'ret5', to: 'maggie', guide: '回座位', when: () => ST.d.result === 'fail',
    lines: () => [['sys', '你回到座位，盯著空白的報告。'],
      ['maggie', '這次，真的很慘。'],
      ['maggie', '但錯誤只有在你不再犯的時候，才有價值。吃個餅乾會不會好一點？（她把鐵盒推到你面前）'],
      ['maggie', '寫報告的時候，把「哪一步可以抓到」寫進去。這比道歉有用。']],
    after() {pmCookie()}},
  {seg: 'ret5', to: 'kp', guide: '向 KP 報告：客戶上線了', when: () => ST.d.result !== 'fail',
    lines: () => ST.d.result === 'clean'
      ? [['kp', '客戶的回饋我看了。'], ['kp', '說實話，一開始我以為你撐不過第一個月。'], ['kp', '這次做得很好。從頭到尾每一步都有確認，這就是我要的 PM。']]
      : ST.d.result === 'lucky'
        ? [['kp', '客戶上線了。我先說一句：做得不錯。'], ['kp', '但 Grace 說，你沒有實測。這次是你規格寫得好，不是流程保險。下次，測。']]
        : [['kp', '客戶上線了。'], ['kp', '第一次錯，我是真的生氣。但你自己抓到、自己重做，沒有躲，這一點我記得。'], ['kp', '下次，一次做對。']],
    after() {pm({trust: ST.d.result === 'clean' ? 8 : 3}, 'KP 的肯定。')}},
  {seg: 'ret5', end: true,
    lines: () => [['sys', ST.d.result === 'fail' ? '線材風波暫時告一段落。但這份報告，你得好好寫。' : '線材風波，到這裡告一段落。客戶上線了，你的手機終於安靜了。']]}
];

/* 兩章：開頭選一章。第一章的事只在選第一章時發生 */
/* 故事清單：加一章就在這裡加一行，「桌上有幾件事」會自己跟著變。id 是故事檔裡用的章號（跟順序無關） */
const PMCH = [{id: 1, t: '第一章：線材風波，接手爛攤子', s: '線材風波'}, {id: 3, t: '第二章：新品推出，為公司創造營收', s: '新品推出'},
  {id: 2, t: '第三章：型錄風暴，業務行銷與你', s: '型錄風暴'}, {id: 4, t: '第四章：客製新案，和客戶報價', s: '客製新案'},
  {id: 5, t: '第五章：薪水小偷，上班族的一天', s: '薪水小偷'}];
const PMNUM = ['', '一', '兩', '三', '四', '五', '六', '七', '八'];
STORY.segs.menu = {name: '今天要處理哪一件事', sub: PMNUM[PMCH.length] + '個故事都在棲光科技。順序沒關係。', t: 520, mood: 'day', scene() {pmCast({})}};
STORY.beats.forEach(b => {const w = b.when; b.when = () => ST.d.chapter !== 2 && ST.d.chapter !== 3 && ST.d.chapter !== 4 && ST.d.chapter !== 5 && (!w || w())});
STORY.beats.unshift({seg: 'menu', when: () => !ST.d.chapter,
  lines: () => [['sys', '棲光科技的早上。你的桌上有' + PMNUM[PMCH.length] + '件事在等你。']],
  mini(done) {
    say([['sys', '先處理哪一件？']], null, {fixed: true, choice: PMCH.map(c => [c.t, () => {ST.d.chapter = c.id; done()}])});
  }});

/* 導師 Maggie 的對話：得罪她之後，全部換成冷淡的一句（餅乾也不會有） */
STORY.beats.forEach(b => {
  if (b.to === 'maggie' && b.seg !== 'open' || (b.seg === 'open' && b.to === 'maggie' && b.guide.indexOf('回座位') === 0)) {
    pmGiveWrap(b); const f = b.lines; b.lines = () => ST.d.cold ? pmM() : f();
  }
});

/* 結算卡：照實際發生的事寫 */
STORY.ending = () => {
  if (ST.d.chapter === 2) return STORY.ending2();
  if (ST.d.chapter === 3) return STORY.ending3();
  if (ST.d.chapter === 4) return STORY.ending4();
  if (ST.d.chapter === 5) return STORY.ending5();
  const d = ST.d, day = d.day || 0, weeks = Math.max(1, Math.ceil(day / 7)), res = d.result || 'clean', cookies = d.cookies || 0;
  const title = res === 'fail' ? '線材又錯了一次'
    : d.path === 'adapter' ? '繞了一大圈，還是把線換對了'
    : res === 'redo' ? '差點又錯一次，幸好有人把關'
    : res === 'lucky' ? '這次運氣好，下次要測'
    : d.path === 'split' ? '先搞清楚，再動手' : '把事情做對';
  const spec = d.redone ? '第一次沒寫對，重做一次' : d.careful ? '逐項量過' : '照業務給的資訊填';
  const test = d.tested ? '樣品機實測' : '沒有實測';
  const lines = [
    d.path === 'return' ? '你一開始就選了全數回收：最乾淨，也最貴。'
      : d.path === 'adapter' ? (d.written ? '你先附了轉接頭，也留了書面同意。但客戶不接受，事情還是鬧到了總裁那裡。' : '你先附了轉接頭，但沒有留書面同意。客戶不接受，事情鬧到了總裁那裡，你手上沒有任何紀錄。')
      : '你先一通一通電話問出了真正的規格，才開始做線。',
    res === 'clean' ? '規格逐項量過，出貨前又用樣品機實測。客戶現場全部上線。'
      : res === 'lucky' ? '規格是對的，所以這一次沒事。但你沒有實測，下一次不一定這麼幸運。'
      : res === 'redo' ? '第一次的規格沒寫清楚，三週後才在樣品機上發現。你重做了一次，這次每一項都對了。'
      : '規格沒寫清楚，出貨前又沒有實測。錯誤一路送到了客戶現場。',
    d.cold ? '你一開始就對 Maggie 說了重話。之後不管被罵得多慘，她只剩下酸言酸語，也沒有再教你什麼。' : cookies ? '這一路上，你吃了 ' + cookies + ' 片餅乾。每一片，都是被罵之後才有的。' : '這一路上，你一片餅乾也沒吃到。'
  ];
  return {
    title, led: '線材風波', sub: '第一章結束。從出事到收尾，花了 ' + weeks + ' 個禮拜。',
    more: [pmWho(), '規格：' + spec, '驗證：' + test],
    tl: [['Day 1', '客戶現場出事'], ['Day ' + ((d.rday || 0) + 1), '決定換線'], ['Day ' + (day + 1), '客戶回饋']],
    stats: [['團隊信任', pmShow('trust')], ['客戶滿意', pmShow('cust')], ['利潤', pmShow('profit')], ['精力', pmShow('energy')], ['餅乾', String(cookies)], ['耗時（週）', String(weeks)]],
    lines,
    share: '《PM 的一天》第一章「' + title + '」：' + weeks + ' 週、' + cookies + ' 片餅乾。'
  };
};

/* 跟不是下一步要找的人說話：每個人一兩句日常 */
const PMIDLE = {
  kp: ['說重點。', '我現在沒空。'],
  maggie: ['有問題隨時問我。', '先把手上的事做完，再來找我。'],
  kai: ['（頭也沒抬）別擋著我打電話。'],
  ethan: ['你要問什麼，先想清楚再來。'],
  grace: ['需要測試的東西，拿來我這裡。'],
  lena: ['等一下，我在想另一個方向。', '我覺得還可以更好。'],
  zoe: ['我在排版，等一下好嗎？'],
  ian: ['要東西，先給我 brief。'],
  hank: ['我這邊的客戶也有類似的需求，之後再聊。'],
  nora: ['你們先準備好，我們會議室見。']
};
STORY.talk = id => {
  const L = PMIDLE[id];
  if (!L || busy || !ST.on) return false;
  busy = true; showGuide();
  say([[id, L[(ST.talks || 0) % L.length]]], () => {busy = false; showGuide()}, {end: '離開'});
  return true;
};
