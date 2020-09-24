import React, { useContext, useEffect, useRef } from 'react'
import M from 'materialize-css';
import {Link, useHistory} from 'react-router-dom';
import { UserContext } from '../App';

function Nav(){
  const {state, dispatch} = useContext(UserContext);
  const history = useHistory();
  // console.log(state)

  //to make navbar responsive
  // const elems = useRef(null);
  useEffect(()=>{
    // M.Sidenav.init(elems);
    let sidenav = document.querySelector('#mobile-demo');
    M.Sidenav.init(sidenav, {});
  },[])

  //rendering logout button when logged in else signin and signout
  const renderNavbarItems=()=>{
   if(state){
     return([
      <li><Link to="/">{state.name}</Link></li>,
      <li><button className="btn waves-effect waves-light #d32f2f red darken-2" onClick={() => {
        localStorage.clear();
        dispatch({ type: "CLEAR" })
        history.push("/Login")
      }}>LOGOUT</button></li>
     ])
   }
   else{
     return([
      <li><Link to="/Login">Login</Link></li>,
      <li><Link to="/Signup">SignUp</Link></li>
     ])
   }
  }
    return (
        <header>
           <nav>
            <div className="nav-wrapper container">
            <Link to= {state ? "/" : "/Login"} className="brand-logo">
              Keeper Application<i className="material-icons keeper-icon">assignment</i>
            </Link>
            <a href="" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                {renderNavbarItems()}
              </ul>
            </div>
          </nav>
          {/* SIDE BAR/MOBILE SIDE BAR RESPONSIVE LIST */}
          <ul className="sidenav center-align show-on-small" id="mobile-demo" >
          {/* <li><Link to="/">name</Link></li>
                <li><button className="btn waves-effect waves-light #d32f2f red darken-2" onClick={() => {
                  localStorage.clear();
                  dispatch({ type: "CLEAR" })
                  history.push("/Login")
                }}>LOGOUT</button></li> */}
                {renderNavbarItems()}
          </ul>
        </header>
      );
}

export default Nav;