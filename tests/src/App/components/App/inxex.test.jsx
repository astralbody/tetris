import React from 'react';
import {shallow} from 'enzyme';
import App from '../../../../../src/App/components/App';
import Game from '../../../../../src/components/Game/Game.jsx';
import {initialState} from '../../../../../src/core/initialState';
import formatStopwatch from '../../../../../src/core/formatStopwatch';

const state = initialState();

test('<App />', () => expect(shallow(
    <App
      world={state.get('world')}
      score={state.get('score')}
      hiScore={state.get('hiScore')}
      nextDetail={state.get('nextDetail')}
      stopwatch={formatStopwatch(state.get('stopwatch'))}
      pause={false}
    />,
).contains(<Game world={state.get('world')} />)).toBe(true));
