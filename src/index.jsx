import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import AppContainer from './containers/AppContainer';
import store from './store/index';

/* to do list:
  + 1. different positon rotate detail during generation
  + 2. move very fast detail, when keydown press key 'down'
  + 3. next and current detail
  + 3.1 next detail
  ? 4. panels
  + 5. count score
  + 9. test event? test next detail?
  ? 6. multicolor detail
  + 7. readme
  + 8. up scale display
  + 10. reduce deep store
  11. refactoring code (last)
  - 12. add toggle flag to speed up
  ? 13. pause
*/

/* Possible improvements:
  [TEST]
  1. Try snapshot
  2. Deep test <AppContainer />
  3. ...
*/

render((
  <Provider store={store}>
    <AppContainer />
  </Provider>),
  document.getElementById('root')
);
