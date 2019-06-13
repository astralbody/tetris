import {
  TRANSFORM_BLOCK,
  NEXT_DETAIL,
  DOWN_BLOCK,
  MOVE_DETAIL,
  ROTATE_DETAIL,
  COMPLETE_ROW,
  SET_DISPLAY,
  OVER_GAME,
  START_GAME,
  UP_SPEED,
  LOW_SPEED,
  SET_STOPWATCH,
  TICK_STOPWATCH,
} from '../constants/ActionTypes';

export const transformBlock = (options) => ({
  type: TRANSFORM_BLOCK,
  options,
});

export const nextDetail = (detail) => ({
  type: NEXT_DETAIL,
  detail,
});

export const downBlock = () => ({type: DOWN_BLOCK});

export const moveDetail = (side) => ({
  type: MOVE_DETAIL,
  side,
});

export const rotateDetail = () => ({type: ROTATE_DETAIL});

export const completeRow = (y) => ({
  type: COMPLETE_ROW,
  y,
});

export const setDisplay = (filter) => ({
  type: SET_DISPLAY,
  filter,
});

export const runOverGame = (hiScore) => ({
  type: OVER_GAME,
  hiScore,
});

export const runStartGame = () => ({type: START_GAME});

export const upSpeed = () => ({type: UP_SPEED});

export const lowSpeed = () => ({type: LOW_SPEED});

export const setStopwatch = (time) => ({
  type: SET_STOPWATCH,
  time,
});

export const tickStopwatch = () => ({type: TICK_STOPWATCH});
