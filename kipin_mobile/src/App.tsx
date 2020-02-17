import React, {useContext, useEffect, useState} from 'react';
import {
  DefaultTheme,
  Provider as PaperProvider,
  ActivityIndicator,
  // IconButton,
} from 'react-native-paper';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
// import Info from './Info';

import AppState from './context/AppState';
import AppContext from './context/AppContext';

import {View} from 'react-native';

// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Header from './components/Header';

const AuthStack = createStackNavigator();
function Auth() {
  return (
    <AuthStack.Navigator
      mode="modal"
      initialRouteName="Login"
      headerMode="none">
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={Signup} />
    </AuthStack.Navigator>
  );
}

const Main = () => (
  <View>
    <Header />
    <Home />
  </View>
);

const AppStack = createStackNavigator();
function App() {
  const {isAuthenticated, loadUser} = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  async function load() {
    setLoading(true);
    await loadUser();
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AppStack.Navigator headerMode="none">
      {loading ? (
        // We haven't finished checking for the token yet
        <AppStack.Screen
          name="Loading"
          component={() => <ActivityIndicator />}
        />
      ) : isAuthenticated ? (
        <AppStack.Screen name="Main" component={Main} />
      ) : (
        <AppStack.Screen name="Auth" component={Auth} />
      )}
    </AppStack.Navigator>
  );
}
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000',
    accent: '#fff',
  },
};

export default function AppWithProvider() {
  return (
    <PaperProvider theme={theme}>
      <AppState>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </AppState>
    </PaperProvider>
  );
}
