import setuser from './setuser';
import login from './login';
import { combineReducers } from 'redux';

const reducers = combineReducers ({
  setuser,
  login
})
export default reducers;
