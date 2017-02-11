import {fromJS} from 'immutable';
import counter from './counter';

const initialWorld = (y, x) => {
  const counterRow = counter(-4);
  const counterBlock = counter(0);

  return fromJS(Array.from(
    {length: y},
    row => ({
      blocks: Array.from({length: x}, block => ({
        id: counterBlock(),
        value: 0
      })),
      id: counterRow()
    })
  ));
};

export default initialWorld;
