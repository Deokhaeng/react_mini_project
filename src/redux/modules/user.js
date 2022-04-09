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

// InitialState
const initialState = {
  user: null, 
  is_login: false,
};

// Middleware Actions
const loginAction = (id, password) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "post",
      url: "http://3.38.253.146/user/auth", // 테스트 api id : eve.holt@reqres.in / pw : cityslicka
      data: {
        email: id,
        password: password,
      },
    })
      .then((res) => {
        console.log(res);

        const accessToken = res.data.token;
        //쿠키에 토큰 저장
        setCookie("is_login", `${accessToken}`);
        document.location.href = "/main";
        console.log(res)
      })
      .catch((error) => {
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