import React, { useState, useCallback, useEffect } from "react";
import { Form, Input, Checkbox, Button } from "antd";
import { signUpAction } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
// 보통은 이런형식으로 react state와 redux state를 같이사용함
import Router from "next/router";
const Signup = () => {
  const [passwordCheck, setPasswordCheck] = useState("");
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);
  // 커스텀 훅 사용법
  const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback(e => {
      setter(e.target.value);
    }, []);
    return [value, handler];
  };

  const [id, onChangeId] = useInput("");
  const [nick, onChangeNick] = useInput("");
  const [password, onChangePassword] = useInput("");
  const dispatch = useDispatch();
  const { isSigningUp, me } = useSelector(state => state.user);

  useEffect(() => {
    if (me) {
      alert("로그인했으니 메인페이지로 이동합니다.");
      Router.push("/");
    }
  }, [me && me.id]);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      if (!term) {
        return setTermError(true);
      }
      dispatch(
        signUpAction({
          userId: id,
          password,
          nickname: nick
        })
      );
    },
    [password, passwordCheck, term]
  );
  const onChangePasswordChk = useCallback(
    e => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password]
  );

  const onChangeTerm = useCallback(e => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  if(me) {
    return null;
  }

  return (
    <>
      <Form onSubmit={onSubmit} style={{ padding: 10 }}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input name="user-id" value={id} required onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="user-id">닉네임</label>
          <br />
          <Input
            name="user-nick"
            value={nick}
            required
            onChange={onChangeNick}
          />
        </div>
        <div>
          <label htmlFor="user-id">비밀번호</label>
          <br />
          <Input
            name="user-pass"
            value={password}
            type="password"
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-id">비밀번호체크</label>
          <br />
          <Input
            name="user-password-chk"
            value={passwordCheck}
            type="password"
            required
            onChange={onChangePasswordChk}
          />
          {passwordError && (
            <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
          )}
          <div>
            <Checkbox name="user-term" value={term} onChange={onChangeTerm}>
              말을 잘 들을것을 동의합니다.
            </Checkbox>
            {termError && (
              <div style={{ color: "red" }}>약관에 동의하셔야합니다</div>
            )}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="submit" loading={isSigningUp}>
              가입하기
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default Signup;
