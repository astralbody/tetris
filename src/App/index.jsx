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

  handleCycle = (e) => {
    const {
      world,
      actions: {
        completeRow,
        downBlock,
        transformBlock,
        nextDetail,
      },
    } = this.props;
    const nextStep = {
      nextDetail: true,
      moveDown: null,
      gameOver: false,
    };

    world.forEach((row, y) => {
      nextStep.completeRow = true;

      row.get('blocks').forEach((block, x) => {
        const value = block.get('value');

        if (nextStep.nextDetail && value === 2) nextStep.nextDetail = false;
        if (value === 1 && y < 4) nextStep.gameOver = true;
        if (value !== 1) nextStep.completeRow = false;

        if (value === 2 && nextStep.moveDown !== false) {
          nextStep.moveDown = checkAroundDetail(world, x, y, echo, inc);
        }
      });

      if (nextStep.completeRow) completeRow(y);
    });

    switch (nextStep.moveDown) {
      case true:
        downBlock();
        break;
      case false:
        transformBlock({from: 2, to: 1});
        break;
      default:
        break;
    }
    if (nextStep.nextDetail) nextDetail(getRandomDetails());
    if (nextStep.gameOver) this.handleOverGame();
  }

  handleStartGame = () => {
    const {runStartGame, nextDetail} = this.props.actions;

    this.handleOverGame();
    this.handleOnStopwatch();
    runStartGame();
    nextDetail(getRandomDetails());
    this.handleOnCycle();
  }

  handleOnCycle = () => {
    if (this.playGame) return;
    const {speed} = this.props;

    this.playGame = setInterval(this.handleCycle, speed);
  }

  handleOffCycle = () => {
    if (!this.playGame) return;

    clearInterval(this.playGame);
    this.playGame = null;
  }

  handlePause = () => {
    const {stopwatch} = this.props;

    if (this.playGame) {
      this.setState({pause: true});
      this.handleOffCycle();
      this.handleOffStopwatch(stopwatch);
    } else {
      this.setState({pause: false});
      this.handleOnCycle();
      this.handleOnStopwatch(stopwatch);
    }
  }

  handleOnStopwatch = (time = new List([0, 0, 0])) => {
    this.handleSetStopwatch(time);
    this.handleTickStopwatch();
  }

  handleSetStopwatch = (time) => {
    const {setStopwatch} = this.props.actions;
    setStopwatch(time);
  }

  handleOffStopwatch = (time = new List([0, 0, 0])) => {
    this.handleSetStopwatch(time);
    clearTimeout(this.stopwatch);
  }

  handleTickStopwatch = () => {
    const {tickStopwatch} = this.props.actions;

    this.stopwatch = setTimeout(this.handleTickStopwatch, 1000);
    tickStopwatch();
  }

  handleUpdate = (e) => {
    const {speed} = this.props;

    clearInterval(this.playGame);
    this.playGame = setInterval(this.handleCycle, speed);
  }

  handleOverGame = () => {
    const {score, actions: {runOverGame}, hiScore} = this.props;
    if (score > hiScore) localStorage.setItem('hiScore', score);

    runOverGame(getHiScore(localStorage.getItem('hiScore')));
    this.handleOffStopwatch();
    this.handleOffCycle();
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
