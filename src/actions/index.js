import * as types from '../constants/ActionTypes';

export const transformBlock = options => ({
  type: types.TRANSFORM_BLOCK,
  options
});

export const nextDetail = detail => ({
  type: types.NEXT_DETAIL,
  detail
});

export const downBlock = options => ({
  type: types.DOWN_BLOCK,
  options
});

export const moveDetail = side => ({
  type: types.MOVE_DETAIL,
  side
});

export const rotateDetail = () => ({
  type: types.ROTATE_DETAIL
});

export const completeRow = y => ({
  type: types.COMPLETE_ROW,
  y
});

export const setDisplay = filter => ({
  type: types.SET_DISPLAY,
  filter
});

export const runOverGame = () => ({
  type: types.OVER_GAME
});

export const runStartGame = () => ({
  type: types.START_GAME
});
