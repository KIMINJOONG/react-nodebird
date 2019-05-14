const dummyUser = {
  nickname: "김인중",
  Post: [],
  Followings: [],
  Followers: [],
  isLoggedIn: false,
  signUpData: {}
};

export const initialState = {
  isLoggedIn: false,
  user: null
};

export const SIGN_UP = "SGIN_UP";
export const LOG_IN = "LOG_IN"; // 액션의 이름
export const LOG_OUT = "LOG_OUT";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

// 동적인 데이터는 함수로 만들어줌 signup.js도 참고할것
export const signUpAction = data => {
  return {
    type: SIGN_UP,
    data: data
  };
};
export const loginAction = {
  type: LOG_IN
};

export const logoutAction = {
  type: LOG_OUT
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        isLoggedIn: true,
        user: dummyUser
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    }
    case SIGN_UP: {
      return {
        ...state,
        signUpData: action.data
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default reducer;
