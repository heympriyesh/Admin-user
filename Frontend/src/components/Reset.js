import axios from 'axios';
import React,{useState} from 'react'

const Reset = () => {
    const [email,setEmail]=useState("");
    const forgotHandle=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8000/forgot-password',{"email":email})
        .then(result=>{
            console.log(result)
        }).catch(err=>{
            console.log({err})
        })
    }
    return (
        <div>
            <h1>Reset Passowrd</h1>
            <form onSubmit={forgotHandle}>
                <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input type="submit" />
            </form>
        </div>
    )
}

export default Reset
