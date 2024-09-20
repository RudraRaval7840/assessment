import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import {launchCamera} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
const FireBaseStorage = ({navigation}) => {
  const [image, setImage] = useState(null);
  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    setImage(result.assets[0].uri);
    console.log(result);
  };
  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'FireBase Storage Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        openCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const uploadImage = async () => {
    const reference = storage().ref(image);
    const pathToFile = image;
    await reference.putFile(pathToFile).then(() => {
      console.log('Image uploaded successfully');
      Alert.alert('Image', 'Image Upload successfully');
      setImage(null);
    });
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          flexDirection: 'row',
        }}>
        <Text style={{fontSize: 25, color: 'black'}}>FireBase</Text>
        <TouchableOpacity
          style={{position: 'absolute', right: 10}}
          onPress={() => navigation.navigate('ChatScreen')}>
          <AntDesign name="message1" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={{fontSize: 20, paddingLeft: 10}}>
        upload Image on FireBase CloudStore
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
        }}>
        {image !== null ? (
          <Image
            source={{uri: image}}
            style={{height: 200, width: 200, margin: 10, borderRadius: 10}}
          />
        ) : null}
        <View style={{width: '80%'}}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              padding: 20,
              borderRadius: 10,
              marginBottom: 10,
            }}
            onPress={() => openCamera()}>
            <Text>openCamera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{borderWidth: 1, padding: 20, borderRadius: 10}}
            onPress={() => {
              uploadImage();
            }}>
            <Text>Upload image</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FireBaseStorage;
