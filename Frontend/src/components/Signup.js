import React from 'react'
import Navbar from './Nabar';
import AddDataComp from './AddDataComp';

const Signup = () => {

    return (
        <div>
            <Navbar />
            <AddDataComp heading="Sign up" button="Sign up"/>
        </div>
    )
}

export default Signup