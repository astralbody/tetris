import {fromJS} from 'immutable';
import world from './world';
import {initialWorld} from '../core/initialWorld';
import {
  runStartGame,
  runOverGame,
  completeRow,
  nextDetail,
  rotateDetail,
  moveDetail,
  transformBlock,
  downBlock
} from '../actions/index';
import {MOVE_LEFT, MOVE_RIGHT} from '../constants/MoveSide';
import {I} from '../constants/ShapeDetail';

const setRowsInState = (worldMap, startIdx, nextRows) => // test support-function
  nextRows.reduce((worldMap, row, idx) => worldMap.update(
    startIdx++,
    val => val.set('blocks', row.get('blocks'))
  ), worldMap);

describe('setRowsInState() test support function', () => {

});

/* eslint no-undef: 0 */
describe('reducer world()', () => {
  it('world() create and return state', () => {
    const state = initialWorld();
    const returnWorld = world(undefined, {});

    expect(returnWorld).toEqual(state);
  });

  it('world() handle START_GAME', () => {
    const state = initialWorld();
    const returnWorld = world(undefined, runStartGame());

    expect(returnWorld).toEqual(state);
  });

  it('world() handle OVER_GAME', () => {
    const state = initialWorld();
    const returnWorld = world(undefined, runOverGame());

    expect(returnWorld).toEqual(state);
  });

  it('world() handle COMPLETE_ROW', () => {
    const state = initialWorld();
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
    const state = initialWorld();
    const returnWorld = world(state, nextDetail(I));

    const correctShadowRows = fromJS([{
      id: -4,
      blocks: [
        {value: 0, id: 0},
        {value: 0, id: 1},
        {value: 0, id: 2},
        {value: 0, id: 3},
        {value: 0, id: 4},
        {value: 0, id: 5},
        {value: 0, id: 6},
        {value: 0, id: 7},
        {value: 0, id: 8},
        {value: 0, id: 9}
      ]
    }, {
      id: -3,
      blocks: [
        {value: 0, id: 10},
        {value: 0, id: 11},
        {value: 0, id: 12},
        {value: 2, id: 13},
        {value: 2, id: 14},
        {value: 2, id: 15},
        {value: 2, id: 16},
        {value: 0, id: 17},
        {value: 0, id: 18},
        {value: 0, id: 19}
      ]
    }]);

    const correctWorld = state
      .set(
        'map',
        state.get('map').merge(correctShadowRows)
      )
      .setIn(['info', 'nextDetail'], fromJS({
        kind: I.get('KIND'),
        pointX: I.get('POINT_X'),
        pointY: I.get('POINT_Y'),
        size: I.get('SIZE')
      }));

    expect(returnWorld.equals(correctWorld)).toEqual(true);
  });

  it('world() handle ROTATE_DETAIL', () => {
    const state = initialWorld();
    const rowsDetail = fromJS([{
      id: 0,
      blocks: [
        {value: 0, id: 40},
        {value: 0, id: 41},
        {value: 0, id: 42},
        {value: 0, id: 43},
        {value: 0, id: 44},
        {value: 0, id: 45},
        {value: 0, id: 46},
        {value: 0, id: 47},
        {value: 0, id: 48},
        {value: 0, id: 49}
      ]
    }, {
      id: 1,
      blocks: [
        {value: 0, id: 50},
        {value: 0, id: 51},
        {value: 0, id: 52},
        {value: 2, id: 53},
        {value: 2, id: 54},
        {value: 2, id: 55},
        {value: 2, id: 56},
        {value: 0, id: 57},
        {value: 0, id: 58},
        {value: 0, id: 59}
      ]
    }, {
      id: 2,
      blocks: [
        {value: 0, id: 60},
        {value: 0, id: 61},
        {value: 0, id: 62},
        {value: 0, id: 63},
        {value: 0, id: 64},
        {value: 0, id: 65},
        {value: 0, id: 66},
        {value: 0, id: 67},
        {value: 0, id: 68},
        {value: 0, id: 69}
      ]
    }, {
      id: 3,
      blocks: [
        {value: 0, id: 60},
        {value: 0, id: 61},
        {value: 0, id: 62},
        {value: 0, id: 63},
        {value: 0, id: 64},
        {value: 0, id: 65},
        {value: 0, id: 66},
        {value: 0, id: 67},
        {value: 0, id: 68},
        {value: 0, id: 69}
      ]
    }]);

    const rowsRotateDetail = fromJS([{
      id: 0,
      blocks: [
        {value: 0, id: 40},
        {value: 0, id: 41},
        {value: 0, id: 42},
        {value: 0, id: 43},
        {value: 0, id: 44},
        {value: 2, id: 45},
        {value: 0, id: 46},
        {value: 0, id: 47},
        {value: 0, id: 48},
        {value: 0, id: 49}
      ]
    }, {
      id: 1,
      blocks: [
        {value: 0, id: 50},
        {value: 0, id: 51},
        {value: 0, id: 52},
        {value: 0, id: 53},
        {value: 0, id: 54},
        {value: 2, id: 55},
        {value: 0, id: 56},
        {value: 0, id: 57},
        {value: 0, id: 58},
        {value: 0, id: 59}
      ]
    }, {
      id: 2,
      blocks: [
        {value: 0, id: 60},
        {value: 0, id: 61},
        {value: 0, id: 62},
        {value: 0, id: 63},
        {value: 0, id: 64},
        {value: 2, id: 65},
        {value: 0, id: 66},
        {value: 0, id: 67},
        {value: 0, id: 68},
        {value: 0, id: 69}
      ]
    }, {
      id: 3,
      blocks: [
        {value: 0, id: 60},
        {value: 0, id: 61},
        {value: 0, id: 62},
        {value: 0, id: 63},
        {value: 0, id: 64},
        {value: 2, id: 65},
        {value: 0, id: 66},
        {value: 0, id: 67},
        {value: 0, id: 68},
        {value: 0, id: 69}
      ]
    }]);

    const returnWorld = world(
      state.set('map', setRowsInState(state.get('map'), 4, rowsDetail))
        .setIn(['info', 'nextDetail'], fromJS({
          kind: I.get('KIND'),
          pointX: I.get('POINT_X'),
          pointY: 4,
          size: I.get('SIZE')
        })),
      rotateDetail()
    );

    const correctWorld = state
      .set(
        'map',
        setRowsInState(state.get('map'), 4, rowsRotateDetail)
      )
      .setIn(['info', 'nextDetail'], fromJS({
        kind: I.get('KIND'),
        pointX: I.get('POINT_X'),
        pointY: 4,
        size: I.get('SIZE')
      }));

    expect(returnWorld).toEqual(correctWorld);
  });

  it('world() handle MOVE_DETAIL', () => {
    const state = initialWorld();

    const rowsDetail = fromJS([{
      id: 1,
      blocks: [
        {value: 0, id: 50},
        {value: 0, id: 51},
        {value: 0, id: 52},
        {value: 2, id: 53},
        {value: 2, id: 54},
        {value: 2, id: 55},
        {value: 2, id: 56},
        {value: 0, id: 57},
        {value: 0, id: 58},
        {value: 0, id: 59}
      ]
    }]);
    const rowsMoveRightDetail = fromJS([{
      id: 1,
      blocks: [
        {value: 0, id: 50},
        {value: 0, id: 51},
        {value: 0, id: 52},
        {value: 0, id: 53},
        {value: 2, id: 54},
        {value: 2, id: 55},
        {value: 2, id: 56},
        {value: 2, id: 57},
        {value: 0, id: 58},
        {value: 0, id: 59}
      ]
    }]);
    const rowsMoveLeftDetail = fromJS([{
      id: 1,
      blocks: [
        {value: 0, id: 50},
        {value: 0, id: 51},
        {value: 2, id: 52},
        {value: 2, id: 53},
        {value: 2, id: 54},
        {value: 2, id: 55},
        {value: 0, id: 56},
        {value: 0, id: 57},
        {value: 0, id: 58},
        {value: 0, id: 59}
      ]
    }]);

    const stateDetail = state
      .set('map', setRowsInState(state.get('map'), 5, rowsDetail))
      .setIn(['info', 'nextDetail'], fromJS({
        kind: I.get('KIND'),
        pointX: I.get('POINT_X'),
        pointY: 4,
        size: I.get('SIZE')
      }));
    const stateMoveLeftDetail = state
      .set('map', setRowsInState(state.get('map'), 5, rowsMoveLeftDetail))
      .setIn(['info', 'nextDetail'], fromJS({
        kind: I.get('KIND'),
        pointX: I.get('POINT_X') - 1,
        pointY: 4,
        size: I.get('SIZE')
      }));
    const stateMoveRightDetail = state
      .set('map', setRowsInState(state.get('map'), 5, rowsMoveRightDetail))
      .setIn(['info', 'nextDetail'], fromJS({
        kind: I.get('KIND'),
        pointX: I.get('POINT_X') + 1,
        pointY: 4,
        size: I.get('SIZE')
      }));

    const returnStateDetailMoveLeft = world(
      stateDetail,
      moveDetail(MOVE_LEFT)
    );
    const returnStateDetailMoveRight = world(
      stateDetail,
      moveDetail(MOVE_RIGHT)
    );

    expect(returnStateDetailMoveLeft).toEqual(stateMoveLeftDetail);
    expect(returnStateDetailMoveRight).toEqual(stateMoveRightDetail);
  });

  it('world() handle TRANSFORM_BLOCK', () => {
    const state = initialWorld();

    const rowsDetail = fromJS([{
      id: 1,
      blocks: [
        {value: 0, id: 50},
        {value: 0, id: 51},
        {value: 0, id: 52},
        {value: 2, id: 53},
        {value: 2, id: 54},
        {value: 2, id: 55},
        {value: 2, id: 56},
        {value: 0, id: 57},
        {value: 0, id: 58},
        {value: 0, id: 59}
      ]
    }]);
    const rowsTransform = fromJS([{
      id: 1,
      blocks: [
        {value: 0, id: 50},
        {value: 0, id: 51},
        {value: 0, id: 52},
        {value: 1, id: 53},
        {value: 1, id: 54},
        {value: 1, id: 55},
        {value: 1, id: 56},
        {value: 0, id: 57},
        {value: 0, id: 58},
        {value: 0, id: 59}
      ]
    }]);

    const stateDetail = state.set(
      'map',
      setRowsInState(state.get('map'), 5, rowsDetail)
    );
    const stateTransform = state.set(
      'map',
      setRowsInState(state.get('map'), 5, rowsTransform)
    );

    const returnState = world(stateDetail, transformBlock({from: 2, to: 1}));

    expect(returnState).toEqual(stateTransform);
  });

  it('world() handle DOWN_BLOCK', () => {
    const state = initialWorld();

    const rowDetail = fromJS([{
      id: 1,
      blocks: [
        {value: 0, id: 50},
        {value: 0, id: 51},
        {value: 0, id: 52},
        {value: 2, id: 53},
        {value: 2, id: 54},
        {value: 2, id: 55},
        {value: 2, id: 56},
        {value: 0, id: 57},
        {value: 0, id: 58},
        {value: 0, id: 59}
      ]
    }]);
    const rowsDownDetail = fromJS([{
      id: 2,
      blocks: [
        {value: 0, id: 60},
        {value: 0, id: 61},
        {value: 0, id: 62},
        {value: 2, id: 63},
        {value: 2, id: 64},
        {value: 2, id: 65},
        {value: 2, id: 66},
        {value: 0, id: 67},
        {value: 0, id: 68},
        {value: 0, id: 69}
      ]
    }]);

    const stateDetail = state
      .set('map', setRowsInState(state.get('map'), 5, rowDetail))
      .setIn(['info', 'nextDetail'], fromJS({
        kind: I.get('KIND'),
        pointX: I.get('POINT_X') - 1,
        pointY: 4,
        size: I.get('SIZE')
      }));
    const stateDownDetail = state
      .set('map', setRowsInState(state.get('map'), 6, rowsDownDetail))
      .setIn(['info', 'nextDetail'], fromJS({
        kind: I.get('KIND'),
        pointX: I.get('POINT_X') - 1,
        pointY: 5,
        size: I.get('SIZE')
      }));

    const returnState = world(stateDetail, downBlock());

    expect(stateDownDetail.equals(returnState)).toEqual(true);
  });
});
