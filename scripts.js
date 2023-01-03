
const niceTime = ms => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);

  const remSeconds = seconds - (minutes * 60);
  const remMs = ms - (seconds * 1000);

  const minStr = `${minutes}`;
  const secStr = `${remSeconds}`.padStart(2, '0');

  const csStr = `${Math.floor(remMs / 10)}`.padStart(2, '0');

  return `${minStr} : ${secStr} . ${csStr}`;
}

const routineSummaryTime = ms => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);

  const remSeconds = seconds - (minutes * 60);
  const remMs = ms - (seconds * 1000);

  const minStr = `${minutes}`;
  const secStr = `${remSeconds}`.padStart(2, '0');
  const msStr = `${remMs}`.padStart(3, '0');

  if (minutes > 0) {
    if (remSeconds > 0) {
      if (minutes >= 2) {
        // 3:30 push reads better than 210 second push
        return `${minStr}:${secStr}`;
      } else {
        // 90 second push reads better than 1:30 push
        return `${seconds} second`;
      }
    } else {
      return `${minStr} minute`;
    }
  } else {
    return `${seconds} second`;
  }
}

// TODO: fetch this from firebase (???)
const routine = [
  {
    text: "Push",
    duration: 15000,
  },
  {
    text: "Base",
    duration: 120000,
  },
  {
    text: "All Out",
    duration: 3000,
  },
  {
    text: "Base",
    duration: 5000,
  },
];

const states = {
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

// tidy up / autogen the elements of the list so it's easier to work with later
let routineTotalTimeMs = 0;

for (const routineEltIdx in routine) {
  const routineElt = routine[routineEltIdx];
  routineElt.totalPreceding = routineTotalTimeMs;
  routineElt.state = states.NOT_YET;

  routineTotalTimeMs += routineElt.duration;
}

const makeRoutineEltId = (routineEltIdx) => `routineElt_${routineEltIdx}`;

const makeRoutineEltText = (routineElt, remainingTime) => {
  const nicerText = `${routineSummaryTime(routineElt.duration)} ${routineElt.text}`.toUpperCase();

  if (routineElt.state === states.RUNNING) {

    return `<p class="routinePara">${nicerText}</p><p class="routinePara">TIME LEFT — ${niceTime(remainingTime)}</p>`;
  } else if (routineElt.state === states.NOT_YET) {
    return `<p class="text-muted routinePara">${nicerText}</p>`;
  } else if (routineElt.state === states.FINISHED) {
    return `<p class="text-muted routinePara">${nicerText}</p>`;
  }
};

const setState = ({ idx, state, remainingTime }) => {
  const routineElt = routine[idx];
  routineElt.state = state;
  $(`#${makeRoutineEltId(idx)}`).html(makeRoutineEltText(routineElt, remainingTime));

  if (state === states.FINISHED) {
    $(`#${makeRoutineEltId(idx)}`).addClass('hidden');
  }
};

const markDone = () => {
  $("#routineList").append($("<li class=\"list-group-item border-0 routineItem\"><p class=\"routinePara\">🎉 COLLAPSE 🎉</p></li>"));
}

let startTime = undefined;
let priorElapsedMs = 0;
let interval = undefined;
let isPaused = true;

const unpause = () => {
  if (!isPaused) {
    return;
  }

  isPaused = false;
  startTime = Date.now();

  $("#pausePlayButtonText").text("Pause");

  interval = setInterval(timestep, 50);
}

const pause = () => {
  if (isPaused) {
    return;
  }

  isPaused = true;
  priorElapsedMs += Date.now() - startTime;
  startTime = undefined;

  $("#pausePlayButtonText").text("Start");

  clearInterval(interval);
  interval = undefined;
}

let routineIdx = -1;

const updateStates = ({ elapsedMs }) => {
  while (routineIdx < routine.length) {

    if (routineIdx < 0) {
      routineIdx = 0;
      setState({ idx: routineIdx, state: states.RUNNING, remainingTime: routine[0].duration });
      continue;
    }

    const routineElt = routine[routineIdx];

    if (elapsedMs > routineElt.duration + routineElt.totalPreceding) {
      setState({ idx: routineIdx, state: states.FINISHED, remainingTime: 0 });
      routineIdx += 1;

      if (routineIdx >= routine.length) {
        markDone();
      }
      continue;
    } else {

      // this takes the record for weirdest loop flow control i think i've ever written
      // TODO clean this up before the internet sees it
      // TODO setState ALSO updates the remsec text, which is janky
      setState({ idx: routineIdx, state: states.RUNNING, remainingTime: routineElt.duration + routineElt.totalPreceding - elapsedMs });
      return;
    }
  }
};

const timestep = () => {
  const now = Date.now();

  const elapsedMs = now - startTime + priorElapsedMs;

  updateStates({ elapsedMs });
};

$(document).ready(function () {

  for (const routineEltIdx in routine) {
    const routineElt = routine[routineEltIdx];
    const routineId = makeRoutineEltId(routineEltIdx);

    const niceText = makeRoutineEltText(routineElt, routineElt.duration);

    $("#routineList").append(`<li id=${routineId} class="list-group-item border-0 routineItem"> ${niceText}</li>`);
  }

  $("#pausePlayButton").click(function () {
    if (isPaused) {
      unpause();
    } else {
      pause();
    }

    $(this).toggleClass("btn-warning");
    $(this).toggleClass("btn-success");
  });
});