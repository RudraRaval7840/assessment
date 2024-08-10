import {View, Text} from 'react-native';
import React from 'react';
import messaging from '@react-native-firebase/messaging';
const PushNotification = () => {
  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
    }
  };

  checkToken();
  return (
    <View>
      <Text>PushNotification</Text>
    </View>
  );
};

export default PushNotification;
