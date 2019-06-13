import React from 'react';
import {shallow} from 'enzyme';
import Block from './Block';
import {initialState} from '../../core/initialState';
import localStorage from '../../__mocks__/localStorage';

Object.defineProperty(global, 'localStorage', {value: localStorage()});

/* eslint no-undef: 0 */
describe('<Block />', () => {
  const blockProps = initialState(1, 1).getIn(['world', 0, 'blocks', 0]);

  it('render without error', () => expect(shallow(
      <Block key={blockProps.get('id')} value={blockProps.get('value')} />
  ).contains(<div className="block back" />)).toBe(true));

  it('render value 0 with className white', () => {
    shallow(<Block key={0} value={0} />)
        .find('front', {}, (result) => result.length.toBe(1));
  });

  it('render value 1 with className black', () => {
    shallow(<Block key={0} value={1} />)
        .find('back', {}, (result) => result.length.toBe(1));
  });
});
