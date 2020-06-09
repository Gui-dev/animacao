import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './../screens/Home'
import Ball from './../screens/Ball'

const Routes = () => {

  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={ Home } />
        <Stack.Screen name="Ball" component={ Ball } />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes