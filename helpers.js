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

  const minStr = `${minutes}`;
  const secStr = `${remSeconds}`.padStart(2, '0');

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