import {
  DOWN_BLOCK,
  TRANSFORM_BLOCK,
  MOVE_DETAIL,
  NEXT_DETAIL,
  ROTATE_DETAIL,
  COMPLETE_ROW,
  OVER_GAME,
  START_GAME,
  UP_SPEED,
  LOW_SPEED,
  SET_STOPWATCH,
  TICK_STOPWATCH
} from '../constants/ActionTypes';
import {SPEED, MAX_SPEED} from '../constants/config';
import {initialWorld} from '../core/initialWorld';
import getNextDetail from '../core/getNextDetail';
import shiftDownBlock from '../core/shiftDownBlock';
import transformBlock from '../core/transformBlock';
import completeRow from '../core/completeRow';
import {rotateDetail} from '../core/rotateDetail';
import fillWorldMap from '../core/fillWorldMap';
import moveDetail from './moveDetail';
import tick from '../core/tick';


const world = (state = initialWorld(), action) => {
  switch (action.type) {
  case DOWN_BLOCK:
    return shiftDownBlock(state, action); // fix, refact
  case TRANSFORM_BLOCK:
    return state.set(
      'world',
      transformBlock(state.get('world'), action.options)
    ); // refact, rename
  case MOVE_DETAIL:
    return moveDetail(state, action);     // fix, refact
  case NEXT_DETAIL:
    return getNextDetail(state, action);  // fix, refact
  case ROTATE_DETAIL:
    return rotateDetail(state);           // fix, refact
  case COMPLETE_ROW:
    return completeRow(state, action);    // refact
  case OVER_GAME:
    return state
      .set('world', fillWorldMap(state.get('world'), 0))
      .set('score', 0)
      .set('hiScore', action.hiScore); // refact
  case START_GAME:
    return state;
  case UP_SPEED:
    return state.set('speed', MAX_SPEED);
  case LOW_SPEED:
    return state.set('speed', SPEED);
  case SET_STOPWATCH:
    return state.set('stopwatch', action.time);
  case TICK_STOPWATCH:
    return state.set('stopwatch', tick(state.get('stopwatch')));
  default:
    return state;
  }
};

export default world;
