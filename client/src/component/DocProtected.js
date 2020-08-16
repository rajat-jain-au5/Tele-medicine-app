import React from "react";
import { Route, Redirect } from "react-router-dom";

const DocProtected = ({ component: Cmp, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("doctorAuth" )? <Cmp {...props} /> : (<Redirect to="/home" />) 
    }
  />
);

export default DocProtected
