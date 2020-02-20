/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';

import {name as appName} from './app.json';
console.log({appName});
AppRegistry.registerComponent(appName, () => App);
