import * as types from '../actions/ActionTypes';
import update from 'immutability-helper';

const initialState = {
  userValue:[
  ]
}
function profile(state = initialState, action){
  const { userValue } = state;
  switch(action.type){
    case types.CREATE_USER:
      return {
        userValue : [
          ...userValue,
          {
            idx:action.idx,
            img:action.img,
            name:action.name,
            firstname:action.firstname,
            memo:action.memo,
            magachk: false,
            newschk: false,
            startupchk: false,
            discussionchk: false,
            datachk: false
          },
        ]
      }
    case types.REMOVE_USER:
      return {
        userValue: userValue.filter(stateidx => stateidx.idx !== action.idx)
      };
    case types.EDIT_USER:
      return update(state,{
              userValue: {
                [action.idx]: {
                  idx:{ $set: action.idx},
                  img:{ $set: action.img},
                  name:{ $set: action.name},
                  firstname:{ $set: action.firstname},
                  memo:{ $set: action.memo},
                  magachk: { $set: action.magachk},
                  newschk: { $set: action.newschk},
                  startupchk: { $set: action.startupchk},
                  discussionchk: { $set: action.discussionchk},
                  datachk: { $set: action.datachk}
                }
              }
            })
    default:
      return state;
  }
}
export default profile;
