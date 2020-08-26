import 'react-native-gesture-handler'
import React from 'react'

// Navigations
import RootStackNavigation from './src/navigations/RootStackNavigation'

// Redux
import { Provider } from 'react-redux'
import store from './src/redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <RootStackNavigation />
    </Provider>
  )
}

export default App
