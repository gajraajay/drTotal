import {
    CLICK_SIGN_IN_BUTTON
} from "../Actions/types";

const initialState = {};
const demoReducer = (state = initialState, action) => {    
    console.log("lol");
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
                    Login: action.payload
                };


            }

    }
}
export default demoReducer;