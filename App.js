import {View, Text} from 'react-native';
import React from 'react';
import AppNavigater from './AppNavigater';
import ApiCall from './src/screen/ApiCall';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapIntegration from './src/screen/MapIntegration';
import GoogleLogin from './src/screen/GoogleLogin';
import PushNotification from './src/screen/PushNotification';
const App = () => {
  const stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <stack.Navigator>
        {/* data fatch with APi */}
        {/* <stack.Screen
          name="ApiCall"
          component={ApiCall}
          options={{headerShown: false}}
        /> */}

        {/* Google Map Integration */}
        {/* <stack.Screen
          name="MapIntegration"
          component={MapIntegration}
          options={{headerShown: false}}
        /> */}
        {/* GoogleLogin */}
        {/* <stack.Screen
          name="GoogleLogin"
          component={GoogleLogin}
          options={{headerShown: false}}
        /> */}
        <stack.Screen
          name="PushNotification"
          component={PushNotification}
          options={{headerShown: false}}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
