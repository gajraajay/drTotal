import {
    LOGIN_FAIL,LOGIN_SUCCESS
} from "../Actions/types";

const initialState = {};
const LoginReducer = (state = initialState, action) => {    
    
    switch (action.type) {
        
        case LOGIN_SUCCESS: 
            {              
                
                localStorage.setItem('login',JSON.stringify({...action.payload}));
                localStorage.setItem('auth_key',action.payload.data.auth_token);
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