import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom'
import Navbar from './Nabar';
import { ApiContext } from './ApiContext';
const Login = () => {
    const [value, setValue] = useState({ role: 0, active: true })
    const [props, setProps] = useState({})
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const { truevalue, settruevalue, isAuth, setIsAuth } = useContext(ApiContext);
    console.log("isAuth", isAuth)
    var usercheck = '';
    var datacheck = '';
    var rolecheck = '';
    var activeDeactive = ''
    var adminCheck='';
    let history = useHistory();
    const handleChange = (key, value) => {
        setValue((prev) => ({ ...prev, [key]: value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError("");
        console.log(value)
        try {
            console.log('okk')
            const res = await axios.post('http://localhost:8000/login/', value)
                .then(res => {
                    sessionStorage.setItem("auth-token", res.headers['auth-token'])
                    datacheck=res.data
                    usercheck = res.data.user
                    rolecheck = res.data.role
                    activeDeactive = res.data.active
                    console.log("Login response", res.data)
                })
            const data = await res;
            console.log("Check", res)
            console.log("Active user", activeDeactive)
            if (rolecheck === 1) {
                settruevalue(!truevalue);
                setIsAuth(!isAuth)
               return history.push({
                    pathname: '/showdata',
                    state: {datacheck}
                })
                // return history.push('/all-details');
            }
            else {
                if (usercheck && activeDeactive === true) {
                    try {
                        const port = 'http://localhost:8000/user-details';
                        const userdetails = await axios.get(`${port}/${usercheck}`)
                            .then(res => {
                                datacheck = res.data
                                setProps(() => { setProps(res.data) })
                            })
                        await console.log("value form ser", userdetails)
                        const user = await userdetails;
                        console.log("Before history", {datacheck})
                        console.log("push")
                        settruevalue(!truevalue);
                        setIsAuth(!isAuth)

                        history.push({
                            pathname: '/showdata',
                            state: {datacheck}
                        })
                        // history.push({
                        //     pathname: '/detail',
                        //     state: {datacheck}
                        // })
                    } catch (err) {
                        console.log({ err })
                        console.log({ err })
                    }
                    console.log('all right')
                } else {
                    sessionStorage.removeItem('auth-token')
                    alert("User is Not present")
                }
            }

        } catch (err) {
            console.log({ err })
            setEmailError(err.response.data.errors.email)
            setPasswordError(err.response.data.errors.password)
            console.log(emailError)
        }

    }
    return (
        <div>
            <Navbar />
            <form onSubmit={handleSubmit} className="form-group form-width">
                <center><h2 className="text-danger">Log in</h2></center>
                <label for="email">Email</label>
                <input type="text" name="email" required
                    value={value.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="form-control"
                />
                <div class="text-danger">{emailError}</div>
                <label for="password">password</label>
                <input type="password" name="password" required
                    value={value.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="form-control"
                />
                <div class="text-danger">{passwordError}</div>
                <center><button className="btn btn-primary mt-2 ">Log in </button></center>
            </form>
            <center>

            <Link to="/reset" className="text-danger mt-2">Forgot Password?</Link>
            </center>
        </div>
    )
}

export default Login
