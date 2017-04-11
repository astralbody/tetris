import * as types from '../constants/ActionTypes';
import * as sides from '../constants/MoveSide';
import * as actions from './index';
/* eslint no-undef: 0 */

describe('actions', () => {
  it('transformBlock should create TRANSFORM_BLOCK action', () => {
    const options = {
      to: 1,
      from: 0
    };

    expect(actions.transformBlock(options)).toEqual({
      type: types.TRANSFORM_BLOCK,
      options
    });
  });

  it('nextDetail should create NEXT_DETAIL', () => {
    const detail = [1, 1, 1, 1];

    expect(actions.nextDetail(detail)).toEqual({
      type: types.NEXT_DETAIL,
      detail
    });
  });

  it('downBlock should create DOWN_BLOCK', () =>
    expect(actions.downBlock()).toEqual({
      type: types.DOWN_BLOCK
    })
  );

  it('moveDetail should create MOVE_DETAIL', () => {
    expect(actions.moveDetail(sides.MOVE_LEFT)).toEqual({
      type: types.MOVE_DETAIL,
      side: sides.MOVE_LEFT
    });
  });

  it('rotateDetail should create ROTATE_DETAIL', () => {
    expect(actions.rotateDetail()).toEqual({
      type: types.ROTATE_DETAIL
    });
  });

  it('completeRow should create COMPLETE_ROW', () => {
    expect(actions.completeRow(3)).toEqual({
      type: types.COMPLETE_ROW,
      y: 3
    });
  });

  it('runGameOver should create OVER_GAME', () => {
    expect(actions.runOverGame()).toEqual({
      type: types.OVER_GAME
    });
  });

  it('runGameStart should create GAME_START', () => {
    expect(actions.runStartGame()).toEqual({
      type: types.START_GAME
    });
  });
});
