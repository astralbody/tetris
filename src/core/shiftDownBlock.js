// refactoring
const shiftDownBlock = (state) => {
  const flags = new Array(10).fill(false);

  return state
    .set('world', state.get('world').map((row, y) => row.set(
      'blocks',
      row.get('blocks').map((block, x) => {
        const prevFlag = flags[x];
        flags[x] = block.get('value') === 2;

        if (flags[x]) return block.set('value', prevFlag ? 2 : 0);

        return prevFlag ? block.set('value', 2) : block;
      })
    )))
    .setIn(
      ['currentDetail', 'pointY'],
      state.getIn(['currentDetail', 'pointY']) + 1
    );
};

export default shiftDownBlock;
