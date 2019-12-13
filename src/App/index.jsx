import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Map, List} from 'immutable';
import {hot} from 'react-hot-loader/root';

import App from './components/App';
import * as tetrisActions from '../actions/index';

import {getRandomDetails} from '../core/getRandomDetails';
import {checkAroundDetail, inc, echo} from '../core/checkAroundDetail';
import formatStopwatch from '../core/formatStopwatch';
import setHiScore from '../core/setHiScore';

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

  handleKeyUp = ({type, keyCode}) => {
    const {pause} = this.state;

    if (pause) {
      return;
    }

    switch (keyCode) {
      case 83:
      case 40:
        this.moveDown(type);
        break;
      default:
        break;
    }
  }

  checkAppIsPaused = (keyCode) => {
    const {pause} = this.state;
    return pause && keyCode !== 77;
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
        this.moveDown(type);
        break;
      case 77:
        this.handlePause();
        break;
      default:
        break;
    }
  }

  initNextStep = () => {
    this.nextStep = {
      nextDetail: true,
      moveDown: null,
      gameOver: false,
    };
  }

  updateNextStep(newNextStep) {
    this.nextStep = Object.assign(this.nextStep, newNextStep);
  }

  checkBlockShouldMove() {
    const {value, moveDown} = this.nextStep;

    return value === 2 && moveDown !== false;
  }

  scanMoveDown = () => {
    const {world} = this.props;
    const {x, y} = this.nextStep;

    if (this.checkBlockShouldMove()) {
      this.updateNextStep({
        moveDown: checkAroundDetail({worldMap: world, x, y, fx: echo, fy: inc}),
      });
    }
  }

  checkBlockIsEmpty() {
    const {value} = this.nextStep;
    return value !== 1;
  }

  scanCompleteRow = () => {
    if (this.checkBlockIsEmpty()) {
      this.updateNextStep({completeRow: false});
    }
  }

  checkBlockIsOverlaped() {
    const {value, y} = this.nextStep;
    return value === 1 && y < 4;
  }

  scanGameOver = () => {
    if (this.checkBlockIsOverlaped()) {
      this.updateNextStep({gameOver: true});
    }
  }

  checkBlockIsPartOfNextDetail() {
    const {nextDetail, value} = this.nextStep;
    return nextDetail && value === 2;
  }

  scanNextDetail = () => {
    if (this.checkBlockIsPartOfNextDetail()) {
      this.updateNextStep({nextDetail: false});
    }
  }

  scanBlock = (block, x) => {
    this.updateNextStep({
      value: block.get('value'),
      x,
    });

    this.scanNextDetail();
    this.scanGameOver();
    this.scanCompleteRow();
    this.scanMoveDown();
  }

  makeStepWhenRowScanned = () => {
    const {completeRow} = this.props.actions;

    if (this.nextStep.completeRow) {
      completeRow(this.nextStep.y);
    };
  }

  scanRow = (row, y) => {
    this.updateNextStep({
      y: y,
      completeRow: true,
    });

    row.get('blocks').forEach(this.scanBlock);

    this.makeStepWhenRowScanned();
  }

  transformDetail() {
    const {actions: {downBlock, transformBlock}} = this.props;

    if (this.nextStep.moveDown) {
      downBlock();
    } else {
      transformBlock({from: 2, to: 1});
    }
  }


  addNextDetail = () => {
    const {nextDetail} = this.props.actions;

    if (this.nextStep.nextDetail) {
      nextDetail(getRandomDetails());
    };
  }

  makeStepWhenWordScanned() {
    this.transformDetail();
    this.addNextDetail();

    if (this.nextStep.gameOver) {
      this.handleOverGame();
    };
  }

  scanWord = () => {
    const {world} = this.props;
    this.initNextStep();

    world.forEach(this.scanRow);

    this.makeStepWhenWordScanned();
  }


  handleStartGame = () => {
    const {runStartGame} = this.props.actions;
    this.initNextStep();
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

  startGame = () => {
    const {speed} = this.props;

    if (this.currentGame) {
      return;
    }

    this.currentGame = setInterval(this.scanWord, speed);
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

  moveDown = (eventType) => {
    const {adjustMovementSpeed} = this.props.actions;

    adjustMovementSpeed(eventType);
    this.stopGame();
    this.startGame();
  }

  handleOverGame = () => {
    const {score, actions: {runOverGame}, hiScore} = this.props;

    setHiScore(score, hiScore);
    runOverGame();
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
