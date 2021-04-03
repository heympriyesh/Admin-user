import axios from 'axios';
import React,{useState} from 'react'
import {Link,useHistory, useParams} from 'react-router-dom'
const SetPassword = () => {
    const history=useHistory();
    const [value, setValue] = useState({})  
    const {token}=useParams();
    console.log(token)
    const handleChange = (key, value) => {
        setValue((prev) => ({ ...prev, [key]: value }))
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post(`http://localhost:8000/new-password/`,{value,token})
        .then(result=>{
            console.log(result)
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label for="newpassword">newpassword</label>
                <input type="text" name="newpassword"
                    value={value.fullname}
                    onChange={(e) => handleChange("newpassword", e.target.value)}
                    className="form-control"
                />

                <label for="confirmpassword">confirmpassword</label>
                <input type="text" name="confirmpassword"
                    value={value.email}
                    onChange={(e) => handleChange("confirmpassword", e.target.value)}
                    className="form-control"
                />
                <input type="submit"/>
            </form>
        </div>
    )
}
export default SetPassword;