import {fromJS} from 'immutable';
import counter from './counter';

export const initialRow = (x, fRowID = Math.random, fBlockID = Math.random) => ({
  blocks: Array.from({length: x}, block => ({
    id: fBlockID(),
    value: 0
  })),
  id: fRowID()
});

export const initialWorld = (y = 24, x = 10) => {
  const counterRow = counter(-4);
  const counterBlock = counter(0);

  return fromJS({
    map: Array.from(
      {length: y},
      row => initialRow(x, counterRow, counterBlock)
    ),
    info: {
      currentDetail: {
        kind: 'T',
        pointX: 0,
        pointY: 0,
        size: 0
      },
      nextDetail: {
        kind: 'T',
        pointX: 0,
        pointY: 0,
        size: 0
      }
    }
  });
};
