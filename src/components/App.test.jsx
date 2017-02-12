/* eslint
  no-undef: 0,
  no-unused-vars: 0
*/
import React from 'react';
import {shallow} from 'enzyme';
import App from './App';
import Game from './Game';
import initialWorld from '../library/initialWorld';

const world = initialWorld(10, 24);

test('<App />', () =>
  expect(
    shallow(<App world={world} />)
      .contains(<Game world={world} />)
  ).toBe(true)
);
