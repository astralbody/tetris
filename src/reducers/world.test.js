import world from './world';
import {initialWorld} from '../core/initialWorld';
import {runStartGame, runOverGame, completeRow} from '../actions/index';
/* eslint
  no-undef: 0,
  no-unused-vars: 0
*/

describe('reducer world()', () => {
  const state = initialWorld();

  it('world() create and return state', () => {
    const returnWorld = world(undefined, {});

    expect(returnWorld).toEqual(state);
  });

  it('world() handle START_GAME', () => {
    const returnWorld = world(undefined, runStartGame());

    expect(returnWorld).toEqual(state);
  });

  it('world() handle OVER_GAME', () => {
    const returnWorld = world(undefined, runOverGame());

    expect(returnWorld).toEqual(state);
  });

  it('world() handle COMPLETE_ROW', () => {
    const completeRowY = 23;
    const stateCompleteRow = state.setIn(
      ['map', completeRowY, 'blocks'],
      state.getIn(['map', completeRowY, 'blocks'])
        .map(block => block.set('value', 1))
    );
    const returnWorld = world(stateCompleteRow, completeRow(completeRowY));

    expect(returnWorld).toEqual(state);
  });

  it('world() handle NEXT_DETAIL', () => {

  });
});
