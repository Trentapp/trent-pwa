import React from "react";
import {Redirect, Route} from "react-router-dom";

function LoggedOutRoute({component: Component, ...rest}) {
    return(
        <Route
            {...rest}
            render={props => {return !(rest.user._id) ? <Component {...props} {...rest}/> : <Redirect to="/" />}}
        />
    )
}

export default LoggedOutRoute;
