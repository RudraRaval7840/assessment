import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {launchCamera} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
const FireBaseStorage = () => {
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
    await reference.putFile(pathToFile);
  };
  console.log('-->>', image);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {image !== null ? (
        <Image source={{uri: image}} style={{height: 200, width: 200}} />
      ) : null}
      <TouchableOpacity
        style={{borderWidth: 1, padding: 20, borderRadius: 10}}
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
  );
};

export default FireBaseStorage;
