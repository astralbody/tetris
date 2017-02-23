import {checkAroundDetail, echo, inc, dec} from '../core/checkAroundDetail';

const ternaryUnary = (condition, onTrue, onFalse = null) =>
  arg => condition(arg) ? onTrue(arg) : onFalse ? onFalse(arg) : null;

const hasFreeSpace = (fx, fy, rows) => rows.reduce((result, row, y) =>
  row.get('blocks').reduce(
    (_result, block, x) =>
      _result !== false && block.get('value') === 2
        ? checkAroundDetail(rows, x, y, fx, fy)
        : _result,
    result
  ),
  null
);

const hasLeftFreeSpace = hasFreeSpace.bind(null, dec, echo);
const hasRightFreeSpace = hasFreeSpace.bind(null, inc, echo);

const moveRight = rows => rows.reduceRight((newRows, row, y) =>
  row.get('blocks').reduceRight((newRow, block, x) =>
    block.get('value') === 2
      ? newRow
        .setIn([y, 'blocks', inc(x), 'value'], 2)
        .setIn([y, 'blocks', x, 'value'], 0)
      : newRow,
    newRows
  ),
  rows
);

const moveLeft = rows => rows.reduce((newRows, row, y) =>
  row.get('blocks').reduce((newRow, block, x) =>
    block.get('value') === 2
      ? newRow
        .setIn([y, 'blocks', dec(x), 'value'], 2)
        .setIn([y, 'blocks', x, 'value'], 0)
      : newRow,
    newRows
  ),
  rows
);

const moveLeftDetail = ternaryUnary(hasLeftFreeSpace, moveLeft);
const moveRightDetail = ternaryUnary(hasRightFreeSpace, moveRight);


const getStateMoveDetail = (move, state) => {
  const p = state.getIn(['information', 'nextDetail', 'pointY']);
  const r = p + state.getIn(['information', 'nextDetail', 'size']);
  const rowsDetail = state.get('map').filter((row, y) => y >= p && r > y);

  const nextRowsDetail = move(rowsDetail);

  if (!nextRowsDetail) return state;

  const optionsMerge = {
    nextRows: nextRowsDetail,
    nextMap: state.get('map')
  };

  const nextState = state.get('map').reduce((opt, row, y) => {
    if (!(y >= p && r > y)) return opt;
    opt.nextMap = opt.nextMap.set(y, opt.nextRows.first());
    opt.nextRows = opt.nextRows.shift();
    return opt;
  },
    optionsMerge
  );

  return state.set('map', nextState.nextMap);
};

const getStateMoveLeftDetail = getStateMoveDetail.bind(null, moveLeftDetail);
const getStateMoveRightDetail = getStateMoveDetail.bind(null, moveRightDetail);

export {
  getStateMoveLeftDetail,
  getStateMoveRightDetail
};
