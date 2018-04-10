import * as types from '../actions/ActionTypes';

const initialState = {
  isLoggedIn: false,
  admin:false,
  user:{}
}

function login(state = initialState, action){
  switch(action.type){
    case types.ADMIN_LOGIN:
      return {
        ...state,
        isLoggedIn:true,
        admin:true,
        user:action.result
      };
    case types.ADMIN_SUB_LOGIN:
      return {
        ...state,
        isLoggedIn:true,
        admin:false,
        user:action.result
      };
    case types.ADMIN_LOGOUT:
      return {
        ...state,
        isLoggedIn:false,
        admin:false,
        user:action.result
      }
    default:
      return state
  }
}
export default login;
