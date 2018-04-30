import * as types from '../actions/ActionTypes';

const initialState = {
  isLoggedIn: false,
  user:{}
}

function login(state = initialState, action){
  switch(action.type){
    case types.ADMIN_LOGIN:
      return {
        ...state,
        isLoggedIn:true,
        user:action.user
      };
    case types.ADMIN_LOGOUT:
      return {
        ...state,
        isLoggedIn:false,
        user:{}
      }
    default:
      return state
  }
}
export default login;
