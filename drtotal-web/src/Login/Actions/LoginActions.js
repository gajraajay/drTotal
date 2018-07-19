import { LOGIN_FAIL, LOGIN_SUCCESS, PROFILE_SUCCESS } from "./types";
import axios from 'axios';
import cookie from 'react-cookies'
import { STATUS_CODES } from "http";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Token'] = localStorage.getItem( 'dt_auth_key' );
axios.defaults.headers.post['Authorization'] = "Bearer " + localStorage.getItem( 'jwt' );

export function UpdateNotification( state ) {
  return ( dispatch ) => {
    dispatch({
      payload: {
        confirmPasswordStatus: null,
        emailStatus: null,
        error: false,
        nameStatus: null,
        passwordStatus: null
      },
      type: 'default'
    })
  }
}

export function CompleteProfile( name, role ) {
    var params = new URLSearchParams( );
        params.append( 'token', localStorage.getItem('dt_auth_key') );
        params.append( 'role', JSON.stringify(role) );
  if ( name.trim() != "" ) {      
        params.append('name',name);      
    return ( dispatch ) =>(axios.post('http://localhost:7071/api/v1/profile',params, {
      withCredentials: true
    }).then(res => {         
            dispatch({
              'payload': {
                nameStatus: null,
                error: false,
                role:res.data.role,
                user:res.data.user,
                stage:'login',
                login:true,
                data:{status:1,...res.data}
              },
              type: PROFILE_SUCCESS
            });
       
    }, ( error ) => {
        console.log(error);
            dispatch({
              'payload': {
                nameStatus: 'error',
                error: true
              },
              type: "default"
            });
       
    }));
    
  } else {
    return ( dispatch ) => {
        console.log("null bame")
        dispatch({
          'payload': {
            nameStatus: "error",
            error: true
          },
          type: "default"
        });
      }
    console.log( "error" );
  }
  

}

export function SignUpToServer( email, password, confirmPassword ) {
  var error = false;
  var payload = {
    data: '',
    error: false,
    errorMessage: 'error',
    login: false
  }
  payload = {
    confirmPasswordStatus: null,
    data: '',
    emailStatus: null,
    error: false,
    errorMessage: error,
    login: false,
    passwordStatus: null,
    stage: 'signup'
  }

  if ( email && password && confirmPassword ) {
    if ( password != confirmPassword ) {
      payload = {
        data: '',
        error: true,
        errorMessage: 'not matching',
        login: false
      }
      payload.passwordStatus = 'error';
      payload.confirmPasswordStatus = 'error';
      return ( dispatch ) => {
        dispatch({ 'payload': payload, type: LOGIN_FAIL });
      }
    } else {
      return ( dispatch ) => {
        const params = new URLSearchParams( );
        params.append( 'email', email );
        params.append( 'password', password );
        axios.post('http://localhost:7071/api/v1/create-user', params, { withCredentials: true }).then(res => {
          console.log( res.data.status );
          switch ( res.status ) {
            case 200:
              if ( res.data.status == 1 ) {

                dispatch({
                  'payload': {
                    data: res.data,
                    user:res.data.user,
                    error: false,
                    login: true,
                    showRoles: true,
                    stage: 'signup'
                  },
                  type: LOGIN_SUCCESS
                });
                break;
              } else {
                error = 'Hey, we can\'t find your account';
                dispatch({
                  'payload': {
                    error: true,
                    errorMessage: error,
                    login: false,
                    stage: 'login'
                  },
                  type: LOGIN_FAIL
                });
                break;
              }

            case 409:
              dispatch({
                'payload': {
                  data: res.data,
                  error: true,
                  errorMessage: 'something went wrong',
                  login: false
                },
                type: LOGIN_FAIL
              });
              break;
            default:

              break;
          }

        }, ( error ) => {
          console.log( "ops" )
          payload.error = true;
          payload.errorMessage = 'Email already in use';
          payload.emailStatus = 'error';

          dispatch({ 'payload': payload, type: LOGIN_FAIL });
        });
      }
    }

  } else {

    payload.error = true;
    if ( email.trim( ) == '' ) {
      payload.errorMessage = 'email needed';
      payload.emailStatus = 'error';
    } else if ( password.trim( ) == '' ) {

      payload.errorMessage = 'password needed';
      payload.passwordStatus = 'error';
    } else if ( confirmPassword.trim( ) == '' ) {

      payload.errorMessage = 'Confirm Password needed';
      payload.confirmPasswordStatus = 'error';
    } else {

      payload.errorMessage = 'All field neded';
      payload.emailStatus = 'error';
      payload.passwordStatus = 'error';
      payload.confirmPasswordStatus = 'error';
    }

    return ( dispatch ) => dispatch({ 'payload': payload, type: LOGIN_FAIL });
  }

}

export function LoginToServer( email, password ) {
  var error = '';
  if ( email && password ) {
    return ( dispatch ) => {
      const params = new URLSearchParams( );
      params.append( 'email', email );
      params.append( 'password', password );
      axios.post('http://localhost:7071/api/v1/validate-user', params, { withCredentials: true }).then(res => {
        switch ( res.status ) {
          case 200:
            if ( res.data.status == 1 ) {
              dispatch({
                'payload': {
                  user:res.data.user,
                  data: res.data,
                  login: true,
                  stage: 'login'
                },
                type: LOGIN_SUCCESS
              });

              break;
            } else {
              error = 'Hey, we can\'t find your account';
              dispatch({
                'payload': {
                  error: true,
                  errorMessage: error,
                  login: false,
                  stage: 'login'
                },
                type: LOGIN_FAIL
              });
              break;
            }
            break;
          case 401:
            error = 'Hey, we can\'t find your account';
            dispatch({
              'payload': {
                error: true,
                errorMessage: error,
                login: false,
                stage: 'login'
              },
              type: LOGIN_FAIL
            });
            break;
          default:
            error = 'OOPS , Something went wrong , please try atfter sometime';

            dispatch({
              'payload': {
                error: true,
                errorMessage: error,
                login: false,
                stage: 'login'
              },
              type: LOGIN_FAIL
            });
            break;
        }

      }, ( err ) => {
        console.log( err );
      });

    }
  } else {
    var payload = {
      data: '',
      emailStatus: 'success',
      error: true,
      errorMessage: error,
      login: false,
      passwordStatus: 'success',
      stage: 'login'
    }

    if ( !email || email.trim( ) == '' ) {
      payload.errorMessage = "Please enter your email address";
      payload.emailStatus = 'error';

    }
    if ( !password || password.trim( ) == '' ) {
      payload.errorMessage = "Looks like you have not secured your account";
      payload.passwordStatus = 'error';

    }
    if (( !email || email.trim( ) == '' ) && ( !password || password.trim( ) == "" )) {
      payload.errorMessage = "Oops!!! We thought we are not asking much(Both filed are need)";
      payload.passwordStatus = 'error';
      payload.emailStatus = 'error';
    }
    return ( dispatch ) => dispatch({ 'payload': payload, type: LOGIN_FAIL });

  }

};