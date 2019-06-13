import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import Block from '../Block/Block';
import {row} from './Row.css';

const Row = ({blocks}) => (
  <div className={row}>
    {blocks.map((block) => (
      <Block value={block.get('value')} key={block.get('id')} />
    ))}
  </div>
);

Row.propTypes = {blocks: PropTypes.instanceOf(List).isRequired};

export default Row;
