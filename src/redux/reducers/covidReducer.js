import { SET_LOADING, FETCH_COVID } from '../actions/covidAction'

const initialState = {
  loading: false,
  covids: []
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
    default:
      return state
  }
}
