import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import Row from '../Row/Row';
import counter from '../../core/counter';
import styles from './Panel.css';

const Panel = ({score, hiScore, nextDetail, stopwatch}) => {
  const counterRow = counter(300);
  const counterBlock = counter(310);

  return (
    <div className={styles.container}>
      <div className={styles.score}>Score: {score}</div>
      <div className={styles.hiScore}>Hi-Score: {hiScore}</div>
      <div className={styles.stopwatch}>{stopwatch}</div>
      <div className={styles.nextDetail}>
        {nextDetail.has('BODY')
          ? nextDetail.get('BODY').map(row =>
            <Row
              key={counterRow()}
              blocks={row.map(value => Map({value, id: counterBlock()}))}
            />
          )
          : null
        }
      </div>
    </div>
  );
};

Panel.propTypes = {
  score: PropTypes.number.isRequired,
  hiScore: PropTypes.number.isRequired,
  nextDetail: PropTypes.instanceOf(Map).isRequired,
  stopwatch: PropTypes.string.isRequired
};

export default Panel;
