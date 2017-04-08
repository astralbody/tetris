import {initialWorld} from './initialWorld';
import localStorage from '../__mocks__/localStorage';

/* eslint no-undef: 0 */
Object.defineProperty(global, 'localStorage', {value: localStorage()});

describe('initialWorld()', () => {
  const answer = initialWorld(10, 30).get('world');

  it('Size', () => {
    expect(answer.size).toBe(10);
    expect(answer.get(0).get('blocks').size).toBe(30);
  });

  it('Type prop', () => {
    expect(typeof (answer.get(0).get('id'))).toBe('number');
    expect(typeof (answer.get(0).get('blocks')
      .get(0)
      .get('id')))
      .toBe('number');
    expect(typeof (answer.get(0)
      .get('blocks')
      .get(0)
      .get('value')))
      .toBe('number');
  });
});
