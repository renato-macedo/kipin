import React, { Fragment } from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider, styled } from 'baseui';
import AuthState from './context/auth/AuthState';
import ItemState from './context/items/ItemState';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
const engine = new Styletron();

function App() {
  return (
    <Router>
      <Fragment>
        <Nav />
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default function AppWithProvider() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <AuthState>
          <ItemState>
            <App />
          </ItemState>
        </AuthState>
      </BaseProvider>
    </StyletronProvider>
  );
}
