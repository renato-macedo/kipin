import React, { useContext, Component, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';

export default function PrivateRoute({ component: Component, ...rest }: any) {
  const { isAuthenticated } = useContext(AuthContext);
  console.log('rota', { isAuthenticated });
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? <Redirect to="/login" /> : <Component {...rest} />
      }
    />
  );
}
