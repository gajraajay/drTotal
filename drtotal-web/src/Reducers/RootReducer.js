import { combineReducers } from "redux";
import LoginReducer from "../Login/Reducers/LoginReducer";

 const RootReducer=
         combineReducers({ 
                Login:LoginReducer,
       });
export default RootReducer;