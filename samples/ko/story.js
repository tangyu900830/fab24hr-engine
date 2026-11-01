/* 오픈 준비: 30분 동안 할 일을 하나씩.
   STORY.segs  하루 중의 몇몇 순간(타이틀 카드의 이름, 부제, 시작 시각 = 자정부터 센 분, 빛)
   STORY.beats 한 번에 하나씩 할 일: 누구에게, 어디로 가는지(to), ‘다음 할 일’ 한 줄(guide), 하는 말(lines),
               미니게임(mini), 미니게임 다음에 하는 말(post), 세상이 어떻게 바뀌는지(after).
   ST.d에는 플레이어가 고른 것을 적어 둬요. 요약 카드는 이걸 보고 써요. */
STORY.segs = {
  open: {name: '오픈 전', sub: '카페는 7시에 문을 연다. 30분 남았다.', t: 390, mood: 'eve',
    scene() {W.show('sam', false); W.screen('machine', ['ESPRESSO', '꺼짐'], '#93a9b2')}},
  dial: {name: '그라인더 세팅', sub: '그날의 첫 샷은 언제나 조금씩 어긋난다.', t: 405, mood: 'day',
    scene() {W.screen('machine', ['ESPRESSO', '준비 완료'], '#7fe3c8')}},
  first: {name: '오픈', sub: '밖에서 벌써 누가 기다리고 있다.', t: 420, mood: 'day',
    scene() {W.put('sam', 'door'); W.show('sam', true)}}
};

STORY.beats = [
  {seg: 'open', to: 'mia', guide: '바 안쪽의 수진에게 아침 인사하기',
    lines: () => [['mia', '좋은 아침이에요! 오늘은 바를 맡아 줘요. 첫 번째 할 일은 에스프레소 머신 켜기예요.'],
      ['mia', '머신은 데워지는 데 시간이 좀 걸려요. 7시가 돼서 켜면 첫 손님들도 우리랑 같이 기다려야 해요.'],
      ['me', '네, 바로 할게요.']]},
  {seg: 'open', to: 'machine', guide: '에스프레소 머신 켜기',
    lines: () => [['sys', '스위치를 올린다. 보일러가 웅웅 돌기 시작하고, 압력계 바늘이 천천히 올라간다.'],
      ['sys', '그룹 헤드도 충분히 뜨거워져야 한다. 안 그러면 첫 샷이 시큼하게 나온다.']],
    after() {if (W) W.screen('machine', ['ESPRESSO', '예열 중…'], '#ffc94a')}},
  {seg: 'open', ring: ['우유 배달', '수신 전화', ANSWER],
    lines: () => [['drv', '안녕하세요, 우유 배달이에요. 죄송한데 길이 막혀서 40분쯤 늦을 것 같아요.'],
      ['drv', '오픈하고 한 시간 정도는 우유가 모자랄 거예요. 정말 죄송해요!']],
    mini(done) {
      say([['mia', '오픈하자마자 우유가 모자라겠네요. 어떻게 할까요?']], null, {choice: [
        ['골목 편의점에 가서 우유 몇 팩 사 오기', () => {ST.d.milk = 'shop'; done()}],
        ['냉장고에 있는 우유로 버텨 보기', () => {ST.d.milk = 'fridge'; done()}]]});
    },
    post: () => ST.d.milk === 'shop'
      ? [['sys', '골목 편의점까지 뛰어갔다 온다. 우유 네 팩. 숨이 조금 차다.'], ['mia', '좋아요. 배달 차가 올 때까지는 이걸로 충분하겠어요.']]
      : [['mia', '알겠어요. 우유는 단골손님 몫으로 아끼고, 다른 분들께는 블랙커피를 권해 봐요.']]},
  {seg: 'dial', to: 'grinder', guide: '그라인더 세팅하기',
    lines: () => [['mia', '머신이 다 데워졌어요. 이제 그라인더 세팅이에요. 샷을 하나 추출하고 타이머를 봐요.'],
      ['mia', '바리스타들은 보통 25~30초쯤을 목표로 해요. 너무 빠르면 대개 시큼하고, 너무 느리면 써요.']],
    mini: miniShot},
  {seg: 'dial', to: 'mia', guide: '수진에게 시음 부탁하기',
    lines: () => ST.d.ok
      ? [['mia', `${ST.d.time}초. 맛볼게요… 네, 달고 산미가 살짝 있어요. 바로 이거예요.`], ['mia', `그라인더는 ${ST.d.grind}에 그대로 둬요.`]]
      : [['mia', '아직 너무 빨리 떨어지네요. 분쇄도를 조금 조절해 볼게요… 됐어요. 원두는 날마다 달라요. 매일 아침 하다 보면 감이 와요.'], ['mia', '오늘은 5에 둘게요.']]},
  {seg: 'first', to: 'door', guide: '출입문 열기',
    lines: () => [['sys', '팻말을 ‘OPEN’으로 돌린다. 찬 공기가 들어오고, 민호도 함께 들어온다.'],
      ['sam', '좋은 아침이에요! 오늘도 제가 첫 손님인가요?']],
    after() {if (W) W.walk('sam', 'till')}},
  {seg: 'first', to: 'sam', guide: '카운터에서 민호의 주문 받기',
    lines: () => [['sam', '늘 마시던 걸로 주세요. 플랫 화이트 한 잔이요.']].concat(ST.d.milk === 'fridge'
      ? [['me', '오늘 아침엔 우유가 좀 모자라지만, 단골손님 몫은 있어요.'], ['sam', '그럼 칭찬으로 들을게요.']]
      : [['me', '네, 바로 준비할게요.']])},
  {seg: 'first', end: true, t: 422,
    lines: () => [['sys', '7시 2분, 첫 잔이 나간다. 하루가 시작됐다.']]}
];

/* 미니게임: 분쇄도를 고르고, 샷을 뽑고, 시간을 읽어요. 1이 가장 곱고(느림), 9가 가장 굵어요(빠름). */
function miniShot(done) {
  let g = 8, shots = 0, last = null;
  const timeOf = s => Math.round(46 - s * 3.4 + (Math.random() * 2 - 1));   // 게임용으로 지어낸 모델: 곱게 갈수록 추출이 느려져요
  const draw = () => {
    const verdict = last == null ? '' : last < 25 ? '너무 빨라요: 묽고 시큼해요.' : last > 30 ? '너무 느려요: 무겁고 써요.' : '범위 안에 들어왔어요. 맛보세요.';
    setPanel('<p>분쇄도: <b class="mono">' + g + '</b> (1 = 가장 곱게, 9 = 가장 굵게)</p>'
      + '<div class="row"><button class="btn" id="finer" type="button">더 곱게</button><button class="btn" id="coarser" type="button">더 굵게</button><button class="btn btn-primary" id="pull" type="button">샷 뽑기</button></div>'
      + (last == null ? '<p class="fine">목표는 25~30초예요.</p>' : '<p>' + shots + '번째 샷: <b class="mono">' + last + '초</b>. ' + verdict + '</p>')
      + (last != null && (last >= 25 && last <= 30 || shots >= 5) ? nextBtn('완료') : ''), '그라인더 세팅');
    $('#finer').onclick = () => {g = Math.max(1, g - 1); draw()};
    $('#coarser').onclick = () => {g = Math.min(9, g + 1); draw()};
    $('#pull').onclick = () => {shots++; last = timeOf(g); SFX.blip(); draw()};
    if ($('#next')) $('#next').onclick = () => {ST.d.shots = shots; ST.d.grind = g; ST.d.time = last; ST.d.ok = last >= 25 && last <= 30; hidePanel(); done()};
  };
  draw();
}

/* 요약 카드: 실제로 일어난 일을 보고 써요 */
STORY.ending = () => ({
  title: '오픈 완료',
  tl: ['open', 'dial', 'first'].map(k => [clockOf(STORY.segs[k].t), STORY.segs[k].name]),
  sub: ST.d.ok ? '첫 샷을 내 손으로 세팅해서 뽑았다.' : '이번에는 수진이 그라인더를 맞춰 줬다.',
  stats: [['뽑은 샷', ST.d.shots || 0], ['분쇄도', ST.d.ok ? ST.d.grind : 5], ['우유', ST.d.milk === 'shop' ? '골목 편의점' : '냉장고에 있던 것만']],
  lines: [ST.d.milk === 'shop' ? '우유 배달 차는 7시 20분에 왔다. 늦었다는 걸 아무도 눈치채지 못했다.' : '손님 두 명이 블랙커피로 바꿔 주문했다. 그중 한 명은 이쪽이 더 좋다고 했다.',
    '내일이면 원두는 하루 더 묵고, 아침에 또 세팅을 하게 된다.']
});

/* 지금 할 일이 아닌 사람에게 말을 걸 때 */
STORY.talk = id => {
  if (id === 'mia' && ST.seg === 'open' && ST.q === 1) {busy = true; showGuide(); say([['mia', '머신부터 켜요. 스위치는 오른쪽에 있어요.']], () => {busy = false; showGuide()}, {end: '확인'}); return true}
  return false;
};
