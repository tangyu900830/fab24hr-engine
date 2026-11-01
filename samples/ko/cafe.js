/* 카페: 방 하나, 뒷벽을 따라 바, 테이블 두 개, 오른쪽에 출입문.
   좌표: x는 오른쪽, z는 카메라 쪽(화면 아래), y는 위; 1단위는 약 1미터.
   K는 엔진이 레벨에 빌려주는 도구 상자예요(engine/world.js의 LVK). */
levelAdd('cafe', function (K) {
  const {box, flat, lam, M, TX, label, screen, desk, pickBox, G} = K;
  K.bounds(-8, 8, -6.2, 6);
  /* 바닥과 벽 */
  const wood = lam(0xe2c9a3, {map: TX.wood}), tile = lam(0xffffff, {map: TX.tile}), wall = lam(0xf3ece2, {map: TX.wall});
  flat(16, 12.2, wood, 0, 0, -.1, 1, G);
  flat(9, 4, tile, -3.5, .006, -4.1, .5, G);
  box(16.4, 3.2, .3, wall, 0, 1.6, -6.35, G);
  box(.3, 3.2, 12.4, wall, -8.15, 1.6, -.1, G);
  box(.3, 3.2, 8, wall, 8.15, 1.6, -2.1, G); box(.3, 3.2, 1.9, wall, 8.15, 1.6, 5.05, G);
  /* 출입문(오른쪽 벽, z 2~4) */
  box(.4, 2.6, .2, M.trim, 8.1, 1.3, 1.9, G); box(.4, 2.6, .2, M.trim, 8.1, 1.3, 4.1, G); box(.4, .3, 2.4, M.trim, 8.1, 2.65, 3, G);
  box(.08, 2.4, 2, M.glass, 8.15, 1.2, 3, G, false);
  pickBox('door', 1, 2.6, 2.2, 7.7, 1.3, 3, G);
  /* 뒤쪽 바: 뒷벽을 따라 놓인 카운터, 에스프레소 머신과 그라인더 */
  const bar = lam(0x6b4a33, {map: TX.wood}), top = lam(0xd9d2c5);
  box(9, .9, 1.1, bar, -3.5, .45, -5.5, G); box(9.1, .06, 1.2, top, -3.5, .93, -5.5, G);
  /* 에스프레소 머신 */
  const steel = lam(0xc9d0d4, {map: TX.panel});
  box(2.2, .9, .8, steel, -3, 1.41, -5.55, G); box(2.3, .1, .9, M.trim, -3, 1.9, -5.55, G);
  [-3.6, -2.4].forEach(x => {box(.22, .22, .3, M.dark, x, 1.1, -5.05, G); box(.5, .05, .4, M.trim, x, .99, -5.0, G)});   // 그룹 헤드와 드립 트레이
  screen('machine', G, -3, 1.62, -5.14, .8, .34, ['ESPRESSO', 'OFF'], '#93a9b2');
  pickBox('machine', 2.6, 2, 1.6, -3, 1, -5.3, G);
  /* 그라인더 */
  box(.5, .7, .5, M.dark, -5.2, 1.31, -5.5, G); box(.36, .4, .36, lam(0x8a6a4a, {transparent: true, opacity: .7}), -5.2, 1.86, -5.5, G);
  pickBox('grinder', 1, 2, 1.4, -5.2, 1, -5.3, G);
  /* 앞쪽 카운터: 계산대와 베이커리 진열장 */
  box(8, 1, .8, bar, -3, .5, -2.5, G); box(8.1, .06, .9, top, -3, 1.03, -2.5, G);
  box(.6, .3, .45, M.dark, -1, 1.21, -2.5, G);
  box(1.8, .5, .7, M.glass, -4.5, 1.31, -2.5, G, false);
  [-5.1, -4.5, -3.9].forEach(x => box(.3, .12, .3, lam(0xd9a066), x, 1.12, -2.5, G));
  /* 테이블 */
  desk(4, -1, 1.4, G); desk(5.8, 2.2, 1.4, G);
  [[3.2, -1], [4.8, -1], [5, 2.2], [6.6, 2.2]].forEach(p => box(.45, .45, .45, M.trim, p[0], .23, p[1], G));
  label('바', -3.5, -3.3, 2.4, G); label('좌석', 4.8, 4.4, 3.2, G);
  /* 걸어서 지나갈 수 없는 곳: [x0, x1, z0, z1] */
  K.block([[-8, 1, -6.2, -4.95], [-7, 1, -2.95, -2.05], [3.2, 4.8, -1.5, -.5], [5, 6.6, 1.7, 2.7]]);
  /* 사람이 서는 지점, 그리고 지점 사이를 걷는 길 */
  K.nodes({start: [3, 4], outside: [9.6, 3], door: [7.2, 3], till: [-1, -1.3], center: [2, 1], gap: [1.6, -3.6], bar: [-1, -4.2], mach: [-3, -4.2], grind: [-5.2, -4.2]},
    'outside-door door-start start-center center-till center-gap gap-bar bar-mach mach-grind');
  /* 홈 화면 배경의 카메라 구도 */
  WORLD.shots = [{p: [-3, 1.2, -4.4], d: 13, yaw: .35, pitch: .6}, {p: [3, 1, 1], d: 16, yaw: -.3, pitch: .7}];
});
WORLD.level = 'cafe';
