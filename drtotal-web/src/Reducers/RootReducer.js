import { combineReducers } from "redux";
import LoginReducer from "../Login/Reducers/LoginReducer";
import { DemoReducer } from "../App/Reducers/DemoReducer";


 const RootReducer=
         combineReducers({ 
                Login:LoginReducer,
                Demo:DemoReducer
       });
export default RootReducer;