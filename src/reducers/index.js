import {combineReducers} from 'redux';
import world from './world';
import speed from './speed';

const rootReducer = combineReducers({
  world,
  speed
});

export default rootReducer;
