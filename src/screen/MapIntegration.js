import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
const MapIntegration = () => {
  return (
    <View>
      <Text>MapIntegration</Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 22.99988,
          longitude: 72.66061,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}></MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth: 1,
    margin: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default MapIntegration;
