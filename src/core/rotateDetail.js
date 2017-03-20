export const zip = rows => rows[0].map((_, c) => rows.map(row => row[c]));

export const extractDetail = (worldMap, pointX, pointY, size) =>
  worldMap.filter((row, y) => y >= pointY && y < pointY + size).map((row, y) =>
    row.get('blocks').filter((block, x) =>
      x >= pointX && x < pointX + size).map(block =>
        block.get('value'))
  ).toJS();

export const insertDetail = (worldMap, pointX, pointY, size, nextPos) =>
  worldMap.map((row, y) => y >= pointY && y < pointY + size
    ? row.set('blocks', row.get('blocks').map((block, x) =>
      x >= pointX && x < pointX + size
        ? block.set('value', nextPos.shift()) : block
    )) : row
  );

export const destructArr = rows => rows.reduce((dest, row) => {
  dest.push(...row);
  return dest;
}, []);

export const rotateDetail = (world) => {
  const {pointX, pointY, size, kind} = world
    .getIn(['info', 'currentDetail'])
    .toJS();

  if (kind === 'O' || pointY + size > 24) return world;

  const extracted = extractDetail(world.get('map'), pointX, pointY, size);

  if (!extracted.every(row => row.every(value => value === 2 || value === 0))
    || extracted[0].length < size) {
    return world;
  }

  return world.set('map',
    insertDetail(
      world.get('map'),
      pointX,
      pointY,
      size,
      destructArr(zip(extracted).map(row => row.reverse()))
    )
  );
};
