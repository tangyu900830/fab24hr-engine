/* 第三章「新品沒人買」（精簡版，約 5–8 分鐘）。
   前半：QX-7（無風扇邊緣運算工控機）從 EVT、包材落摔、PVT 老化測試做到量產。
   後半：上市四個月賣不動。找出路、談成案例（含跨產業的額外商機），累計案例、銷售額與淨賺，最後向副總 Nora 報告。
   ST.d 記：thermal、evt、pack、burn、cost（每台成本）、pipe、stock、dani、mkt、ref、plan、result、
   deals（談成案例 [[名稱, 台數, 單價], …]）、extra（額外支出，美元）、trust／cust／profit／energy、owed／cookies、day。
   公司、人名、產品名都是虛構的。 */

const pm3Cast = o => pmCast(Object.assign({hank: 'hk', kai: 'kaiD'}, o));
const pm3Ch = b => {const w = b.when; b.when = () => ST.d.chapter === 3 && (!w || w()); return b};
const qx7M = n => (n < 0 ? '-' : '') + 'USD ' + Math.abs(Math.round(n)).toLocaleString('en-US');
const QX7_TOOL = {alu: 80000, mid: 60000, old: 20000};
function qx7Cost() {
  const base = {alu: 424, mid: 408, old: 388}[ST.d.thermal || 'mid'];
  ST.d.cost = base + (ST.d.pack === 'foam' ? 8 : -4) + (ST.d.burn === 'long' ? 3 : 0);
  return ST.d.cost;
}
function qx7Deal(name, units, price) {
  ST.d.deals = (ST.d.deals || []).concat([[name, units, price]]);
  toast('談成：' + name, units + ' 台 × USD ' + price + ' ＝ ' + qx7M(units * price));
}
function qx7Tot() {
  const c = ST.d.cost || qx7Cost(), ds = ST.d.deals || [];
  let units = 0, rev = 0, gp = 0;
  ds.forEach(d => {units += d[1]; rev += d[1] * d[2]; gp += d[1] * (d[2] - c)});
  const fixed = (QX7_TOOL[ST.d.thermal || 'mid']) + (ST.d.extra || 0);
  return {n: ds.length, units, rev, gp, fixed, net: gp - fixed};
}
function qx7Score() {
  const d = ST.d, sc = (d.pipe === 'honest' ? 1 : 0) + (d.dani === 'ask' ? 1 : 0) + (d.mkt === 'retail' ? 2 : d.mkt === 'rail' ? 1 : 0)
    + (d.ref === 'cond' ? 1 : 0) + (d.plan === 'focus' ? 2 : 0) + (d.cost <= 410 ? 1 : 0) + (d.burn === 'long' ? 1 : 0) + (d.stock === 'bundle' ? 1 : 0);
  d.score = sc; d.result = sc >= 7 ? 'up' : sc >= 4 ? 'one' : 'cut';
}

STORY.segs.c3a = {name: '新產品：QX-7', sub: '一台無風扇的邊緣運算工控機。你第一個從零開始的案子。', t: 540, mood: 'day', scene() {pm3Cast({})},
  note: 'EVT 的目的是找問題，不是證明沒問題。'};
STORY.segs.c3b = {name: '試產 PVT', sub: '工廠試跑一百台。', get t() {return pmDay(10, 0)}, mood: 'day', scene() {pm3Cast({})},
  note: '試產的目的，是在量產之前，把流程裡的洞找出來。'};
STORY.segs.c3d = {name: '四個月後', sub: 'QX-7 上市了，但訂單沒有來。', get t() {return pmDay(9, 30)}, mood: 'day', scene() {pm3Cast({})},
  note: '規格很強，不等於有人要買。'};
STORY.segs.c3e = {name: '找新的出路', sub: '同一台機器，換一個領域，也許就有人要。', get t() {return pmDay(14, 0)}, mood: 'day', scene() {pm3Cast({})}};
STORY.segs.c3f = {name: '向副總報告', sub: '大會議室 A。Nora 只聽重點，只問數字。', get t() {return pmDay(15, 0)}, mood: 'day',
  scene() {pm3Cast({nora: 'mtw', kp: 'mt2', kai: 'mt3', hank: 'mt1'})}};

STORY.beats.push.apply(STORY.beats, [
  /* 一：啟動、EVT、包材 */
  {seg: 'c3a', to: 'kp', guide: '去 KP 辦公室，聽新案子',
    lines: () => [['kp', 'QX-7。無風扇、能跑影像辨識的工控機，規格是我們這個等級最強的。老闆覺得規格這麼強，一定賣得掉。'],
      ['kp', '你從頭帶：EVT 找問題，DVT 驗證設計，PVT 試產，最後才量產。還有包材和落摔測試。目標成本每台美金 410 以內。先決定散熱怎麼做。']],
    mini(done) {
      say([['sys', '無風扇，熱要靠機殼散出去。這會決定成本，也決定客戶放不放心。']], null, {choice: [
        ['全鋁機殼被動散熱：最貴，工廠粉塵也不怕', () => {ST.d.thermal = 'alu'; pm({profit: -8, cust: 4}); done()}],
        ['鋁殼加導熱模組：成本中間', () => {ST.d.thermal = 'mid'; pm({profit: -3, trust: 2}); done()}],
        ['沿用舊機殼，靠軟體限速：最省', () => {ST.d.thermal = 'old'; pm({profit: 4, cust: -3}); done()}]]});
    },
    post: () => ST.d.thermal === 'old'
      ? [['kp', '省模具費我理解，但客戶要的是無風扇「又跑得快」。客戶嫌太慢，你要負責。']]
      : [['kp', ST.d.thermal === 'alu' ? '最貴的方案……無風扇的賣點就是可靠，但你要在別的地方省回來。' : '先請 Ethan 做熱模擬再決定，順序對。']]},
  {seg: 'c3a', to: 'ethan', guide: '找 Ethan，看 EVT 的工程樣品',
    lines: () => [['ethan', 'EVT 的目的是找問題，不是證明沒問題。我找到七個：55 度會過熱降速、一個網路孔接頭鬆、螺絲孔位偏了……']],
    mini(done) {
      say([['sys', '七個問題，PVT 的時程已經排好了。']], null, {choice: [
        ['全部列清單分輕重，PVT 前必修的先修', () => {ST.d.evt = 'list'; pm({energy: -6, trust: 4}); done()}],
        ['只修最明顯的兩個，其他等量產再說', () => {ST.d.evt = 'rush'; pm({energy: 2, trust: -2}); done()}]]});
    },
    post: () => ST.d.evt === 'list'
      ? [['ethan', '清單、分級、期限。這樣我才知道先做哪個。修完這幾個，我們進 DVT，再進 PVT。']]
      : [['ethan', '（皺眉）過熱降速和接頭鬆，量產只會更明顯。']]},
  {seg: 'c3a', to: 'grace', guide: '找 Grace，做包材的落摔測試',
    lines: () => [['grace', '整箱從 80 公分摔六個面、十二次，機器不能壞。QX-7 是整塊鋁，將近四公斤，包材先決定再測。']],
    mini(done) {
      say([['sys', '三種包裝，各有成本和風險。']], null, {choice: [
        ['加厚泡棉：最安全，但貴又占空間', () => {ST.d.pack = 'foam'; pm({profit: -6, energy: 2}); done()}],
        ['紙漿模塑加護角：中等成本，要多測一輪', () => {ST.d.pack = 'pulp'; pm({profit: 2, energy: -5}); done()}],
        ['最薄的瓦楞紙箱：最便宜，先過再說', () => {ST.d.pack = 'cheap'; pm({profit: 5, energy: 3}); done()}]]});
    },
    post: () => ST.d.pack === 'foam'
      ? [['grace', '通過，很穩。只是很占空間，運費會高。']]
      : ST.d.pack === 'pulp'
        ? [['grace', '第一輪護角太薄，角被摔裂。加厚兩毫米，第二輪通過。']]
        : [['grace', '箱子被摔穿，機殼凹進去。不通過。你得改成紙漿加護角，又測兩輪。最便宜的，通常不是最省的。']],
    after() {
      if (ST.d.pack === 'cheap') {pm({energy: -6, trust: -3}); pmOwe(); ST.d.pack = 'pulp'; ST.d.late = (ST.d.late || 0) + 7}
      ST.d.day = 40;
    }},

  /* 二：PVT */
  {seg: 'c3b', to: 'warehouse', guide: '去倉庫，看 PVT 的老化測試架',
    lines: () => [['sys', '現在是 PVT：在工廠試跑一百台。一百台 QX-7 在 50 度恆溫箱裡跑滿載。標準是 72 小時，三天；有人建議縮短到 24 小時。']],
    mini(done) {
      say([['sys', '老化測試，是在出貨前把「早夭」的機器先挑出來。']], null, {choice: [
        ['照標準跑 72 小時', () => {ST.d.burn = 'long'; pm({energy: -4, trust: 3, profit: -2}); done()}],
        ['縮短到 24 小時，省時間', () => {ST.d.burn = 'short'; pm({energy: 2, profit: 2}); done()}]]});
    },
    post: () => (ST.d.burn === 'long'
      ? [['sys', '一百台裡有三台在第 50 小時以後重開機，被挑出來換了電源模組。如果只跑 24 小時，它們就出貨了。']]
      : [['sys', '一天後全數通過。但你知道，這只代表前 24 小時。']]).concat(ST.d.evt === 'rush'
      ? [['ethan', '（傳訊息）PVT 有十九台過熱降速，七台接頭鬆，都是 EVT 就有的問題。修好要多一週。']] : []),
    after() {
      if (ST.d.burn === 'short') ST.d.extra = (ST.d.extra || 0) + 12000;      /* 早期出貨的退修費用 */
      if (ST.d.evt === 'rush') {pm({trust: -4, profit: -4}); pmOwe(); ST.d.late = (ST.d.late || 0) + 7; ST.d.extra = (ST.d.extra || 0) + 8000}
    }},

  /* 三：四個月後 */
  {seg: 'c3d', to: 'kp', guide: '去 KP 辦公室',
    ring: ['KP（主管）', '「進來一下，副總那邊有事。」', '過去看看'],
    lines: () => [['sys', '四個月後。QX-7 已上市，成本每台 USD ' + qx7Cost() + '。' + (ST.d.burn === 'long' ? '老化測試跑滿 72 小時。' : '老化測試縮短成 24 小時，已有兩台早期出貨的機器在客戶那邊重開機。') + '但 Kai 的訂單表上，QX-7 那一欄幾乎是空的。'],
      ['kp', '副總 Nora 下週要聽報告。我要的不是「賣不好」，是：誰要買、誰決定買、為什麼不買。每一項都要有證據，講事實，別全往自己扛，也別全推給別人。'],
      ['kp', '這一章會累計你談成的案例和銷售額，最後算出 QX-7 到底賺了多少。']],
    after() {pm({trust: 2})}},
  {seg: 'c3d', to: 'maggie', guide: '回座位，跟 Maggie 討論',
    lines: () => (ST.d.owed > 0 ? [['maggie', '被唸了？來，餅乾。']] : []).concat([
      ['maggie', '規格很強，不等於有人要買。把購買決定拆開看：現場工程師說好，採購說太貴，IT 說軟體還沒測，任何一個說不，單就停了。'],
      ['maggie', '去問 Kai，每個詢價的案子，現在卡在誰那裡。']]),
    after() {if (ST.d.owed > 0) pmCookie()}},
  {seg: 'c3d', to: 'kai', guide: '找 Kai，問案子現在的狀況',
    lines: () => [['kai', '展覽收了四十張名片，報過六個案子，真的有專案時程的只有兩個。其他客戶說「規格很棒，我們再看看」，然後就沒下文。']],
    mini(done) {
      say([['sys', '六個案子，哪些是真的有機會？']], null, {choice: [
        ['一個一個問：誰決定買、預算在哪、卡在哪', () => {ST.d.pipe = 'honest'; pm({energy: -6, trust: 4}); done()}],
        ['六個都算進預測，數字比較好看', () => {ST.d.pipe = 'inflate'; pm({trust: -3}); done()}]]});
    },
    post: () => ST.d.pipe === 'honest'
      ? [['sys', '兩天問完：兩個用舊機型就夠，一個卡採購，一個卡客戶 IT 測試，另外兩個真的在等 QX-7。你和 Kai 針對這兩個把問題解掉。']]
      : [['sys', '你把六個都填進去，數字漂亮，但沒有人真的跟進。只有一個本來就要買的客戶被順利帶成單。']],
    after() {
      if (ST.d.pipe === 'honest') {qx7Deal('工廠外觀檢測 SI', 120, 620); qx7Deal('電子代工廠產線', 80, 600)}
      else qx7Deal('工廠外觀檢測 SI', 60, 560);
    }},
  {seg: 'c3d', to: 'warehouse', guide: '去倉庫，看 QX-7 的庫存',
    lines: () => [['sys', '層架上疊著量產第一批的六百台。賣掉的只有九十台，每放一個月都在付倉儲費、佔用資金。']].concat(ST.d.burn === 'short' ? [['sys', '兩個箱子貼著紅色的「退貨待檢」標籤。']] : []),
    mini(done) {
      say([['sys', '六百台不能一直放著。']], null, {choice: [
        ['搭配舊機型做「升級組合」，低價讓客戶試用', () => {ST.d.stock = 'bundle'; pm({profit: -2, cust: 4, energy: -3}); done()}],
        ['直接降價清庫存', () => {ST.d.stock = 'cut'; pm({profit: -8, cust: 2}); done()}],
        ['先不處理，等市場自己起來', () => {ST.d.stock = 'wait'; pm({profit: -3}); done()}]]});
    },
    post: () => ST.d.stock === 'bundle'
      ? [['sys', 'Kai 聽到「舊機型加 QX-7 升級組合」，眼睛亮了一下，當週就簽了一批。']]
      : ST.d.stock === 'cut'
        ? [['sys', '價格砍兩成，庫存動了，但客戶開始問「是不是之後還會降」。']]
        : [['sys', '你什麼都沒做。一個月後，倉庫的燈還是亮著。']],
    after() {
      if (ST.d.stock === 'bundle') qx7Deal('舊機型升級組合', 150, 520);
      else if (ST.d.stock === 'cut') qx7Deal('庫存清貨', 200, 470);
    }},
  {seg: 'c3d',
    ring: ['Dani（海外經銷商）', '「Hi，我想跟你聊聊 QX-7～」', ANSWER],
    lines: () => [['dani', '客戶說規格很強，但不知道拿來做什麼，價格比現在用的貴四成。還有，車載和軌道的案子沒有認證，連投標都不行。']],
    mini(done) {
      say([['dani', '你們打算怎麼辦？']], null, {choice: [
        ['請他告訴我：應用場景、預算、需要哪些認證', () => {ST.d.dani = 'ask'; pm({trust: 3, cust: 5, energy: -3}); done()}],
        ['當場答應：認證會補，價格也可以降', () => {ST.d.dani = 'promise'; pm({cust: 4, profit: -8, trust: -3}); done()}],
        ['謝謝回饋，等他再通知', () => {ST.d.dani = 'thanks'; pm({cust: -3}); done()}]]});
    },
    post: () => ST.d.dani === 'ask'
      ? [['dani', '我整理三個場景給你：工廠檢測、零售店影像分析、軌道旁設備箱，預算和認證需求都附上。你問得比其他原廠清楚。']]
      : ST.d.dani === 'promise'
        ? [['sys', '掛了電話你才想到：認證要多久、多少錢？降價 KP 同意嗎？你什麼都沒確認。']]
        : [['sys', '掛了電話，你知道你錯過了一個可以問清楚的機會。']],
    after() {
      if (ST.d.dani === 'ask') qx7Deal('海外經銷商首批', 60, 580);
      if (ST.d.dani === 'promise') {qx7Deal('海外經銷商首批（降價）', 60, 480); pmOwe(); ST.d.extra = (ST.d.extra || 0) + 15000}
      ST.d.day = ST.d.day + 150;
    }},

  /* 四：新出路（跨產業） */
  {seg: 'c3e', to: 'hank', guide: '找 Hank，聽他說他的客戶',
    lines: () => [['hank', '我做智慧零售和交通。零售客戶一直在找能放在店裡跑影像分析、不能有風扇聲的小機器，你們的無風扇剛好。交通那邊的設備箱也需要耐高溫，不過要有認證，很花時間和錢。']],
    mini(done) {
      say([['sys', 'QX-7 本來給工廠用，現在有三個出口。']], null, {choice: [
        ['跟 Hank 進智慧零售：價格敏感，不用特別認證，量大', () => {ST.d.mkt = 'retail'; pm({cust: 8, trust: 4, energy: -4}); done()}],
        ['去軌道與車載：單價高，但要先做認證，週期長', () => {ST.d.mkt = 'rail'; pm({cust: 3, profit: 3, energy: -6}); done()}],
        ['留在工廠視覺檢測，加大推廣', () => {ST.d.mkt = 'same'; pm({cust: -3, profit: -3}); done()}]]});
    },
    post: () => ST.d.mkt === 'retail'
      ? [['hank', '每個月有零售客戶聚會，你擺一台，順便收需求！'], ['sys', '兩週後，一家連鎖賣場下了單，這是 QX-7 第一個跨產業的案子。']]
      : ST.d.mkt === 'rail'
        ? [['hank', '認證要一年，我自己也沒走完過……不過你可以試試。'], ['sys', '認證花了一筆錢。先拿到一個小量的設備箱訂單，更大的要等認證下來。']]
        : [['hank', '好吧，需要的話隨時來找我。']],
    after() {
      if (ST.d.mkt === 'retail') qx7Deal('智慧零售連鎖賣場（跨產業）', 200, 540);
      if (ST.d.mkt === 'rail') {qx7Deal('軌道設備箱小量案（跨產業）', 30, 880); ST.d.extra = (ST.d.extra || 0) + 50000}
    }},
  {seg: 'c3e', to: 'kai', guide: '跟 Kai 談：找一個願意當參考案例的客戶',
    lines: () => [['kai', '客戶不是不喜歡 QX-7，是沒人用過。參考案例很難找，客戶很怕被當白老鼠。']],
    mini(done) {
      say([['kai', '你想怎麼做？']], null, {choice: [
        ['找一個真有需求的客戶，簽好試用期、驗收標準、成功後可公開', () => {ST.d.ref = 'cond'; pm({trust: 4, cust: 4, energy: -3}); done()}],
        ['多找幾家，每家都給大折扣，先把量衝起來', () => {ST.d.ref = 'discount'; pm({cust: 2, profit: -6}); done()}]]});
    },
    post: () => ST.d.ref === 'cond'
      ? [['kai', '有驗收標準，客戶不用怕，我也不用怕。我知道誰會答應了。']]
      : [['kai', '好吧，你決定。']],
    after() {
      if (ST.d.ref === 'cond') qx7Deal('參考案例客戶', 100, 600);
      else qx7Deal('多家小額折扣客戶', 60, 450);
    }},
  {seg: 'c3e', to: 'maggie', guide: '回座位', when: () => ST.d.owed > 0,
    lines: () => [['maggie', '來，餅乾。一個人的事，不要一個人扛，你找 Hank 這一步很對。']],
    after() {pmCookie()}},

  /* 五：向副總報告 */
  {seg: 'c3f', to: 'meeting', guide: '去大會議室 A，向副總報告',
    ring: ['Nora（副總）', '「我在大會議室 A 了。準備好就來。」', '過去看看'],
    lines: () => {const t = qx7Tot();
      return [['nora', '我只看重點，只問數字。QX-7 到現在談成 ' + t.n + ' 個案子、' + t.units + ' 台、銷售額 ' + qx7M(t.rev) + '。為什麼一開始賣不動？接下來怎麼辦？']]},
    mini(done) {
      say([['sys', '所有人都看著你。']], null, {choice: [
        ['先講事實（賣給誰、誰決定買、為什麼不買），再講聚焦一個領域的四個月驗證計畫，每月有指標', () => {ST.d.plan = 'focus'; pm({trust: 8}); qx7Score(); done()}],
        ['只講好消息：規格最強、反應很好、只是還要時間', () => {ST.d.plan = 'good'; pm({trust: -6}); qx7Score(); done()}],
        ['要求更多預算：加大推廣，一定能賣起來', () => {ST.d.plan = 'budget'; pm({trust: -4, profit: -6}); qx7Score(); done()}]]});
    },
    post: () => {
      const t = qx7Tot();
      return (ST.d.plan === 'focus'
        ? [['nora', '有事實，有聚焦，有時間，有指標。']]
        : ST.d.plan === 'good'
          ? [['nora', '好消息我聽得出來。我要的是你知道的，不是你希望的。']]
          : [['nora', '預算不是答案，除非你告訴我它會變成什麼。']]
      ).concat([['nora', '毛利 ' + qx7M(t.gp) + '，扣掉開模、認證與退修等 ' + qx7M(t.fixed) + '，QX-7 目前淨' + (t.net >= 0 ? '賺 ' : '虧 ') + qx7M(Math.abs(t.net)) + '。']],
        ST.d.result === 'up'
          ? [['nora', '這個產品我不砍。給你四個月，成本降到 USD 390 以下，參考案例要簽下來。']]
          : ST.d.result === 'one'
            ? [['nora', '再給你一季。如果一季之後，參考案例、報價、下單還是零，我們談要不要停。']]
            : [['nora', '以現在的資料，我沒辦法說服自己繼續投資。先暫停推廣預算，庫存由 Kai 看有沒有客戶要。']]);
    },
    after() {if (ST.d.result === 'cut') pmOwe(); ST.d.day = ST.d.day + 5}},
  {seg: 'c3f', to: 'kp', guide: '向 KP 回報',
    lines: () => ST.d.result === 'up'
      ? [['kp', '副總說給你四個月，我很久沒看過她這樣說了。你今天沒有躲，也沒有裝，這是我最想看到的。']]
      : ST.d.result === 'one'
        ? [['kp', '比我想的好，也比我希望的差。她一問你就說不出口的地方，就是這一季要補的。']]
        : [['kp', '這個結果我不意外，也不好受。但你今天說的是事實，產品之後能不能活下來，要靠這個。']]},
  {seg: 'c3f', to: 'maggie', guide: '回座位', when: () => ST.d.owed > 0 || ST.d.result === 'cut',
    lines: () => [['maggie', '來，餅乾。不管結果怎樣，你今天站在副總面前，把整件事講完了，很多人做不到。']],
    after() {pmCookie()}},
  {seg: 'c3f', end: true,
    lines: () => [['sys', ST.d.result === 'up' ? '四個月的倒數開始了。' : ST.d.result === 'one' ? '一季的時間，清單上的數字都還是零。' : 'QX-7 靜靜地放在倉庫裡。'],
      ['sys', 'QX-7 的第一個故事，到這裡告一段落。']]}
].map(pm3Ch));
STORY.beats.forEach(b => {if (b.to === 'maggie' && b.seg.indexOf('c3') === 0) pmGiveWrap(b)});

/* 第三章的結算卡 */
STORY.ending3 = function () {
  const d = ST.d, day = d.day || 0, weeks = Math.max(1, Math.ceil(day / 7)), cookies = d.cookies || 0, r = d.result || 'cut', t = qx7Tot();
  const title = t.net >= 0 ? 'QX-7 淨賺 ' + qx7M(t.net) : 'QX-7 還沒回本';
  const lines = (d.deals || []).map(x => '談成：' + x[0] + '，' + x[1] + ' 台 × USD ' + x[2] + ' ＝ ' + qx7M(x[1] * x[2])).concat([
    '銷售額 ' + qx7M(t.rev) + '，毛利 ' + qx7M(t.gp) + '，扣掉開模、認證、退修 ' + qx7M(t.fixed) + '，淨' + (t.net >= 0 ? '賺 ' : '虧 ') + qx7M(Math.abs(t.net)) + '。',
    d.burn === 'long' ? '老化測試跑滿 72 小時，早夭的機器沒有出貨。' : '老化測試縮短，早期出貨的機器在客戶那邊重開機。',
    d.mkt === 'retail' ? '你和 Hank 把 QX-7 帶進了智慧零售，這是額外的跨產業商機。' : d.mkt === 'rail' ? '你走軌道與車載，認證花了一筆錢。' : '你留在原本的工廠市場，沒有跨產業的案子。',
    d.cold ? '' : cookies ? '這一路上，你吃了 ' + cookies + ' 片餅乾。' : '這一路上，你一片餅乾也沒吃到。'
  ]).filter(Boolean);
  return {
    title, led: '新品沒人買', sub: '第三章結束。從 EVT 到向副總報告，花了 ' + weeks + ' 個禮拜。',
    more: [t.n + ' 個案子 · ' + t.units + ' 台', ({up: '副總：給四個月', one: '副總：再給一季', cut: '副總：暫停推廣'})[r], '單台成本 USD ' + (d.cost || 410)],
    tl: [['Day 1', 'QX-7 啟動'], ['Day ' + Math.max(1, Math.round(day * .3)), 'MP'], ['Day ' + (day + 1), '向副總報告']],
    stats: [['談成案例', String(t.n)], ['銷售額', qx7M(t.rev)], ['淨賺', qx7M(t.net)], ['團隊信任', pmStat('trust') + '/100'], ['市場信心', pmStat('cust') + '/100'], ['餅乾', String(cookies)]],
    lines,
    share: '《PM 的一天》第三章：談成 ' + t.n + ' 個案子、銷售額 ' + qx7M(t.rev) + '，淨' + (t.net >= 0 ? '賺 ' : '虧 ') + qx7M(Math.abs(t.net)) + '。'
  };
};
