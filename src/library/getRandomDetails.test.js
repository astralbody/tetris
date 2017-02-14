import {List, is} from 'immutable';
import * as test from './getDetail';
import * as details from '../constants/ShapeDetail';
/* eslint no-undef: 0 */

describe('getDetail()', () => {
  it('getOfObjectToList(), return list of object', () => {
    const total = List([
      details.I, details.T, details.L,
      details.J, details.S, details.Z,
      details.O
    ]);

    expect(test.getOfObjectToList(details)).toEqual(total);
  });

  it('getRandomItemOfList(), return random item of list', () => {
    const list = test.getOfObjectToList(details);

    expect(test.getRandomItemOfList(list) instanceof List).toBe(true);
  });

  it('getRandomDetails(), return random detail', () => {
    const randomDetail = test.getRandomDetails();

    expect(test.getRandomDetails() instanceof List)
      .toBe(true);
    expect(Object.keys(details).some(kind => is(details[kind], randomDetail)))
      .toBe(true);
  });
});
