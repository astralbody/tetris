import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {map} from 'react-immutable-proptypes';
import App from '../components/App';
import * as TetrisActions from '../actions/index';
import * as sides from '../constants/MoveSide';
import {getRandomDetails} from '../library/getRandomDetails';
import checkAroundDetail from '../library/checkAroundDetail';

class AppContainer extends Component {
  constructor(props) {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleCycle = this.handleCycle.bind(this);
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
        return this.props.actions.moveDetail(sides.MOVE_LEFT);
    case 39:
    case 68:
        return this.props.actions.moveDetail(sides.MOVE_RIGHT);
    case 13:
    case 32:
        return this.props.actions.rotateDetail();
    default:
        return null;
    }
  }

  handleCycle(e) {
    const nextStep = {};
    nextStep.nextDetail = true;
    nextStep.moveDown = null;

    this.props.world.get('map').forEach((row, y) => {
      const idRow = row.get('id');

      row.get('blocks').forEach((block, x) => {
        const valBlock = block.get('value');
        if (nextStep.nextDetail && valBlock === 2) {
          nextStep.nextDetail = false;
        }

        if (valBlock === 2 && nextStep.moveDown !== false) {
          nextStep.moveDown = checkAroundDetail(this.props.world, x, y);
        }
      });
    });

    if (nextStep.moveDown === true) {
      this.props.actions.downBlock([2]);
    } else if (nextStep.moveDown === false) {
      this.props.actions.transformBlock({
        from: 2,
        to: 1
      });
    }

    if (nextStep.nextDetail) this.props.actions.nextDetail(getRandomDetails());
  }

  handleStartGame(e) {
    this.props.actions.runStartGame();
    this.props.actions.nextDetail(getRandomDetails());
    this.playGame = setInterval(this.handleCycle, this.props.speed);
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
