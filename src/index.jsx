import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import AppContainer from './containers/AppContainer';
import store from './store/index';

render((
  <Provider store={store}>
    <AppContainer />
  </Provider>
), document.getElementById('root'));
