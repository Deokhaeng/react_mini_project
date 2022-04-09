import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

import { getCookie, setCookie, deleteCookie } from "../../shared/Cookie";

// Action Types(액션 타입)
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

// Action Creators(액션 생성 함수)
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

// InitialState(defaultprops와 같은 역할)
const initialState = {
  user: null, // 처음에 로그인 안 했을 거니까 유저가 없음.
  is_login: false, // 처음에는 로그인이 안되어 있을 테니까 false.
};

// Middleware Actions(미들웨어 액션)
const loginAction = (id, password) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "post",
      url: "https://reqres.in/api/login", // 테스트 api id : eve.holt@reqres.in / pw : cityslicka
      data: {
        email: id,
        password: password,
      },
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
        document.location.href = "/main";
      })
      .catch((error) => {
        console.log(error);
      });
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

// Reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
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
};

export { actionCreators };
