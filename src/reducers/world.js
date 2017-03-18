import * as types from '../constants/ActionTypes';
import {initialWorld} from '../core/initialWorld';
import getNextDetail from '../core/getNextDetail';
import shiftDownBlock from '../core/shiftDownBlock';
import transformBlock from '../core/transformBlock';
import moveDetail from './moveDetail';
import completeRow from '../core/completeRow';
import {rotateDetail} from '../core/rotateDetail';
import fillWorldMap from '../core/fillWorldMap';

const world = (state = initialWorld(), action) => {
  switch (action.type) {
  case types.DOWN_BLOCK:
    return shiftDownBlock(state, action); // fix
  case types.TRANSFORM_BLOCK:
    return transformBlock(state, action); // fix
  case types.MOVE_DETAIL:
    return moveDetail(state, action);     // fix
  case types.NEXT_DETAIL:
    return getNextDetail(state, action);  // fix
  case types.ROTATE_DETAIL:
    return rotateDetail(state);           // fix
  case types.COMPLETE_ROW:
    return state.set('map', completeRow(state.get('map'), action));
  case types.OVER_GAME:
    return state.set('map', fillWorldMap(state.get('map'), 0));
  case types.START_GAME:
    return state;
  default:
    return state;
  }
};

export default world;
