import React from 'react';
import {list} from 'react-immutable-proptypes';
import Row from './Row';
import './Game.css';

const Game = ({world}) => (
  <div className="game">
    {world.filter((row, z) => row.get('id') >= 0).map(row =>
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
