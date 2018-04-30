import * as types from './ActionTypes';

//login
export const adminLogin = (user) => ({
   type:types.ADMIN_LOGIN,
   user
 })
export const adminLogout = () => ({
  type: types.ADMIN_LOGOUT,
})
