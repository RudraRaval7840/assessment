import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screen/NewOneDemo/SplashScreen/SplashScreen';
import LoginScreen from './src/screen/NewOneDemo/Loginscreen/LoginScreen';
import {Provider} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import {store} from './src/redux/Store/store';
import FireBaseStorage from './src/screen/NewOneDemo/Firebase storage/FireBaseStorage';
import SignUp from './src/screen/NewOneDemo/Loginscreen/SignUp';
import HomeScreen from './src/screen/NewOneDemo/Dashboard/HomeScreen';
import FavoritesList from './src/screen/NewOneDemo/Dashboard/FavoritesList';
import ChatScreen from './src/screen/NewOneDemo/Dashboard/ChatScreen';
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
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
          <stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <stack.Screen
            name="FavoritesList"
            component={FavoritesList}
            options={{headerShown: false}}
          />
          <stack.Screen
            name="FireBaseStorage"
            component={FireBaseStorage}
            options={{headerShown: false}}
          />
          <stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{headerShown: false}}
          />
        </stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
