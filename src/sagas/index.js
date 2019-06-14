// import saga
import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchTxt(num) {
  
  return axios({
    method: "get",
    url: `https://numbers-api-proxy.dci-fbw121.now.sh/?number=${num}`
  });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga(action) {
  console.log(action.number)
  try {
  
    const response = yield call(fetchTxt,action.number);
    console.log(response.data);
    const txt = response.data;

    // dispatch a success action to the store with the new txt
    yield put({ type: "API_CALL_SUCCESS", txt });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "API_CALL_FAILURE", error });
  }
}
