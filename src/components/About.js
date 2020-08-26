import React from 'react'

// React Native
import { View, Text, StyleSheet } from 'react-native'

const About = () => {
  return (
    <View style={styles.container}>
      <Text>
        This application what developed by Huda Prasetyo, using React Native and
        Redux.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f4f4f4'
  }
})

export default About
