import axios from 'axios';
import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Nabar';

const Reset = () => {
    const [email,setEmail]=useState("");
    const [resetPasswordError,setPasswordError]=useState("")
    const forgotHandle=(e)=>{
        e.preventDefault();
        setPasswordError("")
        axios.post('http://localhost:8000/forgot-password',{"email":email})
        .then(result=>{
            console.log(result)
            alert(`Email sent to ${email} check your mail..`)
        }).catch(err=>{
            console.log({err})
            setPasswordError(err.response.data.error)
        })
    }
    return (
        <div>
      <nav class="navbar navbar-light bg-light d-flex justify-content-around">
  <a class="navbar-brand" href="#">
    <Link to="/" className="p-2">Home</Link>
  </a>
</nav>
            <h1 className="d-flex justify-content-center text-danger m-4">Enter Mail to Reset passsword</h1>
            <center>
            <form onSubmit={forgotHandle}>
                <input
                placeholder="Enter mail."
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input type="submit" className="btn btn-primary ml-2"/>
            </form>
            <div className="text-danger">{resetPasswordError}</div>
            </center>
        </div>
    )
}

export default Reset
