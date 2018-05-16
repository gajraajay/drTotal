import { CLICK_SIGN_IN_BUTTON } from "./types";

export function LoginToServer(e) {       
    e.preventDefault();    
    return function (dispatch) {        
        dispatch({
            type: CLICK_SIGN_IN_BUTTON,
            payload: {
                isLogin: true,
                amount:100
            }
        });
    }
};