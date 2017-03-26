import {PRICE} from '../constants/config';

const completeRow = (state, action) => {
  const clearWorld = state.get('world').map((row, y) => {
    if (y !== action.y) return row;
    return row.set(
      'blocks',
      row.get('blocks').map((block, x) => block.set('value', 0))
    );
  });

  const next = {
    row: new Array(10).fill(null),
    world: clearWorld
  };

  const {world} = clearWorld.reduce((_next, row, y) => {
    if (y < 4 || y > action.y) return _next;

    const nextRow = typeof _next.row[0] === 'boolean' ? [..._next.row] : null;

    return {
      row: row
        .get('blocks')
        .map((block, x) => block.get('value') === 1)
        .toJS(),
      world: nextRow
        ? _next.world.setIn(
          [y, 'blocks'],
          _next.world.getIn([y, 'blocks']).map((block, x) =>
            block.set('value', +nextRow[x]))
        )
        : _next.world
    };
  }, next);

  return state.set('score', state.get('score') + PRICE).set('world', world);
};

export default completeRow;

