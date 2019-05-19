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

function loginAPI() {
  //서버에 요청을 보내는부분
}

function* login() {
  try {
    // call 동기호출
    // fork 비동기호출
    yield call(loginAPI); // fork를 하면 서버에 응답이 오기전에 다음거로 넘어감
    yield put({
      //put은 dispatch와 동일
      type: LOG_IN_SUCCESS
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

function signUpAPI() {
  return axios.post("/login");
}

function* signUp() {
  try {
    // call 동기호출
    // fork 비동기호출
    yield call(signUpAPI); // fork를 하면 서버에 응답이 오기전에 다음거로 넘어감
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
