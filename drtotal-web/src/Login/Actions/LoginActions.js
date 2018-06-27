import {
    LOGIN_FAIL,
    LOGIN_SUCCESS
} from "./types";
import axios from 'axios';
import cookie from 'react-cookies'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['withCredentials'] = true;
// axios.defaults.withCredentials = true;
export function LoginToServer(email, password) {
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
                        console.log(res);
                        localStorage.setItem('key',JSON.stringify(res.data.auth_token));
                        cookie.save('dt_auth_key', res.data.auth_token, { path: '/' })
                            dispatch({
                                type: LOGIN_SUCCESS,
                                'payload': {
                                    login: true,
                                    data: res.data
                                }
                            });
                            break;
                        case 401:

                            break;
                        default:


                            break;
                    }

                });


        }
    } else {
        console.log(email, password)
        var error = '';
        if (!email || email.trim() == '') {
            console.log("we are in emails");
            error = "email is needed";
        } else if (!password || password.trim() == '') {
            console.log("we are in password");
            error = "password needed";
        } else {
            error = "bothneeded";
        }
        return (dispatch) => dispatch({
            type: LOGIN_FAIL,
            'payload': {
                login: false,
                data: '',
                error: error,
                errorCode: error
            }
        });

    }

};