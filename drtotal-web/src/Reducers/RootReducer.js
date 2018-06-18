import { combineReducers } from "redux";
import LoginReducer from "../Login/Reducers/LoginReducer";

 const RootReducer=
         combineReducers({ 
                Login:LoginReducer,
                Hello: (state)=>{
                        return { ...state,
                                hello:'done'
                            };
                }
       });
export default RootReducer;