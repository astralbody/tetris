import React, {PropTypes} from 'react';
import {List} from 'immutable';
import Block from '../Block/Block';
import styles from './Row.css';

const Row = ({blocks}) => (
  <div className={styles.row}>
    {blocks.map(block =>
      <Block
        value={block.get('value')}
        key={block.get('id')}
      />
    )}
  </div>
);

Row.propTypes = {
  blocks: PropTypes.instanceOf(List).isRequired
};

export default Row;
