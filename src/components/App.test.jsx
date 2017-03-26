/* eslint
  no-undef: 0,
  no-unused-vars: 0
*/
import React from 'react';
import {shallow} from 'enzyme';
import App from './App';
import Game from './Game';
import {initialWorld} from '../core/initialWorld';

const state = initialWorld();

test('<App />', () =>
  expect(
    shallow(<App world={state.get('world')} />)
      .contains(<Game world={state.get('world')} />)
  ).toBe(true)
);
