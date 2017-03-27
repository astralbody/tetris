import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Map, List} from 'immutable';
import App from '../components/App';
import * as TetrisActions from '../actions/index';
import * as sides from '../constants/MoveSide';
import {getRandomDetails} from '../core/getRandomDetails';
import {checkAroundDetail, inc, echo} from '../core/checkAroundDetail';

class AppContainer extends Component {
  constructor(props) {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleCycle = this.handleCycle.bind(this);
    this.handleOverGame = this.handleOverGame.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    this.handleStartGame();
  }

  handleKeyUp(e) {
    switch (e.keyCode) {
    case 83:
    case 40:
        this.props.actions.lowSpeed();
        this.handleUpdate();
        break;
    default:
        break;
    }
  }

  handleKeyDown(e) {
    /* eslint indent: 0 */
    switch (e.keyCode) {
    case 37:
    case 65:
        this.props.actions.moveDetail(sides.MOVE_LEFT);
        break;
    case 39:
    case 68:
        this.props.actions.moveDetail(sides.MOVE_RIGHT);
        break;
    case 13:
    case 32:
        this.props.actions.rotateDetail();
        break;
    case 80:
        this.handleStartGame();
        break;
    case 27:
        this.handleOverGame();
        break;
    case 83:
    case 40:
        this.props.actions.upSpeed();
        this.handleUpdate();
        break;
    default:
        break;
    }
  }

  handleCycle(e) {
    const nextStep = {
      nextDetail: true,
      moveDown: null,
      gameOver: false
    };


    this.props.world.forEach((row, y) => {
      nextStep.completeRow = true;

      row.get('blocks').forEach((block, x) => {
        const valBlock = block.get('value');

        if (nextStep.nextDetail && valBlock === 2) {
          nextStep.nextDetail = false;
        }

        if (valBlock === 1 && y < 4) nextStep.gameOver = true;

        if (valBlock !== 1) nextStep.completeRow = false;

        if (valBlock === 2 && nextStep.moveDown !== false) {
          nextStep.moveDown =
            checkAroundDetail(this.props.world, x, y, echo, inc);
        }
      });

      if (nextStep.completeRow) this.props.actions.completeRow(y);
    });

    switch (nextStep.moveDown) {
    case true:
      this.props.actions.downBlock();
      break;
    case false:
      this.props.actions.transformBlock({from: 2, to: 1});
      break;
    default:
      break;
    }

    if (nextStep.nextDetail) this.props.actions.nextDetail(getRandomDetails());
    if (nextStep.gameOver) this.handleOverGame();
  }

  handleStartGame() {
    this.handleOverGame();
    this.props.actions.runStartGame();
    this.props.actions.nextDetail(getRandomDetails());
    this.playGame = setInterval(this.handleCycle, this.props.speed);
  }

  handleUpdate(e) {
    clearInterval(this.playGame);
    this.playGame = setInterval(this.handleCycle, this.props.speed);
  }

  handleOverGame() {
    this.props.actions.runOverGame();
    if (this.playGame) clearInterval(this.playGame);
  }

  render() {
    return (
      <App
        world={this.props.world}
        score={this.props.score}
        hiScore={this.props.hiScore}
        nextDetail={this.props.nextDetail}
      />
    );
  }
}

AppContainer.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
  world: PropTypes.instanceOf(List).isRequired,
  speed: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  hiScore: PropTypes.number.isRequired,
  nextDetail: PropTypes.instanceOf(Map).isRequired
};

const mapStateToProps = state => ({
  world: state.get('world'),
  speed: state.get('speed'),
  score: state.get('score'),
  hiScore: state.get('hiScore'),
  nextDetail: state.get('nextDetail')
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TetrisActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
