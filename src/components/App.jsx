import React, {PropTypes} from 'react';
import {list} from 'react-immutable-proptypes';
import Game from './Game';
import Panel from './Panel';
import './App.css';

const App = ({world, score}) => (
  <div>
    <Game world={world} />
    <Panel score={score} />
  </div>
);

App.propTypes = {
  world: list.isRequired,
  score: PropTypes.number.isRequired
};

export default App;
