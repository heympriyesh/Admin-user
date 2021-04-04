import React from 'react';
import Details from './Details';
import {useLocation,useHistory} from 'react-router-dom'
import AdminControl from './AdminControl';
const ShowData=()=>{
    const location=useLocation();
    // console.log("just checking the id",location.state.datacheck._id)
    return(
        <>
        {location.state.datacheck.role===0?<Details

        />:<AdminControl/>}
        </>
    )
}
export default ShowData;