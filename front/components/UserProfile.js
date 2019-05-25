import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../reducers/user";

const UserProfile = () => {
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(logoutAction);
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />
          {me.Post.length}
        </div>,
        <div key="following">
          팔로잉
          <br />
          {me.Followings.length}
        </div>,
        <div key="follow">
          팔로워
          <br />
          {me.Followers.length}
        </div>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
