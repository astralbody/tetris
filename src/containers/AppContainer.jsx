import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {list} from 'react-immutable-proptypes';
import App from '../components/App';
import * as TetrisActions from '../actions/index';
import * as sides from '../constants/MoveSide';
import getRandomOfDetailsList from '../library/getDetail';


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
    return this.props.world;
  }

  handleStartGame(e) {
    this.props.actions.runGameStart();
    console.log(getRandomOfDetailsList());
    this.props.actions.nextDetail(getRandomOfDetailsList());
    // this.playGame = setInterval(this.handleCycle, this.props.speed);
  }

  render() {
    return <App world={this.props.world} />;
  }
}

AppContainer.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
  world: list.isRequired,
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
