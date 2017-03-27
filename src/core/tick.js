import {inc} from './checkAroundDetail';

const tick = (time, lastIdx = 2) => time.get(lastIdx) === 59 && lastIdx > 0
  ? tick(time.set(lastIdx, 0), lastIdx - 1)
  : time.set(lastIdx, inc(time.get(lastIdx)));

export default tick;
