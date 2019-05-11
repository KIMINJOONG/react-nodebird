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
  ],
  imagePaths: []
};

export const ADD_POST = "ADD_POST";
export const ADD_DUMMY = "ADD_DUMMY";

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
