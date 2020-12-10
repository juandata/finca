import { combineReducers } from 'redux'
import { lotesData } from './actions';
//this is the initial redux state
const initialState = {
}



let setLotesData = (state = initialState, action) => {
  const name = action.payload !== undefined ? Object.keys(action.payload)[0] : 'name';
  if(name === 'name'){return state}
  switch(action.type){
    case 'set_lotes_data':
    return  {
      ...state,
        [name] : {...action.payload[name]}
       } 
    
    default :
    return state;
  }
}
export const reducer = combineReducers({
  setLotesData
})