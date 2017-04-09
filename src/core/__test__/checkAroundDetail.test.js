import {fromJS} from 'immutable';
import {checkAroundDetail, inc, dec, echo} from '../checkAroundDetail';

/* eslint no-undef: 0 */
describe('checkAroundDetail', () => {
  it('echo(n), return n', () => {
    const n = 10;
    expect(echo(10)).toBe(n);
  });

  it('inc(n), return n + 1', () => {
    const n = 10;
    expect(inc(10)).toBe(n + 1);
  });

  it('dec(n), return n - 1', () => {
    const n = 10;
    expect(dec(10)).toBe(n - 1);
  });

  it('return false', () => {
    const world = fromJS({
      map: [
        {blocks: [{value: 2}, {value: 2}, {value: 0}, {value: 0}, {value: 0}]},
        {blocks: [{value: 0}, {value: 1}, {value: 0}, {value: 0}, {value: 0}]},
        {blocks: [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}]}
      ]
    });
    expect(checkAroundDetail(world.get('map'), 0, 3, echo, inc)).toBe(false);
    expect(checkAroundDetail(world.get('map'), 1, 0, echo, inc)).toBe(false);
  });

  it('return true', () => {
    const world = fromJS({
      map: [
        {blocks: [{value: 2}, {value: 2}, {value: 0}, {value: 0}, {value: 0}]},
        {blocks: [{value: 0}, {value: 1}, {value: 0}, {value: 0}, {value: 0}]},
        {blocks: [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}]}
      ]
    });
    expect(checkAroundDetail(world.get('map'), 0, 0, echo, inc)).toBe(true);
  });
});
