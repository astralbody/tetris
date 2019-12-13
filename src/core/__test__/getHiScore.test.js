import getHiScore from '../getHiScore';

/* eslint no-undef: 0 */
test('getHiScore()', () => {
  const key = 'hiScore';
  global.localStorage.setItem(key, undefined);
  expect(getHiScore()).toBe(0);
  global.localStorage.setItem(key, '21312');
  expect(getHiScore()).toBe(21312);
});
