import { put, call, takeLatest } from 'redux-saga/effects'

// Actions
import {
  SET_LOADING,
  FETCH_COVID,
  FETCH_COVID_REQUESTED,
  FETCH_COUNTRY,
  FETCH_COUNTRY_REQUESTED
} from '../actions/covidAction'

// Api
import { fetchAllCovid, fetchAllCountry } from '../api/covidApi'

// Get All Covids
function* getCovids({ payload }) {
  yield put({ type: SET_LOADING })

  const covids = yield call(fetchAllCovid, payload)
  console.log(covids)

  yield put({ type: FETCH_COVID, payload: covids })
}

// Get All Countries
function* getCountries() {
  yield put({ type: SET_LOADING })

  const countries = yield call(fetchAllCountry)

  yield put({ type: FETCH_COUNTRY, payload: countries })
}

export default function* covidSaga() {
  yield takeLatest(FETCH_COVID_REQUESTED, getCovids)
  yield takeLatest(FETCH_COUNTRY_REQUESTED, getCountries)
}
