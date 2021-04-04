import React from 'react';
import Error from '../images/error.png'
import {Link} from 'react-router-dom'
const four=()=>{
    return(
        <>
        <img src={Error} className="d-flex m-auto"/>
        <Link to="/" className="d-flex justify-content-center text-danger text-bold">Go to Home Page</Link>
        </>
    )
}
export default four;