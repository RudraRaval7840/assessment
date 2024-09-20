import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {PermissionsAndroid} from 'react-native';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
import messaging from '@react-native-firebase/messaging';
import { CommonActions } from '@react-navigation/native';
const LoginScreen = ({navigation}) => {
  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('FCMTOKEN:-->> ', fcmToken);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        'A new FCM message arrived!',
        JSON.stringify(remoteMessage.notification.title),
      );
    });

    return unsubscribe;
  });
  // checkToken();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!email) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
      valid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleLogin = async () => {
    if (validate()) {
      try {
        await auth().signInWithEmailAndPassword(email, password);
        Alert.alert('Login Success', 'You are now logged in!');
        // navigation.navigate('HomeScreen');
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'HomeScreen' },
             
            ],
          })
        );
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Error', 'No user found with this email.');
        } else if (error.code === 'auth/wrong-password') {
          Alert.alert('Error', 'Incorrect password.');
        } else {
          Alert.alert('Error', error.message);
        }
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          margin: 20,
          // borderWidth: 1,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 25, color: 'black'}}>Login Screen</Text>

        <TextInput
          style={{
            width: '80%',
            borderWidth: 1,
            marginVertical: 10,
            borderRadius: 10,
          }}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        {errors.email && <Text style={{color: 'red'}}>{errors.email}</Text>}

        <TextInput
          style={{
            width: '80%',
            borderWidth: 1,
            marginVertical: 10,
            borderRadius: 10,
          }}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        {errors.password && (
          <Text style={{color: 'red'}}>{errors.password}</Text>
        )}

        <TouchableOpacity
          onPress={() => {
            handleLogin();
          }}
          style={{
            borderWidth: 1,
            width: '80%',
            padding: 8,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'skyblue',
            borderRadius: 10,
          }}>
          <Text style={{fontSize: 20}}>Login</Text>
        </TouchableOpacity>

        {/* <Button title="Login" onPress={handleLogin} /> */}

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text style={{fontSize: 18}}>I don't have an account </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{fontSize: 18, color: 'blue'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;
