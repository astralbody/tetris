import {Map, List} from 'immutable';

const getNextDetail = (state, action) => {
  const rangeFilter = (start, size) => (x) => !(start <= x && x < start + size);

  const nextState = state.set('nextDetail', action.detail);
  const currentDetail = state.get('nextDetail');
  const rangeFilterDetail = rangeFilter(
      currentDetail.get('POINT_X'),
      currentDetail.get('SIZE')
  );

  const shadowRows = state.get('world').filter((row, y) => row.get('id') < 0);

  const nextShadowRows = shadowRows.reduce((acc, row, y) => {
    if (y >= currentDetail.get('SIZE')) {
      return {
        nextSizeDetail: 0,
        rows: acc.rows.push(row),
      };
    }

    return {
      nextSizeDetail: 0,
      rows: acc.rows.push(
          row.set('blocks', row.get('blocks').map((block, x) => {
            if (rangeFilterDetail(x)) return block;

            return block.set(
                'value',
                currentDetail.getIn(['BODY', y, acc.nextSizeDetail++])
            );
          }))
      ),
    };
  }, {
    nextSizeDetail: 0,
    rows: new List(),
  }).rows;

  return nextState
      .set('world', state.get('world').merge(nextShadowRows))
      .set('currentDetail', new Map({
        kind: currentDetail.get('KIND'),
        pointX: currentDetail.get('POINT_X'),
        pointY: currentDetail.get('POINT_Y'),
        size: currentDetail.get('SIZE'),
      }));
};

export default getNextDetail;
