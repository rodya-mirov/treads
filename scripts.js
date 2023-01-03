const STATES = {
  // this is basically just an enum, we have lots of references to each state
  FINISHED: {
    niceText: "Finished"
  },
  RUNNING: {
    niceText: "Running"
  },
  NOT_YET: {
    niceText: "Not Yet Started"
  },
}

const setupRoutine = ({ routineState }) => {

  // tidy up / autogen the elements of the list so it's easier to work with later
  let routineTotalTimeMs = 0;

  const routine = routineState.routine;

  for (const routineEltIdx in routine) {
    const routineElt = routine[routineEltIdx];
    routineElt.totalPreceding = routineTotalTimeMs;
    routineElt.state = STATES.NOT_YET;

    routineTotalTimeMs += routineElt.duration;
  }
};

const makeRoutineEltId = (routineEltIdx) => `routineElt_${routineEltIdx}`;

const makeRoutineEltContents = (routineElt, remainingTime) => {
  const nicerText = `${routineSummaryTime(routineElt.duration)} ${routineElt.text}`.toUpperCase();

  if (routineElt.state === STATES.RUNNING) {

    return `<p class="routinePara bigText">${nicerText}</p><p class="routinePara bigText">TIME LEFT — ${niceTime(remainingTime)}</p>`;
  } else if (routineElt.state === STATES.NOT_YET) {
    return `<p class="text-muted routinePara bigText">${nicerText}</p>`;
  } else if (routineElt.state === STATES.FINISHED) {
    return `<p class="text-muted routinePara bigText">${nicerText}</p>`;
  }
};

const setState = ({ idx, state, remainingTime, routineElt }) => {
  routineElt.state = state;
  $(`#${makeRoutineEltId(idx)}`).html(makeRoutineEltContents(routineElt, remainingTime));

  if (state === STATES.FINISHED) {
    $(`#${makeRoutineEltId(idx)}`).addClass('hidden');
  }
};

const markDone = () => {
  $("#routineList").append($("<li class=\"list-group-item border-0 routineItem\"><p class=\"routinePara bigText\">🎉 COLLAPSE 🎉</p></li>"));
}

class RoutineState {
  constructor(routine) {
    this.routine = routine;
    this.routineIdx = -1;
  }
}

class TimingState {
  constructor() {
    this.startTime = undefined;
    this.priorElapsedMs = 0;
    this.interval = undefined;
    this.isPaused = true;
  }

  reset() {
    this.startTime = undefined;
    this.priorElapsedMs = 0;

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = undefined;
    this.isPaused = true;
  }
}

const unpause = ({ routineState, timingState }) => {
  if (!timingState.isPaused) {
    return;
  }

  timingState.isPaused = false;
  timingState.startTime = Date.now();

  $("#pausePlayButtonText").text("Pause");

  timingState.interval = setInterval(() => timestep({ routineState, timingState }), 50);
}

const pause = ({ timingState }) => {
  if (timingState.isPaused) {
    return;
  }

  timingState.isPaused = true;
  timingState.priorElapsedMs += Date.now() - timingState.startTime;
  timingState.startTime = undefined;

  $("#pausePlayButtonText").text("Start");

  clearInterval(timingState.interval);
  timingState.interval = undefined;
}

const updateStates = ({ elapsedMs, routineState }) => {
  const routine = routineState.routine;

  while (routineState.routineIdx < routine.length) {

    if (routineState.routineIdx < 0) {
      routineState.routineIdx = 0;

      const routineElt = routine[routineState.routineIdx];

      setState({ idx: routineState.routineIdx, state: STATES.RUNNING, remainingTime: routine[0].duration, routineElt });
      continue;
    }

    const routineElt = routine[routineState.routineIdx];

    if (elapsedMs > routineElt.duration + routineElt.totalPreceding) {
      setState({ idx: routineState.routineIdx, state: STATES.FINISHED, remainingTime: 0, routineElt });
      routineState.routineIdx += 1;

      if (routineState.routineIdx >= routine.length) {
        markDone();
      }
      continue;
    } else {

      // this takes the record for weirdest loop flow control i think i've ever written
      // TODO clean this up before the internet sees it
      // TODO setState ALSO updates the remsec text, which is janky
      setState({ idx: routineState.routineIdx, state: STATES.RUNNING, remainingTime: routineElt.duration + routineElt.totalPreceding - elapsedMs, routineElt });
      return;
    }
  }
};

const timestep = ({ routineState, timingState }) => {
  const now = Date.now();

  const elapsedMs = now - timingState.startTime + timingState.priorElapsedMs;

  updateStates({ elapsedMs, routineState });
};

const resetRoutine = ({ routineState }) => {

  setupRoutine({ routineState });

  const routine = routineState.routine;

  $("#routineList").empty();

  for (const routineEltIdx in routine) {
    const routineElt = routine[routineEltIdx];
    const routineId = makeRoutineEltId(routineEltIdx);

    const niceText = makeRoutineEltContents(routineElt, routineElt.duration);

    $("#routineList").append(`<li id=${routineId} class="list-group-item border-0 routineItem"> ${niceText}</li>`);
  }
}

$(document).ready(function () {

  const routineState = new RoutineState(makeRoutine());

  resetRoutine({ routineState });

  const timingState = new TimingState();

  $("#pausePlayButton").click(function () {
    if (timingState.isPaused) {
      unpause({ routineState, timingState });
    } else {
      pause({ timingState });
    }
  });

  $("#resetButton").click(function () {
    pause({ timingState });
  });

  $("#resetTemplateConfirmButton").click(function () {
    timingState.reset();
    resetRoutine({ routineState });
  });
});