import React, { useContext } from 'react';
import { Link,useHistory} from 'react-router-dom';
import {ApiContext} from './ApiContext';

const Navbar=()=>{
    let history=useHistory();
  const { truevalue, settruevalue } = useContext(ApiContext);
    const handleOut=()=>{
        sessionStorage.removeItem('auth-token')
        settruevalue(!truevalue)
        history.push('/')
          }
    return(
        
<nav class="navbar navbar-light bg-light d-flex justify-content-around">
  <a class="navbar-brand" href="#">
    <Link to="/login" className="p-2">Login</Link>
    {/* <Link to="/admin" className=" text-danger ml-2">Admin Login</Link> */}
    {/* <Link to="/signup" className="p-3">Signup</Link> */}
          {sessionStorage.getItem('auth-token') ? <button onClick={handleOut} className="btn btn-success">Logout</button> : ''} 
  </a>
</nav>
    )
}
export default Navbar;