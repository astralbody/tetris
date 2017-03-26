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

export const rotateDetail = (state) => {
  const {pointX, pointY, size, kind} = state
    .get('currentDetail')
    .toJS();

  if (kind === 'O' || pointY + size > 24) return state; // import constants

  const extracted = extractDetail(state.get('world'), pointX, pointY, size);

  if (!extracted.every(row => row.every(value => value === 2 || value === 0))
    || extracted[0].length < size) return state;

  return state.set('world',
    insertDetail(
      state.get('world'),
      pointX,
      pointY,
      size,
      destructArr(zip(extracted).map(row => row.reverse())) // in separete variable
    )
  );
};
