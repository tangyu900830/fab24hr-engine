function (ch, sg) {
  sg = sg || 1;
  /* 不開畫面，把一章從頭玩完：對話與選項都用程式選。給 tools/maxes.js 算「每個數值最高能到幾分」。
     登記的選項順序 seq；選項用 seq[k] % 選項數 選。 */
  const keep = {say, toast, W0: W, d0: ST.d, q0: ST.q, seg0: ST.seg, clock0: ST.clock};
  const stats = ['trust', 'cust', 'profit', 'energy'];
  function run(seq) {
    let k = 0, ok = true; const trace = [];
    say = (lines, cb, opts) => {
      if (opts && opts.choice) {const n = opts.choice.length, i = (seq[k] || 0) % n; k++; trace.push(n); opts.choice[i][1]()}
      else if (cb) cb();
    };
    toast = () => {};
    W = null;
    ST.d = {chapter: ch}; ST.q = 0; ST.seg = '';
    let q = nextIndex(0), g = 0, seg = '';
    while (q < STORY.beats.length && g++ < 400) {
      const b = STORY.beats[q]; ST.q = q;
      if (b.seg !== seg) {seg = b.seg; ST.seg = seg; const G = STORY.segs[seg]; ST.clock = G.t || 0; if (G.scene) G.scene()}
      if (b.end) {if (b.lines) b.lines(); if (b.after) b.after(); break}
      if (b.lines) b.lines();
      let fin = false;
      const s3 = () => {fin = true; if (b.post) b.post(); if (b.after) b.after()};
      if (b.mini) b.mini(s3); else s3();
      if (!fin) {ok = false; break}
      q = nextIndex(q + 1);
    }
    const r = {ok, trace, d: ST.d};
    stats.forEach(s => {r[s] = pmStat(s)});
    return r;
  }
  const out = {};
  try {
    stats.forEach(s => {
      const pool = [];
      for (let t = 0; t < 300; t++) {const sq = []; for (let i = 0; i < 60; i++) sq.push(Math.floor(Math.random() * 4)); pool.push([sg * run(sq)[s], sq])}
      pool.sort((x, y) => y[0] - x[0]);
      let bv = -1;
      pool.slice(0, 4).forEach(p => {
        let best = p[1], cv = p[0];
        for (let pass = 0; pass < 12; pass++) {
          let imp = false; const n = run(best).trace.length;
          for (let i = 0; i < n; i++) for (let v = 0; v < 4; v++) {
            const sq = best.slice(); if (sq[i] === v) continue; sq[i] = v;
            const x = sg * run(sq)[s]; if (x > cv) {cv = x; best = sq; imp = true}
          }
          if (!imp) break;
        }
        if (cv > bv) bv = cv;
      });
      out[s] = sg * bv;
    });
  } finally {say = keep.say; toast = keep.toast; W = keep.W0; ST.d = keep.d0; ST.q = keep.q0; ST.seg = keep.seg0; ST.clock = keep.clock0}
  return out;
}
