import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import Game from '../Game/Game';
import Panel from '../Panel/Panel';
import styles from './App.css';

const App = ({world, score, hiScore, nextDetail, stopwatch}) => (
  <div className={styles.main}>
    <Game world={world} />
    <Panel
      score={score}
      hiScore={hiScore}
      nextDetail={nextDetail}
      stopwatch={stopwatch}
    />
  </div>
);

App.propTypes = {
  world: PropTypes.instanceOf(List).isRequired,
  score: PropTypes.number.isRequired,
  hiScore: PropTypes.number.isRequired,
  nextDetail: PropTypes.instanceOf(Map).isRequired,
  stopwatch: PropTypes.string.isRequired
};

export default App;
