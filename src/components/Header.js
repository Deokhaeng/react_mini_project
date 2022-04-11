import React from "react";
import { Grid, Button, Image } from "../elements/index";
import Logo from '../shared/logo.png';

import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Header = (props) => {
  const dispatch = useDispatch();
  const [is_login, setIsLogin] = React.useState(false);

  console.log(is_login);
  console.log(document.cookie);

  React.useEffect(()=>{
    let cookie = document.cookie;
    console.log(cookie);
    if(cookie) {
      setIsLogin(true);
    }else{
      setIsLogin(false);
    }
  });

  if (is_login) {
    //로그인 했을때(is_login:true)

    return (
      <React.Fragment>
        <Grid is_flex fixed>
          <Grid>
            <Image src={Logo} width='120px' height='60px'/>
          </Grid>
          <Grid padding='20px'>
            <Button width="80px" text="로그아웃" margin="10px" right _onClick={()=>{
              dispatch(userActions.logoutAction());
            }}/>
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
        <Grid padding='20px'>
          <Button width="80px" text="로그인" margin="10px" right _onClick={()=>{history.push('/login')}}/>
          <Button width="80px" text="회원가입" margin="10px" right />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {
  ok: false,
};

export default Header;
