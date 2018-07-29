import {combineReducers} from "redux";
import LoginReducer from "../Login/Reducers/LoginReducer";
import {REHYDRATE} from 'redux-persist';
import NavReducer from "../NAV/Reducers/NaveReducer"

const initialState = {};
const RootReducer = combineReducers({ User: LoginReducer, Nav: NavReducer})
export default RootReducer;
export const CLEAR = 'clear';