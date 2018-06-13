import { CLICK_SIGN_IN_BUTTON } from "./types";
import axios from 'axios';

export function LoginToServer(e) {
    console.log(e);
    
    axios.post('http://localhost:7071/api/v1/demo')
    .then(res => {    
    switch(res.status){
        case 200:   
            console.log(res.data);
            break;
        case 400:
            console.log("error");
            break;
        default:  
        console.log("error");

            break;
    }
      
    });        
    e.preventDefault();    
    return function (dispatch) {   
        dispatch({
            type: CLICK_SIGN_IN_BUTTON,
            payload: {
                isLogin: true,
                amount:25
            }
        });
    }
};