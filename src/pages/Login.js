import React from "react";
import { Text, Input, Grid, Button } from "../elements";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";
import { history } from "../redux/configureStore";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user"; // as는 별명 붙이기

const Login = (props) => {
  const dispatch = useDispatch();
  console.log(getCookie("user_id"));
  const login = () => {
    dispatch(userActions.loginAction({ user_name: "deokhaeng" }));
  };
  console.log(document.cookie);

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "90vh",
        }}
      >
        <div
          style={{
            margin: "auto",
            minWidth: "50vh",
            minHeight: "50vh",
            backgroundColor: "#dddddd",
            display: "flex",
          }}
        >
          <div
            style={{
              margin: "auto",
              textAlign: "center",
            }}
          >
            <Grid padding="16px" center>
              <Text size="32px" bold>
                랜선 떡볶이단(logo)
              </Text>
              <Grid padding="16px 0px">
                <Input
                  placeholder="아이디를 입력해주세요."
                  _onChange={() => {
                    console.log("아이디 입력했어!");
                  }}
                />
              </Grid>
              <Grid padding="16px 0px">
                <Input
                  placeholder="패스워드 입력해주세요."
                  _onChange={() => {
                    console.log("패스워드 입력했어!");
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
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;