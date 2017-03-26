/* eslint
  no-undef: 0,
  no-unused-vars: 0
*/
import React from 'react';
import {shallow} from 'enzyme';
import Game from './Game';
import Row from './Row';
import {initialWorld} from '../core/initialWorld';

describe('<Game />', () => {
  const x = 10;
  const z = 24;
  const state = initialWorld(z, x);
  const wrapper = shallow(<Game world={state.get('world')} />);

  it('render without throwing an error', () => {
    expect(wrapper.contains(
      <Row
        blocks={state.get('world').get(5).get('blocks')}
        key={state.get('world').get(5).get('id')}
      />
    )).toBe(true);
  });

  it('render className', () => {
    wrapper.find('.game', {}, result => expect(result.length).toBe(1));
  });

  it('render twenty <Row />', () => {
    wrapper.find(Row, {}, result => expect(result.length).toBe(20));
  });

  it('render first <Row /> with id zero', () => {
    wrapper.find(Row, {}, result => expect(result[0].get('id')).toBe(0));
  });
});
