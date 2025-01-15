import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";

//整个注册表单组件
const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

//注册表单标题
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;

//注册表单提示信息
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //处理注册表单提交情况
  const validateInputs = () => {
    if (!name || !email || !password) {
      alert("请填写所有字段");
      return false;
    }
    return true;
  };

  const handelSignUp = async () => {
    //设置 loading 状态为 true，表示正在加载
    setLoading(true);
    //设置按钮禁用状态为 true，防止重复点击
    setButtonDisabled(true);
    //如果注册成功，则跳转到登录页面，弹出提示信息
    if (validateInputs()) {
      await UserSignUp({ name, email, password })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          alert("注册成功");
          setLoading(false);
          setButtonDisabled(false);
        })
        //如果注册失败，则弹出错误信息
        .catch((err) => {
          alert(err.response.data.message);
          setLoading(false);
          setButtonDisabled(false);
        });
    }
  };
  return (
    <Container>
      <div>
        <Title>欢迎注册新账号 👋</Title>
        <Span>请输入相关信息</Span>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        <TextInput
          label="全名"
          placeholder="请输入您的全名"
          value={name}
          handelChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="邮箱"
          placeholder="请输入您的邮箱"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="密码"
          placeholder="请输入您的密码"
          password
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        />
        <Button
          text="注册"
          onClick={handelSignUp}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

export default SignUp;
