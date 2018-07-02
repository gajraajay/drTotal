import {
    LOGIN_FAIL,LOGIN_SUCCESS
} from "../Actions/types";

const initialState = {};
const LoginReducer = (state = initialState, action) => {    
    
    switch (action.type) {
        
        case LOGIN_SUCCESS: 
            {                
                return { ... action.payload
                }

            }
        case LOGIN_FAIL:
            {
                return { ...action.payload}
                 
            }
         default :{ 
            return{...state,...action.payload}            
            }

    }
}
export default LoginReducer;