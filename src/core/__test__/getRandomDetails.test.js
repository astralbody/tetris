import {List, Map} from 'immutable';
import * as test from '../getRandomDetails';
import * as details from '../../constants/ShapeDetail';

/* eslint no-undef: 0 */
describe('getDetail()', () => {
  it('getOfObjectToList(), return list of object', () => {
    const total = List(Object.keys(details).map(detail => details[detail]));
    expect(test.getOfObjectToList(details)).toEqual(total);
  });

  it('getRandomItemOfList(), return random item of list', () => {
    const list = test.getOfObjectToList(details);
    expect(test.getRandomItemOfList(list) instanceof Map).toBe(true);
  });

  it('getRandomDetails(), return random detail', () => {
    const randomDetail = test.getRandomDetails();
    expect(test.getRandomDetails() instanceof Map).toBe(true);
    expect(randomDetail.get('KIND') in details).toBe(true);
  });
});
