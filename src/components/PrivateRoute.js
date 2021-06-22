import React from "react";
import {Redirect, Route} from "react-router-dom";

function PrivateRoute({component: Component, ...rest}) {
    return(
        <Route
            {...rest}
            render={props => {return rest.user ? <Component {...props} {...rest}/> : <Redirect to="/login" />}}
        />
    )
}

export default PrivateRoute;
