import {fromJS} from 'immutable';
import world from './world';
import {initialWorld} from '../core/initialWorld';
import {runStartGame, runOverGame, completeRow, nextDetail} from '../actions/index';
import {I} from '../constants/ShapeDetail';

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
});
