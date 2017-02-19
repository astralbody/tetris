export const inc = n => n + 1;
export const dec = n => n - 1;
export const echo = n => n;

export const checkAroundDetail = (worldMap, x, y, fx, fy) => {
  if (!worldMap.has(y)) return false;

  switch (worldMap
    .get(y)
    .get('blocks')
    .get(x)
    .get('value')) {
  case 0:
    return true;
  case 1:
    return false;
  case 2:
    return checkAroundDetail(worldMap, fx(x), fy(y), fx, fy);
  default:
    return false;
  }
};
