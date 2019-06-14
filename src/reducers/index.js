// import the actions we defined
import { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE } from '../actions/actionTypes'

// define an initial state

const initialState = {
  fetching: false,
  txt: "Facts About Numbers",
  error: null,
  num:0
};

// the reducer
export function reducer(state = initialState, action) {
  switch (action.type) {
      case API_CALL_REQUEST:
          return { ...state, fetching: true, error: null,number:action.num};
      case API_CALL_SUCCESS:
          return { ...state, fetching: false, txt: action.txt};
      case API_CALL_FAILURE:
          return { ...state, fetching: false, txt: null, error: action.error};
      default:
          return state;
  }
}