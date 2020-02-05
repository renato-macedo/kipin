import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './Login';
import Signup from './Signup';
import Main from './Main';
import ItemState from './context/Items/ItemsState';
import AuthState from './context/auth/AuthState';

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
// const AppNavigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Details: Details,
//   },
//   {
//     initialRouteName: 'Home',
//   },
// );

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
export default function AppWithProvider() {
  return (
    <PaperProvider theme={theme}>
      <AuthState>
        <ItemState>
          <App />
        </ItemState>
      </AuthState>
    </PaperProvider>
  );
}
