import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const token = localStorage.getItem('userToken');
  
  const user = token ? jwtDecode(token) : null;
 
  return (
    <Route
      {...rest}
      render={(props) =>
        token && allowedRoles.includes(user.role) ? (
            
          <Component {...props} />
         
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
