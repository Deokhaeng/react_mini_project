import React from "react";
import _ from "lodash";
import {Box} from '../elements'

//Elements
import { Grid, Text, Input, Button } from "../elements";

//REDUX-ACTION & REACT-HOOK
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";

//VALIDATION
import { idVal, pwdVal } from "../common/validation";

const Signup = (props) => {
  const dispatch = useDispatch();

  const dupState = useSelector((state) => state.user.is_check);

  const debounce = _.debounce((value, setValue) => setValue(value), 300);
  // debounce() 메소드는 이벤트에 의해 특정 함수가 여러번 반복 실행될 수 경우에 사용하며
  // 정해진 지연시간동안 반복된 호출을 딱 1번만 호출하도록 제어해준다. / _.debounce(콜백함수, 시간)

  const [id, setId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPasswordCheck] = React.useState("");
  const [idConfirm, setIdConfirm] = React.useState("");
  const [pwdConfirm, setPwdConfirm] = React.useState("");
  const [pwdCheckConfirm, setPwdCheckConfirm] = React.useState("");
  const [idWarning, setIdWarColor] = React.useState("red");
  const [pwdWarning, setPwdWarColor] = React.useState("red");
  const [pwdCheckWarning, setPwdCheckWarColor] = React.useState("red");

  const checkID = (val) => {
    if (val === "") {
      setIdWarColor("red");
      setIdConfirm("아이디가 입력되지 않았습니다.");
      return;
    }
    if (!idVal(val)) {
      setIdWarColor("red");
      setIdConfirm("아이디가 형식에 맞지 않습니다. (영어, 알파벳 4~20자)");
      return;
    }

    setIdWarColor("red");
    setIdConfirm("중복 검사를 해주세요");
  };

  const checkPWD = (val) => {
    if (val === "") {
      setPwdWarColor("red");
      setPwdConfirm("패스워드가 입력되지 않았습니다.");
      return;
    }
    if (!pwdVal(val)) {
      setPwdWarColor("red");
      setPwdConfirm("패스워드가 형식에 맞지 않습니다. (영어, 알파벳 4~30자)");
      return;
    }
    setPwdWarColor("green");
    setPwdConfirm("사용가능한 패스워드 입니다.");
  };

  const checkPWD2nd = (val) => {
    if (val === "") {
      setPwdCheckWarColor("red");
      setPwdCheckConfirm("패스워드 확인란이 입력되지 않았습니다.");
      return;
    }
    if (val.length < 4) {
      setPwdCheckWarColor("red");
      setPwdCheckConfirm("");
      return;
    }
    if (val === password) {
      setPwdCheckWarColor("green");
      setPwdCheckConfirm("패스워드가 올바르게 입력되었습니다.");
      return;
    }

    setPwdCheckWarColor("red");
    setPwdCheckConfirm("입력된 패스워드가 서로 다릅니다.");
  };

  const checkDup = () => {
    dispatch(userActions.idCheck(id));
    setIdConfirm("");
  };

  const signup = () => {
    if (!(dupState && pwdWarning === "green" && pwdCheckWarning === "green"))
      return window.alert("입력한 내용을 다시 확인해주세요!");

    dispatch(userActions.signupDB(id, password, password2));
    history.replace('/main')
  };

  return (
    <React.Fragment>
      <Box margin='50px auto'>
         <Grid padding="16px">
        <Text size="32px" bold>
          회원가입
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={(e) => {
              setId(e.target.value);
            }}
            keyUp={(event) => {
              debounce(event.target.value, checkID);
            }}
          />
          <Text size="12px" color={idWarning} lineHeight="2" textIndent="10px">
            {idConfirm}
          </Text>

          <Button _onClick={checkDup}>중복 확인</Button>
        </Grid>
        <Grid padding="16px 0px">
          <Input
            label="패스워드"
            placeholder="패스워드를 입력해주세요."
            _onChange={(e) => {
              setPassword(e.target.value);
            }}
            keyUp={(event) => {
              debounce(event.target.value, checkPWD);
            }}
          />
          <Text size="12px" color={pwdWarning} lineHeight="2" textIndent="10px">
            {pwdConfirm}
          </Text>
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="패스워드 확인"
            placeholder="패스워드를 다시 입력해주세요."
            _onChange={(e) => {
              setPasswordCheck(e.target.value);
            }}
            keyUp={(event) => {
              debounce(event.target.value, checkPWD2nd);
            }}
          />
          <Text
            size="12px"
            color={pwdCheckWarning}
            lineHeight="2"
            textIndent="10px"
          >
            {pwdCheckConfirm}
          </Text>
        </Grid>

        <Button text="회원가입하기" _onClick={signup}></Button>
        <Button
          text="취소"
          _onClick={() => {
            history.push("/login");
          }}
        ></Button>
      </Grid>
      </Box>
     
    </React.Fragment>
  );
};

Signup.defaultProps = {};

export default Signup;
