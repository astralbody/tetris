import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import Game from './Game';
import Panel from './Panel';
import './App.css';

const App = ({world, score, hiScore, nextDetail}) => (
  <div>
    <Game world={world} />
    <Panel score={score} hiScore={hiScore} nextDetail={nextDetail} />
  </div>
);

App.propTypes = {
  world: PropTypes.instanceOf(List).isRequired,
  score: PropTypes.number.isRequired,
  hiScore: PropTypes.number.isRequired,
  nextDetail: PropTypes.instanceOf(Map).isRequired
};

export default App;
