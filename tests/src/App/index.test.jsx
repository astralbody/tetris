import React from 'react';
import {shallow} from 'enzyme';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import AppContainer from '../../../src/App';
import world from '../../../src/reducers/index';
import localStorage from '../../../src/__mocks__/localStorage';

Object.defineProperty(global, 'localStorage', {value: localStorage()});
const store = createStore(world);

/* eslint no-undef: 0 */
test('render <AppContainer />', () => expect(shallow(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
).contains(<AppContainer />)).toBe(true));
