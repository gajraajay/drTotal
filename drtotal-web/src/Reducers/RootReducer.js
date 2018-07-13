import { combineReducers } from "../../../../.cache/typescript/2.9/node_modules/redux";
import LoginReducer from "../Login/Reducers/LoginReducer";
import { REHYDRATE } from 'redux-persist';
const initialState={};
 const RootReducer=
         combineReducers({ 
                Login:LoginReducer,                
       });
export default RootReducer;
export const CLEAR='clear';