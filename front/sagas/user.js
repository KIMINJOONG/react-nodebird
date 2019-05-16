import { all, fork, takeLatest, call, put, take } from "redux-saga/effects";
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from "../reducers/user";

const HELLO_SAGA = "HELLO_SAGA";

function loginAPI() {
  //서버에 요청을 보내는부분
}

function* login() {
  try {
    yield call(loginAPI);
    yield put({
      //put은 dispatch와 동일
      type: LOG_IN_SUCCESS
    });
  } catch (e) {
    //loadingAPI 실패
    console.log(e);
    yield put({
      type: LOG_IN_FAILURE
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN, login);
}

function* helloSaga() {
  console.log("before saga");
  // while -> eventListner를 동기적으로 표현했다고 이해하기
  while (true) {
    yield take(HELLO_SAGA);
    console.log("hello saga");
    // 비동기 요청, 타이머 넣어도 가능
  }
}

export default function* userSaga() {
  yield helloSaga();
}
