import React from 'react';
import PropTypes from 'prop-types';
import {block, front, back} from './Block.css';

const Block = ({value}) => (
  <div className={`${block} ${value ? front : back}`} />
);

Block.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Block;
