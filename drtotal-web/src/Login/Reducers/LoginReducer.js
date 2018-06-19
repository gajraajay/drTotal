import {
    LOGIN_FAIL,LOGIN_SUCCESS
} from "../Actions/types";

const initialState = {};
const LoginReducer = (state = initialState, action) => {    
    
    switch (action.type) {
        
        case LOGIN_SUCCESS:            
                    
            
            
            {                
                return { ...state,... action.payload
                }

            }
        case LOGIN_FAIL:
            {
                return { ...state,...action.payload,error:'all is needed'}
            


                break;
            }
         default :{ 
            console.log("we are here");
            return{...state}
            }

    }
}
export default LoginReducer;