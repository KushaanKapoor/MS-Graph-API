import React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import Main from '../pages/LandingPage/Index';
import { useAppContext } from '../AppContext';
function Routing(props)
{ 
    return(
        <Router>
            <Switch>
                <Route 
                {...props}
                path='/'
                render={(props) => <Main />}
                exact
                />
            </Switch>
        </Router>
    )
}
export default Routing;