import React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import Main from '../pages/LandingPage/Index';
import {  Text } from '@chakra-ui/react';
import { useAppContext } from '../AppContext';
import Dashboard from '../pages/Dashboard/Index';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';


function Routing(props)
{ 
    const app = useAppContext();
    const msal = useMsal();
    const account = msal.instance.getActiveAccount();
    console.log('route props', app.user);

    const AuthRoute =  ({ component: Component, ...otherProps }) => {
        console.log('inside auth route props', app.user);

        return(
            <Route
            {...otherProps}
            render={props =>
                account ? (
                    <Component {...props} />
                    ) : (
                        <Redirect
                        to={{
                            pathname: "/"
                        }}
                        />
                        )}
                    />
                    )
                };


    return(
        <Router>
            <Switch>
            <Route 
            {...props}
            path='/'
            render={(props) => <Main />}
            exact
            />
            <AuthRoute
              {...props}
              path="/Dashboard"
              component={(props) => <Dashboard {...props} />}
              exact
              />
              </Switch>
        </Router>
    )
}
export default Routing;