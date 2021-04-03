import React,{useState,useContext} from 'react'
import { useLocation} from 'react-router-dom';
import axios from 'axios';
import Navbar from './Nabar';
import {ApiContext} from './ApiContext'
const Details = () => {
    let location=useLocation();
    const [check,setCheck]=useState(true);
    const userData=location.state;
    const [email,setEmail]=useState(location.state.datacheck.email);
    const [passsword,setPassword]=useState(location.state.datacheck.password);
    const [fullname,setFullName]=useState(location.state.datacheck.fullname);
    const [category,setCategory]=useState(location.state.datacheck.category.category)
    const [value, setValue] = useState({})
    const [_id,setId]=useState(location.state.datacheck._id)
    const handleChange = (key, value) => {
        setValue((prev) => ({ ...prev, [key]: value }))
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        const token = sessionStorage.getItem('auth-token');
        console.log("Submit",value)

        axios.patch(`http://localhost:8000/reset-password/${_id}`,value, token && {
            headers: {
                "auth-token":
                    token
            },
        })
            .then(result => {
                console.log("Result after submit", result)
                // setValue(result.data)
            })
            .catch(err=>console.log({err}))
    }
    const Edit=()=>{
        console.log(check)
        setCheck((prev)=>(!prev))
    }
    const upDate=async ()=>{
        setCheck((prev)=>!prev)
        console.log(check)
        const data=JSON.stringify({email,passsword})
        console.log(data)
        try{
            console.log("Working..")
            const port = 'http://localhost:8000/user-details';
            const token = sessionStorage.getItem('auth-token');

            const res = await axios.patch(`${port}/${userData._id}`, { "email": email, "fullname": fullname }, token && {
                headers: {
                    "auth-token":
                        token
                },
            });
            const data1=await res;
            console.log("The data value",data1)
        }catch(err){
            console.log(err);
        } 
    }
    return (
        <div>
        <Navbar/>
           <center><h1>Welcome Details of User</h1></center> 
               <div >
                {check ?<center>
                    <span><u>Full Name:</u></span>
                    <p className="text-bold text-danger">{fullname && fullname}</p>
                    <span>Email:</span>
                    <p className="text-bold text-danger">{email&&email}</p>
                    <span>Category:</span>
                    <p className="text-danger">{category&& category}</p>
                    </center> :
                <center>
                    <label>Update Email</label>
                    <input
                    value={email&&email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="form-width form-control mb-2"
                /></center>}  
                {check ?<center><p>{passsword&&passsword}</p></center>:
                <center>
                        <label>Update Name</label>
                    <input
                    value={fullname&&fullname}
                    onChange={(e) =>setFullName(e.target.value)}
                    
                    className="form-width form-control"
                /></center>}
                  { check?<center><button onClick={()=>Edit()} className="btn btn-primary mt-2">Edit</button></center>:<center><button onClick={()=>upDate()} className="btn btn-primary mt-2">Update</button></center>}

               </div>
               <center><button className="btn btn-danger mt-4">Reset Password</button></center>
            <form className="form-group form-width" onSubmit={handleSubmit}>
                <label for="fullname">Enter Current Password</label>
                <input type="text" name="currentPassword"
                    value={value.currentPassword}
                    onChange={(e) => handleChange("currentPassword", e.target.value)}
                    className="form-control"
                />
                <label for="fullname">Enter New Password</label>
                <input type="text" name="newPassword"
                    value={value.newPassword}
                    onChange={(e) => handleChange("newPassword", e.target.value)}
                    className="form-control"
                />
                <label for="fullname">Confirm Password</label>
                <input type="text" name="confirmPassword"
                    value={value.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    className="form-control"
                />
                <button type="submit">Reset</button>
              </form>
            
        </div>
    )
}   

export default Details;
