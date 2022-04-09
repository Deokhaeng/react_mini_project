import React from "react";
import { Grid, Button, Image } from "../elements/index";
import Logo from '../shared/logo.png';

const Header = (props) => {
  const { is_login } = props;

  if (is_login) {
    //로그인 했을때(is_login:true)

    return (
      <React.Fragment>
        <Grid is_flex fixed>
          <Grid>
            <Image src={Logo} width='120px' height='60px'/>
          </Grid>
          <Grid>
            <Button width="80px" text="로그아웃" margin="10px" right />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  //로그인 안했을때(is_login:false)
  
  return (
    <React.Fragment>
      <Grid is_flex fixed>
        <Grid>
          <Image src={Logo} width='120px' height='60px'/>
        </Grid>
        <Grid>
          <Button width="80px" text="로그인" margin="10px" right />
          <Button width="80px" text="회원가입" margin="10px" right />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {
  is_login: false,
};

export default Header;
