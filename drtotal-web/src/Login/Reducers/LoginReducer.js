import {
    CLICK_SIGN_IN_BUTTON
} from "../Actions/types";

const initialState = {};
const LoginReducer = (state = initialState, action) => {    
    
    switch (action.type) {
        
        case CLICK_SIGN_IN_BUTTON:            
        
            state={...state,abc:{'abc':'fun'}}            
            
            state= {...state,"Login":action.payload};
            
            {                
                return { ...state,
                    Login: action.payload,
                    abc:'pqr',
                    pqr:'abc'
                }

            }
        default:
            {
                return { ...state,
                    Login: action.payload
                };


            }

    }
}
export default LoginReducer;