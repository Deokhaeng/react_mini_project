import React from "react";
import { Grid, Text, Button } from "../elements/index";

const Header = (props) => {
  const { is_login } = props;

  if (is_login) {
    //로그인 했을때(is_login:true)
    return (
      <React.Fragment>
        <Grid>
          <Grid is_flex>
            <Text>랜선떡볶이단</Text>
            <Grid margin_left>
              <Button width="80px" text="로그아웃" margin="3px" />
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  //로그인 안했을때(is_login:false)
  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex>
          <Text>랜선떡볶이단</Text>
          <Grid margin_left>
            <Button width="80px" text="로그인" margin="3px" right />
            <Button width="80px" text="회원가입" margin="3px" right />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {
  is_login: false,
};

export default Header;
