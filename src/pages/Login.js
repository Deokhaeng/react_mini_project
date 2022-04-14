import React from "react";
import styled from "styled-components";

//Elements
import {Input, Grid, Button } from "../elements";
import {Box} from '../elements'

//REDUX-ACTION & REACT-HOOK
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user"; // as는 별명 붙이기
import { history } from "../redux/configureStore";

const Login = (props) => {
  const dispatch = useDispatch();

  const login = () => {
    if (!(userInfo.id && userInfo.password)) return;
    dispatch(userActions.loginAction(userInfo));
  };

  const [userInfo, setUserInfo] = React.useState({ id: "", password: "" });

  return (
    <>
    <Box margin='100px auto' >
      <Grid padding="20px" center>
        <Img src="./img/랜선 떡볶이단 bk.png"/>
        <Grid padding="16px 0px">
          <Input
            placeholder="아이디를 입력해주세요."
            _onChange={(event) => {
              setUserInfo({ ...userInfo, id: event.target.value });
            }}
          />
        </Grid>
        <Grid padding="16px 0px">
          <Input
            type="password"
            placeholder="패스워드 입력해주세요."
            _onChange={(event) => {
              setUserInfo({ ...userInfo, password: event.target.value });
            }}
          />
        </Grid>
        <Button
          text="로그인"
          _onClick={() => {
            console.log("로그인 했어!");
            login();
          }}
        ></Button>
        <Button
          text="회원가입"
          margin="4px 0px"
          _onClick={() => {
            history.push("/signup");
          }}
        ></Button>
      </Grid>
    </Box>
      
    </>
  );
};

const Img = styled.img`
  width: 20vh;
  padding: 10px;
  margin: auto 90px;
`
export default Login;
