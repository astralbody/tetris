import {PRICE} from '../constants/config';

const completeRow = (state, action) => {
  const clearWorld = state.get('world').map((row, y) => y !== action.y
    ? row
    : row.set(
        'blocks',
        row.get('blocks').map((block) => block.set('value', 0))
    )
  );

  const {world} = clearWorld.reduce((next, row, y) => {
    if (y < 4 || y > action.y) return next;
    const nextRow = typeof next.row[0] === 'boolean' ? [...next.row] : null;

    return {
      row: row.get('blocks').map((block) => block.get('value') === 1).toJS(),
      world: nextRow
        ? next.world.setIn(
            [y, 'blocks'],
            next.world
                .getIn([y, 'blocks'])
                .map((block, x) => block.set('value', +nextRow[x]))
        )
        : next.world,
    };
  }, {
    row: new Array(10).fill(null),
    world: clearWorld,
  });

  return state.set('score', state.get('score') + PRICE).set('world', world);
};

export default completeRow;
