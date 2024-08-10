import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ApiCall from './src/screen/ApiCall';

const AppNavigater = () => {
    const stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <stack.Navigator>
            <stack.Screen name="ApiCall" component={ApiCall} />
        </stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigater