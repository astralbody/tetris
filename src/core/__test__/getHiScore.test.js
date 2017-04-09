import getHiScore from '../getHiScore';

/* eslint no-undef: 0 */
test('getHiScore()', () => {
  expect(getHiScore(undefined)).toBe(0);
  expect(getHiScore('21312')).toBe(21312);
});
