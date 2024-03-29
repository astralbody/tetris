import {fromJS} from 'immutable';
import rootReducer from './index';
import {initialState} from '../core/initialState';
import {
  runStartGame,
  runOverGame,
  completeRow,
  nextDetail,
  rotateDetail,
  moveDetail,
  transformBlock,
  downBlock,
} from '../actions/index';
import {MOVE_LEFT, MOVE_RIGHT} from '../constants/MoveSide';
import {I} from '../constants/ShapeDetail';
import setRows from '../core/setRows';
import localStorage from '../__mocks__/localStorage';
import getHiScore from '../core/getHiScore';

Object.defineProperty(global, 'localStorage', {value: localStorage()});

test('setRows() test support function', () => {
  const stateWorld = initialState().get('world');
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
      {value: 0, id: 69},
    ],
  }]);
  const returnWorld = setRows(stateWorld, 6, row);

  return expect(returnWorld.equals(stateWorld)).toBe(true);
});

describe('reducer rootReducer()', () => {
  it('rootReducer() create and return state', () => {
    const state = initialState();
    const returnState = rootReducer(undefined, {});

    expect(returnState.set('nextDetail', state.get('nextDetail')))
        .toEqual(state);
  });

  it('rootReducer() handle START_GAME', () => {
    const state = initialState();
    const returnStateGameStart = rootReducer(state, runStartGame());
    expect(returnStateGameStart).toEqual(state);
  });

  it('rootReducer() and fillWorld() handle OVER_GAME', () => {
    const state = initialState();
    const returnStateGameOver = rootReducer(state, runOverGame(getHiScore('')));
    expect(returnStateGameOver).toEqual(state);
  });

  it('rootReducer() and completeRow() handle COMPLETE_ROW', () => {
    const state = initialState();
    const numCompleteRow = 23;

    const stateComplete = state.setIn(
        ['world', numCompleteRow, 'blocks'],
        state.getIn(['world', numCompleteRow, 'blocks'])
            .map((block) => block.set('value', 1))
    );
    const returnStateComplete = rootReducer(
        stateComplete,
        completeRow(numCompleteRow)
    );

    expect(returnStateComplete).toEqual(state.set('score', 10));
  });

  it('rootReducer() and getNextDetail() handle NEXT_DETAIL', () => {
    const state = initialState();

    const nextDetailOfState = state.get('nextDetail');

    const stateNextDetail = state
        .set('nextDetail', I)
        .set('currentDetail', fromJS({
          kind: nextDetailOfState.get('KIND'),
          pointX: nextDetailOfState.get('POINT_X'),
          pointY: nextDetailOfState.get('POINT_Y'),
          size: nextDetailOfState.get('SIZE'),
        }));

    const returnStateNextDetail = rootReducer(state, nextDetail(I));

    expect(returnStateNextDetail.get('nextDetail'))
        .toEqual(stateNextDetail.get('nextDetail'));
    expect(returnStateNextDetail.get('currentDetail'))
        .toEqual(stateNextDetail.get('currentDetail'));
  });

  it('rootReducer() and rotateDetail() handle ROTATE_DETAIL', () => {
    const state = initialState();

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
        {value: 0, id: 49},
      ],
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
        {value: 0, id: 59},
      ],
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
        {value: 0, id: 69},
      ],
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
        {value: 0, id: 69},
      ],
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
        {value: 0, id: 49},
      ],
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
        {value: 0, id: 59},
      ],
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
        {value: 0, id: 69},
      ],
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
        {value: 0, id: 69},
      ],
    }]);

    const stateDetail = state
        .set('world', setRows(state.get('world'), 4, rowsDetail))
        .set('currentDetail', fromJS({
          kind: I.get('KIND'),
          pointX: I.get('POINT_X'),
          pointY: 4,
          size: I.get('SIZE'),
        }));
    const stateRotate = state
        .set('world', setRows(state.get('world'), 4, rowsRotateDetail))
        .set('currentDetail', fromJS({
          kind: I.get('KIND'),
          pointX: I.get('POINT_X'),
          pointY: 4,
          size: I.get('SIZE'),
        }));

    const returnStateRotate = rootReducer(stateDetail, rotateDetail());
    expect(returnStateRotate).toEqual(stateRotate);
  });

  it(
      'rootReducer() and moveDetail(), getStateMoveLeftDetail(), getStateMoveRightDetail() handle MOVE_DETAIL',
      () => {
        const state = initialState();

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
            {value: 0, id: 59},
          ],
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
            {value: 0, id: 59},
          ],
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
            {value: 0, id: 59},
          ],
        }]);

        const stateDetail = state
            .set('world', setRows(state.get('world'), 5, rowDetail))
            .set('currentDetail', fromJS({
              kind: I.get('KIND'),
              pointX: I.get('POINT_X'),
              pointY: 4,
              size: I.get('SIZE'),
            }));
        const stateMoveLeft = state
            .set('world', setRows(state.get('world'), 5, rowMoveLeft))
            .set('currentDetail', fromJS({
              kind: I.get('KIND'),
              pointX: I.get('POINT_X') - 1,
              pointY: 4,
              size: I.get('SIZE'),
            }));
        const stateMoveRight = state
            .set('world', setRows(state.get('world'), 5, rowMoveRight))
            .set('currentDetail', fromJS({
              kind: I.get('KIND'),
              pointX: I.get('POINT_X') + 1,
              pointY: 4,
              size: I.get('SIZE'),
            }));

        const returnStateMoveLeft = rootReducer(
            stateDetail,
            moveDetail(MOVE_LEFT)
        );
        const returnStateMoveRight = rootReducer(
            stateDetail,
            moveDetail(MOVE_RIGHT)
        );

        expect(returnStateMoveLeft).toEqual(stateMoveLeft);
        expect(returnStateMoveRight).toEqual(stateMoveRight);
      }
  );

  it('rootReducer() and transformBlock() handle TRANSFORM_BLOCK', () => {
    const state = initialState();

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
        {value: 0, id: 59},
      ],
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
        {value: 0, id: 59},
      ],
    }]);

    const stateDetail = state.set(
        'world',
        setRows(state.get('world'), 5, rowDetail)
    );
    const stateTransform = state.set(
        'world',
        setRows(state.get('world'), 5, rowTransform)
    );

    const returnState = rootReducer(stateDetail, transformBlock({from: 2, to: 1}));

    expect(returnState).toEqual(stateTransform);
  });

  it('rootReducer() and shiftDownBlock() handle DOWN_BLOCK', () => {
    const state = initialState();

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
        {value: 0, id: 59},
      ],
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
        {value: 0, id: 69},
      ],
    }]);

    const stateDetail = state
        .set('world', setRows(state.get('world'), 5, rowDetail))
        .set('currentDetail', fromJS({
          kind: I.get('KIND'),
          pointX: I.get('POINT_X') - 1,
          pointY: 4,
          size: I.get('SIZE'),
        }));
    const stateDownDetail = state
        .set('world', setRows(state.get('world'), 6, rowDownDetail))
        .set('currentDetail', fromJS({
          kind: I.get('KIND'),
          pointX: I.get('POINT_X') - 1,
          pointY: 5,
          size: I.get('SIZE'),
        }));

    const returnState = rootReducer(stateDetail, downBlock());

    expect(stateDownDetail.equals(returnState)).toBe(true);
  });
});
