
class Pause {
  constructor({game, stopwatch, currentStopwatch, setState}) {
    this.game = game;
    this.stopwatch = stopwatch;
    this.currentStopwatch = currentStopwatch;
    this.setState = setState;
  }

  checkAppIsPaused(keyCode) {
    const {pause} = this.state;
    return pause && keyCode !== 77;
  }

  handlePause() {
    if (this.game.currentGame) {
      this.startPause();
    } else {
      this.stopPause();
    }
  }

  startPause() {
    this.setState({pause: true});
    this.game.stopGame();
    this.stopwatch.handleOffStopwatch(this.currentStopwatch);
  }

  stopPause() {
    this.setState({pause: false});
    this.game.startGame();
    this.stopwatch.handleOnStopwatch(this.currentStopwatch);
  }
}

export default Pause;
