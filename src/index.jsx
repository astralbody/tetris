import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import AppContainer from './containers/AppContainer';
import store from './store/index';

/* to do list:
  1. rotate random detail.
  2. move very fast detail, when keydown press key 'down'.
  3. next and current detail.
  4. panels.
  5. count score.
  6. multicolor detail?
  7. readme.
*/

render(
  (<Provider store={store}>
    <AppContainer />
  </Provider>),
  document.getElementById('root')
);
