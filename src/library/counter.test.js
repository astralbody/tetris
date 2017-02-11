import counter from './counter';
/* eslint no-undef: 0 */

test('caunter()', () => {
  const score = counter(0);
  score();
  score();
  score();

  return expect(score()).toEqual(3);
});
