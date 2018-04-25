import profile from './profile';
import login from './login';
import magazine from './magazine';
import { combineReducers } from 'redux';

const reducers = combineReducers ({
  profile,
  login,
  magazine
})
export default reducers;
