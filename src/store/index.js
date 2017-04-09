import {createStore} from 'redux';
import world from '../reducers/index';

const store = createStore(world);

export default store;
