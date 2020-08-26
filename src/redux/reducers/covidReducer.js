import { SET_LOADING, FETCH_COVID, FETCH_COUNTRY } from '../actions/covidAction'

const initialState = {
  loading: false,
  covids: [],
  countries: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case FETCH_COVID:
      return {
        ...state,
        covids: payload,
        loading: false
      }
    case FETCH_COUNTRY:
      return {
        ...state,
        countries: payload,
        loading: false
      }
    default:
      return state
  }
}
