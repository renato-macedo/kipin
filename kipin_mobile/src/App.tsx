import React, {useContext, useEffect} from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './Login';
import Signup from './Signup';
import Main from './Main';
import ItemState from './context/Items/ItemsState';
import AuthState from './context/auth/AuthState';
import AuthContext from './context/auth/AuthContext';
import {Text} from 'react-native';

const Auth = createStackNavigator(
  {
    Login,
    Signup,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const Switch = createSwitchNavigator(
  {
    Auth,
    Main,
  },
  {
    initialRouteName: 'Auth',
  },
);

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000',
    accent: '#fff',
  },
};

const App = createAppContainer(Switch);

function Router() {
  const {loadUser, isAuthenticated, loading} = useContext(AuthContext);

  async function load() {
    console.log({isAuthenticated});
    await loadUser();
  }

  useEffect(() => {
    console.log('ok');
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Text> Loading</Text>;
  }
  if (isAuthenticated) {
    return <Main />;
  }
  return <App />;
}

export default function AppWithProvider() {
  return (
    <PaperProvider theme={theme}>
      <AuthState>
        <ItemState>
          <Router />
        </ItemState>
      </AuthState>
    </PaperProvider>
  );
}
