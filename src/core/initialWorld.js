import {fromJS} from 'immutable';
import counter from './counter';
import {getRandomDetails} from './getRandomDetails';

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
  const randomDetails = getRandomDetails();

  return fromJS({
    map: Array.from(
      {length: y},
      row => initialRow(x, counterRow, counterBlock)
    ),
    info: {
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
      }
    }
  });
};
