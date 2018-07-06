import cookie from 'react-cookies';
import {
    CLICK_SIGN_IN_BUTTON
} from "../Actions/types";

const initialState = {};
const demoReducer = (state = initialState, action) => {    
    
    switch (action.type) {
        case CLICK_SIGN_IN_BUTTON:
            {

                return { ...state,
                    Login: action.payload
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
export default demoReducer;