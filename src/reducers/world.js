import {Map} from 'immutable';
import * as types from '../constants/ActionTypes';
import initialWorld from '../library/initialWorld';


const getStateWithNextDetail = (state, action) => {
  /* eslint indent: 0 */
  const rangeFilter = (start, size) => x => !(start <= x && x < start + size);

  const rangeFilterDetail = rangeFilter(
    action.detail.get('POINT_X'),
    action.detail.get('SIZE')
  );

  const shadow = state.get('map').filter((row, y) => row.get('id') < 0);
  const shadowWithDetail = shadow.map((row, y) => {
    let nextSizeDetail = 0; // detail x
    if (y >= action.detail.get('SIZE')) return row;

    return Map({
      id: row.get('id'),
      blocks: row.get('blocks').map((block, x) => {
        console.log('test1');
        if (rangeFilterDetail(x)) return block;
        console.log('test2');
        return block.set(
          'value',
          action.detail
            .get('BODY')
            .get(y)
            .get(nextSizeDetail++)
        );
      })
    });
  });


  const newStore = Map({
    map: state.get('map').merge(shadowWithDetail),
    information: Map({
      nextDetail: Map({
        kind: action.detail.KIND,
        pointX: action.detail.POINT_X,
        pointY: action.detail.POINT_Y,
        size: action.detail.SIZE
      }),
      currentDetail: state.get('information').get('currentDetail')
    })
  });

  console.log(newStore.toString());

  return newStore;
};

const shiftDownBlock = (state, action) => {
  const flags = new Array(10).fill(false);

  const newState = state.set('map', state.get('map').map((row, y) => row.set(
    'blocks',
    row.get('blocks').map((block, x) => {
      if (action.options.some(val => val === block.get('value'))) {
        const newBlock = block.set('value', flags[x] ? 2 : 0);
        flags[x] = true;
        return newBlock;
      }

      const newBlock = flags[x] ? block.set('value', 2) : block;
      flags[x] = false;
      return newBlock;
    })
  )));

  return newState;
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
