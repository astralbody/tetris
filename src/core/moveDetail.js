import {checkAroundDetail, echo, inc, dec} from '../core/checkAroundDetail';

const decoratorTernaryUnary = (condition, onTrue, onFalse) =>
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


const move = (method, crement) => rows => rows[method]((newRows, row, y) =>
  row.get('blocks')[method]((_newRows, block, x) =>
    block.get('value') === 2
      ? _newRows
        .setIn([y, 'blocks', crement(x), 'value'], 2)
        .setIn([y, 'blocks', x, 'value'], 0)
      : _newRows,
    newRows
  ),
  rows
);

const moveRight = move('reduceRight', inc);
const moveLeft = move('reduce', dec);
const moveLeftDetail = decoratorTernaryUnary(hasLeftFreeSpace, moveLeft);
const moveRightDetail = decoratorTernaryUnary(hasRightFreeSpace, moveRight);

const updateX = (lastX, moveDetail) => {
  switch (moveDetail) {
  case moveLeftDetail:
    return dec(lastX);
  case moveRightDetail:
    return inc(lastX);
  default:
    return lastX;
  }
};


const getStateMoveDetail = (moveDetail, state) => {
  const p = state.getIn(['info', 'nextDetail', 'pointY']);
  const r = p + state.getIn(['info', 'nextDetail', 'size']);
  const rowsDetail = state.get('map').filter((row, y) => y >= p && r > y);

  const nextRowsDetail = moveDetail(rowsDetail);

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

  return state.set('map', nextState.nextMap).setIn(
    ['info', 'nextDetail', 'pointX'],
    updateX(state.getIn(['info', 'nextDetail', 'pointX']), moveDetail)
  );
};

const getStateMoveLeftDetail = getStateMoveDetail.bind(null, moveLeftDetail);
const getStateMoveRightDetail = getStateMoveDetail.bind(null, moveRightDetail);


export {
  getStateMoveLeftDetail,
  getStateMoveRightDetail
};
