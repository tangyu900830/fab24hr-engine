/* 第三章「新品沒人買」。
   前半：你負責一台新產品 QC-1（給工廠現場放平板的 DIY 模組化推車），要跑 EVT → PVT → MP、設計包材、做落摔測試。
   後半：上市三個月，賣不動。老闆要你寫 Brutal Fact 報告，找新的市場機會，最後向副總 Nora 報告。
   ST.d 記：table（桌板材質）、evt（EVT 的問題怎麼處理）、pack（包材）、sop（PVT 包裝流程）、webinar（上市活動時間）、cost（每台成本，美元）、
   frame（報告怎麼寫）、pipe（樣品怎麼算進漏斗）、dani（經銷商來電怎麼回）、mkt（新市場）、trial（試用方案）、plan（向副總怎麼報告）、
   result（up／one／cut）、trust／cust／profit／energy、owed／cookies、day。
   這一章的細節參考真實 PM 工作常碰到的事（降成本先看前幾大成本、樣品寄出不等於成交、漏斗、跨產品線共推、免費試用、副總要數字），
   公司、人名、產品名都是虛構的。 */

const pm3Cast = o => pmCast(Object.assign({hank: 'hk', kai: 'kaiD'}, o));
const pm3Ch = b => {const w = b.when; b.when = () => ST.d.chapter === 3 && (!w || w()); return b};

STORY.segs.c3a = {name: '新產品：QC-1', sub: '一台給工廠現場放平板的 DIY 模組化推車。這是你接手後，第一個從零開始的案子。', t: 540, mood: 'day', scene() {pm3Cast({})},
  note: 'EVT 的目的是找問題，不是證明沒問題。'};
STORY.segs.c3b = {name: '試產 PVT', sub: '工廠試跑一百台。', get t() {return pmDay(10, 0)}, mood: 'day', scene() {pm3Cast({})},
  note: '去現場看流程，比在會議室聽簡報看到的多。'};
STORY.segs.c3c = {name: '量產前', sub: '行銷想搶在對手前面辦活動。', get t() {return pmDay(14, 0)}, mood: 'day', scene() {pm3Cast({lena: 'mk2'})}};
STORY.segs.c3d = {name: '三個月後', sub: 'QC-1 上市了，但訂單沒有來。', get t() {return pmDay(9, 30)}, mood: 'day', scene() {pm3Cast({})},
  note: '寄出樣品，不等於快要成交。'};
STORY.segs.c3e = {name: '找新的出路', sub: '同一個產品，換一個地方，也許就有人要。', get t() {return pmDay(14, 0)}, mood: 'day', scene() {pm3Cast({})}};
STORY.segs.c3f = {name: '向副總報告', sub: '大會議室 A。Nora 只聽重點，只問數字。', get t() {return pmDay(15, 0)}, mood: 'day',
  scene() {pm3Cast({nora: 'mtw', kp: 'mt2', kai: 'mt3', hank: 'mt1'})}};

STORY.beats.push.apply(STORY.beats, [
  /* ───────── 一：QC-1 啟動、EVT ───────── */
  {seg: 'c3a', to: 'kp', guide: '去 KP 辦公室，聽新案子',
    lines: () => [['sys', '週一早上，KP 把你叫進辦公室，桌上放著一份一頁的企劃：《QC-1 快裝推車》。'],
      ['kp', 'QC-1。給工廠現場放平板和掃描槍的 DIY 推車，客戶自己選配、自己組。Kai 說，客戶一直在問有沒有便宜、好組的推車。'],
      ['kp', '這是你第一個從頭到尾自己帶的案子：跟 RD 談規格，跑 EVT、PVT、MP，設計包材，做落摔測試。'],
      ['kp', '目標成本：每台美金 280 以內。老闆很看好這個產品，覺得 DIY 就是容易賣。'],
      ['kp', '桌板是整台成本最大的一塊之一。你先決定：桌板用什麼。']],
    mini(done) {
      say([['sys', '桌板的材質，會影響成本，也會影響客戶第一眼的感覺。']], null, {choice: [
        ['耐刮、耐酒精的複合板：質感好，但最貴', () => {ST.d.table = 'laminate'; pm({profit: -8, cust: 4}); done()}],
        ['複合板但改薄一點（12 毫米改 10 毫米），強度要 RD 確認', () => {ST.d.table = 'thin'; pm({profit: -3, trust: 2}); done()}],
        ['沖壓鋼板加烤漆：最便宜，質感普通', () => {ST.d.table = 'steel'; pm({profit: 4, cust: -3}); done()}]]});
    },
    post: () => ST.d.table === 'laminate'
      ? [['kp', '最貴的一塊你選最貴的？（想了一下）……質感確實重要。但你要想辦法，在別的地方省回來。']]
      : ST.d.table === 'thin'
        ? [['kp', '（點頭）先看強度，再看成本，這個順序對。去找 Ethan 確認。']]
        : [['kp', '便宜是便宜。客戶看到會不會覺得「這不像棲光的東西」，你想過嗎？'], ['kp', '算了，先做。但是客戶如果嫌質感，你要負責。']]},
  {seg: 'c3a', to: 'ethan', guide: '找 Ethan，看 EVT 的工程樣品',
    lines: () => [['sys', '兩週後。EVT 的第一批工程樣品，裝好放在 Ethan 的桌邊，看起來還不錯。'],
      ['ethan', 'EVT 的樣品。先跟你說：EVT 的目的是找問題，不是證明沒問題。我已經找到七個。'],
      ['ethan', '桌板晃動、下層置物板卡榫鬆、有一個螺絲孔位偏了、腳輪鎖死不順……一條一條在這張表上。']],
    mini(done) {
      say([['sys', '七個問題，大小不一。PVT 的時程已經排好了。']], null, {choice: [
        ['全部列成清單，分輕重，決定哪些在 PVT 之前一定要修', () => {ST.d.evt = 'list'; pm({energy: -6, trust: 4}); done()}],
        ['只修最明顯的兩個，其他等量產再說，趕時程', () => {ST.d.evt = 'rush'; pm({energy: 2, trust: -2}); done()}]]});
    },
    post: () => ST.d.evt === 'list'
      ? [['ethan', '（難得露出笑容）清單、分級、期限。這樣我才知道先做哪個。'], ['sys', '一個下午，你和 Ethan 把七個問題排出優先順序，三個 PVT 前必修，其他放進下一版。']]
      : [['ethan', '（皺眉）……你確定？晃動和卡榫鬆，量產的時候只會更明顯。'], ['sys', '你點了點頭。時程確實比較寬鬆了，但你心裡有一點不安。']]},
  {seg: 'c3a', to: 'grace', guide: '找 Grace，做包材的落摔測試',
    lines: () => [['sys', 'Grace 的測試台旁，擺了三種包裝樣品：加厚泡棉、平板扁箱、最薄的簡易紙箱。'],
      ['grace', '落摔測試：從 80 公分高，摔六個面、十二次，打開之後，產品不能壞。包材要先決定，再來測。'],
      ['grace', 'DIY 推車是要自己組的，所以可以選扁平包裝：箱子小，運費便宜，倉庫也塞得下更多。不過，護角要設計好。']],
    mini(done) {
      say([['sys', '三種包裝，各有各的成本和風險。']], null, {choice: [
        ['加厚泡棉：最安全，但箱子大、材料貴', () => {ST.d.pack = 'foam'; pm({profit: -6, energy: 2}); done()}],
        ['平板扁箱加護角：運費和倉儲都省，要多測一輪', () => {ST.d.pack = 'compact'; pm({profit: 3, energy: -5}); done()}],
        ['最薄的簡易紙箱：最便宜，先過再說', () => {ST.d.pack = 'cheap'; pm({profit: 5, energy: 3}); done()}]]});
    },
    post: () => ST.d.pack === 'foam'
      ? [['sys', 'Grace 把箱子舉起來，摔下去，六個面、十二次。打開，沒有一點凹痕。'], ['grace', '通過。這包材很穩，只是……很占空間。一個貨櫃，可能少裝三分之一。']]
      : ST.d.pack === 'compact'
        ? [['sys', '第一輪，扁箱的一個角被摔扁了，裡面的置物板裂了一道。'], ['grace', '護角太薄了。加厚兩毫米，再測一次。'],
          ['sys', '第二輪，六個面、十二次，全部通過。箱子比泡棉那一款小了將近一半。'], ['grace', '通過。這包裝，運費和倉儲都會很漂亮。']]
        : [['sys', '第一輪，箱子被摔裂，整個推車的一個角壓壞了。'], ['grace', '不通過。我說過，太薄了。'],
          ['sys', '你被迫改成加護角，再測了兩輪才過。比一開始選扁箱還花時間。'], ['grace', '最便宜的，通常不是最省的。']],
    after() {
      if (ST.d.pack === 'cheap') {pm({energy: -6, trust: -3}); pmOwe(); ST.d.late = (ST.d.late || 0) + 7}
      if (ST.d.pack === 'cheap') ST.d.pack = 'compact'   /* 最後還是改成扁箱，只是繞了路 */
      ST.d.day = 40;
    }},
  {seg: 'c3a', to: 'maggie', guide: '回座位', when: () => ST.d.owed > 0,
    lines: () => [['sys', '你回到座位，看起來有點洩氣。'],
      ['maggie', '包材被退，很正常。不是丟臉，是把錢花在測試，而不是花在客戶現場。'],
      ['maggie', '來，餅乾。']],
    after() {pmCookie()}},

  /* ───────── 二：PVT，去倉庫看包裝流程 ───────── */
  {seg: 'c3b', to: 'warehouse', guide: '去倉庫，看 PVT 試產的包裝流程',
    lines: () => [['sys', '倉庫裡，PVT 試產的一百台正在包裝。你站在工作台旁邊，看了十五分鐘。'],
      ['sys', '一台推車要經過：拆箱拿出泡棉、檢查置物板、拿掉隔板再檢查底座、放回、再拿出來做外觀檢查、貼序號、再放回箱子。同一台，被搬進搬出三、四次。'],
      ['sys', '你算了一下：如果每台省二十五秒，一年做五千台，就是三十五個小時的人工。']],
    mini(done) {
      say([['sys', '工廠的 SOP 已經寫好了。你有權限，請他們改。']], null, {choice: [
        ['請工廠的 IE 把檢查整併成一次拿出、一次檢查、一次放回', () => {ST.d.sop = 'lean'; pm({energy: -5, profit: 5, trust: 3}); done()}],
        ['先照現有 SOP 過 PVT，以免延誤', () => {ST.d.sop = 'asis'; pm({energy: 2, profit: -2}); done()}]]});
    },
    post: () => ST.d.sop === 'lean'
      ? [['sys', '工廠的 IE 看了你的流程圖，三天後交出新的 SOP：一次全部拿出、一次完成所有檢查、一次放回。'], ['sys', '每台省了二十五秒。這個省下來的錢，不是在 BOM 上，而是在工時上，你以前沒有想過。']]
      : [['sys', '你什麼都沒改。PVT 順利過了，但那三十五個小時，一年後還是會在那裡。']]},
  {seg: 'c3b', to: 'ethan', guide: '回 Ethan 那裡，看 PVT 的結果',
    lines: () => [['sys', 'Ethan 把 PVT 的結果攤在桌上。']].concat(ST.d.evt === 'rush'
      ? [['ethan', 'PVT 一百台，二十三台的桌板晃動，十一台卡榫鬆。這兩個問題，EVT 的時候就有。'], ['ethan', '要修，要多一週。我提醒過你。']]
      : [['ethan', 'PVT 一百台，只有兩台的腳輪不順，其他都過。EVT 的清單，真的有用。'], ['ethan', '兩台的問題我今天修好。MP 可以排。']]),
    after() {if (ST.d.evt === 'rush') {pm({trust: -4, profit: -4}); pmOwe(); ST.d.late = (ST.d.late || 0) + 7}}},
  {seg: 'c3b', to: 'kp', guide: '向 KP 報告：PVT 延遲', when: () => ST.d.evt === 'rush',
    lines: () => [['me', 'KP，PVT 發現桌板晃動和卡榫的問題，要多一週修。這是 EVT 就有的問題，我當時沒有修。'],
      ['kp', '（沉默了一下）……EVT 的時候，Ethan 有提醒，你選了「等量產再說」。'],
      ['kp', '至少你直接承認了。這一週我來跟老闆說。下一次，EVT 找到的問題，PVT 之前一定要修完。']],
    after() {pmOwe()}},
  {seg: 'c3b', to: 'maggie', guide: '回座位', when: () => ST.d.owed > 0,
    lines: () => [['sys', '你回到座位，覺得頭有點沉。'],
      ['maggie', '來，餅乾。'],
      ['maggie', '趕時程的時候，每一次「先不修」，都是借錢，利息比你想像的高。']],
    after() {pmCookie()}},

  /* ───────── 三、量產前：要不要先辦活動 ───────── */
  {seg: 'c3c', to: 'lena', guide: '找 Lena，她說要談上市活動',
    ring: ['Lena（行銷）', '「我有個想法，想跟你聊聊 QC-1 的上市 webinar～」', '過去看看'],
    lines: () => [['lena', '競品下個月要發表新推車。我想搶在他們前面，先辦一場 webinar，宣布 QC-1。'],
      ['lena', '現在 MP 還要一個多月，但 webinar 可以先收 lead，等 MP 就有人等著下單。你覺得呢？'],
      ['sys', 'Lena 的眼睛亮亮的，簡報都已經做好一半了。']],
    mini(done) {
      say([['sys', 'MP 還沒到，樣品也只有幾組。這個決定，會影響之後幾個月。']], null, {choice: [
        ['好，先辦。搶在對手前面，lead 先收起來', () => {ST.d.webinar = 'early'; pm({cust: 4, trust: 2}); done()}],
        ['先做預告，正式活動等 MP 和展示機都備齊再辦', () => {ST.d.webinar = 'teaser'; pm({trust: 3}); done()}],
        ['等 MP 完成再辦，沒貨的活動等於浪費預算', () => {ST.d.webinar = 'wait'; pm({trust: 1, cust: -2}); done()}]]});
    },
    post: () => ST.d.webinar === 'early'
      ? [['lena', '太好了！我今天就開始發邀請！']]
      : ST.d.webinar === 'teaser'
        ? [['lena', '預告也行。至少，大家知道有這個東西。我來排。']]
        : [['lena', '（有點失望）好吧。但如果對手先說了，我們就是追別人。'], ['me', '追，也要追在能交貨的時候。']]},
  {seg: 'c3c', to: 'kp', guide: '向 KP 報告：MP 前的成本與時程',
    lines: () => {
      const base = {laminate: 296, thin: 284, steel: 266}[ST.d.table || 'thin'];
      const p = ST.d.pack === 'foam' ? 8 : -6;
      const s = ST.d.sop === 'lean' ? -4 : 0;
      ST.d.cost = base + p + s;
      const ok = ST.d.cost <= 280;
      return [['sys', '你把成本表攤在桌上：桌板、包材、人工。每一項都有數字。'],
        ['me', '目前每台 USD ' + ST.d.cost + '。桌板用' + ({laminate: '複合板', thin: '較薄的複合板', steel: '鋼板'}[ST.d.table || 'thin']) + '，包裝' + (ST.d.pack === 'foam' ? '加厚泡棉' : '扁平箱') + '，包裝流程' + (ST.d.sop === 'lean' ? '已經整併' : '照舊') + '。'],
        ok ? ['kp', '（難得點頭）在目標之內。成本拆得清楚，我放心。MP 排下去。']
          : ['kp', '超過 280 了。（翻了翻）桌板、包材，哪一塊可以再省？……算了，MP 先排，成本我再回頭追。']];
    },
    after() {pm({profit: ST.d.cost <= 280 ? 5 : -4, trust: ST.d.cost <= 280 ? 4 : -2}); ST.d.day = ST.d.day + 40 + (ST.d.late || 0) + 90}},

  /* ───────── 四：三個月後，賣不動 ───────── */
  {seg: 'c3d', to: 'kp', guide: '去 KP 辦公室',
    ring: ['KP（主管）', '「進來一下，副總那邊有事。」', '過去看看'],
    lines: () => [['sys', QC1_STATE_LINE()],
      ['kp', '副總 Nora 下週要聽 QC-1 的報告。老闆原本覺得 DIY 推車很容易賣，結果三個月了，只有零星詢問，沒有大單。'],
      ['kp', '我要你寫一份分析，Brutal Fact。不要寫「賣不好」，我要知道為什麼。'],
      ST.d.webinar === 'early' ? ['kp', '還有，webinar 辦在 MP 之前，lead 收了一堆，貨卻晚了一個多月，這件事副總一定會問。'] : ['kp', '別把前面的歷史全部往自己身上扛，但也別全推給別人。講事實。']],
    mini(done) {
      say([['sys', '這份報告，副總會看，KP 也會看。']], null, {choice: [
        ['拆成產品、客戶、通路、業務、競爭五個面向，每一項都附事實和證據', () => {ST.d.frame = 'facts'; pm({trust: 5, energy: -5}); done()}],
        ['重點寫前期的問題：活動辦得太早、前任沒有交接清楚', () => {ST.d.frame = 'blame'; pm({trust: -6}); pmOwe(); done()}],
        ['直接寫解決方案，原因簡單帶過就好', () => {ST.d.frame = 'solution'; pm({trust: -1, energy: 2}); done()}]]});
    },
    post: () => ST.d.frame === 'facts'
      ? [['kp', '（點頭）五個面向，這個切法對。每一項都要有證據，不要「我覺得」。'], ['kp', '寫完先給我看，不要等到副總面前才第一次被我看到。']]
      : ST.d.frame === 'blame'
        ? [['kp', '（臉色沉下來）你把責任推給前面的人，副總會怎麼想？她只在意現在要怎麼辦。'], ['kp', '歷史可以寫，但寫在背景裡，不要當主角。重寫。']]
        : [['kp', '沒有原因的解法，副總一定會問「為什麼這樣做」。你答得出來嗎？'], ['kp', '至少，把原因寫到她問不出為什麼為止。']]},
  {seg: 'c3d', to: 'maggie', guide: '回座位，跟 Maggie 討論報告怎麼寫',
    lines: () => (ST.d.owed > 0 ? [['sys', '你回到座位，Maggie 把椅子滑過來。'], ['maggie', '被退稿了？來，餅乾。']] : [['sys', '你回到座位，Maggie 把椅子滑過來。'], ['maggie', '寫報告？我幫你看一下。']]).concat([
      ['maggie', 'Brutal Fact 不是「賣不好」，而是「為什麼沒有快速變成訂單」。我會把它拆成：產品、客戶、通路、業務、競爭。'],
      ['maggie', '還有一件事：寄出去的樣品，不等於快要成交。真正的漏斗是：被看到、有興趣、試用、報價、下單。每一層都會掉一些人。'],
      ['maggie', '你去找 Kai 問問看，每一組樣品，現在到底在哪一層。']]),
    after() {if (ST.d.owed > 0) pmCookie()}},
  {seg: 'c3d', to: 'kai', guide: '找 Kai，問樣品現在的狀況',
    lines: () => [['kai', '你要問樣品？我整理了。（遞給你一張表）十二組樣品寄出去，客戶有回我的，只有三組。其中一組說「還在評估」。'],
      ['kai', '其他九組……我催過，他們都說「再看看」。我也不知道要怎麼算。']],
    mini(done) {
      say([['sys', '表上十二組。哪些是真的有機會，哪些只是客氣？']], null, {choice: [
        ['一組一組問清楚：現在在哪一階段、卡在哪裡', () => {ST.d.pipe = 'honest'; pm({energy: -6, trust: 4}); done()}],
        ['十二組都算進 pipeline，報告上的數字比較好看', () => {ST.d.pipe = 'inflate'; pm({trust: -3}); done()}]]});
    },
    post: () => ST.d.pipe === 'honest'
      ? [['kai', '你要一組一組問？我可以幫你打。'], ['sys', '你和 Kai 花了兩天，把十二組問了一遍。結果：兩組要 PoC，一組要報價，其他九組，還在看。'],
        ['kai', '這樣我才知道，真正有機會的就三組。']]
      : [['kai', '（有點猶豫）……十二組都算進去？這樣數字是好看啦，可是副總要是問起來……'], ['sys', '你把十二組都填進去，數字很漂亮。你心裡，有一點虛。']]},
  {seg: 'c3d',
    ring: ['Dani（海外經銷商）', '「Hi，我想跟你聊聊 QC-1 的樣品～」', ANSWER],
    lines: () => [['dani', '嗨，我是 Dani。樣品我收到了，已經輪流借給幾個客戶試用。'],
      ['dani', '反應不錯，不過……我直接講：贏的不是推車本身，客戶是 SI，他們要把推車跟自己的設備整合，所以大多需要客製。'],
      ['dani', '還有價格。跟大品牌比，你們有優勢。但當地客戶大多用便宜的品牌。他們預期的價格，大概是你們的六成。']],
    mini(done) {
      say([['dani', '所以，你們打算怎麼辦？']], null, {choice: [
        ['請他告訴我：樣品給了哪些客戶、客製需求是什麼、當地便宜品牌的價位區間', () => {ST.d.dani = 'ask'; pm({trust: 3, cust: 5, energy: -3}); done()}],
        ['當場答應：客製沒問題，價格我們可以降', () => {ST.d.dani = 'promise'; pm({cust: 4, profit: -8, trust: -3}); done()}],
        ['謝謝他的回饋，等他再通知', () => {ST.d.dani = 'thanks'; pm({cust: -3}); done()}]]});
    },
    post: () => ST.d.dani === 'ask'
      ? [['dani', '好，我整理一份給你。有三個客戶有興趣，兩個需要客製桌面。價位，我會附當地的區間。'], ['dani', '你問的這些，比我之前遇過的原廠都清楚。']]
      : ST.d.dani === 'promise'
        ? [['dani', '真的嗎？太好了！那我跟客戶說，客製沒問題、價格會調整。'], ['sys', '掛了電話，你才想到：客製要找誰？降價，KP 同意嗎？你什麼都還沒確認。']]
        : [['dani', '……好吧，那我等你通知。'], ['sys', '掛了電話，你知道你錯過了一個，可以問清楚的機會。']],
    after() {if (ST.d.dani === 'promise') pmOwe(); ST.d.day = ST.d.day + 7}},

  /* ───────── 五：找新的出路 ───────── */
  {seg: 'c3e', to: 'hank', guide: '找 Hank，聽他說他的客戶',
    lines: () => [['sys', 'Maggie 建議你去找另一條產品線的 PM。Hank 負責倉儲自動化，辦公桌離你不遠。'],
      ['hank', '你就是 QC-1 的 PM？我聽說了！我的客戶，倉儲和物流中心，常常在問有沒有可以放平板和掃描槍的推車。'],
      ['hank', '他們不太在乎桌板是什麼材質，在乎的是輕、好推、能放電池。你們的 DIY 模組，其實滿適合。'],
      ['hank', '我可以帶你去見幾個客戶，我們一起推。你推車，我推我的系統。']],
    mini(done) {
      say([['sys', 'QC-1 本來是給工廠用的。現在有三個出口。']], null, {choice: [
        ['跟 Hank 合作，進入倉儲物流市場，兩條產品線一起推', () => {ST.d.mkt = 'warehouse'; pm({cust: 8, trust: 4, energy: -4}); done()}],
        ['去實驗室與無塵室：客製比較多，單量小但單價高', () => {ST.d.mkt = 'lab'; pm({cust: 3, profit: 3, energy: -6}); done()}],
        ['繼續投廣告，留在原本的工廠市場', () => {ST.d.mkt = 'same'; pm({cust: -3, profit: -3}); done()}]]});
    },
    post: () => ST.d.mkt === 'warehouse'
      ? [['hank', '太好了！我們每個月有一場客戶活動，你可以去擺一台，順便收需求。'], ['sys', 'Hank 當場就把你加進了他的客戶群組。']]
      : ST.d.mkt === 'lab'
        ? [['hank', '實驗室？那個市場我不熟，不過……你可以試試。'], ['sys', '你走回座位，心裡想：這條路，沒有人帶，要自己闖。']]
        : [['hank', '（想了想）……好吧，如果你覺得原本的市場還有空間。需要的話，隨時來找我。']]},
  {seg: 'c3e', to: 'kai', guide: '跟 Kai 談試用方案',
    lines: () => [['sys', '你把想法告訴 Kai：既然客戶要試用才買，那就讓試用變得容易。'],
      ['kai', '免費寄樣品？可以，但上次我們寄了十二組，只有三組有消息，我怕變成白送。']],
    mini(done) {
      say([['kai', '那你想怎麼做？']], null, {choice: [
        ['免費試用，但要約好：試用期、回饋日、需要提供使用情況', () => {ST.d.trial = 'cond'; pm({trust: 4, cust: 4, energy: -3}); done()}],
        ['無條件寄出去，客戶有興趣自然會回', () => {ST.d.trial = 'free'; pm({cust: 2, profit: -5}); done()}]]});
    },
    post: () => ST.d.trial === 'cond'
      ? [['kai', '這樣好！有試用期、有回饋日，我也比較好追。'], ['sys', '你做了一張一頁的試用單：試用期兩週、回饋會議、要填的三個問題。Kai 看完說：「這個我會用。」']]
      : [['kai', '好吧……你決定。'], ['sys', '你又寄出五組樣品。這次，你沒有約定任何事。']],
    after() {ST.d.day = ST.d.day + 14}},
  {seg: 'c3e', to: 'maggie', guide: '回座位', when: () => ST.d.owed > 0,
    lines: () => [['sys', '你回到座位，覺得有點喘不過氣。'],
      ['maggie', '來，餅乾。'],
      ['maggie', '一個人的事，不要一個人扛。你已經找 Hank 了，這一步很對。']],
    after() {pmCookie()}},

  /* ───────── 六：向副總報告 ───────── */
  {seg: 'c3f', to: 'meeting', guide: '去大會議室 A，向副總報告',
    ring: ['Nora（副總）', '「我在大會議室 A 了。準備好就來。」', '過去看看'],
    lines: () => [['sys', '大會議室 A。Nora 坐在長桌的一端，KP 坐在旁邊，Kai 和 Hank 也在。她面前什麼都沒有，只有一支筆。'],
      ['nora', '我只看重點，只問數字。QC-1 為什麼賣不動？你打算怎麼辦？']],
    mini(done) {
      say([['sys', '所有人都看著你。你的簡報已經準備好了。']], null, {choice: [
        ['先講 Brutal Fact（產品、客戶、通路、業務、競爭），再講三階段計畫：Ready to Sell、試用與共推、擴大，每一階段有指標', () => {ST.d.plan = '3stage'; pm({trust: 8}); done()}],
        ['只講好消息：反應很好、客戶有興趣、只是還要時間', () => {ST.d.plan = 'good'; pm({trust: -6}); done()}],
        ['直接要求更多預算：加大行銷，一定能賣起來', () => {ST.d.plan = 'budget'; pm({trust: -4, profit: -6}); done()}]]});
    },
    post: () => ST.d.plan === '3stage'
      ? [['me', '先講事實：webinar 到 MP 之間有' + (ST.d.webinar === 'early' ? '一個多月的落差' : '準備時間') + '；寄出十二組樣品，' + (ST.d.pipe === 'honest' ? '實際有機會的只有三組，兩組在 PoC，一組在報價' : '全部算進 pipeline，但實際有消息的只有三組') + '。'],
        ['me', '所以計畫分三階段：第一，把產品和流程準備到可以賣；第二，用有條件的試用和跨產品線共推，驗證需求；第三，有訂單之後再擴大。每個階段有指標。'],
        ['nora', '（記了幾筆）嗯。有事實，有階段，有指標。']]
      : ST.d.plan === 'good'
        ? [['me', '客戶的反應都很正面，只是還需要時間，我們有十二組樣品在客戶那裡。'],
          ['nora', '十二組？其中有幾組在談？幾組報價？幾組有 PoC？'],
          ST.d.pipe === 'honest' ? ['me', '……真正有機會的，是三組。兩組 PoC，一組報價。'] : ['me', '……我們還在追蹤。'],
          ['nora', '好消息我聽得出來。我要的是你知道的，不是你希望的。']]
        : [['me', '我認為，只要加大行銷預算，一定能把量帶起來。'],
          ['nora', '加多少？預期帶來多少訂單？你的依據是什麼？'],
          ['me', '……'],
          ['nora', '預算不是答案，除非你告訴我它會變成什麼。']]},
  {seg: 'c3f', to: 'meeting', guide: '回答副總的追問',
    lines: () => [['nora', '兩個問題。第一，你說要進' + ({warehouse: '倉儲物流', lab: '實驗室', same: '原本的工廠'}[ST.d.mkt || 'same']) + '，為什麼是那裡？第二，這件事，不是你一個人能做的，你找了誰？'],
      ST.d.mkt === 'warehouse'
        ? ['me', '倉儲客戶要的是輕、好推、能放電池，QC-1 的 DIY 模組剛好符合。Hank 的客戶重疊，我們一起去推，他說每個月有客戶活動，可以擺一台。']
        : ST.d.mkt === 'lab'
          ? ['me', '實驗室客製多、單價高，但量小。目前我還沒有一個可以帶路的人。']
          : ['me', '……原本的工廠市場，我們還有空間。']],
    mini(done) {
      const sc = (ST.d.frame === 'facts' ? 1 : 0) + (ST.d.pipe === 'honest' ? 1 : 0) + (ST.d.dani === 'ask' ? 1 : 0) + (ST.d.mkt === 'warehouse' ? 2 : ST.d.mkt === 'lab' ? 1 : 0)
        + (ST.d.trial === 'cond' ? 1 : 0) + (ST.d.plan === '3stage' ? 2 : 0) + (ST.d.cost <= 280 ? 1 : 0) + (ST.d.sop === 'lean' ? 1 : 0);
      ST.d.score = sc; ST.d.result = sc >= 8 ? 'up' : sc >= 4 ? 'one' : 'cut';
      done();
    },
    post: () => ST.d.result === 'up'
      ? [['nora', '（放下筆）我聽到了。這個產品，我不砍。'],
        ['nora', '給你九十天。條件：第一，三個月後要看到至少五個 PoC 完成、兩張報價；第二，跟 Hank 的合作，我要每個月看一次進度；第三，成本，要降到 USD 270 以下。'],
        ['nora', 'Kai，你配合他。KP，你定期跟我報。']]
      : ST.d.result === 'one'
        ? [['nora', '再給你一季。但我要看到數字：PoC 幾個、報價幾張、下單幾張。'],
          ['nora', '如果一季之後，這三個數字還是零，我們就談要不要停。'],
          ['kp', '（對 Nora）我會盯。']]
        : [['nora', '以現在的資料，我沒辦法說服自己繼續投資。'],
          ['nora', '先暫停行銷預算，現有庫存，由 Kai 看有沒有客戶要。三個月後，我們再看。'],
          ['kp', '（沉默了很久）……我會把後續處理的方案給你。']],
    after() {if (ST.d.result === 'cut') pmOwe(); ST.d.day = ST.d.day + 5}},
  {seg: 'c3f', to: 'kp', guide: '向 KP 回報',
    lines: () => ST.d.result === 'up'
      ? [['kp', '副總說給你九十天。我很久沒看過她這樣說了。'], ['kp', '你今天沒有躲，也沒有裝。這是我最想看到的。去吧，九十天，我幫你擋。']]
      : ST.d.result === 'one'
        ? [['kp', '還有一季。比我想的好，也比我希望的差。'], ['kp', '你的報告，有幾個地方站得住，有幾個地方，她一問你就說不出口。這就是你這一季要補的地方。']]
        : [['kp', '（把筆放下）這個結果，我不意外，也不好受。'], ['kp', '但你今天說的，是事實。如果之後這個產品能活下來，是因為你把事實擺在桌上，而不是因為你把事實藏起來。']]},
  {seg: 'c3f', to: 'maggie', guide: '回座位', when: () => ST.d.owed > 0 || ST.d.result === 'cut',
    lines: () => [['sys', '你回到座位，一個人坐了很久。'],
      ['maggie', '來，餅乾。'],
      ['maggie', '不管結果怎樣，你今天站在副總面前，把整件事講完了。這件事，很多人做不到。']],
    after() {pmCookie()}},
  {seg: 'c3f', end: true,
    lines: () => [['sys', ST.d.result === 'up'
      ? '九十天的倒數開始了。你的桌上多了一張清單：五個 PoC、兩張報價、成本 USD 270。'
      : ST.d.result === 'one' ? '一季的時間。清單上，三個數字都還是零。'
        : '行銷預算暫停，QC-1 靜靜地放在倉庫裡。這一章，到這裡結束。'],
      ['sys', 'QC-1 的第一個故事，到這裡告一段落。']]}
].map(pm3Ch));
STORY.beats.forEach(b => {if (b.to === 'maggie' && b.seg.indexOf('c3') === 0) pmGiveWrap(b)});

function QC1_STATE_LINE() {
  const m = {early: '你記得，webinar 辦在 MP 之前，lead 收了一堆。', teaser: '你記得，先做預告，等 MP 之後才辦正式活動。', wait: '你記得，你堅持等 MP 之後才辦活動。'}[ST.d.webinar || 'wait'];
  return '三個月後。QC-1 已經上市，成本每台 USD ' + (ST.d.cost || 280) + '。' + m + '但 Kai 的訂單表上，QC-1 那一欄，幾乎是空的。';
}

/* 第三章的結算卡 */
STORY.ending3 = function () {
  const d = ST.d, day = d.day || 0, weeks = Math.max(1, Math.ceil(day / 7)), cookies = d.cookies || 0, r = d.result || 'cut';
  const title = r === 'up' ? '把事實擺在桌上，換到九十天' : r === 'one' ? '還有一季' : '事實擺出來了，數字還沒';
  const lines = [
    d.sop === 'lean' ? '你去倉庫看了流程，把重複的檢查整併。那三十五個小時，是你自己省下來的。' : '你沒有改包裝流程，那幾十個小時的人工，一直留在成本裡。',
    d.pack === 'compact' ? '你選了扁平包裝，運費和倉儲都比較省。' : '你選了加厚泡棉，產品很安全，但箱子很大。',
    d.webinar === 'early' ? '活動辦得比 MP 早一個多月，客戶看到了，卻買不到。' : d.webinar === 'teaser' ? '你先做預告，等貨備齊才辦活動，lead 不多，但是都有東西可以賣。' : '你堅持等 MP 之後才辦，沒有被競品搶先，但也少了一些聲量。',
    d.pipe === 'honest' ? '寄出的樣品，你一組一組問清楚，漏斗上每一層你都看得見。' : '你把所有樣品都算進了漏斗，數字很好看。',
    d.mkt === 'warehouse' ? '你和 Hank 一起，把 QC-1 帶進了倉儲物流。' : d.mkt === 'lab' ? '你選了實驗室這條路，沒有人帶，要自己闖。' : '你留在原本的工廠市場，沒有找新的出口。',
    d.cold ? '' : cookies ? '這一路上，你吃了 ' + cookies + ' 片餅乾。' : '這一路上，你一片餅乾也沒吃到。'
  ].filter(Boolean);
  return {
    title, led: '新品沒人買', sub: '第三章結束。從 EVT 到向副總報告，花了 ' + weeks + ' 個禮拜。',
    more: ['成本 USD ' + (d.cost || 280) + ' / 台', ({up: '副總：給九十天', one: '副總：再給一季', cut: '副總：暫停行銷'})[r], '報告：' + ({facts: '五個面向的事實', blame: '偏重前期的問題', solution: '直接寫解決方案'})[d.frame || 'solution']],
    tl: [['Day 1', 'QC-1 啟動'], ['Day ' + Math.max(1, Math.round(day * .45)), 'MP'], ['Day ' + (day + 1), '向副總報告']],
    stats: [['團隊信任', pmStat('trust') + '/100'], ['市場信心', pmStat('cust') + '/100'], ['成本控制', pmStat('profit') + '/100'], ['精力', pmStat('energy') + '/100'], ['餅乾', String(cookies)], ['單台成本', 'USD ' + (d.cost || 280)]],
    lines,
    share: '《PM 的一天》第三章「' + title + '」：' + weeks + ' 週、' + cookies + ' 片餅乾。'
  };
};
