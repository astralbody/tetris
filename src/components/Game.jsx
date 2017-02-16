import React from 'react';
import {list} from 'react-immutable-proptypes';
import Row from './Row';
import './Game.css';
// row.get('id') >= 0
const Game = ({world}) => (
  <div className="game">
    {world.filter((row, z) => true).map(row =>
      <Row
        blocks={row.get('blocks')}
        key={row.get('id')}
      />
    )}
  </div>
);

Game.propTypes = {
  world: list.isRequired
};

export default Game;
