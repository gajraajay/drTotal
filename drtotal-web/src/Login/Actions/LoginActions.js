import {
    LOGIN_FAIL,
    LOGIN_SUCCESS
} from "./types";
import axios from 'axios';
import cookie from 'react-cookies'
import { STATUS_CODES } from "http";
console.log(axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded');
console.log(axios.defaults.headers.post['Token'] = localStorage.getItem('dt_auth_key'));



export function UpdateNotification(state){
    return(dispatch)=>{
        dispatch({
            type:'default',
            payload:{emailStatus:null,passwordStatus:null,error:false
            }
        })
    } 
}
export function SignUpToServer(email,password,confirmPassword){
    var error=false;
    var payload={
        login: false,
        data: '',
        error: false,
        errorMessage: 'error'
    }
        payload={
        stage:'signup',
        login: false,
        data: '',
        error:false,
        errorMessage: error,
        emailStatus:'',
        passwordStatus:'',
        confirmPasswordStatus:''
    }
    
    if(email && password && confirmPassword){        
        if(password!=confirmPassword){            
        payload={
            login: false,
            data: '',
            error:true,
            errorMessage:'not matching'
        }
        payload.passwordStatus='error';
        payload.confirmPasswordStatus='error';
        return(dispatch)=>{
            dispatch({
                type: LOGIN_FAIL,
                'payload': payload
            });       
        }
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
                    if(res.data.status==1){
                        
                        dispatch({
                            type: LOGIN_SUCCESS,
                            'payload': {
                                stage:'signup',
                                error:false,
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
                               error:true,
                               errorMessage: error
                           }
                       });
                       break;
                   }
                   
                        
                    case 409:
                    dispatch({
                        type: LOGIN_FAIL,
                        'payload': {
                            login: false,
                            error: true,
                            errorMessage:'something went wrong',
                            data: res.data
                        }
                    });
                        break;
                    default:

                        break;
                }

            },(error)=>{               
                payload.error=true;
                payload.errorMessage='something went wrong' ;
                dispatch({
                    type: LOGIN_FAIL,
                    'payload': payload,                    
                });                
            });
        }}


    }else{
        
        payload.error=true;
        if(email.trim()==''){            
            payload.errorMessage='email needed';
            payload.emailStatus='error';
        }
        else if(password.trim()==''){
            
            payload.errorMessage='password needed';
            payload.passwordStatus='error';
        }
        else if(confirmPassword.trim()==''){
            
            payload.errorMessage='Confirm Password needed';
            payload.confirmPasswordStatus='error';
        }else{
            
            payload.errorMessage='All field neded';
            payload.emailStatus='error';
            payload.passwordStatus='error';
            payload.confirmPasswordStatus='error';
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
                                    error:true,
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
                                error:true,
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
                                error:true,
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
            error:true,
            errorMessage: error,
            emailStatus:'success',
            passwordStatus:'success'
        }
        
        if (!email || email.trim() == '') {
            payload.errorMessage = "Please enter your email address";
            payload.emailStatus='error';
            

        }
         if (!password || password.trim() == '') {
            payload.errorMessage = "Looks like you have not secured your account";
            payload.passwordStatus='error';
            
        } if((!email || email.trim() == '') && (!password || password.trim()=="")) {
            payload.errorMessage = "Oops!!! We thought we are not asking much(Both filed are need)";
            payload.passwordStatus='error';
            payload.emailStatus='error';
        }
        return (dispatch) => dispatch({
            type: LOGIN_FAIL,
            'payload': payload
        });

    }

};