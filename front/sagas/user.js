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
  while (true) {
    yield take(LOG_IN);
    // put => saga의 dispatch임
    yield delay(2000);
    yield put({
      type: LOG_IN_SUCCESS
    });
  }
}

function* watchHello() {
  yield takeLatest(HELLO_SAGA, function*() {
    yield delay(1000);
    yield put({
      type: "BYE_SAGA"
    });
  });
}

//function* watchHello() {
//  while (true) {
//    yield take(HELLO_SAGA);
//    console.log(1);
//    console.log(2);
//    console.log(3);
//    console.log(4);
//  }
// }

function* watchSignUp() {}

export default function* userSaga() {
  yield all([watchHello(), watchLogin(), watchSignUp()]);
}
