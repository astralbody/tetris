import {fromJS} from 'immutable';

export const I = fromJS({
  KIND: 'I',
  POINT_X: 3,
  POINT_Y: 0,
  SIZE: 4,
  BODY: [
    [0, 0, 0, 0],
    [2, 2, 2, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
});

export const T = fromJS({
  KIND: 'T',
  POINT_X: 3,
  POINT_Y: 0,
  SIZE: 3,
  BODY: [
    [0, 0, 0],
    [2, 2, 2],
    [0, 2, 0],
  ],
});

export const L = fromJS({
  KIND: 'L',
  POINT_X: 3,
  POINT_Y: 0,
  SIZE: 3,
  BODY: [
    [0, 0, 0],
    [2, 2, 2],
    [2, 0, 0],
  ],
});

export const J = fromJS({
  KIND: 'J',
  POINT_X: 3,
  POINT_Y: 0,
  SIZE: 3,
  BODY: [
    [0, 0, 0],
    [2, 2, 2],
    [0, 0, 2],
  ],
});

export const S = fromJS({
  KIND: 'S',
  POINT_X: 3,
  POINT_Y: 0,
  SIZE: 3,
  BODY: [
    [0, 0, 0],
    [0, 2, 2],
    [2, 2, 0],
  ],
});

export const Z = fromJS({
  KIND: 'Z',
  POINT_X: 3,
  POINT_Y: 0,
  SIZE: 3,
  BODY: [
    [0, 0, 0],
    [2, 2, 0],
    [0, 2, 2],
  ],
});

export const O = fromJS({
  KIND: 'O',
  POINT_X: 4,
  POINT_Y: 0,
  SIZE: 2,
  BODY: [
    [2, 2],
    [2, 2],
  ],
});
