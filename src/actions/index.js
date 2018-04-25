import * as types from './ActionTypes';
//login
export const adminLogin = () => ({
   type:types.ADMIN_LOGIN,
 })
export const adminSubLogin = () => ({
  type:types.ADMIN_SUB_LOGIN,
})
export const adminLogout = () => ({
  type: types.ADMIN_LOGOUT,
})
//addMagazine
export const magazineNews = (num, idx) => ({
  type: types.MAGAZINE_NEWS,
  num,
  idx
})
export const magazineDiscussion = (idx) => ({
  type: types.MAGAZINE_DISCUSSION,
  idx
})
export const magazineStartup = (num, idx) => ({
  type: types.MAGAZINE_STARTUP,
  num,
  idx
})
export const magazineData = (idx) => ({
  type: types.MAGAZINE_DATA,
  idx
})
//profile 보류
export const createUser = ({idx, img, name, firstname, memo}) => ({
  type:types.CREATE_USER,
  idx, img, name, firstname, memo
})
export const removeUser = (idx) => ({
  type:types.REMOVE_USER,
  idx
})
export const editUser = ({idx, img, name, firstname, memo, magachk, newschk, startupchk, discussionchk, datachk}) => ({
  type:types.EDIT_USER,
  idx, img, name, firstname, memo, magachk, newschk, startupchk, discussionchk, datachk
})
