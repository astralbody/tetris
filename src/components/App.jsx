import React from 'react';
import {list} from 'react-immutable-proptypes';
import Game from './Game';
import './App.css';

const App = ({world}) => <Game world={world} />;

App.propTypes = {
  world: list.isRequired
};

export default App;
