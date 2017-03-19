import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import AppContainer from './containers/AppContainer';
import store from './store/index';

/* to do list:
  1. differen positon rotate detail during generation
  + 2. move very fast detail, when keydown press key 'down'
  2.1 add test
  + 3. next and current detail
  3.1 next detail
  4. panels
  5. count score
  6. multicolor detail?
  + 7. readme
  + 8. up scale display
  9. test event?
*/

render(
  (<Provider store={store}>
    <AppContainer />
  </Provider>),
  document.getElementById('root')
);
