import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('LoginScreen');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
      });
  };

  // ===========Google ========
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
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          margin: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View>
          <Text style={{fontSize: 24, marginBottom: 20, color: 'black'}}>
            Create Your Account
          </Text>
        </View>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={{
            borderWidth: 1,
            width: '80%',
            marginBottom: 20,
            borderRadius: 10,
          }}
          placeholder="email"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={{
            borderWidth: 1,
            width: '80%',
            borderRadius: 10,
          }}
          placeholder="password"
          secureTextEntry={true}
        />
        <View style={{width: '100%', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              marginTop: 20,
              width: '80%',
              borderWidth: 1,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center ',
              borderRadius: 10,
              backgroundColor: 'skyblue',
            }}
            onPress={() => handleSignUp()}>
            <Text style={{fontSize: 20}}>SignUp</Text>
          </TouchableOpacity>
          {/* npm i @react-native-google-signin/google-signin@10.1.2 */}
        </View>
        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <Text style={{fontSize: 20}}>Already have an account </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={{fontSize: 20, color: 'blue'}}>Login</Text>
          </TouchableOpacity>
        </View>
   
      </View>
    </View>
  );
};

export default SignUp;
