import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// Stack
const Stack = createStackNavigator()

// Component
import About from '../components/About'

const AboutStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='About' component={About} />
    </Stack.Navigator>
  )
}

export default AboutStackNavigation
