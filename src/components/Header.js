import React from "react";
import { Grid, Button, Text } from "../elements";
import { history } from "../redux/configureStore";
import '../shared/App.css';
import styled from 'styled-components';

import { useDispatch } from "react-redux"; // 리덕스 훅, 스토어에 있는 값을 가져와서 쓸 수 있게 해줌.
import { actionCreators as userActions } from "../redux/modules/user";

const Header = (props) => {
  const dispatch = useDispatch();
  // const is_login = useSelector((state) => state.user.is_login);
  const [is_login, setIsLogin] = React.useState(false);

  React.useEffect(() => {
    let cookie = document.cookie;

    if (cookie) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    // dispatch(userActions.getUserDB());
  }, []);

  if (is_login) {
    return (
      <React.Fragment>
        <Grid bg='black'>
          <Grid is_flex>
            <Img src="./img/랜선 떡볶이단ver2.png"/>
            <Grid margin_right>
              <Button
                width="100px"
                text="실시간 채팅"
                margin="1% 0% 1% 80%"
                _onClick={() => {
                  history.push('/chat')
                }}
              />
              <Button
                width="80px"
                text="로그아웃"
                margin="1%"
                _onClick={() => {
                  dispatch(userActions.logoutAction());
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Grid bg='black'>
        <Grid is_flex>
        <Img src="./img/랜선 떡볶이단ver2.png"/>
          <Grid margin_left>
            <Button
              width="80px"
              text="로그인"
              margin="3px"
              right
              _onClick={() => {
                history.push("/login");
              }}
            />
            <Button
              width="80px"
              text="회원가입"
              margin="3px"
              right
              _onClick={() => {
                history.push("/signup");
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {
  title: "랜선 떡볶이단",
  login_btn: "로그인",
  signup_btn: "회원가입",
};

const Img = styled.img`
  width: 20vh;
  padding: 10px;
  margin-left: 20px;
`
export default Header;
