import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
const PushNotification = () => {
  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('FCMTOKEN:-->> ', fcmToken);
    }
  };
  console.log(
    'permission:-->> ',
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );

  useEffect(() => {
    checkToken();
  }, []);

  checkToken();
  return (
    <View>
      <Text>PushNotification</Text>
    </View>
  );
};

export default PushNotification;
