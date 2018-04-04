import * as types from './ActionTypes';

export const login = (id, password) => ({
   type:types.LOGIN,
   id,
   password
   //promise: {method:'post', url:'/admin/login', data: {id, password}}
 })
export const loginRequest = () => ({
  type:types.LOGIN_REQUEST,
})
export const loginSuccess = () => ({
   type:types.LOGIN_SUCCESS,
 })
export const loginFalure = () => ({
  type:types.LOGIN_FAILURE,
})
export const createUser = (index) => ({
  type:types.CREATE_USER,
  index
})
export const removeUser = (index) => ({
  type:types.REMOVE_USER,
  index
})
