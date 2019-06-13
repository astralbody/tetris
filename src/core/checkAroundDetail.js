export const inc = (n) => n + 1;
export const dec = (n) => n - 1;
export const echo = (n) => n;

export const checkAroundDetail = (worldMap, x, y, fx, fy) => {
  if (!worldMap.has(y)
    || !worldMap.getIn([y, 'blocks']).has(x)
    || !(x >= 0)
    || !(y >= 0)) return false;

  switch (worldMap.getIn([y, 'blocks', x, 'value'])) {
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
