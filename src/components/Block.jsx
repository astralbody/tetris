import React, {PropTypes} from 'react';
import './Block.css';

const Block = prop =>
  <div
    className={`block ${prop.value ? 'black' : 'white'}`}
  />;

Block.propTypes = {
  value: PropTypes.number.isRequired
};

export default Block;
