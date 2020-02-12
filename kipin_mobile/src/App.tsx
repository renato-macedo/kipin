import React, {useContext, useEffect} from 'react';
import {
  DefaultTheme,
  Provider as PaperProvider,
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
import {Text} from 'react-native';

// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Header from './components/Header';

const AuthStack = createStackNavigator();
function Auth() {
  return (
    <AuthStack.Navigator initialRouteName="Login" headerMode="none">
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={Signup} />
    </AuthStack.Navigator>
  );
}

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
  const {loading, isAuthenticated, loadUser} = useContext(AuthContext);

  async function load() {
    console.log({isAuthenticated});
    const success = await loadUser();
    console.log({success});
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
          component={() => <Text>Loading ...</Text>}
        />
      ) : isAuthenticated ? (
        <AppStack.Screen name="Main" component={Home} />
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
            <Header />
            <App />
          </NavigationContainer>
        </ItemState>
      </AuthState>
    </PaperProvider>
  );
}
