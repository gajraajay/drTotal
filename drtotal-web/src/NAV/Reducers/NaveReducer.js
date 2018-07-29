import { LOGIN_FAIL, LOGIN_SUCCESS, PROFILE_SUCCESS } from "../../Login/Actions/types";
import { REHYDRATE, PURGE } from 'redux-persist';
import { CLEAR } from "../../Reducers/RootReducer";

const initialState = {};
const NavReducer = ( state = initialState, action ) => {
    console.log(action);
  switch ( action.type ) {
      
    case CLEAR:
      {
        return {...initialState}
      }
    case REHYDRATE:
      {
        return { 

            ...action.payload.Nav
        } 
      }
    case LOGIN_SUCCESS:
      {
        
        return { user:action.payload.user,role:action.payload.role}
      }
    case LOGIN_FAIL:
      {
        return {...state }
      }
    case PROFILE_SUCCESS:
      {
        return { ...state}
      }
    default:
      {
        return { ...state}
      }

  }
}
export default NavReducer;