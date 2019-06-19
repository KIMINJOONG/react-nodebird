import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_HASHTAG_POSTS_REQUEST } from "../reducers/post";
import PostCard from "../components/PostCard";

const Hashtag = ({ tag }) => {
    const dispatch = useDispatch();
    const { mainPosts } = useSelector(state => state.post);

    useEffect(() => {
        dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            data: tag
        });
    }, []);

    return (
        <div>
            {mainPosts.map(c => (
                <PostCard key={c.createdAt} post={c} />
            ))}
        </div>
    );
};

Hashtag.propTypes = {
    tag : PropTypes.string.isRequired
}

// getInitialprops => next에서 임의로 추가한 라이프 싸이클 componentdidmount보다 더 빨리 실행됨
// 서버사이드 렌더링 서버쪽 데이터를 미리 불러와서 렌더링해줄때 유용
Hashtag.getInitialProps = async (context) => {
     return { tag: context.query.tag };
};

export default Hashtag;