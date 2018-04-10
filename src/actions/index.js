import * as types from './ActionTypes';

export const adminLogin = () => ({
   type:types.ADMIN_LOGIN,
 })
export const adminSubLogin = () => ({
  type:types.ADMIN_SUB_LOGIN,
})
export const adminLogout = () => ({
  type: types.ADMIN_LOGOUT,
})
export const createUser = ({index, name, firstname, memo}) => ({
  type:types.CREATE_USER,
  index, name, firstname, memo
})
export const removeUser = (index) => ({
  type:types.REMOVE_USER,
  index
})
//보류
export const checkUser = ({magazine, news, startup, discussion, data}) => ({
  type: types.CHECK_USER,
  magazine, news, startup, discussion, data
})
