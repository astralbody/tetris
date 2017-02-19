/* eslint
  no-undef: 0,
  no-unused-vars: 0
*/
import React from 'react';
import {shallow} from 'enzyme';
import Block from './Block';
import initialWorld from '../library/initialWorld';

describe('<Block />', () => {
  const propBlock = initialWorld(1, 1)
    .get('map')
    .get(0)
    .get('blocks')
    .get(0);
  const wrapper = shallow(
    <Block
      key={propBlock.get('id')}
      value={propBlock.get('value')}
    />
  );

  it('render without error', () => {
    expect(shallow(
      <Block
        key={propBlock.get('id')}
        value={propBlock.get('value')}
      />
    ).contains(<div className="block white" />)).toBe(true);
  });

  it('render value equal zero -> className white', () => {
    shallow(
      <Block
        key={0}
        value={0}
      />
    ).find('white', {}, result => result.length.toBe(1));
  });

  it('render value in excess of zero -> className black', () => {
    shallow(
      <Block
        key={0}
        value={1}
      />
    ).find('black', {}, result => result.length.toBe(1));
  });
});
