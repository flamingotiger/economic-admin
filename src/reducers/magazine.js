import * as types from '../actions/ActionTypes';
import update from 'immutability-helper';

const initialState = {
  news:[],
  discussion:0,
  startup:[],
  data:0,
}

function magazine(state = initialState, action){
  switch(action.type){
    case types.MAGAZINE_NEWS:
      return update(state,{
          news:{[action.num]:[
            {$set:action.idx}
          ]}
      })
    case types.MAGAZINE_DISCUSSION:
      return {
        ...state,
        discussion:action.idx
      };
    case types.MAGAZINE_STARTUP:
      return update(state,{
        startup:{[action.num]:[
            {$set:action.idx}
        ]}
      })
    case types.MAGAZINE_DATA:
      return {
        ...state,
        data:action.idx
      }
    default:
      return state
  }
}
export default magazine;
