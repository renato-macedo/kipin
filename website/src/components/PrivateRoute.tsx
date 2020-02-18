import React, { useContext, Component, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AppContext from '../context/AppContext';

export default function PrivateRoute({ component: Component, ...rest }: any) {
  const { isAuthenticated } = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? <Redirect to="/login" /> : <Component {...rest} />
      }
    />
  );
}
