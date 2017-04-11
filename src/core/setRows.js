const setRows = (world, idx, nextRows) => nextRows.reduce(
  (nextWorld, row) => nextWorld.update(
    idx++,
    val => val.set('blocks', row.get('blocks'))
  ),
  world
);

export default setRows;
