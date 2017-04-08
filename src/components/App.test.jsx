import React from 'react';
import {shallow} from 'enzyme';
import App from './App';
import Game from './Game';
import {initialWorld} from '../core/initialWorld';
import localStorage from '../__mocks__/localStorage';
import formatStopwatch from '../core/formatStopwatch';

Object.defineProperty(global, 'localStorage', {value: localStorage()});
const state = initialWorld();

/* eslint no-undef: 0, no-unused-vars: 0 */
test('<App />', () => expect(shallow(
  <App
    world={state.get('world')}
    score={state.get('score')}
    hiScore={state.get('hiScore')}
    nextDetail={state.get('nextDetail')}
    stopwatch={formatStopwatch(state.get('stopwatch'))}
  />
).contains(<Game world={state.get('world')} />)).toBe(true));
