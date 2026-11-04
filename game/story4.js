/* 第四章「客製報價走鋼索」（約 5–8 分鐘）。
   客戶 Cora（智慧倉儲自走車公司）想要 QX-7 的客製版。Kai 轉述不清楚，PM 要直接面對客戶；
   向供應商（Owen 機殼廠、Amy 線材廠）問成本與細節；Ethan 做客製樣品；然後報價。
   報價太高客戶不買，太低又會被 KP 罵，殺價的時候要守住線。
   ST.d 記：talk（怎麼問需求）、house（機殼）、wire（線材）、sample（樣品）、quote（報價檔位）、nego（怎麼回殺價）、
   price（成交單價）、units（台數）、gain（毛利金額）、rev、result（great／ok／thin／loss／lost）、day、owed／cookies。
   公司、人名、產品名都是虛構的。 */

const pm4Cast = o => pmCast(Object.assign({kai: 'kaiD'}, o));
const pm4Ch = b => {const w = b.when; b.when = () => ST.d.chapter === 4 && (!w || w()); return b};
const qkM = n => (n < 0 ? '-' : '') + 'USD ' + Math.abs(Math.round(n)).toLocaleString('en-US');

const QK_BASE = 360;   /* 標準版每台成本（美元） */
const QK_HOUSE = {panel: {nre: 3500, v: 9}, cnc: {nre: 0, v: 28}, mold: {nre: 12000, v: 0}};
const QK_WIRE = {brand: {nre: 2000, v: 18}, generic: {nre: 0, v: 11}, ask: {nre: 0, v: 8}};
const QK_SAMPLE = {free: {nre: 3000, thr: 25}, mock: {nre: 800, thr: 10}, none: {nre: 0, thr: 0}};
const QK_TIER = [0.12, 0.25, 0.35];   /* 三個檔位的目標毛利率；售價 = 成本 ÷（1 − 毛利率） */
const QK_FLOOR = 0.15, QK_GOAL = 0.25;   /* KP 的最低毛利率與目標毛利率 */

function qkCost() {
  const d = ST.d, h = QK_HOUSE[d.house || 'cnc'], w = QK_WIRE[d.wire || 'generic'], s = QK_SAMPLE[d.sample || 'none'];
  const spec = d.talk === 'direct' ? 0 : d.talk === 'again' ? 20 : 45;   /* 沒問清楚，就會做過頭的規格（防水等級、4G 模組） */
  const v = QK_BASE + h.v + w.v + spec, nre = h.nre + w.nre + s.nre;
  return {v, nre, tc: v + nre / 300, thr: s.thr};
}
function qkPrice(i) {return Math.round(qkCost().tc / (1 - QK_TIER[i]))}
/* 客戶殺價之後的結果 */
function qkNego(p, how) {
  const c = qkCost(), T = c.thr;
  const o = {hold: {p: p, u: 300, ok: p <= 540 + T}, swap: {p: Math.round(p * .95), u: 500, ok: Math.round(p * .95) <= 580 + T},
    cut: {p: Math.round(p * .9), u: 300, ok: Math.round(p * .9) <= 600 + T}}[how];
  o.walk0 = p > 620 + T;
  o.profit = o.u * (o.p - c.v) - c.nre; o.rev = o.u * o.p; o.m = o.profit / o.rev;
  return o;
}

STORY.segs.c4a = {name: '客戶要客製', sub: 'Kai 說，有個客戶想要 QX-7 的客製版。', t: 540, mood: 'day', scene() {pm4Cast({})},
  note: '客製的第一步，是弄清楚客戶「真正」要什麼。'};
STORY.segs.c4b = {name: '問供應商', sub: '成本與細節，要從供應商那邊挖出來。', get t() {return pmDay(10, 0)}, mood: 'day', scene() {pm4Cast({})}};
STORY.segs.c4c = {name: '算成本、定報價', sub: '價格不能太高，也不能太低。', get t() {return pmDay(14, 0)}, mood: 'day', scene() {pm4Cast({})},
  note: '報價不是猜一個數字，是從成本一路往上算。'};
STORY.segs.c4d = {name: '客戶殺價', sub: '報價送出去了。', get t() {return pmDay(10, 30)}, mood: 'day', scene() {pm4Cast({})}};
STORY.segs.c4e = {name: '向 KP 報告', sub: '毛利是多少，KP 看得很清楚。', get t() {return pmDay(16, 0)}, mood: 'day', scene() {pm4Cast({})}};

STORY.beats.push.apply(STORY.beats, [
  /* 一：客戶要客製 */
  {seg: 'c4a', to: 'kai', guide: '找 Kai，聽客戶的需求',
    ring: ['Kai（業務）', '「PM，有個客戶要客製，你有空嗎？」', '過去看看'],
    lines: () => [['kai', '不好意思，打擾你一下。客戶 Cora，智慧倉儲自走車的公司，想要 QX-7 的客製版。第一批三百台，一年可能五百台。'],
      ['kai', '她說要防水、要有 4G、前面要換成防水接頭，還要印他們的 logo。我技術上說不清楚，她問我細節我也答不出來。']],
    mini(done) {
      say([['sys', '需求聽起來很多，但 Kai 轉述得很零碎。客製的每一項，都是錢。']], null, {choice: [
        ['請 Kai 約 Cora 視訊，我直接跟她問清楚使用情境', () => {ST.d.talk = 'direct'; pm({trust: 3, energy: -4}); done()}],
        ['請 Kai 再去問一輪，問完再來找我', () => {ST.d.talk = 'again'; pm({trust: -1}); done()}],
        ['照 Kai 說的規格直接去問供應商，比較快', () => {ST.d.talk = 'kai'; pm({energy: 2}); done()}]]});
    },
    post: () => ST.d.talk === 'direct'
      ? [['kai', '好！我今天就約。她人很好，但很會比價。']]
      : ST.d.talk === 'again'
        ? [['sys', '隔天 Kai 回來了：「她說防水很重要，其他……她說再看看。」多花了一週，只多問到一項。']]
        : [['kai', '好，我跟你說的就是全部了。你就照這個去問吧。']],
    after() {ST.d.day = ST.d.talk === 'again' ? 10 : 3}},
  {seg: 'c4a', to: 'maggie', guide: '回座位，問 Maggie 客製案怎麼開頭',
    lines: () => ST.d.cold ? pmM() : [['sys', '你回到座位。Maggie 正在回信，看你站在旁邊，把椅子轉過來。'],
      ['maggie', '客製案？先別急著問供應商。客戶說的「要」，常常只是她以為需要的。'],
      ['maggie', '你先問三件事：裝在哪裡、誰會碰到它、現場有沒有水和灰塵。問清楚，能省下一半的成本。']],
    after() {ST.d.mhelp = (ST.d.mhelp || 0) + 1}},
  {seg: 'c4a', when: () => ST.d.talk === 'direct',
    ring: ['Cora（客戶）', '「視訊會議：QX-7 客製需求」', ANSWER],
    lines: () => [['cora', '嗨，我是 Cora。Kai 說你是 PM，太好了，我想直接跟懂技術的人講。'],
      ['me', '請先告訴我，機器裝在哪裡、誰會碰到它、現場有沒有水。'],
      ['cora', '裝在自走車的車身裡面，不會直接淋水，只是倉庫偶爾會用水拖地，防水到 IP54 就夠了。4G 我們用不到，倉庫有 Wi-Fi。'],
      ['cora', '真正需要的是前面板兩個 M12 防水接頭，因為車子會震動，一般網路孔會鬆。還有，我們要印 logo。']],
    after() {pm({cust: 4, trust: 2}, 'Cora 認為你問得很專業。')}},

  /* 二：問供應商與 Ethan */
  {seg: 'c4b',
    ring: ['Owen（機殼廠）', '「PM，你問的客製機殼我報好了～」', ANSWER],
    lines: () => [['owen', '嗨，我是 Owen。客製前面板的話，我給你三個做法。'],
      ['owen', '第一，只重做前面板：開一副小模具，模具費 USD 3,500，每台加 USD 9。第二，用現有機殼直接 CNC 加工開孔：不用模具費，每台加 USD 28，量大就不划算。第三，整個機殼開新模：模具費 USD 12,000，每台不加錢，不過交期要多四週。'],
      ['owen', '我的建議是新模。（笑）不過你自己算。']],
    mini(done) {
      say([['owen', '你要走哪一個？']], null, {choice: [
        ['只重做前面板：模具費 USD 3,500，每台加 USD 9', () => {ST.d.house = 'panel'; pm({profit: 2}); done()}],
        ['現有機殼 CNC 加工：沒有模具費，每台加 USD 28', () => {ST.d.house = 'cnc'; pm({profit: 0}); done()}],
        ['整個機殼開新模：模具費 USD 12,000，每台不加', () => {ST.d.house = 'mold'; pm({profit: -3}); done()}]]});
    },
    post: () => ST.d.house === 'panel'
      ? [['owen', '前面板最常見，我可以先給你模具圖。']]
      : ST.d.house === 'cnc'
        ? [['owen', 'CNC 快，三百台沒問題。要上量再跟我說。']]
        : [['owen', '好，新模！我最愛這種。交期多四週，你自己跟客戶說。']],
    after() {ST.d.day = (ST.d.day || 0) + 4}},
  {seg: 'c4b',
    ring: ['Amy（線材廠）', '「PM，你要的 M12 線來了～」', ANSWER],
    lines: () => [['amy', '客戶指定的是某個牌子的 M12 防水接頭，一台加 USD 18，但他們的 MOQ 是五百條，你這次只要三百，剩下的兩百要囤在你這邊，等於多付 USD 2,000的庫存。'],
      ['amy', '我手上還有一個同規格的通用接頭，一台加 USD 11，沒有 MOQ 的問題，只是品牌不一樣，要客戶同意。']],
    mini(done) {
      say([['amy', '你想怎麼處理？']], null, {choice: [
        ['照客戶指定的牌子：每台加 USD 18，多囤 USD 2,000 庫存', () => {ST.d.wire = 'brand'; pm({profit: -3}); done()}],
        ['換通用接頭：每台加 USD 11，但要先問客戶同意', () => {ST.d.wire = 'generic'; pm({profit: 1}); done()}],
        ['請 Amy 拿通用接頭的認證與測試報告給我，再跟她議價', () => {ST.d.wire = 'ask'; pm({trust: 3, energy: -3, profit: 3}); done()}]]});
    },
    post: () => ST.d.wire === 'ask'
      ? [['amy', '你這樣問我才好回答。報告我今天寄，量三百的話，我可以再讓你，一台加 USD 8。']]
      : ST.d.wire === 'generic'
        ? [['amy', '好，我先留三百條給你。記得跟客戶確認，不然到時候退貨我不負責。']]
        : [['amy', '好。多的兩百條，我先放你名下。']],
    after() {ST.d.day = (ST.d.day || 0) + 3}},
  {seg: 'c4b', to: 'ethan', guide: '找 Ethan，談客製樣品',
    lines: () => [['ethan', '客製版的樣品？我可以先做。但你要先說清楚：要給客戶的是哪一種。']],
    mini(done) {
      say([['ethan', '三種給法，成本不一樣。']], null, {choice: [
        ['做一台完整可運作的樣品，免費給客戶：花 USD 3,000', () => {ST.d.sample = 'free'; pm({cust: 5, profit: -3, energy: -3}); done()}],
        ['先做外觀模型和接頭位置圖，約 USD 800；功能樣品等下單再收費', () => {ST.d.sample = 'mock'; pm({trust: 3}); done()}],
        ['不給樣品，直接報價', () => {ST.d.sample = 'none'; pm({cust: -2}); done()}]]});
    },
    post: () => ST.d.sample === 'free'
      ? [['ethan', '好，我兩週內做。客戶拿到實機，比什麼說明都有用。']]
      : ST.d.sample === 'mock'
        ? [['ethan', '外觀模型三天。客戶先確認位置，沒問題再往下做，比較安全。']]
        : [['ethan', '不給樣品？那客戶只能靠想像。報價的時候你會比較辛苦。']],
    after() {ST.d.day = (ST.d.day || 0) + 3}},

  {seg: 'c4b', to: 'maggie', guide: '回座位，把供應商的報價讓 Maggie 看看',
    lines: () => ST.d.cold ? pmM() : [['sys', '你把 Owen 和 Amy 的報價攤在桌上。'],
      ['maggie', '看到「模具費」和「MOQ」，要在腦子裡換算成每台多少。一次性費用，攤到前三百台來看，才是真的成本。'],
      ['maggie', '供應商先喊高價是習慣。你多問一句「量大有沒有更好」，通常就有空間。']],
    after() {ST.d.mhelp = (ST.d.mhelp || 0) + 1}},
  /* 三：算成本、報價 */
  {seg: 'c4c', to: 'maggie', guide: '去問 Maggie：報價怎麼算才不會虧',
    lines: () => ST.d.cold ? pmM() : [['sys', 'Maggie 拿起筆，在你的成本表上寫了一行字。'],
      ['maggie', '售價 = 成本 ÷（1 − 毛利率）。想要 25% 的毛利率，就是成本除以 0.75，不是成本乘 1.25。'],
      ['maggie', '還有，客戶一定會殺價。先想好底線在哪裡，讓得掉的是哪一塊，再去報價。'],
      ['maggie', '吃個餅乾會不會好一點？（她打開鐵盒）別緊張，數字算得清楚就不怕。']],
    after() {ST.d.mhelp = (ST.d.mhelp || 0) + 1; pmBump('energy', 4)}},
  {seg: 'c4c', to: 'kp', guide: '向 KP 報告成本，決定報價',
    lines: () => {
      const c = qkCost();
      return [['sys', '你把成本表攤開：標準版 USD ' + QK_BASE + '，加上客製的部分，每台 USD ' + Math.round(c.v) + '，一次性費用 ' + qkM(c.nre) + '，攤到前三百台，每台再加 ' + Math.round(c.nre / 300) + '，總共每台 USD ' + Math.round(c.tc) + '。'],
        ['kp', '毛利率最低要 ' + Math.round(QK_FLOOR * 100) + '%，目標 ' + Math.round(QK_GOAL * 100) + '%。低於最低線，這個案子就不值得做了。'],
        ['kp', '另外，客戶一定會殺價，報價的時候要把這一刀算進去。但報太高，客戶直接不買。你來決定，我相信你算得清楚。']].concat(
        ST.d.talk === 'kai' ? [['kp', '還有，你是不是照 Kai 轉述的規格去問的？客戶真正要的跟他說的，常常不一樣。']] : []);
    },
    mini(done) {
      const f = i => '毛利率 ' + Math.round(QK_TIER[i] * 100) + '%，報價 USD ' + qkPrice(i);
      say([['sys', '三個檔位。客戶一定會砍價，不砍的客戶很少。']], null, {choice: [
        [f(0) + '：低一點，客戶比較容易點頭', () => {ST.d.quote = 0; pm({cust: 3}); done()}],
        [f(1) + '：合理的利潤，留一點讓價空間', () => {ST.d.quote = 1; pm({trust: 2}); done()}],
        [f(2) + '：高一點，留足殺價空間', () => {ST.d.quote = 2; pm({profit: 2}); done()}]]});
    },
    post: () => ST.d.quote === 0
      ? [['kp', '（看了看數字）這個價毛利很薄，殺一刀就低於最低線了。你確定嗎？']]
      : ST.d.quote === 1
        ? [['kp', '（點頭）有留空間。去送吧。']]
        : [['kp', '（想了想）留了很多空間。只是客戶如果覺得太貴，前面花的錢就白費了。']],
    after() {ST.d.day = (ST.d.day || 0) + 2}},

  /* 四：客戶殺價 */
  {seg: 'c4d', to: 'kai', guide: '找 Kai，聽客戶的反應',
    lines: () => {
      const p = qkPrice(ST.d.quote), walk = qkNego(p, 'hold').walk0;
      return [['kai', '報價送給 Cora 了，單價 USD ' + p + '。她剛回覆，等一下會直接打給你。'],
        walk ? ['kai', '她的語氣不太好……說這個價格超出預算很多。'] : ['kai', '她說「價格有點高，能不能再算便宜一點」。'],
        ['kai', '拜託，這個案子我這季的業績全靠它。你能不能讓一點？不然客戶就被別人拿走了。']];
    }},
  {seg: 'c4d', to: 'maggie', guide: '電話之前，先跟 Maggie 對一下殺價的底線',
    lines: () => ST.d.cold ? pmM() : [['maggie', 'Cora 要打來了？深呼吸。你只要記得三件事：'],
      ['maggie', '一、不要第一句就降價。二、要讓價，就拿東西換：數量、預付款、交期。三、毛利率掉到 15% 以下，寧可不做。'],
      ['maggie', '你報的價有你的道理。講價值，不要講「我也很為難」。']],
    after() {ST.d.mhelp = (ST.d.mhelp || 0) + 1}},
  {seg: 'c4d',
    ring: ['Cora（客戶）', '「關於報價，我想跟你談談」', ANSWER],
    lines: () => {
      const p = qkPrice(ST.d.quote), w = qkNego(p, 'hold').walk0;
      return w
        ? [['cora', '你好。老實說，USD ' + p + ' 超出我們的預算太多了。其他家的報價比你們低一大截，我想我們可能不適合。'],
          ['sys', '客戶要走了。這個價格，已經超出她能接受的範圍。']]
        : [['cora', '看過你的報價了，內容我們都能接受。不過 USD ' + p + ' 還是偏高，我們內部的底線更低。能不能降 10%？']];
    },
    mini(done) {
      const p = qkPrice(ST.d.quote);
      if (qkNego(p, 'hold').walk0) {ST.d.nego = 'walk'; ST.d.price = 0; ST.d.units = 0; done(); return}
      const how = k => '（' + {hold: 'USD ' + p + '，不降', swap: 'USD ' + Math.round(p * .95) + '，量改成五百台', cut: 'USD ' + Math.round(p * .9) + '，直接降 10%'}[k] + '）';
      say([['sys', '她在等你的回答。Kai 在旁邊看著你。']], null, {choice: [
        ['不降價，說明這個價格包含了客製開發、樣品和供貨保證' + how('hold'), () => {ST.d.nego = 'hold'; done()}],
        ['降 5%，但條件是年量簽五百台並預付三成' + how('swap'), () => {ST.d.nego = 'swap'; done()}],
        ['直接降 10%，趕快成交' + how('cut'), () => {ST.d.nego = 'cut'; pm({cust: 3}); done()}]]});
    },
    post: () => {
      const d = ST.d, p = qkPrice(d.quote);
      if (d.nego === 'walk') return [['cora', '謝謝你的時間，如果之後有更合適的方案再聯絡。'], ['kai', '（深吸一口氣）……她掛了。']];
      const r = qkNego(p, d.nego);
      if (!r.ok) return [['cora', d.nego === 'hold' ? '我理解，但價格我們談不攏。抱歉。' : '這個價格還是超過我們的預算。抱歉。'], ['kai', '（小聲）就差一點……']];
      return [['cora', d.nego === 'hold' ? '好，我們理解其中的價值。就照 USD ' + r.p + ' 成交。' : d.nego === 'swap' ? '五百台、預付三成……可以。USD ' + r.p + '，我們簽。' : '好，USD ' + r.p + '，成交。'],
        ['kai', '成了！謝謝你！']];
    },
    after() {
      const d = ST.d;
      if (d.nego !== 'walk') {
        const r = qkNego(qkPrice(d.quote), d.nego);
        if (r.ok) {d.price = r.p; d.units = r.u; d.rev = r.rev; d.gain = r.profit; d.m = r.m; toast('談成：Cora 客製案', r.u + ' 台 × USD ' + r.p + ' ＝ ' + qkM(r.rev))}
        else {d.price = 0; d.units = 0; d.nego = 'lost'}
      }
      if (!d.units) {d.rev = 0; d.gain = -qkCost().nre; d.m = 0; d.result = 'lost'}
      else d.result = d.gain < 0 ? 'loss' : d.m < QK_FLOOR ? 'thin' : d.m < QK_GOAL ? 'ok' : 'great';
      d.day = (d.day || 0) + 5;
    }},

  /* 五：向 KP 報告 */
  {seg: 'c4e', to: 'kp', guide: '向 KP 報告結果',
    lines: () => {
      const d = ST.d, c = qkCost();
      if (d.result === 'lost') return [['me', '客戶沒有接受報價，案子沒成。前面花了 ' + qkM(c.nre) + ' 的開發與樣品費。'], ['kp', '價格超出客戶的預算，這筆費用就白花了。報價不是越高越好。'], ['kp', '沒關係，報價是練出來的。下次先問客戶預算大概在哪，再決定。']];
      const head = ['me', '成交了：' + d.units + ' 台，單價 USD ' + d.price + '，總額 ' + qkM(d.rev) + '，毛利 ' + qkM(d.gain) + '，毛利率 ' + (d.m * 100).toFixed(1) + '%。'];
      return d.result === 'great'
        ? [head, ['kp', '（笑）毛利率超過目標。你報價有留空間，殺價的時候也守住了線。'], ['kp', '客製案，就是要這樣。']]
        : d.result === 'ok'
          ? [head, ['kp', '在最低和目標之間。可以。但下次殺價的時候，想想有沒有拿東西來換。']]
          : d.result === 'thin'
            ? [head, ['kp', '（臉色沉下來）毛利率不到 ' + Math.round(QK_FLOOR * 100) + '%，低於我說過的最低線。你知道這個案子做完，公司賺多少嗎？'], ['kp', '為了業績賠錢賣，我不接受。下次，報價要守住線。']]
            : [head, ['kp', '（把報告放下）這個案子是虧的。開發費都還沒賺回來。'], ['kp', '（聲音變大）業績是 Kai 的，利潤是你的。你不能為了成交，把利潤丟掉！'], ['kp', '你報價之前，有沒有算過殺價之後還剩多少？下次報價之前，先拿底線來給我看。']];
    },
    after() {
      const d = ST.d;
      pm({trust: d.result === 'great' ? 8 : d.result === 'ok' ? 4 : d.result === 'thin' ? -5 : d.result === 'loss' ? -9 : -4, profit: d.result === 'great' ? 6 : d.result === 'loss' ? -8 : 0}, '', d.result === 'thin' ? '客製案的毛利率低於 KP 說的最低線' : d.result === 'loss' ? '為了成交把價格壓到虧本' : '報價太高，客戶走了，前面的開發費白花');
      if (d.result === 'thin' || d.result === 'loss' || d.result === 'lost') pmOwe();
    }},
  {seg: 'c4e', to: 'maggie', guide: '回座位', when: () => ST.d.owed > 0,
    lines: () => [['sys', '你回到座位，一個人坐了一會兒。'],
      ['maggie', '要不要吃個餅乾？也許會好一點。（她打開鐵盒）'],
      ['maggie', '報價這種事，沒有人一次就抓得準。記下來：這次你的成本是多少，客戶的底線在哪，下次就有基準了。']],
    after() {pmCookie()}},
  {seg: 'c4e', end: true,
    lines: () => [['sys', ST.d.result === 'lost' ? '客戶走了，這一章，你學到的是：價格不是越高越好。'
      : ST.d.result === 'great' ? '客戶簽了，主管也點了頭。一個漂亮的客製案。'
        : ST.d.result === 'ok' ? '案子成了，利潤不算多，但站得住腳。' : '案子成了，但留下的是一個要被問起的數字。'],
      ['sys', '客製報價的第一個故事，到這裡告一段落。']]}
].map(pm4Ch));
STORY.beats.forEach(b => {if (b.to === 'maggie' && b.seg.indexOf('c4') === 0) pmGiveWrap(b)});

/* 第四章的結算卡 */
STORY.ending4 = function () {
  const d = ST.d, day = d.day || 0, weeks = Math.max(1, Math.ceil(day / 7)), cookies = d.cookies || 0, r = d.result || 'lost', c = qkCost();
  const title = {great: '價格守住了，客戶也簽了', ok: '成交，利潤站得住', thin: '成交了，但毛利太低', loss: '成交了，卻是虧的', lost: '報價太高，客戶走了'}[r];
  const lines = [
    d.talk === 'direct' ? '你直接跟客戶視訊，問清楚了真正的需求，砍掉了不需要的防水等級與 4G。' : d.talk === 'again' ? '你請 Kai 再問一輪，多花了一週，規格還是有一部分做過頭。' : '你照 Kai 轉述的規格去報價，規格多做了 4G 與更高的防水等級。',
    '機殼：' + ({panel: '只重做前面板', cnc: '現有機殼 CNC 加工', mold: '整個機殼開新模'})[d.house || 'cnc'] + '；線材：' + ({brand: '照客戶指定品牌', generic: '通用接頭', ask: '要求認證報告並議價'})[d.wire || 'generic'] + '；樣品：' + ({free: '免費完整樣品', mock: '外觀模型', none: '沒有樣品'})[d.sample || 'none'] + '。',
    '每台成本 USD ' + Math.round(c.tc) + '（含一次性費用 ' + qkM(c.nre) + ' 攤提），報價 USD ' + qkPrice(d.quote || 0) + '。',
    d.units ? '成交 ' + d.units + ' 台，單價 USD ' + d.price + '，總額 ' + qkM(d.rev) + '，毛利 ' + qkM(d.gain) + '，毛利率 ' + (d.m * 100).toFixed(1) + '%。'
      : '案子沒成，前面花掉的一次性費用 ' + qkM(c.nre) + ' 收不回來。',
    d.nego === 'swap' ? '殺價時你用數量和預付款換折扣，沒有白白讓價。' : d.nego === 'cut' ? '殺價時你直接降價 10%。' : d.nego === 'hold' ? '殺價時你守住價格並說明價值。' : '',
    cookies ? '這一路上，你吃了 ' + cookies + ' 片餅乾。' : '這一路上，你一片餅乾也沒吃到。'
  ].filter(Boolean);
  return {
    title, led: '客製報價走鋼索', sub: '第四章結束。從客戶提出需求到成交，花了 ' + weeks + ' 個禮拜。',
    more: [d.units ? d.units + ' 台 · USD ' + d.price + ' / 台' : '沒有成交', '毛利率 ' + (d.units ? (d.m * 100).toFixed(1) + '%（最低線 15%）' : '—')],
    tl: [['Day 1', 'Cora 提出客製'], ['Day ' + Math.max(1, Math.round(day * .6)), '報價送出'], ['Day ' + (day + 1), d.units ? '成交' : '客戶離開']],
    stats: [['訂單金額', qkM(d.rev || 0)], ['毛利', qkM(d.gain || 0)], ['毛利率', d.units ? (d.m * 100).toFixed(1) + '%' : '—'], ['團隊信任', pmShow('trust')], ['客戶信心', pmShow('cust')], ['餅乾', String(cookies)]],
    lines,
    share: '《PM 的一天》第四章「' + title + '」：' + (d.units ? '訂單 ' + qkM(d.rev) + '，毛利 ' + qkM(d.gain) : '案子沒成') + '。'
  };
};
