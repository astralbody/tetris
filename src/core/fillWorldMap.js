const fillWorldMap = (worldMap, fillValue) => worldMap.map(row =>
  row.set('blocks', row.get('blocks').map(block =>
    block.set('value', fillValue)))
);

export default fillWorldMap;
