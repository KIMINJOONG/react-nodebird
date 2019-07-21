import React, { useEffect, useCallback, useRef } from "react";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_MAIN_POSTS_REQUEST } from "../reducers/post";

const Home = () => {
  const { me } = useSelector(state => state.user);
  const { mainPosts, hasMorePost } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const countRef = useRef([]);

  const onScroll = useCallback(() => {
    if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      if(hasMorePost){
        const lastId = mainPosts[mainPosts.length - 1].id;
        if(!countRef.current.includes(lastId)) {
          dispatch({
            type: LOAD_MAIN_POSTS_REQUEST,
            lastId
          });
          countRef.current.push(lastId);
        }
      }
    }  
  }, [hasMorePost,mainPosts.length]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length]);

  return (
    <div>
      {me && <PostForm />}
      {mainPosts.map((c, index) => {
        return <PostCard key={index} post={c} />;
      })}
    </div>
  );
};

// _app.js설정이후 서버사이드렌더링으로 디스패치 불러오는부분
// getInitialprops => next에서 임의로 추가한 라이프 싸이클 componentdidmount보다 더 빨리 실행됨
// 서버사이드 렌더링 서버쪽 데이터를 미리 불러와서 렌더링해줄때 유용
// 서버쪽에서 페이지를 처음으로 불러올때 실행
// 프론트에서 페이지를 넘낟즐때 프론트에서 실행
Home.getInitialProps = async(context) => {
  console.log(Object.keys(context));
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  })
};

export default Home;
