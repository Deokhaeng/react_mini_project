import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import instance from "../../shared/axios";

import { setCookie, deleteCookie } from "../../shared/Cookie";

// Action Types(액션 타입)
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// Action Creators(액션 생성 함수)
const logIn = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

// InitialState(defaultprops와 같은 역할)
const initialState = {
  user: null, // 처음에 로그인 안 했을 거니까 유저가 없음.
  is_login: false, // 처음에는 로그인이 안되어 있을 테니까 false.
};

// Middleware Actions(미들웨어 액션)
const loginAction = (userInfo) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "post",
      url: "http://3.38.253.146/user/auth",
      contentType: "application/json",
      // 테스트 api id : eve.holt@reqres.in / pw : cityslicka
      data: JSON.stringify({
        id: userInfo.id,
        password: userInfo.password,
      }),
    })
      .then((res) => {
        console.log(res);
        // dispatch(logIn(user))
        // dispatch(
        //   setUser({
        //     email: res.data.id,
        //   })
        // );
        const accessToken = res.data.token;
        //쿠키에 토큰 저장
        setCookie("is_login", `${accessToken}`);
        // localStorage.setItem("token", accessToken);
        history.push("/main");
      })
      .catch((error) => {
        window.alert("로그인이 되지 않았습니다.");
        console.log(error);
      });
    // instance
    //   .post("/user/auth", { userInfo })
    //   .then((res) => {
    //     console.log(res);
    //     dispatch(logIn(res));
    //     localStorage.setItem("token", res.token);
    //     history.push("/main");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    // });
  };
  // return function (dispatch, getState, { history }) {
  //   console.log(history);
  //   dispatch(logIn(user));
  //   history.push("/main");
  // };
};

const logoutAction = () => {
  return function (dispatch, { history }) {
    dispatch(logOut());
    document.location.href = "/main";
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

const signupDB = (id, password, password2) => {
  return function (dispatch, getState, { history }) {
    console.log(id, password);
    axios({
      method: "post",
      url: "http://3.38.253.146/user/users",
      data: {
        id: id,
        password: password,
        passwordCheck: password2,
      },
    })
      .then((res) => {
        console.log(res);
        // window.alert(res.data.result);
        history.push("/main");
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(id, password);
    // console.log(id, password);
    // instance
    //   .post("/user/users", {
    //     id: id,
    //     password: password,
    //     passwordCheck: password2,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     window.alert(res.data.result);
    //     // history.push("/main");
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;

    //     console.log(errorCode, errorMessage);
    //   });
    //   axios({
    //     method: "post",
    //     url: "http://3.38.253.146/user/users",
    //     data: {
    //       id: id,
    //       password: password,
    //       passwordCheck: password2,
    //     },
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       window.alert(res.data.result);
    //       // history.push("/main");
    //     })
    //     .catch((error) => {
    //       const errorCode = error.code;
    //       const errorMessage = error.message;

    //       console.log(errorCode, errorMessage);
    //     });
    // };
  };
};

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
};

export { actionCreators };