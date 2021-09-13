import React from "react";
import {Route} from "react-router-dom";

import Login from "./login.js";

function PrivateRoute({component: Component, ...rest}) {
    return(
        <Route
            {...rest}
            render={props => {return rest.user?._id ? <Component {...props} {...rest}/> : <Login />}}
        />
    )
}

export default PrivateRoute;
