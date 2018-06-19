import { CLICK_SIGN_IN_BUTTON } from "./types";
import axios from 'axios';

export function LoginToServer(email,password) {

    if(email && password){

    
    return (dispatch) =>{           
        console.log(email,password);
        axios.get('http://localhost:7071/api/v1/demo?id=thisisisisiis')
        .then(res => {    
        switch(res.status){
            case 200:      
            console.log(res.data)
            dispatch({
                type :'SOmething','payload':'yes'
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
    return (dispatch)=>dispatch({
        type: CLICK_SIGN_IN_BUTTON,'payload':{
            login:false,
            error:'all fileds are needed'
        }

        
    });
}
  
};