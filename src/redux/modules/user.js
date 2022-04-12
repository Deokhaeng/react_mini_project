import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

import { setCookie, deleteCookie } from "../../shared/Cookie";

// Action Types(액션 타입)
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
const CHECK_DUP = "CHECK_DUP";

// Action Creators(액션 생성 함수)
const logIn = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const checkDup = createAction(CHECK_DUP, (id) => ({ id }));

// InitialState(defaultprops와 같은 역할)
const initialState = {
  user: null, // 처음에 로그인 안 했을 거니까 유저가 없음.
  is_login: false, // 처음에는 로그인이 안되어 있을 테니까 false.
  is_check: false,
  id: null,
};

// Middleware Actions(미들웨어 액션)
const loginAction = (userInfo) => {
  return function (dispatch, getState, { history }) {
    axios
      .post(
        "http://3.38.253.146/api/user/auth",
        JSON.stringify({ id: userInfo.id, password: userInfo.password }),
        { headers: { "Content-Type": `application/json` } }
      )
      .then((res) => {
        console.log(res);
        const accessToken = res.data.token;
        //쿠키에 토큰 저장
        setCookie("is_login", `${accessToken}`);
        history.push("/main");
      })
      .catch((error) => {
        window.alert("로그인이 되지 않았습니다.");
        console.log(error);
      });
  };
};

const logoutAction = () => {
  return function (dispatch, { history }) {
    dispatch(logOut());
    document.location.href = "/main";
  };
};

const signupDB = (id, password, password2) => {
  return function (dispatch, getState, { history }) {
    console.log(id, password);
    axios
      .post(
        "http://3.38.253.146/api/user/users",
        JSON.stringify({
          id: id,
          password: password,
          passwordCheck: password2,
        }),
        { headers: { "Content-Type": `application/json` } }
      )
      .then((res) => {
        console.log(res);
        window.alert(res.data.msg);
        // history.push("/main");
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        const errorMessage = error;

        console.log(error);
      });
  };
};

const idCheck = (id) => {
  return function (dispatch) {
    axios
      .post("/api/sign/nickname", { nickname: id })
      .then((res) => {
        dispatch(checkDup(true));
        window.alert("사용 가능한 아이디입니다.");
      })
      .catch((error) => {
        dispatch(checkDup(false));
        window.alert("이미 존재하는 아이디입니다.");
      });
  };
};

// const loginCheckDB = () => {
//   return function (dispatch, getState, { history }) {
//     const token = getCookie("is_login");
//     axios({
//       method: "post",
//       url: "http://3.38.253.146/user/auth",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         dispatch(
//           setUser({
//             email: res.data.email,
//             nickname: res.data.nickname,
//           })
//         );
//       })
//       .catch((error) => {
//         console.log(error.code, error.message);
//       });
//   };
// };

// const IdCheck = (){

//   console.log('Join.vue => IdCheck');
//   console.log('Join.vue => IdCheck', this.member.userid);

//   const url = `/member/idcheck?uid=${this.member.userid}`;
//   const headers = {"Content-Type":"application/json"};
//   const response = await this.axios.get(url, {headers:headers});
//   console.log(response);

//   if(response.data.result === 1){
//       alert('중복된 아이디가 존재합니다.')
//       this.$refs.id.focus();
//       return false;
//   }
//   if(response.data.result === 0){
//       alert('사용가능한 아이디입니다')
//       this.$refs.pw.focus();
//   }

// }

// Reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
        // creatAction을 사용할 때 액션 안에 type이 있고,
        // paylead가 있고, 이 안에 보낸 데이터가 담긴다.
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),

    [GET_USER]: (state, action) => produce(state, (draft) => {}),

    [CHECK_DUP]: (state, action) =>
      produce(state, (draft) => {
        draft.is_check = action.payload.id;
      }),
  },
  initialState
);

// Action Creator Export (액션 생성 함수 만든거 export)
const actionCreators = {
  logIn,
  logOut,
  getUser,
  loginAction,
  logoutAction,
  signupDB,
  idCheck,
};

export { actionCreators };
