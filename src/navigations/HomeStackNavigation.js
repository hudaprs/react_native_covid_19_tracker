import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// Stack
const Stack = createStackNavigator()

// Component
import Counter from '../components/Counter'

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='covid' component={Counter} />
    </Stack.Navigator>
  )
}

export default HomeStackNavigation
