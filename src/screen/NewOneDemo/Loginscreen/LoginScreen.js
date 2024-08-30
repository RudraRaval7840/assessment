import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import {PermissionsAndroid} from 'react-native';
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  import messaging from '@react-native-firebase/messaging';
const LoginScreen = ({navigation}) => {

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('FCMTOKEN:-->> ',fcmToken);
    }
  };
  useEffect(()=>{
    checkToken();
  },[])

  // checkToken();

  const [email, setEmail] = useState('rudraraval5484@gmail.com');
  const [password, setPassword] = useState('123456');
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
        navigation.navigate('Dashboard');
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
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
});

export default LoginScreen;
