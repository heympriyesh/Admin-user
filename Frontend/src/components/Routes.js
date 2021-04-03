import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Details from './Details';
import AdminControl from './AdminControl';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
    return (
        <>
            <Switch>
              
                <Route exact path="/" ><Home /></Route>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" ><Signup /></Route>
                <PrivateRoute exact path="/detail" component={Details}/>
                {/* <Route exact path="/admin"><Admin /></Route> */}
                <PrivateRoute exact path='/all-details' component={AdminControl}/>
            </Switch>
        </>
    )
}
export default Routes;