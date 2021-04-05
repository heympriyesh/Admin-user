import axios from 'axios';
import React,{useState} from 'react'
import {Link,useHistory, useParams} from 'react-router-dom'
const SetPassword = () => {
    const history=useHistory();
    const [value, setValue] = useState({})  
    const {token}=useParams();
    const [warning,setWarning]=useState("")
    console.log(token)
    const handleChange = (key, value) => {
        setValue((prev) => ({ ...prev, [key]: value }))
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        setWarning("")
        axios.post(`http://localhost:8000/new-password/`,{value,token})
        .then(result=>{
            alert('Passwor updated Successfully')
        }).catch(err=>{
            console.log({err})
            setWarning(err.response.data)
        })
    }
    return (
        <div>
        <center>
        <form onSubmit={handleSubmit} className="w-50">
                <label for="newpassword">New Password</label>
                <input type="text" name="newpassword"
                    value={value.fullname}
                    onChange={(e) => handleChange("newpassword", e.target.value)}
                    className="form-control"
                />

                <label for="confirmpassword">Confirm Password</label>
                <input type="text" name="confirmpassword"
                    value={value.email}
                    onChange={(e) => handleChange("confirmpassword", e.target.value)}
                    className="form-control"
                />
                <input type="submit" className="btn btn-primary m-3 "/>
            </form> 
        <div className="text-danger">{warning}</div>
        </center>
            <Link to="/login" className="d-flex justify-content-center">Login Here</Link>
        </div>
    )
}
export default SetPassword;