const shiftDownBlock = (state, action) => {
  const flags = new Array(10).fill(false);

  const newState = state.set('map', state.get('map').map((row, y) => row.set(
    'blocks',
    row.get('blocks').map((block, x) => {
      if (action.options.some(val => val === block.get('value'))) {
        const newBlock = block.set('value', flags[x] ? 2 : 0);
        flags[x] = true;
        return newBlock;
      }

      const newBlock = flags[x] ? block.set('value', 2) : block;
      flags[x] = false;
      return newBlock;
    })
  )));

  return newState;
};

export default shiftDownBlock;
