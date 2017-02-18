const checkAroundDetail = (world, x, y) => {
  if (!world.get('map').has(y)) return 2;

  switch (world
    .get('map')
    .get(y)
    .get('blocks')
    .get(x)
    .get('value')) {
  case 0:
    return 0;
  case 1:
    return 1;
  case 2:
    return checkAroundDetail(world, x, y + 1);
  default:
    return 2;
  }
};

export default checkAroundDetail;
