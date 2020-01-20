import React, { Fragment } from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, createTheme } from 'baseui';
import AuthState from './context/auth/AuthState';
import ItemState from './context/items/ItemState';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Nav from './components/Nav';
import PrivateRoute from './components/PrivateRoute';
import theme from './theme';

const CustomTheme = createTheme(theme);
CustomTheme;
const engine = new Styletron();

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        {/* <Route exact path="/dashboard" component={Dashboard} /> */}
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
