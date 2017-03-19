const setRowsInWorldMap = (worldMap, startIdx, nextRows) =>
  nextRows.reduce((_worldMap, row, idx) => _worldMap.update(
    startIdx++,
    val => val.set('blocks', row.get('blocks'))
  ), worldMap);

export default setRowsInWorldMap;
