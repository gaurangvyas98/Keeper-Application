import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css'

function Signup(){
    const history = useHistory();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const uploadData=()=>{
        // validating email 
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch('/signup', {
            method:"post",
            headers:{
                'Content-Type': "application/json",
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html:data.error,classes:"rounded #43a047 red darken-3"})
            }
            else{
                // console.log(data.Message)
                M.toast({html:data.Message,classes:"rounded #43a047 green darken-1"})
                history.push("/login")
            }
})
    }
    return(
        <div className="mycard">
        <div className="card auth-card input-field">
          <h2>Notes</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
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
           <button className="btn waves-effect waves-light #ffc400 amber accent-3 " onClick={uploadData} >Sign Up</button>
        </div>
        </div>
    )
}

export default Signup;