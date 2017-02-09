import {fromJS} from 'immutable';
import counter from './counter';

const counterRow = counter(-4);
const counterBlock = counter(0);

const createWorld = (y, x) => Array.from(
  {length: y},
  row => ({
    blocks: Array.from({length: x}, block => ({
      id: counterBlock(),
      value: 0
    })),
    id: counterRow()
  })
);

const compose = (f, g) => (a, b) => f(g(a, b));

const initialWorld = compose(fromJS, createWorld);

export default initialWorld;
