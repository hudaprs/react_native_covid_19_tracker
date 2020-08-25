import { put, call, takeLatest } from 'redux-saga/effects'

// Actions
import {
  SET_LOADING,
  FETCH_COVID,
  FETCH_COVID_REQUESTED
} from '../actions/covidAction'

// Api
import { fetchAllCovid } from '../api/covidApi'

// Get All Covids
function* getCovids() {
  yield put({ type: SET_LOADING })

  const covids = yield call(fetchAllCovid)

  yield put({ type: FETCH_COVID, payload: covids })
}

export default function* covidSaga() {
  yield takeLatest(FETCH_COVID_REQUESTED, getCovids)
}
