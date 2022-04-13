import React from "react";
import { Grid, Button, Text } from "../elements";
import { history } from "../redux/configureStore";

import { useSelector, useDispatch } from "react-redux"; // 리덕스 훅, 스토어에 있는 값을 가져와서 쓸 수 있게 해줌.
import { actionCreators as userActions } from "../redux/modules/user";
import { deleteCookie } from "../shared/Cookie";

const Header = (props) => {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);

  if (is_login) {
    return (
      <React.Fragment>
        <Grid>
          <Grid is_flex>
            <Text>랜선떡볶이단</Text>
            <Grid margin_left>
              <Button
                width="80px"
                text="로그아웃"
                margin="3px"
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
      <Grid>
        <Grid is_flex>
          <Text>랜선떡볶이단</Text>
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

export default Header;
