import { LOGIN_FAIL, LOGIN_SUCCESS, PROFILE_SUCCESS } from "../Actions/types";
import cookie from 'react-cookies';
import { REHYDRATE, PURGE } from 'redux-persist';
import { CLEAR } from "../../Reducers/RootReducer";

const initialState = {};
const LoginReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case CLEAR:
      {
        return { }
      }
    case REHYDRATE:
      {
        console.log( action.payload );
        if ( action.payload ) {
          return {
            ...action.payload.Login
          };
        } else 
          return {
            ...state
          }
        }
    case LOGIN_SUCCESS:
      {
        localStorage.setItem('login', JSON.stringify({
          ...action.payload
        }));
        localStorage.setItem( 'dt_auth_key', action.payload.data.auth_token );
        localStorage.setItem( 'jwt', action.payload.data.jwt );
        return {
          ...action.payload
        }

      }
    case LOGIN_FAIL:
      {
        return {
          ...action.payload
        }

      }
    case PROFILE_SUCCESS:
      {
        return {
          ...action.payload
        }
      }
    default:
      {
        return {
          ...state,
          ...action.payload
        }
      }

  }
}
export default LoginReducer;