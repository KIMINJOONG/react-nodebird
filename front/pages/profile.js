import React from "react";
import { Button, Input, Form, List, Card, Icon } from "antd";

const Profile = () => {
  return (
    <div>
      <Form
        style={{
          marginBottom: "20px",
          border: "1px solid #d9d9d9",
          padding: "20px"
        }}
      >
        <Input addonBefore="닉네임" />
        <Button type="primary">수정</Button>
      </Form>
      <List
        style={{ marginBottom: "20px" }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로잉 목록</div>}
        loadMore={<Button style={{ width: "100%" }}>더 보기</Button>}
        boardred
        dataSource={["제주주", "바보", "헬로"]}
        renderItem={item => (
          <List.Item style={{ marginTop: "20px" }}>
            <Card actions={[<Icon key="stop" type="stop" />]}>
              <Card.Meta description={item} />
            </Card>
          </List.Item>
        )}
      />
      <List
        style={{ marginBottom: "20px" }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로우 목록</div>}
        loadMore={<Button style={{ width: "100%" }}>더 보기</Button>}
        boardred
        dataSource={["제주주", "바보", "헬로"]}
        renderItem={item => (
          <List.Item style={{ marginTop: "20px" }}>
            <Card actions={[<Icon key="stop" type="stop" />]}>
              <Card.Meta description={item} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Profile;
