import React, {PropTypes} from 'react';
import {block, front, back} from './Block.css';

const Block = ({value}) => (
  <div className={`${block} ${value ? front : back}`} />
);

Block.propTypes = {
  value: PropTypes.number.isRequired
};

export default Block;
