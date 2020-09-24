import React, { useState, useReducer, useContext } from 'react'
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css'
import { UserContext } from '../App';

function Login(){
    const history = useHistory();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const {state, dispatch} = useContext(UserContext);

    const uploadData=()=>{
        fetch('/signin', {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"rounded #c62828 red darken-3"})
            }
            else{
                //saving data to localStorage
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))

                //calling a dispatch function of reducer
                dispatch({ action: "USER", payload: data.user })
                M.toast({html: "Login Successfull ",classes:"rounded #43a047 green darken-1"})
                // console.log(data.user)
                
                history.push("/")
                window.location.reload();
            }
        })
    }
    return(
        <div className="mycard">
        <div className="card auth-card input-field">
          <h2>Notes</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
           <button className="btn waves-effect waves-light #ffb300 amber darken-1 " onClick={uploadData} >Login</button>
        </div>
        </div>
    )
}

export default Login;