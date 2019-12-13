import React from 'react';
import {shallow} from 'enzyme';
import Game from './Game';
import Row from '../Row/Row';
import {initialState} from '../../core/initialState';


describe('<Game />', () => {
  const x = 10;
  const z = 24;
  const state = initialState(z, x);
  const wrapper = shallow(<Game world={state.get('world')} />);

  it('render without throwing an error', () => expect(wrapper.contains(
      <Row
        blocks={state.getIn(['world', 5, 'blocks'])}
        key={state.getIn(['world', 5, 'id'])}
      />,
  )).toBe(true));

  it('render className', () => {
    wrapper.find('.game', {}, (result) => expect(result.length).toBe(1));
  });

  it('render twenty <Row />', () => {
    wrapper.find(Row, {}, (result) => expect(result.length).toBe(20));
  });

  it('render first <Row /> with id zero', () => {
    wrapper.find(Row, {}, (result) => expect(result[0].get('id')).toBe(0));
  });
});
