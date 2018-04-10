import profile from './profile';
import login from './login';
import { combineReducers } from 'redux';

const reducers = combineReducers ({
  profile,
  login
})
export default reducers;
