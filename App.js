import React from 'react'

// React Native Component
import { View } from 'react-native'

// Components
import Counter from './src/components/Counter'

// Redux
import { Provider } from 'react-redux'
import store from './src/redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  )
}

export default App
