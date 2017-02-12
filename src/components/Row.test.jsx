/* eslint
  no-undef: 0,
  no-unused-vars: 0
*/
import React from 'react';
import {render, shallow, mount} from 'enzyme';
import Row from './Row';
import Block from './Block';
import initialWorld from '../library/initialWorld';

describe('<Row />', () => {
  const x = 10;
  const propRow = initialWorld(1, 10).get(0);
  const block = propRow.get('blocks').get(0);
  const wrapper = shallow(
    <Row
      key={propRow.get('id')}
      blocks={propRow.get('blocks')}
    />
  );

  it('render without error', () => {
    expect(wrapper.contains(
      <Block key={block.get('id')} value={block.get('value')} />
    )).toBe(true);
  });

  it('render className', () => {
    expect(wrapper.find('.row').length).toBe(1);
  });

  it('render teen <Block />', () => {
    expect(wrapper.find(Block).length).toBe(x);
  });
});
