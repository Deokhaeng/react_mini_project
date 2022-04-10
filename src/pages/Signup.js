import React from "react";
import { Grid, Text, Input, Button } from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Signup = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState('');
  const [password, setPassword] = React.useState('');
  // const [user_name, setUserName] = React.useState('');
  // const [pwd_check, setPwdCheck] = React.useState('');


  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          회원가입
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="아이디" 
            placeholder="아이디를 입력해주세요." 
            _onChange={(e) => {
              console.log("!!");
              setId(e.target.value)
            }}
          />
        </Grid>

        {/* <Grid padding="16px 0px">
          <Input
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            _onChange={() => {
              console.log("!!");
            }}
          />
        </Grid> */}

        <Grid padding="16px 0px">
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            _onChange={(e) => {
              console.log("!!");
              setPassword(e.target.value)
            }}
          />
        </Grid>

        {/* <Grid padding="16px 0px">
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요."
            _onChange={() => {
              console.log("!!");
            }}
          />
        </Grid> */}
 
        <Button text="회원가입하기" _onClick={()=>{dispatch(userActions.signupAction(id, password))}}></Button>
      </Grid>
    </React.Fragment>
  );
};

Signup.defaultProps = {};

export default Signup;