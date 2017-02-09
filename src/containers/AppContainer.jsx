import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import App from '../components/App';
import * as TetrisActions from '../actions';

class AppContainer extends Component {
  constructor(props) {
    super();
  }

  render() {
    <App world={this.props.world} />
  }
}

const mapStateToProps = state => ({
  world: state.get('world')
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TetrisActions, dispatch)
});

export default connect(mapStateToProps)(AppContainer);
