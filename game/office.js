/* 棲光科技的辦公室：一層樓，有錢的台灣科技公司。
   左前：大廳（接待台、沙發、公司牌）。左後：大會議室 A（玻璃隔間）。中間：三排有隔板的座位（產品部、RD、業務）。
   右後：茶水間（廚房、微波爐、冰箱）。右中：主管室（玻璃）。右前：洗手間。前中：電腦 Team 的測試台。
   座標：x 往右、z 往鏡頭（畫面下方）、y 往上；1 單位大約 1 公尺。
   K 是框架借給關卡的工具（engine/world.js 的 LVK）。 */
levelAdd('office', function (K) {
  const {flat, lam, basic, M, label, screen, G} = K, TX = K.TX;
  const B = (w, h, d, m, x, y, z, sh) => K.box(w, h, d, m, x, y, z, G, sh);
  K.bounds(-34, 16.2, -23, 15.1);

  /* 材質：亮暗主題由 onTheme 換色 */
  const carpet = lam(0xaeb6bb, {map: TX.carpet}), carpetMt = lam(0x8f9ba4, {map: TX.carpet}),
    marble = lam(0xf1f0ed, {map: TX.tile}), tile = lam(0xe2ebe8, {map: TX.tile}), oak = lam(0xd2b88f, {map: TX.wood}),
    walnut = lam(0x7a5236, {map: TX.wood}), white = lam(0xf4f3ef), stone = lam(0x39434a), steel = lam(0xcdd4d8, {map: TX.panel}),
    alu = lam(0xb9c1c6), green = lam(0x8db04e), frost = lam(0xdce9ee, {transparent: true, opacity: .6, depthWrite: false}),
    chairM = lam(0x2e3a41), sofaM = lam(0x3f5f73), cushion = lam(0x567d94), rug = lam(0x2f4558), gold = lam(0xd9b45a),
    potM = lam(0xe9e4da), glow = basic(0x9fd0e8), jug = lam(0x7fc4e8, {transparent: true, opacity: .7, depthWrite: false}), red = basic(0xff5a4a);
  K.onTheme(dk => {
    carpet.color.setHex(dk ? 0x4a5358 : 0xaeb6bb); carpetMt.color.setHex(dk ? 0x3b444b : 0x8f9ba4);
    marble.color.setHex(dk ? 0x55585b : 0xf1f0ed); tile.color.setHex(dk ? 0x4f5a58 : 0xe2ebe8); oak.color.setHex(dk ? 0x6b5c45 : 0xd2b88f);
  });

  /* 地板：整層灰地毯，大廳大理石、茶水間與洗手間磁磚、主管室木地板、會議室深色地毯 */
  flat(32.4, 18.4, carpet, 0, 0, -1, 1, G);
  flat(10.5, 10.2, marble, -10.75, .01, 2.9, 1, G);
  flat(10.5, 7.8, carpetMt, -10.75, .01, -6.1, 1, G);
  flat(5.4, 5.8, tile, 13.3, .01, -7.1, 1, G);
  flat(5.4, 4.7, oak, 13.3, .01, -1.85, 1, G);
  flat(5, 5, tile, 13.5, .01, 5.5, 1, G);
  flat(3.6, 2.4, rug, -8.5, .02, 6.2, 1, G);

  /* 外牆：後牆是落地玻璃，右牆是實牆，左牆留一個大門 */
  /* 後牆是落地玻璃；x 8.7～10.7 留一個門，通到後面的倉庫 */
  [[-16.3, 8.7], [10.7, 16.3]].forEach(r => {const w = r[1] - r[0], c = (r[0] + r[1]) / 2;
    B(w, .9, .3, M.wall, c, .45, -10.15); B(w, 2.3, .1, M.glass, c, 2.05, -10.15, false); B(w, .2, .3, M.wall, c, 3.3, -10.15)});
  B(2, .9, .3, M.wall, 9.7, 2.75, -10.15); B(2, .1, .1, alu, 9.7, 2.3, -10.15);
  for (let x = -16; x <= 16; x += 3.2) if (x < 8.6 || x > 10.8) B(.1, 2.3, .14, alu, x, 2.05, -10.1);
  B(.3, 3.2, 13.5, M.wall, -16.15, 1.6, -3.25); B(.3, 3.2, 2.5, M.wall, -16.15, 1.6, 6.75); B(.3, .9, 2, M.wall, -16.15, 2.75, 4.5);
  B(.06, 2.3, .9, M.glass, -16.05, 1.15, 4.05, false); B(.1, .1, 2.1, alu, -16.05, 2.3, 4.5);

  /* 大廳：公司牌、接待台、獎座牆、沙發 */
  screen('logo', G, 3.2, 2.5, -10.0, 3.6, 1.0, ['棲光科技', 'QIGUANG TECH'], '#9fd0ff');
  for (let z = -1.6; z <= 2; z += .45) B(.12, 2.6, .18, walnut, -16.0, 1.5, z);
  B(1, 1.05, 3.6, walnut, -14.6, .52, .2); B(.6, .08, 3.8, white, -14.7, 1.09, .2);
  [[-16.0, -2.0], [-16.0, 2.4]].forEach(p => B(.2, .3, .3, gold, p[0] + .1, 1.0, p[1]));
  B(3.2, .5, .9, sofaM, -8.5, .25, 7.2); B(3.2, .55, .2, sofaM, -8.5, .75, 7.6); B(.2, .5, .9, cushion, -10.0, .45, 7.2); B(.2, .5, .9, cushion, -7.0, .45, 7.2);
  B(3, .5, .9, sofaM, -13, .25, 7.2); B(3, .55, .2, sofaM, -13, .75, 7.6);
  B(1.3, .3, .8, lam(0xdfe6e8, {transparent: true, opacity: .85}), -8.5, .2, 5.9);
  label('Lobby', -10.75, 3.2, 2.6, G);

  /* 座位：每一格有綠色隔板（下）加霧面玻璃（上），共 3 排 */
  const XS = [-2.9, -0.8, 1.3, 3.4, 5.5, 7.6], ROWS = [-7.3, -2.8, 1.7];
  const cube = (x, z, o) => {
    B(2.05, .8, .08, green, x, .4, z - .68); B(2.05, .5, .06, frost, x, 1.05, z - .68, false);
    B(1.6, .06, .8, white, x, .74, z - .05); B(1.5, .7, .05, alu, x, .37, z - .4);
    if (o.pc) {B(.8, .5, .05, M.dark, x, 1.05, z - .3); B(.12, .22, .1, alu, x, .88, z - .3)}
    if (o.chair) {B(.5, .08, .5, chairM, x, .48, z + .8); B(.5, .5, .07, chairM, x, .78, z + 1.05); B(.08, .4, .08, M.dark, x, .22, z + .8)}
    if (o.plant) {B(.16, .14, .16, potM, x + .6, .85, z - .3); B(.14, .22, .14, M.green, x + .6, 1.0, z - .3)}
    if (o.paper) B(.35, .03, .26, white, x - .5, .79, z + .1);
  };
  const side = (x, z) => {B(.08, .8, 1.95, green, x, .4, z + .28); B(.06, .5, 1.9, frost, x, 1.05, z + .28, false)};
  const FILL = [[1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1], [1, 1, 0, 1, 1, 0]];
  ROWS.forEach((z, r) => {
    XS.forEach((x, i) => cube(x, z, {pc: FILL[r][i], chair: FILL[r][i], plant: (i + r) % 3 === 0, paper: (i + r) % 2 === 0}));
    XS.concat([XS[5] + 2.1]).forEach((x, i) => side(i === 0 ? XS[0] - 1.05 : XS[i - 1] + 1.05, z));
  });
  screen('mine', G, XS[0], 1.1, ROWS[1] - .27, .7, .39, ['PRD v3', '待辦 9 項'], '#7fe3c8');
  screen('mag', G, XS[1], 1.1, ROWS[1] - .27, .7, .39, ['Roadmap', 'Q1 Review'], '#7fe3c8');
  screen('rd', G, XS[4], 1.1, ROWS[0] - .27, .7, .39, ['SCH rev.C', 'ECN 12'], '#c9a8ff');
  B(.3, .16, .3, lam(0xd9a066), XS[1] + .6, .85, ROWS[1] + .1); B(.32, .04, .32, lam(0xb77a3a), XS[1] + .6, .95, ROWS[1] + .1);
  label('產品部 PM', -1.85, -.3, 2.8, G); label('行銷部', 5.5, 4.3, 1.8, G); label('ID 設計', -0.8, -4.8, 1.8, G);
  screen('ian', G, XS[1], 1.1, ROWS[0] - .27, .7, .39, ['Render v3', 'KeyShot'], '#ffb870'); label('RD', 5.5, -4.8, 1.6, G); label('業務部', -.8, 4.3, 2.0, G);

  /* 大會議室 A：玻璃隔間、長桌、十二張椅子、牆上大螢幕 */
  B(6.5, 2.4, .08, M.glass, -12.75, 1.2, -2.2, false); B(2.2, 2.4, .08, M.glass, -6.6, 1.2, -2.2, false);
  B(.08, 2.4, 7.8, M.glass, -5.5, 1.2, -6.1, false);
  B(6.5, .1, .12, alu, -12.75, 2.45, -2.2); B(2.2, .1, .12, alu, -6.6, 2.45, -2.2); B(.12, .1, 7.8, alu, -5.5, 2.45, -6.1);
  [-16, -9.5, -7.7, -5.5].forEach(x => B(.1, 2.4, .1, alu, x, 1.2, -2.2));
  B(7, .08, 1.7, walnut, -10.75, .76, -6.2); B(.3, .72, 1.3, M.dark, -13.4, .36, -6.2); B(.3, .72, 1.3, M.dark, -8.1, .36, -6.2);
  [-13.2, -12.1, -11, -9.9, -8.8, -7.7].forEach(x => {[-7.45, -4.95].forEach(z => {B(.5, .08, .5, chairM, x, .48, z); B(.5, .5, .07, chairM, x, .78, z + (z < -6 ? -.25 : .25))})});
  screen('tv', G, -10.75, 1.9, -9.95, 4, 2.25, ['Product Review', 'EVT > DVT > PVT > MP'], '#7fe3c8');
  B(.5, .04, .35, M.dark, -10.75, .82, -6.2); B(.3, .1, .3, jug, -9.3, .87, -6.0);
  label('會議室 A', -10.75, -3.1, 3.2, G);

  /* 主管室：玻璃牆、大桌、書櫃 */
  B(.08, 2.4, 1.4, M.glass, 10.6, 1.2, -3.5, false); B(.08, 2.4, 1.9, M.glass, 10.6, 1.2, -.45, false); B(5.4, 2.4, .08, M.glass, 13.3, 1.2, .5, false);
  B(5.4, 2.4, .15, M.wall, 13.3, 1.2, -4.2); B(.12, .1, 5.4, alu, 10.6, 2.45, -1.85);
  B(2.2, .08, 1, walnut, 14, .76, -3.3); B(.3, .72, .9, M.dark, 13.0, .36, -3.3); B(.3, .72, .9, M.dark, 15.0, .36, -3.3);
  B(.6, .5, .06, M.dark, 14, 1.15, -3.55); B(.5, .09, .5, chairM, 14, .5, -2.5); B(.55, .7, .08, chairM, 14, .9, -2.2);
  screen('mgr', G, 14, 1.15, -3.51, .7, .39, ['MAIL', '23 則未讀'], '#ffc94a');
  B(.4, 1.8, 2.2, walnut, 15.7, .9, -2.0); B(.3, .08, 1.9, gold, 15.55, 1.2, -2.0);
  B(.9, .5, 2.2, sofaM, 12.0, .25, -0.4); B(.9, .5, .2, sofaM, 12.0, .55, -1.35);
  label('主管室', 13.3, -.9, 2.2, G);

  /* 茶水間：櫃台、水槽、微波爐、咖啡機、飲水機、冰箱、吧台和高腳椅 */
  B(4.1, .9, .7, white, 12.75, .45, -9.6); B(4.2, .06, .8, stone, 12.75, .93, -9.6); B(4.1, .7, .35, walnut, 12.75, 2.1, -9.8);
  B(.9, 1.9, .8, steel, 15.4, .95, -9.55); B(.04, .6, .06, M.dark, 14.93, 1.1, -9.15);
  B(.8, .04, .5, M.dark, 11.9, .97, -9.6); B(.05, .3, .05, steel, 11.9, 1.1, -9.85); B(.05, .05, .22, steel, 11.9, 1.25, -9.75);
  B(.6, .35, .45, M.dark, 13.2, 1.14, -9.6); B(.3, .22, .02, lam(0x9aa7ad), 13.12, 1.14, -9.37); B(.08, .22, .02, glow, 13.45, 1.14, -9.37);
  B(.4, .5, .4, M.dark, 14.2, 1.2, -9.6); B(.05, .05, .02, red, 14.1, 1.35, -9.39);
  B(.4, 1.1, .4, white, 11.1, .55, -9.45); B(.3, .35, .3, jug, 11.1, 1.28, -9.45);
  B(2.6, .06, 1, walnut, 13.3, .9, -6.6); B(2.4, .85, .9, white, 13.3, .43, -6.6); B(.3, .12, .3, lam(0xe89a3c), 13.8, .99, -6.6);
  [12.4, 13.3, 14.2].forEach(x => {B(.36, .06, .36, chairM, x, .6, -5.7); B(.06, .55, .06, M.dark, x, .3, -5.7)});
  B(.3, .45, .3, M.dark, 10.9, .22, -8.2);
  label('茶水間', 13.3, -4.9, 2.4, G);
  /* 免費咖啡與餅乾：櫃台上有杯子、餅乾罐，吧台上有一盤餅乾 */
  const ckA = lam(0xb97a3c), ckB = lam(0x8f5a2a), ckGlass = lam(0xcfe4ee, {transparent: true, opacity: .55, depthWrite: false});
  B(.3, .36, .3, ckGlass, 12.2, 1.14, -9.5); B(.22, .14, .22, ckA, 12.2, 1.03, -9.5); B(.2, .1, .2, ckB, 12.2, 1.15, -9.5); B(.34, .05, .34, gold, 12.2, 1.35, -9.5);
  [0, 1, 2].forEach(i => B(.09, .13, .09, white, 12.85 + i * .12, 1.03, -9.3));
  B(.5, .03, .5, white, 12.4, .96, -6.6); B(.15, .04, .15, ckA, 12.33, .99, -6.55); B(.15, .04, .15, ckB, 12.5, .99, -6.65); B(.15, .04, .15, ckA, 12.45, 1.03, -6.6);
  screen('free', G, 13.2, 1.62, -9.62, 1.5, .26, ['FREE', '咖啡・餅乾'], '#ffd9a0');

  /* 洗手間：三格廁間、洗手台，門口有牌子 */
  B(5, 2.4, .15, M.wall, 13.5, 1.2, 3); B(.15, 2.4, 1.6, M.wall, 11, 1.2, 3.8); B(.15, 2.4, 2.2, M.wall, 11, 1.2, 6.9); B(5, 1.1, .15, M.wall, 13.5, .55, 8);
  [12.4, 13.6, 14.8].forEach(x => B(.06, 1.8, 1.3, white, x, .9, 3.8)); B(.6, .9, 2.4, white, 15.6, .45, 6.3); B(.6, .06, 2.5, stone, 15.6, .93, 6.3);
  const wc = screen('wc', G, 10.85, 2.15, 5.2, .9, .5, ['WC', '洗手間'], '#9fd0ff'); wc.rotation.y = -Math.PI / 2;
  label('洗手間', 9.6, 6.2, 1.8, G);
  const doorM = lam(0x7fa6b8), porc = lam(0xf7f8f8), mirror = lam(0xcfe3ec, {transparent: true, opacity: .8, depthWrite: false}), water = lam(0xbfd5de);
  [11.75, 13.0, 14.2, 15.4].forEach((x, i) => {
    B(.4, .36, .52, porc, x, .21, 3.45); B(.34, .05, .46, porc, x, .43, 3.47); B(.42, .52, .16, porc, x, .66, 3.2); B(.2, .04, .06, steel, x, .94, 3.2);   /* 馬桶：座、蓋、水箱、沖水鈕 */
    if (i === 1) {B(1.0, 1.75, .05, doorM, x, .93, 4.45); B(.04, .12, .05, steel, x + .4, .93, 4.5); B(.28, .1, .04, red, x, 1.6, 4.5)}   /* 隔間的門：這一間關著（紅＝有人） */
    else {B(.04, 1.75, .95, doorM, x - .52, .93, 3.95); B(.04, .12, .05, steel, x - .5, .93, 4.4); B(.28, .1, .04, green, x, 1.6, 3.12)}   /* 其他三間的門打開靠在隔板上（綠＝無人） */
  });
  [5.5, 6.9].forEach(z => {B(.5, .06, .46, porc, 15.55, .95, z); B(.4, .02, .34, water, 15.55, .98, z); B(.05, .2, .05, steel, 15.85, 1.06, z); B(.14, .03, .03, steel, 15.78, 1.15, z); B(.07, .12, .07, lam(0xe8c25a), 15.35, 1.0, z + .3)});
  B(.04, .95, 2.4, mirror, 15.95, 1.6, 6.2); B(.3, .3, .3, M.dark, 14.9, .15, 7.5); B(.12, .22, .02, steel, 15.9, 1.05, 4.9);
  B(1.05, 2.05, .05, doorM, 11.6, 1.03, 5.85); B(.05, .14, .06, steel, 12.0, 1.03, 5.78);   /* 入口的門：打開靠在牆邊 */

  /* 電腦 Team 的測試台：桌上有平板、線材，旁邊是機櫃 */
  B(6, .9, .8, white, .5, .45, 7.1); B(6.1, .06, .9, oak, .5, .93, 7.1);
  [-1.6, 0.5, 2.6].forEach((x, i) => {B(.55, .04, .38, M.dark, x, .98, 7.05); B(.45, .005, .3, glow, x, 1.0, 7.05); B(.4, .03, .03, M.dark, x + .6, .96, 7.2)});
  B(.8, 1.8, .6, M.dark, 4.0, .9, 7.1); K.tower('bench', G, 4.0, 1.85, 7.1);
  label('電腦 Team 測試台', .5, 5.7, 4.0, G);

  /* 樣品架：辦公室裡的開放式層架，放樣品機、線材樣品和包材 */
  const board = lam(0xe9e6df), box1 = lam(0xc9a46a), box2 = lam(0xb48a52), boxW = lam(0xf1f1ee), tray = lam(0x34444f);
  function sampleShelf(x, z, w) {
    B(w, .06, .45, alu, x, .06, z); B(.05, 1.9, .45, alu, x - w / 2, .95, z); B(.05, 1.9, .45, alu, x + w / 2, .95, z); B(w, 1.9, .03, steel, x, .95, z - .21);
    [.5, 1.0, 1.5, 1.95].forEach((y, i) => {
      B(w, .04, .45, board, x, y, z);
      if (i < 3) for (let k = 0; k < Math.floor(w / .62); k++) {
        const bx = x - w / 2 + .4 + k * .62, t = (i + k) % 3;
        if (t === 0) {B(.45, .03, .32, tray, bx, y + .04, z); B(.4, .02, .28, glow, bx, y + .06, z)}
        else if (t === 1) {B(.38, .3, .3, box1, bx, y + .17, z); B(.3, .03, .2, boxW, bx, y + .33, z)}
        else {B(.3, .2, .28, boxW, bx, y + .12, z); B(.3, .16, .26, box2, bx, y + .3, z)}
      }
    });
  }
  sampleShelf(7.0, 7.45, 3.2); sampleShelf(-4.3, 7.45, 1.9);
  label('樣品架', 7.0, 6.6, 1.6, G); label('樣品架', -4.3, 6.6, 1.4, G);

  /* 倉庫：辦公室後面，從後牆玻璃上的那扇門進去。水泥地、橘色層架、紙箱、棧板、打包桌。
     下面的座標是倉庫自己的（u 往裡、v 往右），WX／WZ 把它轉到辦公室後面。 */
  const conc = lam(0xaeb2b4, {map: TX.floor}), pal = lam(0xb88b55, {map: TX.wood}), rackO = lam(0xe7892f), rackB = lam(0x30639c), yel = basic(0xf2c230);
  K.onTheme(dk => conc.color.setHex(dk ? 0x4a4e50 : 0xaeb2b4));
  const WX = z => z + 7.95, WZ = x => 6.0 - x;
  const BW = (w, h, d, m, x, y, z, sh) => B(d, h, w, m, WX(z), y, WZ(x), sh);
  flat(18.4, 12.4, conc, WX(-1), .01, WZ(22.35), 1, G);
  flat(1.9, .7, lam(0xd9b630), WX(1.75), .02, WZ(16.6), 1, G);
  BW(8.35, 3.2, .3, M.wall, 24.375, 1.6, -10.15); BW(2.25, 3.2, .3, M.wall, 17.275, 1.6, -10.15); BW(1.8, .8, .3, M.wall, 19.3, 2.8, -10.15);   /* 西牆：中間開一個門，通往工廠 */
  BW(.3, 3.2, 18.4, M.wall, 28.55, 1.6, -1); BW(12.4, 3.2, .3, M.wall, 22.35, 1.6, 8.15);
  function rack(x, z, w, d, alongX) {
    const tiers = [.25, 1.15, 2.05], dx = alongX ? w : d, dz = alongX ? d : w;
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(c => BW(.08, 2.7, .08, rackB, x + c[0] * dx / 2, 1.35, z + c[1] * dz / 2));
    if (alongX) [0, 1, 2].forEach(i => {BW(w, .07, .07, rackO, x, tiers[i] + .35, z - d / 2); BW(w, .07, .07, rackO, x, tiers[i] + .35, z + d / 2)});
    else [0, 1, 2].forEach(i => {BW(.07, .07, w, rackO, x - d / 2, tiers[i] + .35, z); BW(.07, .07, w, rackO, x + d / 2, tiers[i] + .35, z)});
    tiers.forEach((y, i) => {
      BW(dx, .05, dz, lam(0xd8d2c6), x, y + .35, z);
      const n = Math.floor(w / .9);
      for (let k = 0; k < n; k++) {
        const o = -w / 2 + .5 + k * .9, m = (i + k) % 2 ? box1 : box2, bx = alongX ? x + o : x, bz = alongX ? z : z + o;
        BW(alongX ? .7 : .8, .5, alongX ? .8 : .7, m, bx, y + .63, bz); if ((i + k) % 3 === 0) BW(alongX ? .6 : .7, .35, alongX ? .7 : .6, m === box1 ? box2 : box1, bx, y + 1.05, bz);
      }
    });
  }
  rack(23.2, -9.1, 3.6, 1.1, true); rack(27.0, -9.1, 3.0, 1.1, true);
  rack(27.7, -4.8, 4.2, 1.1, false); rack(27.7, .2, 4.2, 1.1, false); rack(27.7, 5.0, 3.6, 1.1, false);
  [[21.8, -3.6], [24.0, -3.4]].forEach(p => {BW(1.2, .14, 1.2, pal, p[0], .1, p[1]); BW(1.0, .5, 1.0, box1, p[0], .45, p[1]); BW(1.0, .5, 1.0, box2, p[0], .95, p[1]); BW(.7, .4, .7, box1, p[0] + .05, 1.4, p[1])});
  BW(1.2, .14, 1.2, pal, 22.6, .1, 1.0); BW(1.0, .6, 1.0, box2, 22.6, .5, 1.0);
  BW(2.6, .08, 1.1, oak, 20.0, .9, 4.6); BW(.08, .9, .9, alu, 18.9, .45, 4.6); BW(.08, .9, .9, alu, 21.1, .45, 4.6);
  BW(.5, .3, .4, box1, 19.5, 1.07, 4.6); BW(.4, .08, .4, yel, 20.4, .98, 4.7); BW(.55, .05, .4, boxW, 20.9, .97, 4.5);
  screen('stock', G, 8.0, 1.9, -22.35, 2.2, 1.2, ['WH-1 倉庫', '庫存盤點'], '#ffc94a');
  label('倉庫', WX(.1), WZ(21.8), 3.4, G);


  /* 工廠：倉庫的西邊。產線把成品做出來，包好，從東邊的門運進倉庫 */
  const conc2 = lam(0x9ea3a6, {map: TX.floor}), beltM = lam(0x2a3338), pcb = lam(0x2f8f5a), skin = lam(0xe0b890), hardhat = lam(0xf2c230), mach = lam(0xe8ecee), vest = lam(0xe8892f);
  K.onTheme(dk => conc2.color.setHex(dk ? 0x464a4c : 0x9ea3a6));
  flat(13.6, 12.1, conc2, -9.2, .012, -16.35, 1, G);
  B(.3, 3.2, 12.4, M.wall, -15.95, 1.6, -16.35); B(13.8, 3.2, .3, M.wall, -9.1, 1.6, -22.45);
  flat(.3, 12.1, lam(0xd9b630), -2.9, .02, -16.35, 1, G);
  function worker(x, z, shirt) {
    B(.3, .5, .2, M.dark, x, .26, z); B(.36, .55, .22, lam(shirt), x, .8, z); B(.2, .2, .2, skin, x, 1.17, z); B(.24, .08, .24, hardhat, x, 1.32, z);
  }
  /* 第一排：貼片與組裝機（白色機台）加輸送帶，板子一片一片往右走 */
  [-13.4, -10.5, -7.6].forEach((x, i) => {
    B(2.2, 1.5, 1.3, mach, x, .75, -21.3); B(1.6, .55, .04, M.dark, x, 1.0, -20.63); B(1.2, .3, .02, glow, x, 1.0, -20.6); B(.2, .2, .2, i === 1 ? red : yel, x + .8, 1.62, -21.3);
  });
  B(8.8, .12, .55, beltM, -10.5, .88, -19.75);
  [-14.2, -12.7, -11.2, -9.7, -8.2, -6.9].forEach(x => {B(.34, .04, .24, pcb, x, .96, -19.75); B(.12, .05, .1, M.dark, x, 1.0, -19.75)});
  /* 第二排：組裝桌，每桌一位作業員，桌上是組好的機器 */
  [-13.2, -10.8, -8.4, -6.0].forEach((x, i) => {
    B(2.0, .9, .8, white, x, .45, -17.2); B(2.1, .06, .9, oak, x, .93, -17.2); B(.5, .14, .36, alu, x - .4, 1.03, -17.2); B(.5, .14, .36, alu, x + .3, 1.03, -17.2);
    B(.4, .3, .04, M.dark, x, 1.25, -17.5); B(.34, .24, .02, glow, x, 1.25, -17.47); worker(x, -17.95, i % 2 ? 0x3b6fb5 : 0xe8892f);
  });
  /* 西牆：老化測試櫃，門上有小燈 */
  [-17.6, -20.0].forEach(z => {B(1.1, 2.1, 2.0, M.dark, -15.1, 1.05, z); [.5, 1.0, 1.5, 1.9].forEach(y => B(.04, .12, 1.7, glow, -14.53, y, z))});
  K.tower('fac', G, -15.1, 2.2, -15.0);
  /* 東邊靠門：包裝桌、紙箱、出貨的棧板，地上的字指向倉庫 */
  B(2.4, .9, .9, white, -5.0, .45, -18.6); B(2.5, .06, 1.0, oak, -5.0, .93, -18.6); B(.5, .3, .4, box1, -5.4, 1.1, -18.6); B(.5, .3, .4, box2, -4.5, 1.1, -18.6); worker(-5.0, -19.35, 0x3b6fb5);
  B(1.2, .14, 1.2, pal, -3.5, .1, -16.2); B(1.0, .5, 1.0, box1, -3.5, .45, -16.2); B(1.0, .5, 1.0, box2, -3.5, .95, -16.2); B(.7, .4, .7, box1, -3.5, 1.4, -16.2);
  B(1.2, .14, 1.2, pal, -3.5, .1, -14.9); B(1.0, .5, 1.0, box2, -3.5, .45, -14.9);
  /* 落摔測試機：門型的架子，上面吊著平台，下面是水泥地 */
  B(.12, 2.4, .12, M.dark, -11.3, 1.2, -14.4); B(.12, 2.4, .12, M.dark, -9.9, 1.2, -14.4); B(1.5, .12, .12, M.dark, -10.6, 2.4, -14.4);
  B(.9, .08, .6, alu, -10.6, 1.0, -14.4); B(.6, .4, .4, box1, -10.6, 1.24, -14.4); B(.06, .06, .06, red, -10.6, 2.25, -14.4);
  label('落摔測試', -10.6, -13.3, 2.0, G);
  screen('line', G, -9.0, 2.3, -22.27, 2.4, .9, ['LINE-1', 'QX-7 產線'], '#7fe3c8');
  label('工廠', -9.2, -11.5, 3.0, G); label('出貨 → 倉庫', -4.6, -12.0, 2.4, G);

  const exBlk = [];
  const mrbD = lam(0xe8e2d6, {map: TX.tile}), mrbH = lam(0xf3efe6, {map: TX.tile}), wal2 = lam(0x5a3d28, {map: TX.wood}), leath = lam(0x3a2a22),
    leathW = lam(0xc9b79c), redR = lam(0x7a2430), navy = lam(0x1f3552), brass = lam(0xcaa24a), bookA = lam(0x9a4a3a), bookB = lam(0x3a5f7a), bookC = lam(0xd2b46a), bookD = lam(0x4a7a55),
    leaf = lam(0x3f8a4a), leaf2 = lam(0x5aa55a), bark = lam(0x5b4030), gl2 = lam(0xcfe6ee, {transparent: true, opacity: .45, depthWrite: false});
  K.onTheme(dk => {mrbD.color.setHex(dk ? 0x5a5754 : 0xe8e2d6); mrbH.color.setHex(dk ? 0x62605c : 0xf3efe6)});
  /* ═════ 高層區（主辦公室正下方、畫面前面）：走廊、副總辦公室、總裁辦公室。比主辦公室小，從樣品架旁邊的走道進去 ═════ */
  B(.3, 3.2, 18.6, M.wall, 16.15, 1.6, -1.1); exBlk.push([15.9, 16.4, -10.4, 8.5]);
  const EX0 = .4, EX1 = 15.6, ZN = 8.5, ZP = 10.6, ZS = 15.4, XM = 8.0;
  const sign2 = (x, y, z, w, h, draw) => {   /* 前後兩面都看得到的招牌 */
    const tex = K.canvasTex(512, Math.round(512 * h / w), draw);
    [0, 1].forEach(i => {const o = new K.T.Mesh(new K.T.PlaneGeometry(w, h), K.basic(0xffffff, {map: tex, transparent: true})); o.position.set(x, y, z + (i ? -.02 : .02)); if (i) o.rotation.y = Math.PI; G.add(o)});
  };
  const plaque = (text, sub, c1, c2, ink) => (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, c1); gr.addColorStop(1, c2); g.fillStyle = gr;
    g.beginPath(); g.moveTo(14, 0); g.lineTo(w - 14, 0); g.quadraticCurveTo(w, 0, w, 14); g.lineTo(w, h - 14); g.quadraticCurveTo(w, h, w - 14, h); g.lineTo(14, h); g.quadraticCurveTo(0, h, 0, h - 14); g.lineTo(0, 14); g.quadraticCurveTo(0, 0, 14, 0); g.fill();
    g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 3; g.strokeRect(8, 8, w - 16, h - 16);
    g.fillStyle = ink; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '700 ' + Math.round(h * .42) + 'px ' + K.FONT; g.fillText(text, w / 2, h * .42);
    g.globalAlpha = .8; g.font = '500 ' + Math.round(h * .19) + 'px ' + K.FONT; g.fillText(sub, w / 2, h * .78);
  };
  flat(EX1 - EX0, ZP - ZN, mrbH, (EX0 + EX1) / 2, .01, (ZN + ZP) / 2, 1, G);
  /* 外圍與隔間全部是玻璃（加金色細框），只有北邊對著走道的地方留一個門 */
  const glassW = (w, d, x, z) => {B(w, 2.4, d, M.glass, x, 1.2, z, false); B(w + (d < .1 ? .06 : 0), .1, d + .06, brass, x, 2.45, z)};
  glassW(9.0 - EX0, .08, (EX0 + 9.0) / 2, ZN); glassW(EX1 - 10.6, .08, (10.6 + EX1) / 2, ZN); B(1.6, .1, .14, brass, 9.8, 2.45, ZN);
  glassW(.08, ZS - ZN, EX0, (ZN + ZS) / 2); glassW(.08, ZS - ZN, EX1, (ZN + ZS) / 2);
  glassW(EX1 - EX0, .08, (EX0 + EX1) / 2, ZS);
  for (let x = 3; x < 15.6; x += 3.2) B(.08, 2.4, .12, brass, x, 1.2, ZS);
  /* 走廊與辦公室之間：副總的門在 6.0～7.6，總裁的門在 8.4～10.0 */
  [[EX0, 6.0], [7.6, 8.4], [10.0, EX1]].forEach(r => glassW(r[1] - r[0], .08, (r[0] + r[1]) / 2, ZP));
  glassW(.08, ZS - ZP, XM, (ZP + ZS) / 2);
  B(.08, 2.4, .1, brass, 6.0, 1.2, ZP); B(.08, 2.4, .1, brass, 7.6, 1.2, ZP); B(.08, 2.4, .1, brass, 8.4, 1.2, ZP); B(.08, 2.4, .1, brass, 10.0, 1.2, ZP); B(1.6, .1, .14, brass, 6.8, 2.45, ZP); B(1.6, .1, .14, brass, 9.2, 2.45, ZP);
  sign2(6.8, 2.1, ZP, 1.4, .56, plaque('副總辦公室', 'VICE PRESIDENT', '#f3e3b6', '#d9b45a', '#4a2f12'));
  sign2(9.2, 2.1, ZP, 1.4, .56, plaque('總裁辦公室', 'PRESIDENT', '#3b4a6a', '#1f2c46', '#f3d78a'));
  sign2(9.8, 2.1, ZN, 1.5, .6, plaque('高層區', 'EXECUTIVE FLOOR', '#e8d28a', '#c9a24a', '#3d2a10'));
  exBlk.push([EX0, 9.0, ZN - .2, ZN + .2], [10.6, EX1, ZN - .2, ZN + .2], [EX0 - .2, EX0 + .2, ZN, ZS], [EX1 - .2, EX1 + .2, ZN, ZS], [EX0, EX1, ZS - .1, ZS + .3],
    [EX0, 6.0, ZP - .1, ZP + .1], [7.6, 8.4, ZP - .1, ZP + .1], [10.0, EX1, ZP - .1, ZP + .1], [XM - .2, XM + .2, ZP, ZS]);
  /* 走廊：長條邊桌、花、畫 */
  B(2.4, .8, .45, wal2, 3.3, .4, 9.0); B(2.5, .05, .5, brass, 3.3, .82, 9.0); B(.3, .5, .3, white, 2.6, 1.08, 9.0); B(.3, .5, .3, leaf, 2.6, 1.55, 9.0); B(.5, .02, .35, lam(0xe7c46a), 3.8, .86, 9.0);
  [[1.1, 9.6], [14.6, 9.6]].forEach(p => {B(.5, .45, .5, white, p[0], .22, p[1]); B(.5, 1.0, .5, leaf, p[0], .95, p[1]); B(.35, .6, .35, leaf2, p[0], 1.6, p[1])});
  B(.1, 1.0, 2.2, navy, 0.62, 1.7, 9.4); B(.05, .85, 2.0, lam(0xe7c46a), 0.69, 1.7, 9.4);
  label('高層區', 12.6, 9.4, 1.8, G);
  exBlk.push([2.1, 4.5, 8.7, 9.3], [.8, 1.5, 9.2, 10.0], [14.2, 15.0, 9.2, 10.0]);

  /* ── 副總辦公室（Nora）：淺色大理石、白色烤漆桌、金色細節、書牆 ── */
  const vx = 4.2;
  flat(7.2, 4.6, lam(0xd8cfc0), 4.2, .02, 13.0, 1, G); flat(4.6, 2.6, redR, vx, .03, 12.9, 1, G);
  B(2.6, .08, 1.0, white, vx, .76, 11.9); B(.12, .72, .9, brass, vx - 1.2, .36, 11.9); B(.12, .72, .9, brass, vx + 1.2, .36, 11.9); B(2.7, .03, 1.05, brass, vx, .81, 11.9);
  B(.7, .5, .06, M.dark, vx, 1.15, 11.6); B(.5, .04, .3, brass, vx + 1.0, .84, 12.1);
  B(.55, .09, .55, leathW, vx, .5, 11.1); B(.6, .8, .1, leathW, vx, .95, 10.85); B(.06, .5, .06, M.dark, vx, .26, 11.1);
  B(.4, 2.5, 3.8, walnut, .75, 1.25, 13.2);
  for (let z = 11.5; z < 14.9; z += .5) [.6, 1.2, 1.8, 2.3].forEach((y, i) => B(.25, .38, .34, [bookB, bookA, bookD, bookC][(i + Math.floor(z * 2)) & 3], .98, y, z));
  B(.12, 1.2, 2.0, navy, 7.75, 1.5, 13.2); B(.06, 1.0, 1.8, lam(0xe7c46a), 7.67, 1.5, 13.2);
  B(2.2, .5, .8, leathW, vx, .25, 14.4); B(2.2, .6, .2, leathW, vx, .6, 14.9); B(.3, .5, .8, leathW, vx - 1.2, .45, 14.4); B(.3, .5, .8, leathW, vx + 1.2, .45, 14.4);
  B(1.0, .08, .6, gl2, vx, .38, 13.5); B(.2, .3, .2, brass, vx, .56, 13.5);
  B(.5, .6, .5, white, 7.3, .3, 14.8); B(.6, 1.1, .6, leaf, 7.3, 1.2, 14.8); B(.4, .6, .4, leaf2, 7.3, 1.9, 14.8);
  B(.3, .06, .3, brass, 1.3, 1.7, 11.0); B(.05, 1.7, .05, brass, 1.3, .85, 11.0);
  label('副總辦公室', vx, 13.1, 2.4, G);
  exBlk.push([2.9, 5.5, 11.3, 12.5], [.4, 1.2, 11.4, 15.1], [3.0, 5.5, 14.0, 15.1], [6.9, 7.8, 14.5, 15.2]);
  K.pickBox('vpoff', 7, 1.6, 4.6, 4.2, .8, 13.0, G);

  /* ── 總裁辦公室（Walter）：深色木地板、大書桌、茶几會客區、獎盃櫃 ── */
  const cx = 11.8;
  flat(7.4, 4.7, wal2, cx, .02, 13.0, 1, G); flat(4.8, 2.6, navy, cx, .03, 13.0, 1, G); flat(4.4, 2.2, redR, cx, .04, 13.0, 1, G);
  B(3.2, .09, 1.2, walnut, cx, .78, 11.9); B(.14, .74, 1.0, M.dark, cx - 1.5, .37, 11.9); B(.14, .74, 1.0, M.dark, cx + 1.5, .37, 11.9); B(3.3, .03, 1.3, brass, cx, .84, 11.9);
  B(.8, .5, .06, M.dark, cx - .5, 1.2, 11.6); B(.8, .5, .06, M.dark, cx + .5, 1.2, 11.6); B(.3, .05, .5, brass, cx + 1.2, .86, 12.2);
  B(.75, .1, .7, leath, cx, .55, 11.1); B(.8, 1.1, .12, leath, cx, 1.1, 10.8); B(.1, .5, .8, leath, cx - .5, .8, 11.1); B(.1, .5, .8, leath, cx + .5, .8, 11.1);
  B(.3, .3, .3, lam(0x2a6fb0), 8.9, 1.05, 14.6); B(.34, .04, .34, brass, 8.9, .9, 14.6); B(.05, .4, .05, brass, 8.9, 1.3, 14.6); B(.5, .75, .5, wal2, 8.9, .38, 14.6);
  B(.6, 2.6, 3.8, walnut, 15.2, 1.3, 13.2); B(.15, 2.2, 3.6, gl2, 14.85, 1.3, 13.2);
  for (let z = 11.6; z < 14.8; z += .8) [.7, 1.4, 2.1].forEach((y, i) => {B(.3, .35, .3, brass, 15.1, y, z + (i % 2) * .15); B(.3, .08, .3, gold, 15.1, y - .2, z + (i % 2) * .15)});
  B(.12, 1.2, 2.0, navy, 8.2, 1.5, 13.2); B(.06, 1.0, 1.8, lam(0xe7c46a), 8.28, 1.5, 13.2);
  B(2.4, .5, .8, leath, cx, .25, 14.4); B(2.4, .65, .2, leath, cx, .6, 14.9); B(.4, .55, .8, leath, cx - 1.3, .45, 14.4); B(.4, .55, .8, leath, cx + 1.3, .45, 14.4);
  B(1.2, .08, .7, gl2, cx, .4, 13.5); B(1.3, .04, .8, brass, cx, .34, 13.5); B(.25, .12, .25, white, cx - .2, .5, 13.5);
  B(1.0, 1.0, .4, wal2, 14.5, .5, 10.95); B(.12, .35, .12, lam(0x7a3a2a), 14.3, 1.18, 11.0); B(.1, .3, .1, lam(0x2f6f4f), 14.7, 1.15, 10.95);
  label('總裁辦公室', cx, 13.1, 2.6, G);
  exBlk.push([10.1, 13.5, 11.3, 12.5], [14.8, 15.6, 11.4, 15.1], [10.3, 13.3, 14.0, 15.1], [8.6, 9.2, 14.3, 14.9], [14.0, 15.1, 10.7, 11.2]);
  K.pickBox('ceooff', 7.4, 1.6, 4.6, cx, .8, 13.0, G);

  /* ── 主管室再精緻一點：地毯、茶几、畫、書桌上的擺設、盆栽、立燈 ── */
  flat(3.8, 2.6, rug, 13.9, .02, -2.7, 1, G); flat(3.4, 2.2, lam(0x8a3a3a), 13.9, .03, -2.7, 1, G);
  B(.3, .1, .1, brass, 14.0, .83, -3.1); B(.3, .09, .2, white, 13.3, .82, -3.2); B(.12, .2, .12, M.dark, 14.9, .87, -3.25); B(.35, .06, .2, brass, 14.0, .84, -2.9);
  B(1.6, 1.0, .06, navy, 13.3, 2.0, -4.1); B(1.5, .9, .04, lam(0xe7c46a), 13.3, 2.0, -4.07); B(.7, .5, .05, lam(0x3a5f7a), 15.0, 2.1, -4.1);
  B(1.0, .06, .5, gl2, 12.0, .4, -1.2); B(.7, .45, .7, sofaM, 12.6, .22, 0.0);
  B(.45, .4, .45, white, 15.4, .2, .0); B(.5, 1.1, .5, leaf, 15.4, .95, .0);
  B(.06, 1.6, .06, brass, 11.3, .8, -3.8); B(.3, .2, .3, lam(0xf2e6c0), 11.3, 1.65, -3.8);
  [[-.3, bookA], [.1, bookB], [.5, bookC]].forEach(p => B(.12, .4, .3, p[1], 15.55, 1.45, -2.0 + p[0] * 2));
  exBlk.push([13.0, 15.0, -3.6, -2.9]);

  /* ═════ 餐廳街（大廳外面，西邊）：便當、水餃、自助餐、超商，各有一間店可以走進去看 ═════ */
  const foodBlk = [[-16.4, -15.9, -10, 3.4], [-16.4, -15.9, 5.6, 8], [-34.3, -16.4, -23, -7.5]];
  const pave = lam(0xc9c1b4, {map: TX.tile}), shopT = lam(0xe9e1d2, {map: TX.tile}), wood2 = lam(0xb98f5a, {map: TX.wood}), awnR = lam(0xd6502b), awnW = lam(0xf4efe4);
  K.onTheme(dk => {pave.color.setHex(dk ? 0x5a5650 : 0xc9c1b4); shopT.color.setHex(dk ? 0x5a574f : 0xe9e1d2)});
  flat(17.8, 15.9, pave, -25.3, .01, .15, 1, G);
  B(17.9, 3.2, .3, M.wall, -25.2, 1.6, -7.75); B(.3, 3.2, 15.9, M.wall, -34.15, 1.6, .2);
  /* 餐廳街的招牌：暖色的底、白色的邊、圓角，不要黑底 */
  const rr = (g, x, y, w, h, r) => {g.beginPath(); g.moveTo(x + r, y); g.lineTo(x + w - r, y); g.quadraticCurveTo(x + w, y, x + w, y + r); g.lineTo(x + w, y + h - r); g.quadraticCurveTo(x + w, y + h, x + w - r, y + h); g.lineTo(x + r, y + h); g.quadraticCurveTo(x, y + h, x, y + h - r); g.lineTo(x, y + r); g.quadraticCurveTo(x, y, x + r, y); g.closePath()};
  const flatSign = (x, y, z, w, h, draw) => {const o = new K.T.Mesh(new K.T.PlaneGeometry(w, h), K.basic(0xffffff, {map: K.canvasTex(512, Math.round(512 * h / w), draw), transparent: true})); o.position.set(x, y, z); G.add(o)};
  const shopSign = (name, sub, c1, c2) => (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, c1); gr.addColorStop(1, c2); g.fillStyle = gr; rr(g, 0, 0, w, h, h * .22); g.fill();
    g.strokeStyle = 'rgba(255,255,255,.9)'; g.lineWidth = h * .06; rr(g, h * .06, h * .06, w - h * .12, h - h * .12, h * .18); g.stroke();
    g.fillStyle = 'rgba(255,255,255,.35)'; [.08, .92].forEach(f => {g.beginPath(); g.arc(w * f, h / 2, h * .09, 0, 7); g.fill()});
    g.fillStyle = '#ffffff'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.shadowColor = 'rgba(0,0,0,.25)'; g.shadowBlur = 6;
    g.font = '800 ' + Math.round(h * .46) + 'px ' + K.FONT; g.fillText(name, w / 2, h * .42); g.shadowBlur = 0;
    g.fillStyle = 'rgba(255,255,255,.92)'; g.font = '500 ' + Math.round(h * .2) + 'px ' + K.FONT; g.fillText(sub, w / 2, h * .79)};
  const menuBoard = (title, rows, c1) => (g, w, h) => {
    g.fillStyle = '#fbf3df'; rr(g, 0, 0, w, h, 18); g.fill(); g.strokeStyle = c1; g.lineWidth = 10; rr(g, 5, 5, w - 10, h - 10, 14); g.stroke();
    g.fillStyle = c1; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '800 ' + Math.round(h * .2) + 'px ' + K.FONT; g.fillText(title, w / 2, h * .17);
    g.fillStyle = '#4a3320'; g.textAlign = 'left'; const fs = Math.round(h * Math.min(.17, .62 / rows.length)); g.font = '600 ' + fs + 'px ' + K.FONT;
    rows.forEach((r, i) => {const y = h * .34 + i * (h * .64 / rows.length) + fs * .3; g.textAlign = 'left'; g.fillText(r[0], w * .09, y); g.textAlign = 'right'; g.fillStyle = c1; g.fillText(r[1], w * .91, y); g.fillStyle = '#4a3320'})};
  const mainSign = (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, w, 0); gr.addColorStop(0, '#ffb347'); gr.addColorStop(.5, '#ffd36e'); gr.addColorStop(1, '#ff8f5a'); g.fillStyle = gr; rr(g, 0, 0, w, h, h * .2); g.fill();
    g.strokeStyle = '#ffffff'; g.lineWidth = h * .05; rr(g, h * .05, h * .05, w - h * .1, h - h * .1, h * .15); g.stroke();
    g.fillStyle = '#fff6df'; [.12, .88].forEach(f => {const cx = w * f, cy = h * .56; g.beginPath(); g.arc(cx, cy, h * .22, 0, Math.PI); g.fill(); g.fillRect(cx - h * .22, cy - h * .02, h * .44, h * .04);
      g.strokeStyle = '#fff6df'; g.lineWidth = 5; for (let i = -1; i <= 1; i++) {g.beginPath(); g.moveTo(cx + i * h * .1, cy - h * .08); g.quadraticCurveTo(cx + i * h * .1 + 8, cy - h * .2, cx + i * h * .1, cy - h * .3); g.stroke()}});
    g.fillStyle = '#5a2a10'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '800 ' + Math.round(h * .5) + 'px ' + K.FONT; g.fillText('餐廳街', w / 2, h * .44);
    g.fillStyle = '#7a3a1a'; g.font = '600 ' + Math.round(h * .18) + 'px ' + K.FONT; g.fillText('FOOD COURT　・　公司餐補可用', w / 2, h * .8)};
  const SH = [
    {id: 'bento', x: -31.4, c: 0xd6502b, c1: '#f0704a', c2: '#c24420', name: '大福便當', sub: '排骨・雞腿・滷蛋'},
    {id: 'dumpling', x: -27.4, c: 0x2b6bd6, c1: '#4f8fe8', c2: '#2457b8', name: '老張水餃', sub: '手工水餃・酸辣湯'},
    {id: 'buffet', x: -23.4, c: 0x3f8a4a, c1: '#5fb06a', c2: '#2f7a3a', name: '家常自助餐', sub: '秤重計價'},
    {id: 'mart', x: -19.4, c: 0x1f9a8a, c1: '#3fc4b2', c2: '#1a8274', name: '全時超商', sub: '便當・飲料・微波'}];
  SH.forEach(s => {
    const cm = lam(s.c), x = s.x;
    flat(3.8, 3.2, shopT, x, .02, -5.95, 1, G);
    B(.12, 2.8, 3.4, M.wall, x - 2, 1.4, -5.95);
    B(3.9, .32, .9, cm, x, 2.78, -4.2); for (let i = -1.5; i <= 1.5; i += 1) B(.5, .33, .92, awnW, x + i, 2.78, -4.2);
    flatSign(x, 3.25, -4.0, 3.4, .72, shopSign(s.name, s.sub, s.c1, s.c2));
    B(3.2, 1.0, .7, wood2, x, .5, -6.4); B(3.3, .06, .8, white, x, 1.03, -6.4);
    B(3.6, 1.3, .1, M.wall, x, 1.65, -7.55);
    foodBlk.push([x - 1.65, x + 1.65, -6.85, -6.0]);
  });
  /* 大福便當：蒸飯保溫櫃、疊好的便當盒、菜盤 */
  B(1.0, 1.4, .7, steel, -32.4, .95, -7.0); B(.9, .1, .6, white, -32.4, 1.7, -7.0); B(.5, .35, .4, lam(0xe6c15a), -30.7, 1.2, -6.4);
  [0, 1, 2, 3].forEach(i => B(.5, .12, .4, lam(0x9a7a4a), -31.8, 1.12 + i * .13, -6.4)); [-.6, -.1, .4].forEach(d => {B(.4, .1, .3, lam(0x8a4a2a), -31.4 + d, 1.12, -6.6)});
  flatSign(-31.4, 1.95, -7.48, 2.4, 1.0, menuBoard('今日菜單', [['排骨便當', '100'], ['雙拼便當', '130'], ['滷蛋', '+15']], '#c24420'));
  /* 老張水餃：蒸籠疊、湯鍋、水餃盤 */
  [0, 1, 2].forEach(i => B(.8, .22, .8, lam(0xd8b878), -28.0, 1.15 + i * .22, -6.6)); B(.9, .1, .9, lam(0xb8985a), -28.0, 1.88, -6.6);
  B(.7, .5, .7, steel, -26.6, 1.28, -6.6); B(.6, .06, .6, lam(0xe85a3a), -26.6, 1.55, -6.6); B(.5, .05, .4, white, -27.4, 1.08, -6.1);
  flatSign(-27.4, 1.95, -7.48, 2.4, 1.0, menuBoard('今日菜單', [['水餃 10 顆', '70'], ['水餃 20 顆', '130'], ['酸辣湯', '+35']], '#2457b8'));
  /* 家常自助餐：一排菜盤、玻璃護罩 */
  [0, 1, 2, 3, 4].forEach(i => {B(.55, .12, .5, steel, -24.6 + i * .6, 1.1, -6.4); B(.45, .1, .4, lam([0x4f9a4a, 0xe08a2a, 0xc23a3a, 0xe6c24a, 0x7a4a2a][i]), -24.6 + i * .6, 1.2, -6.4)});
  B(3.0, .5, .5, gl2, -23.4, 1.45, -6.4);
  flatSign(-23.4, 1.95, -7.48, 2.4, 1.0, menuBoard('秤重計價', [['滿盤', '175'], ['中等', '130'], ['少少', '90']], '#2f7a3a'));
  /* 全時超商：貨架、冰箱、收銀機 */
  [-20.4, -19.4, -18.4].forEach((x, i) => {B(.7, 1.6, .35, lam(0xe8ecee), x, .8, -7.3); [.4, .9, 1.4].forEach((y, j) => B(.55, .25, .2, lam([0xe85a3a, 0x4a9ad6, 0xf2c230, 0x6aaa4a][(i + j) % 4]), x, y, -7.15))});
  B(.5, .4, .4, M.dark, -18.5, 1.25, -6.4); B(.3, .2, .02, glow, -18.5, 1.3, -6.18);
  flatSign(-19.4, 2.4, -7.48, 2.4, .8, menuBoard('熱銷', [['便當', '85'], ['咖啡', '45']], '#1a8274'));
  /* 桌椅、盆栽、路燈、垃圾桶 */
  [-31, -27, -23, -19].forEach(x => [-.5, 3.4].forEach(z => {
    B(1.2, .08, 1.2, wood2, x, .75, z); B(.12, .72, .12, M.dark, x, .38, z);
    [[-.9, 0], [.9, 0], [0, -.9], [0, .9]].forEach(d => {B(.36, .06, .36, chairM, x + d[0], .46, z + d[1]); B(.06, .44, .06, M.dark, x + d[0], .22, z + d[1])});
    foodBlk.push([x - .65, x + .65, z - .65, z + .65]);
  }));
  [[-33.2, 7.4], [-17.2, 7.4], [-33.2, 1.6], [-17.0, -2.4]].forEach(p => {B(.6, .5, .6, white, p[0], .25, p[1]); B(.6, 1.1, .6, leaf, p[0], 1.05, p[1]); B(.4, .6, .4, leaf2, p[0], 1.7, p[1])});
  [-29.4, -21.4].forEach(x => {B(.08, 3.0, .08, M.dark, x, 1.5, 2.0); B(.4, .12, .4, lam(0xf2e6c0), x, 3.05, 2.0)});
  B(.4, .7, .4, lam(0x3a4a42), -33.3, .35, 4.5); B(.4, .7, .4, lam(0x3a4a42), -33.3, .35, 5.2);
  flatSign(-25.3, 3.0, 7.7, 6.0, 1.35, mainSign); [-28.1, -22.5].forEach(x => B(.12, 2.4, .12, brass, x, 1.2, 7.7));
  /* 掛燈：幾串小彩旗 */
  const bunC = [0xff6b4a, 0xffd23f, 0x4fb3e8, 0x6ac46a, 0xf27ab0]; B(16.4, .03, .03, M.dark, -25.2, 3.25, 1.45);
  for (let k = 0; k < 17; k++) {const px = -33 + k; B(.4, .34, .04, lam(bunC[k % 5]), px, 3.25 - .2 - Math.sin((px + 33) / 16 * Math.PI) * -.0, 1.45)}
  label('餐廳街', -25.3, 5.6, 3.6, G);

  /* 植物 */
  [[-15.2, 7.2, 1.3], [-6.2, 1.0, 1.1], [8.9, -8.8, 1.0], [10.2, 7.2, 1.2], [15.4, 1.8, 1.0], [15.4, -5.2, 1.0]].forEach(p => {
    B(.4 * p[2], .35 * p[2], .4 * p[2], potM, p[0], .18 * p[2], p[1]); B(.55 * p[2], .8 * p[2], .55 * p[2], M.green, p[0], .35 * p[2] + .4 * p[2], p[1]);
  });

  /* 走不過去的地方：[x0, x1, z0, z1] */
  const blk = [];
  ROWS.forEach(z => {
    blk.push([XS[0] - 1.05, XS[5] + 1.05, z - .75, z + .35]);
    XS.concat([XS[5] + 2.1]).forEach((x, i) => {const bx = i === 0 ? XS[0] - 1.05 : XS[i - 1] + 1.05; blk.push([bx - .05, bx + .05, z - .75, z + 1.3])});
  });
  blk.push([-4.2, 8.9, -10.1, -8.0],
    [-16, -9.5, -2.25, -2.15], [-7.7, -5.5, -2.25, -2.15], [-5.55, -5.45, -10, -2.2], [-14.3, -7.2, -7.1, -5.3],
    [10.55, 10.65, -4.2, -2.8], [10.55, 10.65, -1.4, .5], [10.6, 16, .45, .55], [10.6, 16, -4.3, -4.1], [12.9, 15.1, -3.85, -2.75], [15.5, 16, -3.1, -.9], [11.4, 12.6, -1.2, .4],
    [10.7, 15.9, -10, -9.1], [12, 14.6, -7.2, -6.0], [10.8, 11.4, -8.5, -7.9],
    [11, 16, 2.9, 3.1], [10.9, 11.1, 3, 4.6], [10.9, 11.1, 5.8, 8], [11, 16, 7.9, 8.1], [12.3, 15.2, 3, 4.6], [15.3, 15.9, 5, 7.6],
    [-15.1, -14.1, -1.7, 2.1], [-10.2, -6.8, 6.7, 7.9], [-14.5, -11.5, 6.7, 7.9], [-9.3, -7.7, 5.4, 6.4],
    [-2.7, 4.2, 6.6, 7.6], [5.3, 8.7, 7.1, 7.9], [-5.3, -3.3, 7.1, 7.9],
    [-16, 8.9, -10.45, -9.9], [10.6, 16, -10.45, -9.9],
    [-11.5, -9.7, -14.7, -14.1], [-15.9, -6.3, -22.5, -19.2], [-14.4, -4.9, -18.35, -16.5], [-16, -14.4, -21.2, -16.6], [-6.4, -3.6, -19.2, -17.9], [-4.2, -2.8, -16.9, -14.4], [-2.45, -2.0, -23, -14.4], [-2.45, -2.0, -12.2, -10], [16.0, 16.4, -23, -10], [-2.4, 16.2, -23, -22.5]);
  /* 倉庫裡的東西（把倉庫座標轉過去） */
  K.block([[21.2, 25.0, -9.8, -8.4], [25.4, 28.5, -9.8, -8.4], [27.0, 28.5, -7.0, 7.0],
    [21.1, 22.5, -4.3, -2.9], [23.3, 24.7, -4.1, -2.7], [22.0, 23.2, .3, 1.7], [18.6, 21.4, 4.0, 5.2]].map(r => [WX(r[2]), WX(r[3]), WZ(r[1]), WZ(r[0])]));
  K.block(blk.concat(exBlk, foodBlk));

  /* 人站的點，以及點和點之間怎麼走 */
  K.nodes({
    door: [-14.8, 4.5], start: [-12.8, 4.5], lobby: [-8.8, 3.8], meetdoor: [-8.6, -1.0],
    fl: [-4.9, 4.2], fm: [1.0, 4.2], fr: [6.4, 4.2], fc: [9.6, 4.2],
    a2l: [-4.9, -.3], a2m: [1.0, -.3], a2r: [6.4, -.3], a2c: [9.6, -.3],
    a1l: [-4.9, -4.8], a1m: [1.0, -4.8], a1r: [6.4, -4.8], a1c: [9.6, -4.8],
    kpdoor: [9.6, -2.1], kaiW: [9.6, -3.5], kpd: [11.5, -2.1], kp: [14.0, -2.2], pantry: [12.7, -5.2], wcd: [10.6, 5.2], wc: [12.3, 5.2],
    mine: [-2.9, -1.85], maggie: [-.8, -1.85], ethan: [5.5, -6.35], kaiD: [-2.9, 2.65], grace: [.5, 5.9],
    whd: [9.7, -10.3], wh1: [9.65, -13.0], whf: [-0.9, -13.3], fac1: [-5.4, -13.3], pt1: [11.4, -5.5], pt2: [14.2, -5.4], whs: [6.95, -17.8], whk: [11.15, -16.4], hkD: [-0.8, 2.65], leoD: [7.6, -6.35], chw1: [6.4, -14.7], chw2: [7.6, -15.0],
    mt0: [-8.6, -3.4], mt1: [-11.8, -4.0], mt2: [-6.9, -4.2], mt3: [-10.2, -3.4], mk1: [3.4, 2.65], hk: [1.3, -1.85], mk2: [5.5, 2.65], id1: [-0.8, -6.35], mtw: [-14.9, -6.2]
  },'door-start start-lobby lobby-fl fl-fm fm-fr fr-fc fc-a2c a2c-a1c a2c-kpdoor kpdoor-kaiW kaiW-a1c kpdoor-kpd kpd-kp fl-a2l a2l-a2m a2m-a2r a2r-a2c a2l-a1l a1l-a1m a1m-a1r a1r-a1c a1c-pantry '
    + 'hk-a2m hkD-fm leoD-a1r mk1-fm mk2-fr id1-a1m a1c-whd whd-wh1 wh1-whs wh1-whk wh1-whf whf-fac1 pantry-pt1 pantry-pt2 lobby-meetdoor meetdoor-a2l meetdoor-mt0 mt0-mt3 mt3-mt1 mt0-mt2 mt1-mtw fc-wcd wcd-wc fm-grace mine-a2l maggie-a2m ethan-a1r kaiD-fl');
  /* 第五章用的點：空座位（s1～s8）、高層區、餐廳街的座位 */
  const N5 = {s1: [-2.9, -6.35], s2: [1.3, -6.35], s3: [3.4, -6.35], s4: [3.4, -1.85], s5: [5.5, -1.85], s6: [7.6, -1.85], s7: [1.3, 2.65], s8: [7.6, 2.65],
    q1: [-2.9, -4.8], q3: [3.4, -4.8], q4: [3.4, -.3], q5: [5.5, -.3], q6: [7.6, -.3], q7: [1.3, 4.2], q8: [7.6, 4.2],
    exd: [9.8, 7.6], hall: [9.8, 9.5], vpd: [6.8, 9.5], vpi: [6.8, 11.7], vp: [6.0, 12.95], ceoi: [9.2, 11.7], ceoj: [9.4, 12.95], ceo: [13.6, 12.95],
    c_e0: [-16.15, 4.5], c_e1: [-17.6, 4.5], c_e2: [-17.6, 1.45], c_l1: [-31, 1.45], c_l2: [-27, 1.45], c_l3: [-23, 1.45], c_l4: [-19, 1.45],
    u1: [-31, .4], u2: [-27, .4], u3: [-23, .4], u4: [-19, .4], d1: [-31, 2.5], d2: [-27, 2.5], d3: [-23, 2.5], d4: [-19, 2.5],
    o1: [-31.4, -7.1], o2: [-27.4, -7.1], o3: [-23.4, -7.1], o4: [-19.4, -7.1]};
  K.nodes(N5, 's1-q1 q1-a1l q1-a1m s2-a1m s3-q3 q3-a1m q3-a1r s4-q4 q4-a2m q4-a2r s5-q5 q5-a2r q5-q4 s6-q6 q6-a2r q6-a2c s7-q7 q7-fm q7-fl s8-q8 q8-fr q8-fc '
    + 'fc-exd exd-hall hall-vpd vpd-vpi vpi-vp hall-ceoi ceoi-ceoj ceoj-ceo door-c_e0 c_e0-c_e1 c_e1-c_e2 c_e2-c_l4 c_l4-c_l3 c_l3-c_l2 c_l2-c_l1 '
    + 'u1-c_l1 u2-c_l2 u3-c_l3 u4-c_l4 d1-c_l1 d2-c_l2 d3-c_l3 d4-c_l4');

  /* 可以點的地方：自己的座位、會議室的長桌（id 跟 STORY.places 一樣） */
  K.pickBox('desk', 1.9, 1.6, 1.2, XS[0], .8, ROWS[1] - .2, G);
  K.pickBox('wc', 4.4, 1.6, 3.2, 13.3, .8, 5.6, G);
  SH.forEach(s => K.pickBox('shop_' + s.id, 3.6, 2.2, 3.0, s.x, 1.1, -5.9, G));
  K.pickBox('factory', 12, 1.6, 6.5, -9.4, .8, -16.4, G);
  K.pickBox('pantry', 4.4, 1.6, 3.4, 13.3, .8, -8.0, G);
  K.pickBox('mdesk', 1.9, 1.6, 1.2, XS[1], .8, ROWS[1] - .2, G);
  K.pickBox('warehouse', 3, 1.6, 4, WX(-1.0), .8, WZ(21.8), G);
  K.pickBox('meeting', 7, 1.4, 2, -10.75, .7, -6.2, G);

  /* 主頁背景的鏡頭 */
  WORLD.shots = [{p: [0, 1.2, -1], d: 24, yaw: .35, pitch: .62}, {p: [-10, 1, 1], d: 18, yaw: -.3, pitch: .7}, {p: [12, 1, -4], d: 17, yaw: .2, pitch: .7}, {p: [8, 1, -15], d: 19, yaw: -.2, pitch: .7}];
});
WORLD.level = 'office';
