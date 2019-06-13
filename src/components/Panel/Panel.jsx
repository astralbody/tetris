import React from 'react';
import PropTypes from 'prop-types';
import {Map} from 'immutable';
import Row from '../Row/Row';
import s from './Panel.css';
import {PRICE} from '../../constants/config';

const Panel = ({score, hiScore, nextDetail, stopwatch, pause, test}) => (
  <div className={s.container}>
    <div className={s.containerNextDetail}>
      <div className={s.nextDetail}>
        {nextDetail.has('BODY')
          ? nextDetail.get('BODY').map((row, idx) => (
            <Row
              key={idx}
              blocks={row.map((value, idx) => new Map({value, id: idx}))}
            />
          ))
          : null
        }
      </div>
    </div>
    <div className={s.info}>
      <span className={s.score}>Score:</span>
      <span>{score}</span>
      <span className={s.hiScore}>Hi-Score:</span>
      <span>{hiScore}</span>
      <span>Rows:</span>
      <span>{score / PRICE}</span>
      <span>Stopwatch:</span>
      <span className={s.stopwatch}>{stopwatch}</span>
    </div>
    <div className={s.containerPause}>
      {test ? [] : (
        <img
          alt="pause"
          className={`${s.pause} ${pause ? s.on : s.off}`}
          src="/pause.png"
        />
      )}
    </div>
  </div>
);

Panel.propTypes = {
  score: PropTypes.number.isRequired,
  hiScore: PropTypes.number.isRequired,
  nextDetail: PropTypes.instanceOf(Map).isRequired,
  stopwatch: PropTypes.string.isRequired,
  pause: PropTypes.bool.isRequired,
  test: PropTypes.bool,
};

Panel.defaultProps = {
  test: false,
};

export default Panel;
