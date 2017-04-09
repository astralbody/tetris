import formatStopwatch from '../formatStopwatch';

/* eslint no-undef: 0 */
test('formatStopwatch()', () => {
  const time = [1, 2, 3];
  const trueResult = '02:03';
  expect(formatStopwatch(time)).toBe(trueResult);
});
