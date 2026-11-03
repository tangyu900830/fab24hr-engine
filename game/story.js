/* PM 的一天：第一幕「接手的爛攤子」。
   STORY.segs  一天裡的幾個時刻（字卡上的名字、副標、開始的時間＝午夜起算的分鐘、光線）
   STORY.beats 一次一件事：去找誰（to）、「下一步」那一行（guide）、講什麼（lines）、
               選擇（mini）、選擇之後講什麼（post）、世界怎麼變（after）。
   ST.d 記玩家選了什麼、四個數值、餅乾；結算照它寫。
   後面的幾幕（型錄風暴、報價鋼索、向副總報告）之後再接在這幕後面。 */

/* 四個數值，起始值。沒有被改過的就用這個。 */
const PMBASE = {trust: 50, cust: 50, profit: 50, energy: 70};
function pmStat(k) {return ST.d[k] == null ? PMBASE[k] : ST.d[k]}
function pmBump(k, v) {ST.d[k] = Math.max(0, Math.min(100, pmStat(k) + v))}

STORY.segs = {
  open: {name: '接手的爛攤子', sub: '週二早上，你接手這條產品線的第二個禮拜。', t: 520, mood: 'day',
    scene() {W.show('sales', ST.q >= 1)}}
};

STORY.beats = [
  {seg: 'open', to: 'lan', guide: '跟隔壁的小嵐打招呼',
    lines: () => [['sys', '週二早上八點四十。你接手這條工業電腦產品線的第二個禮拜，桌上還留著上一任 PM 的便利貼。'],
      ['lan', '早！第二週了，還活著嗎？'],
      ['me', '還活著。便利貼比我的待辦清單還多。'],
      ['lan', '抽屜裡有餅乾。要是今天有人大聲說話，記得來找我。'],
      ['lan', '……我說「要是」啦。']],
    after() {if (W) W.show('sales', true)}},
  {seg: 'open', to: 'boss', guide: '去經理的座位，看看發生什麼事',
    ring: ['業務 阿凱', '「客戶那邊出事了！你快來經理這裡！」', '過去看看'],
    lines: () => [['sys', '你還沒走到，就聽見業務阿凱的聲音。半層樓都聽得見。'],
      ['sales', '經理，客戶收到貨了！配套的工業平板，沒辦法插我們附的 DC 圓頭線！'],
      ['sales', '他們現場只有 Type-C 的電源可以用，整批貨卡在客戶倉庫，沒辦法上線！'],
      ['sales', '規格表到底有沒有人檢查過？'],
      ['boss', '先冷靜。這是上一個專案留下來的問題。'],
      ['boss', '你接手了，這件事由你處理。']],
    mini(done) {
      say([['boss', '說吧，你打算怎麼辦？']], null, {choice: [
        ['全數回收，換成正確的線', () => {
          ST.d.cable = 'return'; pmBump('trust', 10); pmBump('cust', -5); pmBump('profit', -15); pmBump('energy', -10);
          toast('信任 ↑　客戶 ↓　利潤 ↓↓', '回收是最乾淨的做法，也最貴。'); done()}],
        ['先附 Type-C 轉接頭出貨，之後補線', () => {
          ST.d.cable = 'adapter'; pmBump('trust', -5); pmBump('cust', -10); pmBump('profit', -5); pmBump('energy', -5);
          toast('信任 ↓　客戶 ↓↓　利潤 ↓', '最快，但留下一個之後要還的債。'); done()}],
        ['先逐一問客戶的機型，分批處理', () => {
          ST.d.cable = 'split'; pmBump('trust', 5); pmBump('cust', 5); pmBump('profit', -8); pmBump('energy', -20);
          toast('信任 ↑　客戶 ↑　精力 ↓↓', '最準，但要花最多力氣。'); done()}]]});
    },
    post: () => ST.d.cable === 'return'
      ? [['me', '全數回收，換成正確的線。重新驗證要三個禮拜，這段時間我會跟客戶保持聯繫。'],
        ['sales', '三個禮拜？！客戶會瘋掉！'],
        ['boss', '做對比做快重要。客戶那邊我來說明，你把時程排出來給我。'],
        ['sys', '阿凱臉很臭，但沒再多說什麼。你的桌上多了一份要排的時程表。']]
      : ST.d.cable === 'adapter'
        ? [['me', '先附 Type-C 轉接頭，讓客戶今天就能上線。正式的線我再補寄。'],
          ['sales', '這個可以！客戶今天就能用！'],
          ['boss', '可以，但轉接頭是權宜之計。我要看到補線的日期。'],
          ['sys', '阿凱鬆了一口氣。你心裡卻有點不踏實：客戶看到那顆轉接頭，會怎麼想？']]
        : [['me', '不是每個客戶都用同一種平板。我先逐一問機型，需要的才換。'],
          ['boss', '好，那就辛苦你。中午前給我名單。'],
          ['sales', '我幫你問幾個比較熟的客戶。'],
          ['sys', '你花了一整個上午打電話。有幾個客戶其實用得上 DC 圓頭線，不用換。但你的喉嚨也乾了。']],
    after() {if (W) W.walk('sales', 'aisle')}},
  {seg: 'open', to: 'lan', guide: '回座位，小嵐在對你招手',
    lines: () => (ST.d.cable === 'return'
      ? [['sys', '你回到座位，整個人癱在椅子上。'], ['lan', '我聽說了。回收這個決定不好做，但你扛下來了。']]
      : ST.d.cable === 'adapter'
        ? [['sys', '你回到座位，整個人癱在椅子上。'], ['lan', '我聽到阿凱的聲音了……你還好嗎？'], ['lan', '這個決定很實際，至少客戶今天能用。']]
        : [['sys', '你回到座位，整個人癱在椅子上。'], ['lan', '你一個上午都在講電話？喝水了嗎？'], ['lan', '不管有沒有，先吃餅乾。']])
      .concat([['lan', '來，餅乾。'], ['sys', '你咬了一口。奶油的，有點碎，剛剛好。'], ['me', '……謝謝。']]),
    after() {
      pmBump('energy', 15); ST.d.cookies = (ST.d.cookies || 0) + 1;
      toast('餅乾 +1', '精力回復了一點');
    }},
  {seg: 'open', end: true, t: 600,
    lines: () => [['sys', '才十點。下午還有型錄會議，客戶還在等報價，傍晚還要向副總報告。']]}
];

/* 結算卡：照實際發生的事寫。這是第一幕的版本，後面幾幕接上之後再重寫。 */
STORY.ending = () => ({
  title: ST.d.cable === 'return' ? '你選擇把事情做對' : ST.d.cable === 'adapter' ? '你選擇先讓客戶動起來' : '你選擇先搞清楚再動手',
  tl: [[clockOf(STORY.segs.open.t), STORY.segs.open.name]],
  sub: '第一幕結束。後面還有三幕。',
  stats: [['團隊信任', pmStat('trust')], ['客戶滿意', pmStat('cust')], ['利潤', pmStat('profit')], ['精力', pmStat('energy')], ['餅乾', ST.d.cookies || 0]],
  lines: [ST.d.cable === 'return'
      ? '全數回收：線材對了，但交期多了三個禮拜，利潤也吃了一大塊。經理看在眼裡。'
      : ST.d.cable === 'adapter'
        ? '轉接頭讓客戶今天就能上線。但「補線」這個承諾，之後一定會有人來問。'
        : '你一通一通電話問出來，有些客戶其實不用換。事情處理得準，只是一個上午就這樣沒了。',
    '小嵐的餅乾還是有用的。']
});

/* 跟不是下一步要找的人說話 */
STORY.talk = id => false;
