import React from "react"
import { useState } from "react";
import { Route,Redirect, useHistory } from "react-router-dom";
import Login from "./Login";
import Home from "../Home/Home";
export const LoginContext=React.createContext({
     token :'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{},
    emailid: '',
})
const AuthProvider=(props)=>{
 const InitialToken=localStorage.getItem('token');
 const emailState=localStorage.getItem('email');

    const[TokenState,SetTokenState]=useState(false);
    const[email,SetEmail]=useState('');
    const history=useHistory();
    const userIsLogedIn= !!TokenState;
  
    const  loginHandler=(token,email)=>{
        localStorage.setItem('token',token);
        localStorage.setItem('email',email)
         SetTokenState(token);
         SetEmail(email);
         

    }

    const logOutHandler=()=>{
           
        localStorage.removeItem('token');
          localStorage.removeItem('email');
        SetTokenState(null);
          SetEmail(null);
          
    }
    const auth={

        token:TokenState,
        isLoggedIn:userIsLogedIn,
        login :loginHandler,
        logout:logOutHandler,
        emailid:email
    }


    return (<LoginContext.Provider value={auth}>{props.children}
        
                 </LoginContext.Provider>)

}

export default AuthProvider;




//when the delete the items items deletes but show on the screen but when i refresh item goes delete in react