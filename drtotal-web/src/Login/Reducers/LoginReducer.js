import {
    CLICK_SIGN_IN_BUTTON
} from "../Actions/types";

const initialState = {};
const LoginReducer = (state = initialState, action) => {    
    switch (action.type) {
        case CLICK_SIGN_IN_BUTTON:
            console.log("we are here in reducer");
            localStorage.setItem("isLogin",true);
            sessionStorage.setItem("isLgoin",true);
            console.log("state old=" ,state);
            state={...state,abc:{'abc':'fun'}}            
            console.log("state newṭ=" ,state);
            state= {...state,"Login":action.payload};
            console.log(state);
            {                
                return { ...state,
                    Login: action.payload
                }

            }
        default:
            {
                console.log("signib button clicked default");
                return { ...state,
                    Login: action.payload
                };


            }

    }
}
export default LoginReducer;