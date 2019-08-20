import React from "react";
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {  LOAD_USER_POSTS_REQUEST } from "../reducers/post";
import PostCard from "../containers/PostCard";
import { Card, Avatar } from "antd";
import { LOAD_USER_REQUEST } from "../reducers/user";

const User = () => {
    const { mainPosts } = useSelector(state => state.post);
    const { userInfo } = useSelector(state => state.user);

    return (
        <div>
            {userInfo 
            ? (<Card
                actions={[
                    <div key="twit">
                        짹짹
                    </div>,
                    <div key="following">
                        팔로잉
                        <br />
                        {userInfo.Followings}
                    </div>,
                    <div key="follower">
                        팔로워
                        <br />
                        {userInfo.Followers}
                    </div>,
                ]}
            >
                <Card.Meta 
                    avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                    title={userInfo.nickname}
                />
            </Card>
            )
            : null}
            {mainPosts.map(c => (
                <PostCard key={c.id} post={c} />
            ))}
        </div>
    );
};

User.propTypes = {
    id: PropTypes.number.isRequired,
}

// getInitialprops => next에서 임의로 추가한 라이프 싸이클 componentdidmount보다 더 빨리 실행됨
// 서버사이드 렌더링 서버쪽 데이터를 미리 불러와서 렌더링해줄때 유용
// 서버쪽에서 페이지를 처음으로 불러올때 실행
// 프론트에서 페이지를 넘낟즐때 프론트에서 실행
User.getInitialProps = async (context) => {
    const id = parseInt(context.query.id, 10);
    context.store.dispatch({
        type: LOAD_USER_REQUEST,
        data: id
    });
    context.store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: id
    });
     return { id }
};

export default User;