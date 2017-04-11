import React from 'react';
import {shallow} from 'enzyme';
import App from './App';
import Game from '../Game/Game';
import {initialState} from '../../core/initialState';
import localStorage from '../../__mocks__/localStorage';
import formatStopwatch from '../../core/formatStopwatch';

Object.defineProperty(global, 'localStorage', {value: localStorage()});
const state = initialState();

test('<App />', () => expect(shallow(
  <App
    world={state.get('world')}
    score={state.get('score')}
    hiScore={state.get('hiScore')}
    nextDetail={state.get('nextDetail')}
    stopwatch={formatStopwatch(state.get('stopwatch'))}
    pause={false}
  />
).contains(<Game world={state.get('world')} />)).toBe(true));
