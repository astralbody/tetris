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
import setRowsInWorldMap from '../core/setRowsInWorldMap';

/* eslint no-undef: 0 */

test('setRowsInWorldMap() test support function', () => {
  const worldMap = initialWorld().get('world');
  const row = fromJS([{
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
  }]);

  const returnWorldMap = setRowsInWorldMap(worldMap, 6, row);

  return expect(returnWorldMap.equals(worldMap)).toBe(true);
});

describe('reducer world()', () => {
  it('world() create and return state', () => {
    const state = initialWorld();
    const returnState = world(undefined, {});

    expect(returnState.set(
      'nextDetail',
      state.get('nextDetail')
    ).set('time', state.get('time'))).toEqual(state);
  });

  it('world() handle START_GAME', () => {
    const state = initialWorld();
    const returnStateGameStart = world(state, runStartGame());
    expect(returnStateGameStart).toEqual(state);
  });

  it('world() and fillWorldMap() handle OVER_GAME', () => {
    const state = initialWorld();
    const returnStateGameOver = world(state, runOverGame());
    expect(returnStateGameOver).toEqual(state);
  });

  it('world() and completeRow() handle COMPLETE_ROW', () => {
    const state = initialWorld();
    const numCompleteRow = 23;

    const stateComplete = state.setIn(
      ['world', numCompleteRow, 'blocks'],
      state.getIn(['world', numCompleteRow, 'blocks'])
        .map(block => block.set('value', 1))
    );
    const returnStateComplete = world(
      stateComplete,
      completeRow(numCompleteRow)
    );

    expect(returnStateComplete).toEqual(state);
  });

  it('world() and getNextDetail() handle NEXT_DETAIL', () => {
    const state = initialWorld();

    const nextDetailOfState = state.get('nextDetail');

    const stateNextDetail = state
      .set('nextDetail', I)
      .set('currentDetail', fromJS({
        kind: nextDetailOfState.get('KIND'),
        pointX: nextDetailOfState.get('POINT_X'),
        pointY: nextDetailOfState.get('POINT_Y'),
        size: nextDetailOfState.get('SIZE')
      }));

    const returnStateNextDetail = world(state, nextDetail(I));

    expect(returnStateNextDetail.get('nextDetail'))
      .toEqual(stateNextDetail.get('nextDetail'));
    expect(returnStateNextDetail.get('currentDetail'))
      .toEqual(stateNextDetail.get('currentDetail'));
  });

  it('world() and rotateDetail() handle ROTATE_DETAIL', () => {
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

    const stateDetail = state
      .set('world', setRowsInWorldMap(state.get('world'), 4, rowsDetail))
      .set('currentDetail', fromJS({
        kind: I.get('KIND'),
        pointX: I.get('POINT_X'),
        pointY: 4,
        size: I.get('SIZE')
      }));
    const stateRotate = state
      .set('world', setRowsInWorldMap(state.get('world'), 4, rowsRotateDetail))
      .set('currentDetail', fromJS({
        kind: I.get('KIND'),
        pointX: I.get('POINT_X'),
        pointY: 4,
        size: I.get('SIZE')
      }));

    const returnStateRotate = world(stateDetail, rotateDetail());
    expect(returnStateRotate).toEqual(stateRotate);
  });

  it(
    'world() and moveDetail(), getStateMoveLeftDetail(), getStateMoveRightDetail() handle MOVE_DETAIL',
    () => {
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
      const rowMoveRight = fromJS([{
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
      const rowMoveLeft = fromJS([{
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
        .set('world', setRowsInWorldMap(state.get('world'), 5, rowDetail))
        .set('currentDetail', fromJS({
          kind: I.get('KIND'),
          pointX: I.get('POINT_X'),
          pointY: 4,
          size: I.get('SIZE')
        }));
      const stateMoveLeft = state
        .set('world', setRowsInWorldMap(state.get('world'), 5, rowMoveLeft))
        .set('currentDetail', fromJS({
          kind: I.get('KIND'),
          pointX: I.get('POINT_X') - 1,
          pointY: 4,
          size: I.get('SIZE')
        }));
      const stateMoveRight = state
        .set('world', setRowsInWorldMap(state.get('world'), 5, rowMoveRight))
        .set('currentDetail', fromJS({
          kind: I.get('KIND'),
          pointX: I.get('POINT_X') + 1,
          pointY: 4,
          size: I.get('SIZE')
        }));

      const returnStateMoveLeft = world(
        stateDetail,
        moveDetail(MOVE_LEFT)
      );
      const returnStateMoveRight = world(
        stateDetail,
        moveDetail(MOVE_RIGHT)
      );

      expect(returnStateMoveLeft).toEqual(stateMoveLeft);
      expect(returnStateMoveRight).toEqual(stateMoveRight);
    }
  );

  it('world() and transformBlock() handle TRANSFORM_BLOCK', () => {
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
    const rowTransform = fromJS([{
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
      'world',
      setRowsInWorldMap(state.get('world'), 5, rowDetail)
    );
    const stateTransform = state.set(
      'world',
      setRowsInWorldMap(state.get('world'), 5, rowTransform)
    );

    const returnState = world(stateDetail, transformBlock({from: 2, to: 1}));

    expect(returnState).toEqual(stateTransform);
  });

  it('world() and shiftDownBlock() handle DOWN_BLOCK', () => {
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
    const rowDownDetail = fromJS([{
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
      .set('world', setRowsInWorldMap(state.get('world'), 5, rowDetail))
      .set('currentDetail', fromJS({
        kind: I.get('KIND'),
        pointX: I.get('POINT_X') - 1,
        pointY: 4,
        size: I.get('SIZE')
      }));
    const stateDownDetail = state
      .set('world', setRowsInWorldMap(state.get('world'), 6, rowDownDetail))
      .set('currentDetail', fromJS({
        kind: I.get('KIND'),
        pointX: I.get('POINT_X') - 1,
        pointY: 5,
        size: I.get('SIZE')
      }));

    const returnState = world(stateDetail, downBlock());

    expect(stateDownDetail.equals(returnState)).toBe(true);
  });
});
