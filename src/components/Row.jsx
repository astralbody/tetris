import React from 'react';
import {list} from 'react-immutable-proptypes';
import Block from './Block';
import './Row.css';

const Row = ({blocks}) => (
  <div className="row">
    {blocks.map(block =>
      <Block
        value={block.get('value')}
        key={block.get('id')}
      />
    )}
  </div>
);

Row.propTypes = {
  blocks: list.isRequired
};

export default Row;
