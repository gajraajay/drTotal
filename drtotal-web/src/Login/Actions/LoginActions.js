import {
    LOGIN_FAIL,
    LOGIN_SUCCESS
} from "./types";
import axios from 'axios';
import cookie from 'react-cookies'
import { STATUS_CODES } from "http";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



export function UpdateNotification(state){
    return(dispatch)=>{
        dispatch({
            type:'default',
            payload:{...state,emailStatus:null,passwordStatus:null
            }
        })
    } 
}
export function SignUpToServer(email,password,confirmPassword){
    var payload={
        login: false,
        data: '',
        error: 'error',
        errorCode: 'error'
    }
    
    if(email && password && confirmPassword){
        console.log(password,confirmPassword);
        if(password!=confirmPassword){
        payload={login: false,
            data: '',errorCode:'not matching'}
        }else{
           return(dispatch)=>{ const params = new URLSearchParams();
            params.append('email', email);
            params.append('password', password);            
            axios.post(
                'http://localhost:7071/api/v1/create-user', params, { withCredentials: true })
            .then(res => {                    
                console.log(res.data.status);
                switch (res.status) {
                    case 200:
                    console.log(res.data.status);
                    if(res.data.status==1){
                        
                        dispatch({
                            type: LOGIN_SUCCESS,
                            'payload': {
                                stage:'signup',
                                login: true,
                                data: res.data
                            }
                        });
                        break;
                    }else{
                        dispatch({
                            type: LOGIN_FAIL,
                            'payload': {
                                stage:'signup',
                                login: false,
                                data: res.data
                            }
                        });
                        break;
                    }
                   
                        
                    case 409:
                    dispatch({
                        type: LOGIN_FAIL,
                        'payload': {
                            login: false,
                            data: res.data
                        }
                    });
                        break;
                    default:

                        break;
                }

            },(error)=>{                
                dispatch({
                    type: LOGIN_FAIL,
                    'payload': payload
                });                
            });
        }}
    }else{

        if(email.trim()==''){
            console.log("here 1");
            payload.errorCode='email needed';
        }
        else if(password.trim()==''){
            console.log("here 2");
            payload.errorCode='password needed';
        }
        else if(confirmPassword.trim()==''){
            console.log("here 3");
            payload.errorCode='Confirm Password needed';
        }else{
            console.log("here 4");
            payload.errorCode='All field neded';
        }
        
        
    return (dispatch) => dispatch({
        type: LOGIN_FAIL,
        'payload': payload
    });
    }
   
    
}



export function LoginToServer(email, password) {
    var error = '';
    if (email && password) {
        return (dispatch) => {
            console.log(JSON.stringify({
                email: email,
                password: password
            }));
         
            const params = new URLSearchParams();
            params.append('email', email);
            params.append('password', password);
            

            axios.post(
                    'http://localhost:7071/api/v1/validate-user', params, { withCredentials: true })
                .then(res => {                    
                    switch (res.status) {

                        case 200:
                        if(res.data.status==1){
                        
                            dispatch({
                                type: LOGIN_SUCCESS,
                                'payload': {
                                    stage:'login',
                                    login: true,
                                    data: res.data
                                }
                            });
                            break;
                        }else{
                             error = 'Hey, we can\'t find your account';
                            dispatch({
                                type: LOGIN_FAIL,
                                'payload': {
                                    stage:'login',
                                    login: false,
                                    errorMessage: error
                                }
                            });
                            break;
                        }
                            break;
                        case 401:
                         error = 'Hey, we can\'t find your account';
                        dispatch({
                            type: LOGIN_FAIL,
                            'payload': {
                                stage:'login',
                                login: false,
                                errorMessage: error
                            }
                        });
                            break;
                        default:
                        error = 'OOPS , Something went wrong , please try atfter sometime';

                        dispatch({
                            type: LOGIN_FAIL,
                            'payload': {
                                stage:'login',
                                login: false,
                                errorMessage: error
                            }
                        });
                            break;
                    }

                });


        }
    } else {
        var payload={
            stage:'login',
            login: false,
            data: '',
            errorMessage: error,
            emailStatus:'success',
            passwordStatus:'success'
        }
        
        if (!email || email.trim() == '') {
            payload.error = "Please enter your email address";
            payload.emailStatus='error';
            

        }
         if (!password || password.trim() == '') {
            payload.error = "Looks like you have not secured your account";
            payload.passwordStatus='error';
            
        } if((!email || email.trim() == '') && (!password || password.trim()=="")) {
            payload.error = "Oops!!! We thought we are not asking much(Both filed are need)";
            payload.passwordStatus='error';
            payload.emailStatus='error';
        }
        return (dispatch) => dispatch({
            type: LOGIN_FAIL,
            'payload': payload
        });

    }

};