import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import instance from '../../shared/Request';
import {history} from '../../redux/configureStore'

import {setCookie, deleteCookie } from "../../shared/Cookie";

// Action Types(액션 타입)
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const SET_USER = "SET_USER";

// Action Creators(액션 생성 함수)
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// InitialState
const initialState = {
  user: null, 
  is_login: false,
};

// Middleware Actions
const loginAction = (id, password) => {
  return function (dispatch) {
    axios({
      method: "post",
      // url: "http://3.38.253.146/user/auth", // 
      url: "https://reqres.in/api/login",  //테스트 api id : eve.holt@reqres.in / pw : cityslicka 
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
        
        // document.location.href = "/main";
        history.push('/')

        
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const signupAction = (id, password) => {
  return function (dispatch) {
    axios({
      method:'post',
      url: "https://reqres.in/api/register", //테스트 api id : eve.holt@reqres.in / pw : pistol
      data: {
        email: id,
        password: password,
      },  
    })
    .then(res =>{
      dispatch(setUser(id, password)) //
      console.log(res)
      // document.location.href = "/main"
    })
  };
}

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
    [SET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// Action Creator Export (액션 생성 함수 만든거 export)
const actionCreators = {
  logIn,
  logOut,
  setUser,
  loginAction,
  logoutAction,
  signupAction,
};

export { actionCreators };