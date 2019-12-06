import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Map, List} from 'immutable';
import {hot} from 'react-hot-loader/root';

import App from '../components/App/App';
import * as tetrisActions from '../actions/index';

import {getRandomDetails} from '../core/getRandomDetails';
import {checkAroundDetail, inc, echo} from '../core/checkAroundDetail';
import formatStopwatch from '../core/formatStopwatch';
import getHiScore from '../core/getHiScore';

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
  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    world: PropTypes.instanceOf(List).isRequired,
    speed: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    hiScore: PropTypes.number.isRequired,
    nextDetail: PropTypes.instanceOf(Map).isRequired,
    stopwatch: PropTypes.instanceOf(List).isRequired,
  }

  state = {
    pause: false,
  }

  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  handleKeyUp = ({keyCode}) => {
    const {lowSpeed} = this.props.actions;
    const {pause} = this.state;

    if (pause) return;

    switch (keyCode) {
      case 83:
      case 40:
        lowSpeed();
        this.handleUpdate();
        break;
      default:
        break;
    }
  }

  handleKeyDown = ({keyCode}) => {
    const {moveRight, moveLeft, rotateDetail} = this.props.actions;
    const {pause} = this.state;

    if (pause && keyCode !== 77) {
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
        this.moveDown();
        break;
      case 77:
        this.handlePause();
        break;
      default:
        break;
    }
  }

  moveDown = () => {
    const {upSpeed} = this.props.actions;
    upSpeed();
    this.handleUpdate();
  }

  initNextStep = () => {
    this.nextStep = {
      nextDetail: true,
      moveDown: null,
      gameOver: false,
    };
  }

  scanRow = (row, y) => {
    const {world} = this.props;

    row.get('blocks').forEach((block, x) => {
      const value = block.get('value');

      if (this.nextStep.nextDetail && value === 2) {
        this.nextStep.nextDetail = false;
      }
      if (value === 1 && y < 4) {
        this.nextStep.gameOver = true;
      }
      if (value !== 1) {
        this.nextStep.completeRow = false;
      }
      if (value === 2 && this.nextStep.moveDown !== false) {
        this.nextStep.moveDown = checkAroundDetail(world, x, y, echo, inc);
      }
    });
  }

  scanWord = () => {
    const {world, actions: {completeRow}} = this.props;

    world.forEach((row, y) => {
      this.nextStep.completeRow = true;

      this.scanRow(row, y);

      if (this.nextStep.completeRow) {
        completeRow(y);
      };
    });
  }

  transformDetail() {
    const {actions: {downBlock, transformBlock}} = this.props;

    switch (this.nextStep.moveDown) {
      case true:
        downBlock();
        break;
      case false:
        transformBlock({from: 2, to: 1});
        break;
      default:
        break;
    }
  }

  makeStep() {
    this.transformDetail();

    if (this.nextStep.nextDetail) {
      this.addNextDetail();
    };
    if (this.nextStep.gameOver) {
      this.handleOverGame();
    };
  }

  addNextDetail = () => {
    const {nextDetail} = this.props.actions;
    nextDetail(getRandomDetails());
  }

  handleStartGame = () => {
    const {runStartGame} = this.props.actions;

    this.handleOverGame();
    this.handleOnStopwatch();
    runStartGame();
    this.addNextDetail();
    this.startGame();
  }

  stopGame = () => {
    if (!this.currentGame) {
      return;
    }

    clearInterval(this.currentGame);
    this.currentGame = null;
  }

  tick = () => {
    this.initNextStep();
    this.scanWord();
    this.makeStep();
  }

  startGame = () => {
    const {speed} = this.props;

    if (this.currentGame) {
      return;
    }

    this.currentGame = setInterval(this.tick, speed);
  }

  startPause() {
    const {stopwatch} = this.props;
    this.setState({pause: true});
    this.stopGame();
    this.handleOffStopwatch(stopwatch);
  }

  stopPause() {
    const {stopwatch} = this.props;
    this.setState({pause: false});
    this.startGame();
    this.handleOnStopwatch(stopwatch);
  }

  handlePause = () => {
    if (this.currentGame) {
      this.startPause();
    } else {
      this.stopPause();
    }
  }

  handleOnStopwatch = (time = new List([0, 0, 0])) => {
    const {setStopwatch} = this.props.actions;

    setStopwatch(time);
    this.handleTickStopwatch();
  }

  handleOffStopwatch = (time = new List([0, 0, 0])) => {
    const {setStopwatch} = this.props.actions;

    setStopwatch(time);
    clearTimeout(this.stopwatch);
  }

  handleTickStopwatch = () => {
    const {tickStopwatch} = this.props.actions;

    this.stopwatch = setTimeout(this.handleTickStopwatch, 1000);
    tickStopwatch();
  }

  handleUpdate = (e) => {
    this.stopGame();
    this.startGame();
  }

  handleOverGame = () => {
    const {score, actions: {runOverGame}, hiScore} = this.props;
    if (score > hiScore) localStorage.setItem('hiScore', score);

    runOverGame(getHiScore(localStorage.getItem('hiScore')));
    this.handleOffStopwatch();
    this.stopGame();
  }

  render = () => (
    <App
      pause={this.state.pause}
      {...this.props}
      stopwatch={formatStopwatch(this.props.stopwatch)}
    />
  )
}

export default hot(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
