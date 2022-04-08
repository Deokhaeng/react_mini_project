import React from "react";
import { Grid, Button, Text } from "../elements";
import { history } from "../redux/configureStore";

import { useSelector, useDispatch } from "react-redux"; // 리덕스 훅, 스토어에 있는 값을 가져와서 쓸 수 있게 해줌.
import { actionCreators as userActions } from "../redux/modules/user";

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  if (is_login) {
    return (
      <React.Fragment>
        <Grid is_flex padding="0px 0px 0px 16px" bg="#212121">
          <Grid>
            <Text bold color="#ffffff" size="15px">
              {props.title}
            </Text>
          </Grid>
          <Grid is_flex bg="#616161">
            <Button
              text="로그아웃"
              _onClick={() => {
                dispatch(userActions.logOut());
              }}
            ></Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Grid is_flex padding="0px 0px 0px 16px" bg="#212121">
        <Grid>
          <Text bold color="#ffffff" size="15px">
            {props.title}
          </Text>
        </Grid>
        <Grid is_flex bg="#616161">
          <Button
            text="로그인"
            _onClick={() => {
              history.push("/login");
            }}
          ></Button>
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