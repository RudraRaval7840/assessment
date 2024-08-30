import {View, Text} from 'react-native';
import React, { useEffect } from 'react';
import AppNavigater from './AppNavigater';
import ApiCall from './src/screen/ApiCall';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapIntegration from './src/screen/MapIntegration';
import GoogleLogin from './src/screen/GoogleLogin';
import PushNotification from './src/screen/PushNotification';
import SplashScreen from './src/screen/NewOneDemo/SplashScreen/SplashScreen';
import LoginScreen from './src/screen/NewOneDemo/Loginscreen/LoginScreen';
import Dashboard from './src/screen/NewOneDemo/Dashboard/Dashboard';
import FavoritesList from './src/screen/NewOneDemo/Dashboard/Favorites';
import {Provider} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import { store } from './src/redux/Store/store';
import FireBaseStorage from './src/screen/NewOneDemo/Firebase storage/FireBaseStorage';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

const App = () => {
//   const checkToken = async () => {
//     const fcmToken = await messaging().getToken();
//     if (fcmToken) {
//       console.log('FCMTOKEN:-->> ',fcmToken);
//     }
//   };
  
//   useEffect(()=>{
//     checkToken();
//   },[])

// checkToken();
  const stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <stack.Navigator>
         
          <stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{headerShown: false}}
          />
          <stack.Screen
            name="FavoritesList"
            component={FavoritesList}
            options={{headerShown: false}}
          />
                {/* <stack.Screen
          name="PushNotification"
          component={PushNotification}
          options={{headerShown: false}}
          /> */}
          <stack.Screen
          name="FireBaseStorage"
          component={FireBaseStorage}
          options={{headerShown: false}}
          />
        </stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
