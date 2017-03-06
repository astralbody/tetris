const shiftDownBlock = (state) => {
  const flags = new Array(10).fill(false);

  return state
    .set('map', state.get('map').map((row, y) => row.set(
      'blocks',
      row.get('blocks').map((block, x) => {
        const prevFlag = flags[x];
        flags[x] = block.get('value') === 2;

        if (flags[x]) return block.set('value', prevFlag ? 2 : 0);

        return prevFlag ? block.set('value', 2) : block;
      })
    )))
    .setIn(
      ['info', 'nextDetail', 'pointY'],
      state.getIn(['info', 'nextDetail', 'pointY']) + 1
    );
};

export default shiftDownBlock;
