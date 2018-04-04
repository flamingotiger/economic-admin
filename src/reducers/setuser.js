import * as types from '../actions/ActionTypes';

const initialState = {
  userAttr:[
    {
      index:0,
      number:2
    },
  ]
}
function setuser(state = initialState, action){
  const { userAttr } = state;
  switch(action.type){
    case types.CREATE_USER:
      return {
        userAttr : [
          ...userAttr,
          {
            index:action.index
          },
        ]
      }
    case types.REMOVE_USER:
      return {
        userAttr: userAttr.slice(action.index,userAttr.length - 1)
      };
    default:
      return state;
  }
}
export default setuser;
