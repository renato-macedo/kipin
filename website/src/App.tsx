import React, { Fragment, useContext, useEffect } from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, createTheme } from 'baseui';

import AppState from './context/AppState';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import {
  Home,
  Dashboard,
  Login,
  Signup,
  NotFound,
  ResetPassword
} from './pages';

import Nav from './components/Nav';
import PrivateRoute from './components/PrivateRoute';
import theme from './theme';
import AppContext from './context/AppContext';

const CustomTheme = createTheme(theme);
CustomTheme;
const engine = new Styletron();

function App() {
  const { refreshToken, isAuthenticated, loading, loadUser } = useContext(
    AppContext
  );
  useEffect(() => {
    if (!isAuthenticated) {
      async function load() {
        await refreshToken();
        await loadUser();
      }
      load();
    }
  }, []);
  if (loading) {
    return <h3>Loading App...</h3>;
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/" component={Dashboard} /> */}
        <PrivateRoute exact path="/" component={Dashboard} />
        <Route exact path="/reset" component={ResetPassword} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default function AppWithProvider() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={CustomTheme}>
        <AppState>
          <App />
        </AppState>
      </BaseProvider>
    </StyletronProvider>
  );
}
