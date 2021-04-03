import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        // <div>
        //     <h1>Welcome Home</h1>
        //     <Link to="/login">Login</Link>
        // <br/>
        // <br/>
        //     <Link to="/signup">Signup</Link>
        //     <br />
        //     <br />
        // </div>
        <div className="jumbotron">
            <h1 className="display-4">Welcome Home!</h1>
            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr className="my-4"/>
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
               <center>

                <p className="lead d-inline-block mr-3">
                    {/* <Link className="btn btn-primary btn-lg" to="/signup" role="button">Signup</Link> */}
                </p>
            <p className="lead d-inline-block ml-2">
                <Link className="btn btn-primary btn-lg" to="/login" role="button">Login</Link>
            </p>
               </center>
</div>
    )
}

export default Home;
