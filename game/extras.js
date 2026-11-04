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

/* ───────── 茶水間：咖啡、餅乾、八卦 ───────── */
const PMX_WHO = ['zoe', 'hank', 'ian', 'grace', 'ethan'];
const PMX_GOSSIP = [
  '聽說 KP 跟 Nora 副總最近為了預算吵得不太愉快。KP 昨天從副總辦公室出來，臉很臭。',
  'Kai 跟 Lena 上次為了展覽預算，在會議室差點吵起來，最後是 Walter 出面打的圓場。',
  'Ian 一個人服務三個部門，聽說他跟行銷為了 brief 不清楚已經冷戰一陣子了。',
  'Grace 和 Ethan 常常為了搶同一台測試機排隊，上個月還為了誰先用差點冷戰。',
  'Walter 總裁表面不太管事，其實誰的報告準不準時，他都記得。',
  'Owen 那邊的機殼廠，報價喜歡先喊最高價，看你怎麼回再往下讓。',
  '聽說 Maggie 最近被別的公司挖角了，不知道是真是假。'];
const PMX_TIPS = {
  1: '規格如果不確定，直接打電話問客戶現場的人，比聽轉述準。而且做完要用實機測，不然就是賭運氣。',
  2: 'Ian 要的是一頁 brief：要什麼、給誰看、幾張、什麼時候。三句話就夠，不要丟一堆檔案給他。',
  3: 'Nora 開會只看數字和下一步。先講事實，再講計畫，不要先講「好消息」。',
  4: '客戶都會殺價，Cora 的預算大概在六百美金上下。她的採購喜歡拿數量換折扣，別直接降價。'};

function pmxPantry() {
  return pmxVisit('pantry', () => {
    busy = true; showGuide();
    say([['sys', '茶水間的咖啡機旁貼著「免費」。吧台上有一盤手工餅乾，幾個同事正在聊天。']], null, {choice: [
      ['倒一杯免費咖啡', () => pmxCoffee()],
      ['拿一片餅乾', () => pmxCookie()],
      ['找同事聊聊（八卦指數 ' + (ST.d.gos || 0) + '）', () => pmxChat()],
      ['走開', pmxFree]]});
  });
}
function pmxCoffee() {
  if (ST.d.cof === ST.seg) {say([['sys', '你剛喝過一杯了。再喝下去，今晚會睡不著。']], pmxFree); return}
  ST.d.cof = ST.seg; pmBump('energy', 8); toast('免費咖啡', '精力回復了一點');
  say([['sys', '你按下按鈕。咖啡機轟轟響了一陣，一杯熱咖啡掉進杯子裡。香味出來的時候，肩膀鬆了一點。']], pmxFree);
}
function pmxCookie() {
  if (ST.d.cok === ST.seg) {say([['sys', '盤子裡的餅乾，已經被你拿過一片了。']], pmxFree); return}
  ST.d.cok = ST.seg; pmBump('energy', 4); toast('餅乾', '精力回復了一點');
  say([['sys', '餅乾還有一點溫度，不知道是誰烤的。你咬了一口，好吃。']], pmxFree);
}
function pmxChat() {
  const n = ST.d.gos || 0, who = PMX_WHO[n % PMX_WHO.length], nn = n + 1;
  if (W) {W.put(who, n % 2 ? 'pt2' : 'pt1'); W.show(who, true)}
  const kind = nn >= 3 && nn % 3 === 0 ? 'tip' : nn >= 5 && nn % 2 === 1 ? 'sour' : 'gossip';
  ST.d.gos = nn;
  let L;
  if (kind === 'tip') L = [[who, '欸，我跟你說一件有用的。'], [who, PMX_TIPS[ST.d.chapter] || PMX_TIPS[1]], ['sys', '你把這句話記了下來。這是聽八卦聽久了才有的收穫。']];
  else if (kind === 'sour') L = [[who, '（笑了一下）你怎麼什麼都想問？'], ['sys', '你發現旁邊的人換了話題，聲音也壓低了。你好像聽太多了。']];
  else {
    const gi = ST.d.gi || 0; ST.d.gi = gi + 1;
    L = [[who, '你也來倒咖啡？我跟你說一件事，不要說是我說的。'], [who, PMX_GOSSIP[gi % PMX_GOSSIP.length]]];
  }
  say(L, () => {
    if (kind === 'sour') pm({trust: -3}, '同事覺得你太八卦。');
    else if (kind === 'tip') pm({trust: 1, cust: 2});
    toast('八卦指數 ' + nn, kind === 'tip' ? '這次聽到有用的資訊' : kind === 'sour' ? '太八卦，信任降低' : '又聽到一件事');
    pmxFree();
  }, {end: '離開'});
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
STORY.talk = id => id === 'pantry' ? pmxPantry() : id === 'mdesk' && ST.d.mgone ? pmxMdesk() : pmxTalk0(id);
const pmxNear0 = MOVE.near;
MOVE.near = () => {
  const r = pmxNear0();
  if (r || !W || !ST.on) return r;
  const s = W.snap(), at = id => Math.hypot(STORY.places[id].at[0] - s.me[0], STORY.places[id].at[1] - s.me[1]);
  if (at('pantry') < 2.4) return ['pantry', '茶水間：咖啡・餅乾'];
  if (ST.d.mgone && at('mdesk') < 2.0) {
    if (ST.d.mtoast !== ST.seg) {ST.d.mtoast = ST.seg; toast('Maggie 的座位', ST.d.mwhy === 'hard' ? '空的。你的腳步慢了下來。' : '空的。桌上還留著一個餅乾盒。')}
    return ['mdesk', 'Maggie 的座位'];
  }
  return null;
};

/* ───────── Maggie 離職的時候，她的事件全部跳過 ───────── */
STORY.beats.forEach(b => {if (b.to === 'maggie') {const w = b.when; b.when = () => !ST.d.mgone && (!w || w())}});

/* ───────── 被資遣、Maggie 離職：包住每一章的結尾 ───────── */
const pmxFired = () => !!ST.d.fired || ((ST.d.chapter === 1 || ST.d.chapter === 2) && (ST.d.neg || 0) >= 3 && pmStat('trust') <= 30);
const pmxHard = () => (ST.d.neg || 0) >= 2 && pmStat('trust') <= 40;
const pmxLeave = () => !pmxFired() && !ST.d.mgone && (pmxHard() || (ST.d.nch || 0) >= 2);
STORY.beats.filter(b => b.end).forEach(b => {const w = b.when; b.when = () => !pmxFired() && !pmxLeave() && (!w || w())});

STORY.segs.hr = {name: '人資面談', sub: '大會議室 A。KP 旁邊，坐著人資 Tina。', get t() {return ST.clock + 40}, mood: 'day', scene() {pmCast({kp: 'mt2', tina: 'mt1'})}};
STORY.segs.mgb = {name: 'Maggie 的最後一天', sub: '下班前。', get t() {return ST.clock + 40}, mood: 'eve', scene() {pmCast({})}};

STORY.beats.push.apply(STORY.beats, [
  {seg: 'hr', to: 'meeting', guide: 'KP 請你去大會議室 A 一趟', when: pmxFired,
    ring: ['KP（主管）', '「請你來大會議室 A 一趟。」', '過去看看'],
    lines: () => [['sys', '你走進大會議室 A。KP 坐在長桌一邊，旁邊是人資 Tina，桌上放著一個資料夾。'],
      ['kp', '請坐。今天找你來，是要正式跟你說一件事。'],
      ['kp', ST.d.chapter === 1 ? '這個月，線材的錯誤一路送到客戶現場，客戶差點終止合作。我們討論過很多次，同樣的問題還是一再發生。'
        : '這幾個月，業務、行銷和 RD 之間的信任，已經沒有辦法再靠你補回來了。同樣的狀況，我們談過很多次。'],
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
      ['maggie', '來，最後一片。']]},
  {seg: 'hr', end: true, when: pmxFired,
    lines: () => [['sys', '你把識別證放在桌上，抱著小紙箱走出大門。回頭看了一眼，辦公室的燈還亮著。']]},

  {seg: 'mgb', to: 'maggie', guide: 'Maggie 想在下班前跟你說話', when: () => pmxLeave(),
    ring: ['Maggie', '「下班前，有空嗎？我有話想跟你說。」', '過去看看'],
    lines: () => {
      const hard = pmxHard(); ST.d.mwhy = hard ? 'hard' : 'plan';
      return hard
        ? [['sys', '下班前，Maggie 把椅子轉過來。她今天沒有拿出餅乾鐵盒。'],
          ['maggie', '有件事，我想親口跟你說。我下個月要調去別的單位了。'],
          ['maggie', '我想了很久。帶新人這件事……我可能沒有自己想的那麼會。每次幫你收完爛攤子，我都覺得自己沒有真的幫到你。'],
          ['maggie', '你有你的步調，我跟不上。這樣對你、對我，都不公平。']]
        : [['sys', '下班前，Maggie 把椅子轉過來，手裡拿著餅乾鐵盒。'],
          ['maggie', '我要跟你說一件好事，也是一件有點捨不得的事。我拿到另一家公司的產品總監職缺，下個月到職。'],
          ['maggie', '這幾次案子，我看著你跌倒、站起來。你已經不是剛來的那個新人了。']];
    },
    mini(done) {
      say([['sys', ST.d.mwhy === 'hard' ? '你不知道該說什麼。' : '你的喉嚨有點緊。']], null, {choice: ST.d.mwhy === 'hard'
        ? [['對不起，是我讓你這麼累。', () => {ST.d.mresp = 'sorry'; done()}], ['我會記得你教過我的東西。', () => {ST.d.mresp = 'thanks'; done()}], ['請你再考慮一下。', () => {ST.d.mresp = 'stay'; done()}]]
        : [['恭喜你！我會想念你的。', () => {ST.d.mresp = 'thanks'; done()}], ['你走了，我怎麼辦？', () => {ST.d.mresp = 'stay'; done()}], ['謝謝你，真的。', () => {ST.d.mresp = 'sorry'; done()}]]});
    },
    post: () => ST.d.mwhy === 'hard'
      ? (ST.d.mresp === 'sorry' ? [['maggie', '不用道歉。這不是誰的錯，只是……我們不合適。']]
        : ST.d.mresp === 'thanks' ? [['maggie', '（眼眶有點紅）嗯。好好照顧自己。']] : [['maggie', '我考慮過了。謝謝你還願意這樣說。']])
      : (ST.d.mresp === 'thanks' ? [['maggie', '我也會想念這個位子。']] : ST.d.mresp === 'stay' ? [['maggie', '你比你自己以為的強，記得這一點。']] : [['maggie', '不用謝。把餅乾鐵盒留給你。']]),
    after() {ST.d.mgone = true; pmBump('energy', ST.d.mwhy === 'hard' ? -8 : -4)}},
  {seg: 'mgb', end: true, when: () => !!ST.d.mgone && !pmxFired(),
    lines: () => ST.d.mwhy === 'hard'
      ? [['sys', '隔天，Maggie 的座位空了。桌上只剩一個空的餅乾鐵盒，和一張沒撕下來的便利貼。你經過的時候，腳步慢了下來。'], ['sys', '你想起那些你沒有好好聽進去的話。']]
      : [['sys', '隔天，Maggie 的座位空了。桌上留了一個餅乾鐵盒，和一張便利貼：「加油，你可以的。」你經過的時候，笑了一下，又有點鼻酸。']]}
]);

/* ───────── 結算：資遣的結算卡，以及「接著玩別的故事」 ───────── */
function pmxFiredEnding() {
  const d = ST.d, weeks = Math.max(1, Math.ceil((d.day || 0) / 7)), cookies = d.cookies || 0;
  return {
    title: '資遣通知', led: '被資遣', sub: '人資 Tina 把文件推到你面前。',
    more: ['選到很差的選項 ' + (d.neg || 0) + ' 次', '團隊信任 ' + pmStat('trust')],
    tl: [['Day 1', '接手'], ['Day ' + Math.max(1, weeks * 7), '資遣面談']],
    stats: [['團隊信任', pmStat('trust') + '/100'], ['選到很差的選項', (d.neg || 0) + ' 次'], ['在公司（週）', String(weeks)], ['餅乾', String(cookies)]],
    lines: [
      d.fireResp === 'learn' ? '面談的時候，你問了 KP 哪些地方可以學。這是你當天做得最好的一件事。' : d.fireResp === 'beg' ? '你請求再給一次機會。KP 說，機會不是沒給過。' : '你當場說「這不公平」，Tina 靜靜等你說完。',
      'Maggie 說過：被罵不代表你做錯，被資遣也不代表你這個人不行。下一份工作，你會帶著這次的教訓。',
      '這是一個遊戲。選到很差的選項，是為了讓你看見後果；真正的職場，不會只因為幾個選擇就決定一個人。'],
    share: '《PM 的一天》：選了太多很差的選項，我被資遣了。'
  };
}
const pmxEnding0 = STORY.ending;
STORY.ending = () => {
  const d = ST.d, E = d.fired ? pmxFiredEnding() : pmxEnding0();
  d.nch = (d.nch || 0) + 1;
  if (!d.fired && d.mgone && d.mwhy && d.nch >= 1 && !d.mshown) {
    d.mshown = true;
    E.lines = (E.lines || []).concat([d.mwhy === 'hard' ? 'Maggie 在這之後調走了。她的座位空了，你經過的時候，會慢下腳步。' : 'Maggie 去了新的地方。她的座位空了，餅乾鐵盒還留著。']);
  }
  E.next = PMCH.filter(c => c.id !== d.chapter).map(c => ['接著玩：' + c.s, () => pmxPlay(c.id)]);
  return E;
};
/* 直接開始另一個故事（保留：Maggie 是否離職、這次連續玩了幾章、八卦指數） */
function pmxPlay(id) {
  const o = ST.d, keep = {chapter: id, nch: o.fired ? 0 : o.nch || 0, gos: o.gos || 0, gi: o.gi || 0};
  if (o.mgone && !o.fired) {keep.mgone = true; keep.mwhy = o.mwhy; keep.mshown = true}
  Object.assign(ST, {d: keep, talks: 0}); boot0(ST.name);
  ST.q = nextIndex(0);
  const seg = STORY.beats[ST.q].seg; ST.clock = STORY.segs[seg].t || 0; save();
  enterSeg(seg, () => keep.mgone
    ? say([['sys', keep.mwhy === 'hard' ? '你走進辦公室。Maggie 的座位是空的。你不太敢看它。' : '你走進辦公室。Maggie 的座位是空的，桌上的餅乾鐵盒還在。']], beginBeat)
    : beginBeat());
}
