const step = (text, sec) => {
  return {
    text,
    duration: sec * 1000
  }
};

const wr = sec => step('Walking Recovery', sec);

const base = sec => step('Base', sec);

const baseToPush = sec => step('Base to Push', sec);

const push = sec => step('Push', sec);

const pushToAllOut = sec => step('Push to All Out', sec);

const allOut = sec => step('All Out', sec);

const basePct = (pct, sec) => step(`Base at ${pct}%`, sec);

const pushPct = (pct, sec) => step(`Push at ${pct}%`, sec);

// manually filling all this stuff out
export const allRoutines = {
  '2023-01-01': {
    routine: [
      // block 1
      base(60),
      baseToPush(60),
      push(60),
      pushToAllOut(60),
      allOut(60),
      wr(60),
      step('Tread for Distance (note final distance; try to beat it in block 2)', 4 * 60 + 30),
      step('(Pause and pretend to have a floor block)', 30),

      // block 2
      step('Tread for Distance', 4 * 60 + 30),
      wr(60),
      base(60),
      baseToPush(60),
      push(60),
      pushToAllOut(60),
      allOut(60),
    ]
  },
  '2023-01-03': {
    routine: [
      // block 1
      push(120),
      base(90),
      pushPct(4, 60),
      base(90),
      pushPct(4, 90),
      // block 2
      push(120),
      base(75),
      pushPct(3, 60),
      base(75),
      pushPct(3, 60),
      // block 3
      push(120),
      base(60),
      pushPct(2, 60),
      base(60),
      pushPct(2, 30),
      step('All Out at 2%', 30),
    ]
  },
  '2023-01-06': {
    routine: [
      // block 1
      step('Base to Push', 90),
      step('Push', 90),
      step('Push to All Out', 90),
      step('All Out', 30),
      step('(Pretend to have a floor block)', 5),
      // block 2
      step('Base to Push at 3%', 90),
      step('Push at 3%', 90),
      step('Push to All Out at 3%', 90),
      step('All Out at 3%', 30),
      step('(Pretend to have a floor block)', 5),
      // block 3
      step('Base at 3%', 60),
      step('Base at 4%', 60),
      step('Base at 5%', 60),
      base(75),
      step('Base at 5%', 45),
      step('Base at 6%', 45),
      step('Base at 7%', 45),
      base(60),
      step('Base at 7%', 30),
      step('Base at 8%', 30),
      step('Base at 9%', 30),
      base(45),
      allOut(30),
      step("(Surely we're done?)", 5),
    ]
  },
  // Jan 7 skipped since it's a run/row
  '2023-01-08': {
    routine: [
      // block 1
      push(45),
      base(90),
      push(45),
      base(90),
      push(45),
      base(90),
      allOut(30),
      // block 2
      basePct(2, 30),
      basePct(3, 30),
      basePct(4, 30),
      basePct(5, 30),
      basePct(6, 30),
      basePct(7, 30),
      basePct(6, 30),
      basePct(5, 30),
      basePct(4, 30),
      basePct(3, 30),
      basePct(2, 30),
      base(90),
      allOut(60),
      // block 3
      allOut(60),
      wr(90),
      allOut(45),
      wr(60),
      allOut(30),
    ]
  },
  '2023-01-09': {
    "routine": [
      // block 1
      push(30),
      base(30),

      push(45),
      base(45),

      push(60),
      base(60),

      push(75),
      base(75),

      push(90),
      base(90),

      allOut(30),

      // block 2
      push(90),
      base(90),

      push(75),
      base(75),

      push(60),
      base(60),

      push(45),
      base(45),

      push(30),
      base(30),

      allOut(30),
    ]
  }
  // this list last updated on Jan 9
};
