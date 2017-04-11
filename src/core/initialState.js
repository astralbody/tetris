import {fromJS, List} from 'immutable';
import counter from './counter';
import {getRandomDetails} from './getRandomDetails';
import {SPEED} from '../constants/config';
import getHiScore from './getHiScore';

export const initialRow = (
  x,
  getRowId = Math.random,
  getBlockId = Math.random
) => ({
  blocks: Array.from({length: x}, block => ({
    id: getBlockId(),
    value: 0
  })),
  id: getRowId()
});

export const initialState = (y = 24, x = 10) => {
  const countRow = counter(-4);
  const countBlock = counter(0);
  const randomDetails = getRandomDetails();

  return fromJS({
    world: Array.from(
      {length: y},
      row => initialRow(x, countRow, countBlock)
    ),
    currentDetail: {
      kind: 'kind',
      pointX: 0,
      pointY: 0,
      size: 0
    },
    nextDetail: {
      kind: randomDetails.get('KIND'),
      pointX: randomDetails.get('POINT_X'),
      pointY: randomDetails.get('POINT_Y'),
      size: randomDetails.get('SIZE')
    },
    score: 0,
    hiScore: getHiScore(localStorage.getItem('hiScore')),
    stopwatch: List([0, 0, 0]),
    speed: SPEED
  });
};
