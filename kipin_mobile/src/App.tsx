import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './Login';
import Signup from './Signup';
import Main from './Main';
const Auth = createStackNavigator(
  {
    Login,
    Signup,
  },
  {
    initialRouteName: 'Login',
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

export default createAppContainer(Switch);
