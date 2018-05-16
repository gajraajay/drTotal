import {
    CLICK_SIGN_IN_BUTTON
} from "../Actions/types";

const initialState = {};
const LoginReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case CLICK_SIGN_IN_BUTTON:
            {

                return { ...state,
                    Login: action.payload
                }

            }
        default:
            {
                console.log("signib button clicked default");
                return { ...state,
                    login: action.payload
                };


            }

    }
}
export default LoginReducer;