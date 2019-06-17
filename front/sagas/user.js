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
  SIGN_UP_FAILURE,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST
} from "../reducers/user";

import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3065/api';


function logInAPI(logInData) {
  //서버에 요청을 보내는부분
  return axios.post("/user/login", logInData, {
    withCredentials: true
  });
}

function* logIn(action) {
  try {
    // call 동기호출
    // fork 비동기호출
    const result = yield call(logInAPI, action.data); // fork를 하면 서버에 응답이 오기전에 다음거로 넘어감
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

function* watchLogIn() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
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

function logOutAPI() {
  return axios.post("/user/logout", {}, {
    withCredentials: true
  });
}

function* logOut(action) {
  try {
    // call 동기호출
    // fork 비동기호출
    yield call(logOutAPI); // fork를 하면 서버에 응답이 오기전에 다음거로 넘어감
    yield put({
      //put은 dispatch와 동일
      type: LOG_OUT_SUCCESS
    });
  } catch (e) {
    //loadingAPI 실패
    console.log(e);
    yield put({
      type: LOG_OUT_FAILURE,
      error: e
    });
  }
}

function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}

function loadUserAPI() {
  return axios.get("/user/", {
    withCredentials: true
  });
}

function* lodUser() {
  try {
    // call 동기호출
    // fork 비동기호출
    const result = yield call(loadUserAPI); // fork를 하면 서버에 응답이 오기전에 다음거로 넘어감
    yield put({
      //put은 dispatch와 동일
      type: LOAD_USER_SUCCESS,
      data: result.data
    });
  } catch (e) {
    //loadingAPI 실패
    console.log(e);
    yield put({
      type: LOAD_USER_FAILURE,
      error: e
    });
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, lodUser);
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
  yield all([fork(watchLogIn), fork(watchSignUp), fork(watchLogOut), fork(watchLoadUser)]);
}
