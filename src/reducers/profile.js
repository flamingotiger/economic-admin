import * as types from '../actions/ActionTypes';

const initialState = {
  userValue:[
    {
      index:0,
      img:'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/b/bb/Tony_Stark_Promo.jpg/revision/latest?cb=20141129202546',
      name:"Tony",
      firstname:"Stark",
      memo:"hello! IronMan",
    }
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
            index:userValue[userValue.length - 1].index + 1,
            img:action.img,
            name:action.name,
            firstname:action.firstname,
            memo:action.memo
          },
        ]
      }
    case types.REMOVE_USER:
      return {
        userValue: userValue.filter(idx => idx.index !== action.index)
      };
    default:
      return state;
  }
}
export default profile;
