import { LOGIN_FAIL,LOGIN_SUCCESS } from "./types";
import axios from 'axios';

export function LoginToServer(email,password) {
console.log("we say it email and password",email+password);
    if(email && password){

    
    return (dispatch) =>{           
        console.log(email,password);
        axios.get('http://localhost:7071/api/v1/demo?id=thisisisisiis')
        .then(res => {    
        switch(res.status){
            case 200:      
            console.log(res.data)
            dispatch({
                type :LOGIN_SUCCESS,'payload':{
                    login:true
                }
            });
                break;
            case 400:
                
                break;
            default:  
            
    
                break;
        }
          
        });      


    }
}else{
    var error='';
    if(email){
        error="email is needed";
    }else if(password){
        error="password needed";
    }else{
    error="bothneeded";
    }
    return (dispatch)=>dispatch({
        type: LOGIN_FAIL,'payload':{
            login:false,
            errorCode:error
        } 
    });
     
}
  
};