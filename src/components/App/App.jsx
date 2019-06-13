import React from 'react';
import PropTypes from 'prop-types';
import {List, Map} from 'immutable';
import Game from '../Game/Game';
import Panel from '../Panel/Panel';
import {container, app} from './App.css';

const App = ({world, ...props}) => (
  <div className={container}>
    <div className={app}>
      <Game world={world} />
      <Panel {...props} />
    </div>
  </div>
);

App.propTypes = {
  world: PropTypes.instanceOf(List).isRequired,
  score: PropTypes.number.isRequired,
  hiScore: PropTypes.number.isRequired,
  nextDetail: PropTypes.instanceOf(Map).isRequired,
  stopwatch: PropTypes.string.isRequired,
  pause: PropTypes.bool.isRequired,
};

export default App;
