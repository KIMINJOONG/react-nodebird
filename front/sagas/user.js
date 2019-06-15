import {
  all,
  fork,
  takeLatest,
  takeEvery,
  call,
  put,
  take,
  delay
} from "redux-saga/effects";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from "../reducers/user";

import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3065/api';


function loginAPI(loginData) {
  //서버에 요청을 보내는부분
  return axios.post("/user/login", loginData, {
    withCredentials: true
  });
}

function* login(action) {
  try {
    // call 동기호출
    // fork 비동기호출
    const result = yield call(loginAPI, action.data); // fork를 하면 서버에 응답이 오기전에 다음거로 넘어감
    yield put({
      //put은 dispatch와 동일
      type: LOG_IN_SUCCESS,
      data: result.data
    });
  } catch (e) {
    //loadingAPI 실패
    console.log(e);
    yield put({
      type: LOG_IN_FAILURE,
      error: e
    });
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}

function signUpAPI(signUpData) {
  return axios.post("/user/", signUpData);
}

function* signUp(action) {
  try {
    // call 동기호출
    // fork 비동기호출
    yield call(signUpAPI, action.data); // fork를 하면 서버에 응답이 오기전에 다음거로 넘어감
    yield put({
      //put은 dispatch와 동일
      type: SIGN_UP_SUCCESS
    });
  } catch (e) {
    //loadingAPI 실패
    console.log(e);
    yield put({
      type: SIGN_UP_FAILURE
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

//function* watchHello() {
//  yield takeLatest(HELLO_SAGA, hello);
//}

//function* hello() {
//  yield delay(1000);
//  yield put({
//    type: "BYE_SAGA"
//  });
//}

//function* watchHello() {
//  while (true) {
//    yield take(HELLO_SAGA);
//    console.log(1);
//    console.log(2);
//    console.log(3);
//    console.log(4);
//  }
// }

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchSignUp)]);
}
