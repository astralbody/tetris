const formatStopwatch = time =>
  time.map(t => `${t}`.length > 1 ? t : `0${t}`).slice(1).join(':');

export default formatStopwatch;
