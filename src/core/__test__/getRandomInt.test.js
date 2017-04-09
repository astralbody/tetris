import getRandomInt from '../getRandomInt';

/* eslint no-undef: 0 */
describe('getRandomInt()', () => {
  it('Number', () => {
    const randomNumber = getRandomInt(-10, 100);
    expect(typeof randomNumber).toBe('number');
  });

  it('Integer', () => {
    const randomNumber = getRandomInt(-10, 100);
    expect(randomNumber % 1).toBe(0);
  });

  it('Comparison', () => {
    const randomNumber = getRandomInt(-10, 100);
    expect(randomNumber).toBeGreaterThanOrEqual(-10);
    expect(randomNumber).toBeLessThanOrEqual(100);
  });
});
