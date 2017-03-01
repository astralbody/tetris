import {fromJS} from 'immutable';
import counter from './counter';

<<<<<<< HEAD
export const initialRow = (x, fRowID = Math.random, fBlockID = Math.random) => ({
=======
const initialRow = (x, fRowID = Math.random, fBlockID = Math.random) => ({
>>>>>>> d4ee576b5ab0f80c482c26f253823ef729e3aeeb
  blocks: Array.from({length: x}, block => ({
    id: fBlockID(),
    value: 0
  })),
  id: fRowID()
});

<<<<<<< HEAD
export const initialWorld = (y, x) => {
=======
const initialWorld = (y, x) => {
>>>>>>> d4ee576b5ab0f80c482c26f253823ef729e3aeeb
  const counterRow = counter(-4);
  const counterBlock = counter(0);

  return fromJS({
    map: Array.from(
      {length: y},
      row => initialRow(x, counterRow, counterBlock)
    ),
    information: {
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
<<<<<<< HEAD
=======

export {
  initialWorld,
  initialRow
};
>>>>>>> d4ee576b5ab0f80c482c26f253823ef729e3aeeb
