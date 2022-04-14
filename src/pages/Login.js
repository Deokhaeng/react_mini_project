import React from "react";

//Elements
import { Text, Input, Grid, Button } from "../elements";

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
                  _onChange={(event) => {
                    setUserInfo({ ...userInfo, id: event.target.value });
                  }}
                />
              </Grid>
              <Grid padding="16px 0px">
                <Input
                  type='password'
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
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
