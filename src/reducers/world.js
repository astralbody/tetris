import * as types from '../constants/ActionTypes';
import initialWorld from '../core/initialWorld';
import getNextDetail from '../core/getNextDetail';
import shiftDownBlock from '../core/shiftDownBlock';
import transformBlock from '../core/transformBlock';
import moveDetail from './moveDetail';

const world = (state = initialWorld(24, 10), action) => {
  switch (action.type) {
  case types.DOWN_BLOCK:
    return shiftDownBlock(state, action);
  case types.TRANSFORM_BLOCK:
    return transformBlock(state, action);
  case types.MOVE_DETAIL:
    return moveDetail(state, action);
  case types.NEXT_DETAIL:
    return getNextDetail(state, action);
  case types.ROTATE_DETAIL:
    return state;
  case types.COMPLETE_ROW:
    return state;
  case types.OVER_GAME:
    return state;
  case types.START_GAME:
    return state;
  default:
    return state;
  }
};

export default world;
