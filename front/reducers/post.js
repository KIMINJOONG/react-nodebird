export const initialState = {
  mainPosts: [
    {
      User: {
        id: 1,
        nickname: "제주주"
      },
      content: "첫번째 게시물",
      img:
        "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726"
    }
  ], // 화면에 보일 포스트들
  imagePaths: [], //미리보기 이미지 경로
  addPostErrorReason: false, // 포스트 업로드 실패 사유
  isAddingPost: false // 포스트 업로드 중
};

export const LOAD_MAIN_POST_REQUEST = "LOAD_MAIN_POST_REQUEST";
export const LOAD_MAIN_POST_SUCCESS = "LOAD_MAIN_POST_SUCCESS";
export const LOAD_MAIN_POST_FAILURE = "LOAD_MAIN_POST_FAILURE";

export const LOAD_HASHTAG_POST_REQUEST = "LOAD_HASHTAG_POST_REQUEST";
export const LOAD_HASHTAG_POST_SUCCESS = "LOAD_HASHTAG_POST_SUCCESS";
export const LOAD_HASHTAG_POST_FAILURE = "LOAD_HASHTAG_POST_FAILURE";

export const LOAD_USER_POSTS_REQUEST = "LOAD_USER_POSTS_REQUEST";
export const LOAD_USER_POSTS_SUCCESS = "LOAD_USER_POSTS_SUCCESS";
export const LOAD_USER_POSTS_FAILURE = "LOAD_USER_POSTS_FAILURE";

export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST";
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";

export const REMOVE_IMAGE = "REMOVE_IMAGE";

export const LIKE_POST_REQUSET = "LIKE_POST_REQUSET";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const UNLIKE_POST_REQUSET = "UNLIKE_POST_REQUSET";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

export const ADD_COMMNET_REQUEST = "ADD_COMMNET_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const LOAD_COMMENTS_REQUEST = "LOAD_COMMENTS_REQUEST";
export const LOAD_COMMENTS_SUCCESS = "LOAD_COMMENTS_SUCCESS";
export const LOAD_COMMENTS_FAILURE = "LOAD_COMMENTS_FAILURE";

export const RETWEET_REQUEST = "RETWEET_REQUEST";
export const RETWEET_SUCCESS = "RETWEET_SUCCESS";
export const RETEWWT_FAILURE = "RETEWWT_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

const addPost = {
  type: ADD_POST
};

const addDummy = {
  type: ADD_DUMMY,
  data: {
    content: "hello",
    userId: "1",
    User: {
      nickname: "인중초"
    }
  }
};

const reducer = (state = initialState, action) => {
  switch (action) {
    case ADD_POST: {
      return {
        ...state
      };
    }
    case ADD_DUMMY: {
      return {
        ...state,
        mainPosts: [action.data, ...state.mainPosts]
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
