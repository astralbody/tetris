import * as types from '../constants/ActionTypes';
import initialWorld from '../library/initialWorld';

const getStateWithNextDetail = (state, action) => {
  const rangeFilter = (start, size) => (x, dx) =>
    start > x || x > start + size || dx >= size;

  console.log(action.detail);
  const getRangeFilter = (detail) => {
    if (detail.get(0).size < 2) return rangeFilter(4, 2); // 2 x 2
    if (detail.get(0).size < 3) return rangeFilter(3, 3); // 3 x 3
    return rangeFilter(3, 4); // 4 x 4
  };

  const rangeFilterDetail = getRangeFilter(action.detail);
  const shadow = state.filter((row, y) => y < 0);

  const shadowWithDetail = shadow.map((row, y) => {
    let dx = 0; // detail x
    if (y > action.detail.size) return row;

    return row.get('blocks').map((block, x) => {
      if (rangeFilterDetail(x, dx)) return block;
      return {
        id: block.get('id'),
        value: action.detail.get(y).get(dx++)
      };
    });
  });

  return state.merge(shadowWithDetail);
};


const world = (state = initialWorld(24, 10), action) => {
  switch (action.type) {
  case types.DOWN_BLOCK:
    return state;
  case types.TRANSFORM_BLOCK:
    return state;
  case types.MOVE_DETAIL:
    return state;
  case types.NEXT_DETAIL:
    return getStateWithNextDetail(state, action);
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
