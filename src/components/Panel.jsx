import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import Row from './Row';
import counter from '../core/counter';
import './Panel.css';

const Panel = ({score, hiScore, nextDetail}) => {
  const counterRow = counter(300);
  const counterBlock = counter(305);

  return (
    <div className="panel__container">
      <div className="panel__score">{score}</div>
      <div className="panel__hi-score">{hiScore}</div>
      <div>
        {nextDetail.has('BODY') ? nextDetail.get('BODY').map(row =>
          <Row
            key={counterRow()}
            blocks={row.map(value => Map({value, kay: counterBlock()}))}
          />) :
          null
        }
      </div>
    </div>
  );
};

Panel.propTypes = {
  score: PropTypes.number.isRequired,
  hiScore: PropTypes.number.isRequired,
  nextDetail: PropTypes.instanceOf(Map).isRequired
  // time: PropTypes.instanceOf(Date).isRequired
};

export default Panel;
