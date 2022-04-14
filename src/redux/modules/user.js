import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";

// Action Types(액션 타입)
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
const CHECK_DUP = "CHECK_DUP";

// Action Creators(액션 생성 함수)
const setUser = createAction(SET_USER, (token) => ({ token }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user_id) => ({ user_id }));
const checkDup = createAction(CHECK_DUP, (id) => ({ id }));

// InitialState(defaultprops와 같은 역할)
const initialState = {
  user: null, // 처음에 로그인 안 했을 거니까 유저가 없음.
  is_login: false, // 처음에는 로그인이 안되어 있을 테니까 false.
  is_check: false,
  id: null,
  token: null,
  user_id: null,
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
        dispatch(setUser(res.data.token));
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
    console.log(id, password, password2);
    axios
      .post(
        "http://3.38.253.146/api/user/users/",
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
      .post(
        "http://3.38.253.146/api/user/users/idCheck/",
        JSON.stringify({
          id: id,
          // password: 1234,
          // passwordCheck: 1234,
        }),
        { headers: { "Content-Type": `application/json` } }
      )
      .then((res) => {
        console.log(res);
        dispatch(checkDup(true));
        window.alert("사용 가능한 아이디입니다.");
      })
      .catch((error) => {
        console.log(error);
        dispatch(checkDup(false));
        window.alert("이미 존재하는 아이디입니다.");
      });
  };
};

const getUserDB = () => {
  return function (dispatch) {
    axios({
      method: "get",
      url: `http://3.38.253.146/user/me`,
      headers: {
        Authorization: `Bearer ${getCookie("is_login")}`,
      },
    })
      .then((res) => {
        const user_id = res.data.user.id;

        dispatch(getUser(user_id));
      })
      .catch((error) => {
        console.log("로그인이 안돼있습니다.", error);
      });
  };
};

// Reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.token = action.payload.token;
        console.log(draft.token);
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

    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user_id = action.payload.user_id;
        draft.is_login = true;
        console.log(draft.data);
      }),

    [CHECK_DUP]: (state, action) =>
      produce(state, (draft) => {
        draft.is_check = action.payload.id;
      }),
  },
  initialState
);

// Action Creator Export (액션 생성 함수 만든거 export)
const actionCreators = {
  setUser,
  logOut,
  getUser,
  loginAction,
  logoutAction,
  signupDB,
  idCheck,
  getUserDB,
};

export { actionCreators };
