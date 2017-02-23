import getRandomInt from './getRandomInt';
/* eslint no-undef: 0 */

describe('getRandomInt()', () => {
  const randomNumber = getRandomInt(-10, 100);

  it('Number', () => {
    expect(typeof randomNumber).toBe('number');
  });

  it('Integer', () => {
    expect(randomNumber % 1).toBe(0);
  });


  it('Comparison', () => {
    expect(randomNumber).toBeGreaterThanOrEqual(-10);
    expect(randomNumber).toBeLessThanOrEqual(100);
  });
});
