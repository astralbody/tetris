import React from 'react';
import {shallow} from 'enzyme';
import Row from './Row';
import Block from '../Block/Block';
import {initialState} from '../../core/initialState';
import localStorage from '../../__mocks__/localStorage';

Object.defineProperty(global, 'localStorage', {value: localStorage()});

/* eslint no-undef: 0 */
describe('<Row />', () => {
  const x = 10;
  const propRow = initialState(1, 10).get('world').get(0);
  const block = propRow.get('blocks').get(0);
  const wrapper = shallow(
      <Row key={propRow.get('id')} blocks={propRow.get('blocks')} />
  );

  it('render without error', () => expect(wrapper.contains(
      <Block key={block.get('id')} value={block.get('value')} />
  )).toBe(true));

  it('render className', () => expect(wrapper.find('.row').length).toBe(1));

  it('render teen <Block />', () => expect(wrapper.find(Block).length).toBe(x));
});
