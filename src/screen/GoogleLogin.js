import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const GoogleLogin = () => {
  const signIn = async () => {
    GoogleSignin.configure({
      scopes: [],
      webClientId: '<FROM DEVELOPER FIREBASE CONSOLE>',
      offlineAccess: true,
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userinfo', userInfo);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => signIn()}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          //   borderWidth: 1,
          padding: 10,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        }}>
        <Image
          source={require('../assets/google.png')}
          style={{height: 25, width: 25}}
        />
        <Text style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>
          Login with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleLogin;
