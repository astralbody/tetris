const checkAroundDetail = (world, x, y) => {
  if (!world.get('map').has(y)) return false;

  switch (world
    .get('map')
    .get(y)
    .get('blocks')
    .get(x)
    .get('value')) {
  case 0:
    return true;
  case 1:
    return false;
  case 2:
    return checkAroundDetail(world, x, y + 1);
  default:
    return false;
  }
};

export default checkAroundDetail;
