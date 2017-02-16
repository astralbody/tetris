import {Map} from 'immutable';
import * as types from '../constants/ActionTypes';
import initialWorld from '../library/initialWorld';


const getStateWithNextDetail = (state, action) => {
  /* eslint indent: 0 */
  const getInfoDetail = (detail) => {
    switch (detail.get(0).size) {
    case 2:
        return {
          START_POINT: 4,
          SIZE: 2
        };
    case 3:
        return {
          START_POINT: 3,
          SIZE: 3
        };
    case 4:
        return {
          START_POINT: 3,
          SIZE: 4
        };
    default:
        return {};
    }
  };

  const infoDetail = getInfoDetail(action.detail);

  const rangeFilter = (start, size) => x => !(start <= x && x < start + size);

  const rangeFilterDetail = rangeFilter(
    infoDetail.START_POINT,
    infoDetail.SIZE
  );

  const shadow = state.filter((row, y) => row.get('id') < 0);
  const shadowWithDetail = shadow.map((row, y) => {
    let nextSizeDetail = 0; // detail x
    if (y >= infoDetail.SIZE) return row;

    return Map({
      id: row.get('id'),
      blocks: row.get('blocks').map((block, x) => {
        if (rangeFilterDetail(x)) return block;

        return block.set('value', action.detail.get(y).get(nextSizeDetail++));
      })
    });
  });

  return state.merge(shadowWithDetail);
};

const shiftDownBlock = (state, action) => {
  const flags = new Array(10).fill(false);

  return state.map((row, y) => row.set(
    'blocks',
    row.get('blocks').map((block, x) => {
      if (action.options.some(val => val === block.get('value'))
        && state.has(y + 1)) {
        const newBlock = block.set('value', flags[x] ? 2 : 0);
        flags[x] = true;
        return newBlock;
      }

      const newBlock = flags[x] ? block.set('value', 2) : block;
      flags[x] = false;
      return newBlock;
    })
  ));
};


const world = (state = initialWorld(24, 10), action) => {
  switch (action.type) {
  case types.DOWN_BLOCK:
      return shiftDownBlock(state, action);
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
