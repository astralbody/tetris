import * as MoveSide from '../constants/MoveSide';
import {
  getStateMoveLeftDetail,
  getStateMoveRightDetail,
} from '../core/moveDetail';

const moveDetail = (state, {side}) => {
  switch (side) {
    case MoveSide.MOVE_LEFT:
      return getStateMoveLeftDetail(state);
    case MoveSide.MOVE_RIGHT:
      return getStateMoveRightDetail(state);
    default:
      return state;
  }
};

export default moveDetail;
