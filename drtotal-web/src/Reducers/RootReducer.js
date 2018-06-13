import { combineReducers } from "redux";
import LoginReducer from "../Login/Reducers/LoginReducer";
import demoReducer from "../Login/Reducers/demoReducer";


 const RootReducer=
         combineReducers({ 
                Login:LoginReducer
       });
export default RootReducer;