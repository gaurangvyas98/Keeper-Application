import React, { createContext, useContext, useEffect, useReducer } from 'react';
import './App.css';
import {Switch, Route, BrowserRouter, useHistory} from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Navbar from './Components/Nav';
import { initialState, reducer } from './Reducer/UserReducer';
import CreateArea from './Components/CreateArea';


export const UserContext = createContext();

//we can't access history in browserrouter component
//useReducer is similar to useState, we use it with context
const Routing=()=>{
  const {state, dispatch} = useContext(UserContext);
  const history = useHistory();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
     //if the user is logged in, redirect user to home screen else redirect user to signin screen
    if(user){
      dispatch({ type: "USER", payload: user})
      history.push("/")
    }
    else{
      history.push("/Login")
    }
  },[])
  
  return(
    //switch make sure that any one route is active, completely optional
      <Switch> 
        <Route exact path="/"> 
          <CreateArea /> 
        </Route>
        <Route path="/Login"> 
          <Login /> 
        </Route>
        <Route exact path="/Signup"> 
          <Signup /> 
        </Route>
      </Switch>
   );
}


function App(){
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(state);
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
   </UserContext.Provider>
  );
}
export default App;