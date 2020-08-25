import { spawn } from 'redux-saga/effects'

// Sagas
import covid from './covidSaga'

export default function* rootSaga() {
  yield spawn(covid)
}
