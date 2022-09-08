import React, { Component } from "react";
import {Link, Route} from 'react-router-dom'

export const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route
        {...rest}
        render = {props =>
            localStorage.getItem("authToken") ? (
                <Component {...props}/>
            ) : (
                <Link
                    to= {{
                        pathname: "/login",
                        state: {from:props.location}
                    }}
                />
            )
        }
        />
)