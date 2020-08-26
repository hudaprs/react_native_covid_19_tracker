import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

// Drawer
const Drawer = createDrawerNavigator()

// Screens
import HomeStackNavigation from './HomeStackNavigation'
import AboutStackNavigation from './AboutStackNavigation'

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Home' component={HomeStackNavigation} />
      <Drawer.Screen name='About' component={AboutStackNavigation} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigation
