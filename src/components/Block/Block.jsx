import React, {PropTypes} from 'react';
import styles from './Block.css';

const Block = prop =>
  <div
    className={`${styles.block} ${prop.value ? styles.black : styles.white}`}
  />;

Block.propTypes = {
  value: PropTypes.number.isRequired
};

export default Block;
