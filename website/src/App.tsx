import React, { Fragment, useContext, useEffect } from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, createTheme } from 'baseui';
import AuthState from './context/auth/AuthState';
import ItemState from './context/items/ItemState';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';

import { Home, Dashboard, Login, Signup, NotFound } from './pages';

import Nav from './components/Nav';
import PrivateRoute from './components/PrivateRoute';
import theme from './theme';
import AuthContext from './context/auth/AuthContext';

const CustomTheme = createTheme(theme);
CustomTheme;
const engine = new Styletron();

function App() {
  const { refreshToken, isAuthenticated, loading } = useContext(AuthContext);
  useEffect(() => {
    if (!isAuthenticated) {
      async function espera() {
        await refreshToken();
      }
      espera();
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

        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default function AppWithProvider() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={CustomTheme}>
        <AuthState>
          <ItemState>
            <App />
          </ItemState>
        </AuthState>
      </BaseProvider>
    </StyletronProvider>
  );
}
