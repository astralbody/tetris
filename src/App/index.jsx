import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Map, List} from 'immutable';
import {hot} from 'react-hot-loader/root';
import App from './components/App';
import * as tetrisActions from '../actions/index';
import setHiScore from '../core/setHiScore';
import Game from './Game';
import Stopwatch from './Stopwatch';

const mapStateToProps = (state) => ({
  world: state.get('world'),
  speed: state.get('speed'),
  score: state.get('score'),
  hiScore: state.get('hiScore'),
  nextDetail: state.get('nextDetail'),
  stopwatch: state.get('stopwatch'),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(tetrisActions, dispatch),
});

class AppContainer extends Component {
  constructor(...args) {
    super(...args);
    this.game = new Game(this.props);
    this.stopwatch = new Stopwatch();
    this.pause = new Pause({
      game: this.game,
      stopwatch: this.stopwatch,
      currentStopwatch: this.props.stopwatch,
      setState,
    });
    this.state = {
      pause: false,
    };
  }

  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    world: PropTypes.instanceOf(List).isRequired,
    speed: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    hiScore: PropTypes.number.isRequired,
    nextDetail: PropTypes.instanceOf(Map).isRequired,
    stopwatch: PropTypes.instanceOf(List).isRequired,
  }

  componentDidUpdate = () => {
    this.game.updateGame(this.props);
  }

  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  handleKeyUp = ({type, keyCode}) => {
    const {pause} = this.state;

    if (pause) {
      return;
    }

    switch (keyCode) {
      case 83:
      case 40:
        this.game.moveDown(type);
        break;
      default:
        break;
    }
  }

  handleKeyDown = ({type, keyCode}) => {
    const {moveRight, moveLeft, rotateDetail} = this.props.actions;

    if (this.checkAppIsPaused(keyCode)) {
      return;
    };

    switch (keyCode) {
      case 37:
      case 65:
        moveLeft();
        break;
      case 39:
      case 68:
        moveRight();
        break;
      case 13:
      case 32:
        rotateDetail();
        break;
      case 80:
        this.handleStartGame();
        break;
      case 27:
        this.handleOverGame();
        break;
      case 83:
      case 40:
        this.game.moveDown(type);
        break;
      case 77:
        this.handlePause();
        break;
      default:
        break;
    }
  }

  handleStartGame = () => {
    const {runStartGame} = this.props.actions;
    this.game.initNextStep();
    this.handleOverGame();
    this.stopwatch.handleOnStopwatch();
    runStartGame();
    this.game.addNextDetail();
    this.game.startGame();
  }

  handleOverGame = () => {
    const {score, actions: {runOverGame}, hiScore} = this.props;

    setHiScore(score, hiScore);
    runOverGame();
    this.stopwatch.handleOffStopwatch();
    this.game.stopGame();
  }

  render = () => (
    <App
      pause={this.state.pause}
      {...this.props}
      stopwatch={this.stopwatch.format(this.props.stopwatch)}
    />
  )
}

export default hot(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
