import {Map} from 'immutable';

const getNextDetail = (state, action) => {
  const rangeFilter = (start, size) => x => !(start <= x && x < start + size);

  const rangeFilterDetail = rangeFilter(
    action.detail.get('POINT_X'),
    action.detail.get('SIZE')
  );

  const shadow = state.get('map').filter((row, y) => row.get('id') < 0);

  const shadowWithDetail = shadow.map((row, y) => {
    let nextSizeDetail = 0;
    if (y >= action.detail.get('SIZE')) return row;

    return row.set('blocks', row.get('blocks').map((block, x) => {
      if (rangeFilterDetail(x)) return block;

      return block.set(
        'value',
        action.detail
          .get('BODY')
          .get(y)
          .get(nextSizeDetail++)
      );
    }));
  });

  return state
    .set('map', state.get('map').merge(shadowWithDetail))
    .setIn(['info', 'currentDetail'], Map({
      kind: action.detail.get('KIND'),
      pointX: action.detail.get('POINT_X'),
      pointY: action.detail.get('POINT_Y'),
      size: action.detail.get('SIZE')
    }));
};

export default getNextDetail;
