import formatStopwatch from '../core/formatStopwatch';

class Stopwatch {
  constructor({actions}) {
    this.actions = actions;
    autoBind(this);
  }

  handleOnStopwatch = (time = new List([0, 0, 0])) => {
    this.actions.setStopwatch(time);
    this.handleTickStopwatch();
  }

  handleOffStopwatch = (time = new List([0, 0, 0])) => {
    this.actions.setStopwatch(time);
    clearTimeout(this.stopwatch);
  }

  handleTickStopwatch = () => {
    this.stopwatch = setTimeout(this.handleTickStopwatch, 1000);
    this.actions.tickStopwatch();
  }

  format = (stopwatch) => formatStopwatch(stopwatch)
}

export default Stopwatch;
