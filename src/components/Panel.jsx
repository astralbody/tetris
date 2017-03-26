import React, {PropTypes} from 'react';
import {map} from 'react-immutable-proptypes';

const Panel = ({score, hiScore, nextDetail, time}) => (
  <div>
    <div>{score}</div>
    <div>{hiScore}</div>
    <div>{nextDetail}</div>
    <div>{time}</div>
  </div>
);

Panel.propTypes = {
  score: PropTypes.number.isRequired,
  hiScore: PropTypes.number.isRequired,
  nextDetail: map.isRequired,
  time: PropTypes.instanceOf(Date).isRequired
};

export default Panel;
