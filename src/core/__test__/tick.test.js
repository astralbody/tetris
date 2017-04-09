import {List} from 'immutable';
import tick from '../tick';

/* eslint no-undef: 0 */
test(
  'tick()',
  () => expect(tick((List([0, 59, 59])))).toEqual(List([1, 0, 0]))
);
