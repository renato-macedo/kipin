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
import ItemState from './context/Items/ItemsState';
import AuthState from './context/auth/AuthState';
import AuthContext from './context/auth/AuthContext';
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
// const MainTabs = createMaterialBottomTabNavigator();
// function Main() {
//   return (
//     <MainTabs.Navigator
//       initialRouteName="Home"
//       barStyle={{backgroundColor: '#000'}}>
//       <MainTabs.Screen
//         options={{
//           tabBarIcon: () => <IconButton color="white" icon="home" size={15} />,
//         }}
//         name="Home"
//         component={Home}
//       />
//       <MainTabs.Screen
//         options={{
//           tabBarIcon: () => (
//             <IconButton color="white" icon="account" size={15} />
//           ),
//         }}
//         name="Info"
//         component={Info}
//       />
//     </MainTabs.Navigator>
//   );
// }
const AppStack = createStackNavigator();
function App() {
  const {isAuthenticated, loadUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  async function load() {
    setLoading(true);
    await loadUser();
    setLoading(false);
  }

  useEffect(() => {
    console.log('ok');
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
      <AuthState>
        <ItemState>
          <NavigationContainer>
            <App />
          </NavigationContainer>
        </ItemState>
      </AuthState>
    </PaperProvider>
  );
}
