/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

messaging().getInitialNotification(async remoteMessage => {
  console.log('Notification caused app to open from state:', remoteMessage);
});
AppRegistry.registerComponent(appName, () => App);

{
  /* <stack.Screen
          name="ApiCall"
          component={ApiCall}
          options={{headerShown: false}}
          /> */
}
{
  /* <stack.Screen
          name="MapIntegration"
          component={MapIntegration}
          options={{headerShown: false}}
          /> */
}
{
  /* <stack.Screen
          name="GoogleLogin"
          component={GoogleLogin}
          options={{headerShown: false}}
          /> */
}
{
  /* <stack.Screen
          name="PushNotification"
          component={PushNotification}
          options={{headerShown: false}}
          /> */
}