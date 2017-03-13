/* eslint
  no-undef: 0,
  no-unused-vars: 0
*/
import React from 'react';
import {shallow} from 'enzyme';
import {Provider} from 'react-redux';
import AppContainer from './AppContainer';
import {initialWorld} from '../core/initialWorld';
import App from '../components/App';
import store from '../store/index';

const world = initialWorld();

test('render <AppContainer />', () => expect(shallow(
  <Provider store={store}>
    <AppContainer />
  </Provider>
).contains(<AppContainer />)).toBe(true));
