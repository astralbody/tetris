const transformBlock = (state, {options}) => state.set(
  'map',
  state.get('map').map((row, y) => row.set(row.get('blocks').map(block =>
    block.get('value') === options.from ? block.set('value', options.to) : block
  )))
);

export default transformBlock;
