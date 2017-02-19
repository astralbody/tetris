import {fromJS} from 'immutable';
import checkAroundDetail from './checkAroundDetail';
/* eslint no-undef: 0 */

describe('checkAroundDetail', () => {
  const world = fromJS({
    map: [
      {blocks: [{value: 2}, {value: 2}, {value: 0}, {value: 0}, {value: 0}]},
      {blocks: [{value: 0}, {value: 1}, {value: 0}, {value: 0}, {value: 0}]},
      {blocks: [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}]}
    ]
  });

  it('return false', () => {
    expect(checkAroundDetail(world, 0, 3)).toBe(false);
    expect(checkAroundDetail(world, 1, 0)).toBe(false);
  });

  it('return true', () => {
    expect(checkAroundDetail(world, 0, 0)).toBe(true);
  });
});
