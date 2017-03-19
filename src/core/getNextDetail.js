import {Map} from 'immutable';

const getNextDetail = (state, action) => {
  const rangeFilter = (start, size) => x => !(start <= x && x < start + size);

  const nextState = state.setIn(['info', 'nextDetail'], action.detail);
  const currentDetail = state.getIn(['info', 'nextDetail']);

  const rangeFilterDetail = rangeFilter(
    currentDetail.get('POINT_X'),
    currentDetail.get('SIZE')
  );

  const shadow = state.get('map').filter((row, y) => row.get('id') < 0);

  const shadowWithDetail = shadow.map((row, y) => {
    let nextSizeDetail = 0;
    if (y >= currentDetail.get('SIZE')) return row;

    return row.set('blocks', row.get('blocks').map((block, x) => {
      if (rangeFilterDetail(x)) return block;

      return block.set(
        'value',
        currentDetail
          .get('BODY')
          .get(y)
          .get(nextSizeDetail++)
      );
    }));
  });

  return nextState
    .set('map', state.get('map').merge(shadowWithDetail))
    .setIn(['info', 'currentDetail'], Map({
      kind: currentDetail.get('KIND'),
      pointX: currentDetail.get('POINT_X'),
      pointY: currentDetail.get('POINT_Y'),
      size: currentDetail.get('SIZE')
    }));
};

export default getNextDetail;
