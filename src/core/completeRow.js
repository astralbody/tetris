const completeRow = (worldMap, action) => {
  const clearWorldMap = worldMap.map((row, y) => {
    if (y !== action.y) return row;
    return row.set(
      'blocks',
      row.get('blocks').map((block, x) => block.set('value', 0))
    );
  });

  const next = {
    row: new Array(10).fill(null),
    worldMap: clearWorldMap
  };

  const nextWorldMap = clearWorldMap.reduce((next, row, y) => {
    if (y < 4 || y > action.y) return next;

    const nextRow = typeof next.row[0] === 'boolean' ? [...next.row] : null;

    return {
      row: row
        .get('blocks')
        .map((block, x) => block.get('value') === 1)
        .toJS(),
      worldMap: nextRow
        ? next.worldMap.setIn(
          [y, 'blocks'],
          next.worldMap.getIn([y, 'blocks']).map((block, x) =>
            block.set('value', +nextRow[x]))
        )
        : next.worldMap
    };
  }, next);

  return nextWorldMap.worldMap;
};

export default completeRow;

