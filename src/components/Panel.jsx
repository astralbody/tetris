import React, {PropTypes} from 'react';
import {Map, List} from 'immutable';
import Row from './Row';
import counter from '../core/counter';
import styles from './Panel.css';

const Panel = ({score, hiScore, nextDetail, stopwatch}) => {
  const counterRow = counter(300);
  const counterBlock = counter(305);

  return (
    <div className={styles.container}>
      <div className={styles.score}>{score}</div>
      <div className={styles.hiScore}>{hiScore}</div>
      <div className={styles.stopwatch}>{stopwatch}</div>
      <div className={styles.nextDetail}>
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
  nextDetail: PropTypes.instanceOf(Map).isRequired,
  stopwatch: PropTypes.instanceOf(List).isRequired
};

export default Panel;
