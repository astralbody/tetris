import {createStore} from 'redux';
import world from '../reducers/index';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(world, composeWithDevTools());

export default store;
