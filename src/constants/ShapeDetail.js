import {fromJS} from 'immutable';

export const I = fromJS([
  [0, 0, 0, 0],
  [2, 2, 2, 2],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]);
export const T = fromJS([[0, 0, 0], [2, 2, 2], [0, 2, 0]]);
export const L = fromJS([[0, 0, 0], [2, 2, 2], [2, 0, 0]]);
export const J = fromJS([[0, 0, 0], [2, 2, 2], [0, 0, 2]]);
export const S = fromJS([[0, 0, 0], [0, 2, 2], [2, 2, 0]]);
export const Z = fromJS([[0, 0, 0], [2, 2, 0], [0, 2, 2]]);
export const O = fromJS([[2, 2], [2, 2]]);
