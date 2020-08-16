import React from "react";
import { Route, Redirect } from "react-router-dom";

const PatProtected = ({ component: Cmp, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("patientAuth" )? <Cmp {...props} /> : (<Redirect to="/" />) 
    }
  />
);

export default PatProtected
