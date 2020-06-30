/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core and will be removed in a future release']);

AppRegistry.registerComponent(appName, () => App);
