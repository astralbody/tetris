import React, {PropTypes} from 'react';
import {List} from 'immutable';
import Row from '../Row/Row';
import styles from './Game.css';

const Game = ({world}) => (
  <div className={styles.game}>
    {world.filter((row, z) => row.get('id') >= 0).map(row =>
      <Row
        blocks={row.get('blocks')}
        key={row.get('id')}
      />
    )}
  </div>
);

Game.propTypes = {world: PropTypes.instanceOf(List).isRequired};

export default Game;