import React from 'react';
import {mount, render} from 'enzyme';
import Panel from './Panel';
import {initialState} from '../../core/initialState';
import localStorage from '../../__mocks__/localStorage';
import {O} from '../../constants/ShapeDetail';

Object.defineProperty(global, 'localStorage', {value: localStorage()});

test('<Panel />', () => {
  const props = initialState();
  const stopwatch = '01:00';
  const wrapperMount = mount(
    <Panel
      score={props.get('score')}
      hiScore={props.get('hiScore')}
      nextDetail={O}
      stopwatch={stopwatch}
      pause
      test
    />
  );
  const wrapperRender = render(
    <Panel
      score={props.get('score')}
      hiScore={props.get('hiScore')}
      nextDetail={O}
      stopwatch={stopwatch}
      pause
      test
    />
  );

  expect(wrapperRender.text()).toBe(
    `Score:${props.get('score')}Hi-Score:${props.get('hiScore')}Rows:0Stopwatch:${stopwatch}`
  );
  expect(wrapperMount.props().score).toBe(props.get('score'));
  expect(wrapperMount.props().hiScore).toBe(props.get('hiScore'));
  expect(wrapperMount.props().stopwatch).toBe(stopwatch);
  expect(wrapperMount.props().nextDetail).toEqual(O);
});
