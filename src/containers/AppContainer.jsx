import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {map} from 'react-immutable-proptypes';
import App from '../components/App';
import * as TetrisActions from '../actions/index';
import * as sides from '../constants/MoveSide';
import {getRandomDetails} from '../core/getRandomDetails';
import {checkAroundDetail, inc, echo} from '../core/checkAroundDetail';

class AppContainer extends Component {
  constructor(props) {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleCycle = this.handleCycle.bind(this);
    this.handleOverGame = this.handleOverGame.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    this.handleStartGame();
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
    default:
        break;
    }
  }

  handleCycle(e) {
    const nextStep = {};
    nextStep.nextDetail = true;
    nextStep.moveDown = null;
    nextStep.gameOver = false;

    this.props.world.get('map').forEach((row, y) => {
      let completeRow = true;

      row.get('blocks').forEach((block, x) => {
        const valBlock = block.get('value');

        if (nextStep.nextDetail && valBlock === 2) {
          nextStep.nextDetail = false;
        }

        if (valBlock === 1 && y < 4) nextStep.gameOver = true;

        if (valBlock !== 1) completeRow = false;

        if (valBlock === 2 && nextStep.moveDown !== false) {
          nextStep.moveDown =
            checkAroundDetail(this.props.world.get('map'), x, y, echo, inc);
        }
      });

      if (completeRow) this.props.actions.completeRow(y);
    });

    switch (nextStep.moveDown) {
    case true:
      this.props.actions.downBlock();
      break;
    case false:
      this.props.actions.transformBlock({
        from: 2,
        to: 1
      });
      break;
    default:
      break;
    }

    if (nextStep.nextDetail) this.props.actions.nextDetail(getRandomDetails());
    if (nextStep.gameOver) this.handleOverGame();
  }

  handleStartGame(e) {
    this.props.actions.runStartGame();
    this.props.actions.nextDetail(getRandomDetails());
    this.playGame = setInterval(this.handleCycle, this.props.speed);
  }

  handleOverGame(e) {
    this.props.actions.runOverGame();
    clearInterval(this.playGame);
  }

  render() {
    return <App world={this.props.world.get('map')} />;
  }
}

AppContainer.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
  world: map.isRequired,
  speed: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  world: state.world,
  speed: state.speed
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TetrisActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
