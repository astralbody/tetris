import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {list} from 'react-immutable-proptypes';
import App from '../components/App';
import * as TetrisActions from '../actions';

class AppContainer extends Component {
  constructor(props) {
    super();
  }

  render() {
    return <App world={this.props.world} />;
  }
}

AppContainer.propTypes = {
  world: list.isRequired
};

const mapStateToProps = state => ({world: state.world});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TetrisActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
