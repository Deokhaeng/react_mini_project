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
const setUser = createAction(SET_USER, (id, password) => ({id, password}));

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
      url: "http://3.38.253.146/api/user/auth", //
      // url: "https://reqres.in/api/login",  //테스트 api id : eve.holt@reqres.in / pw : cityslicka 
      // url:'https://6252ffae7f7fa1b1ddec36b3.mockapi.io/users',
      headers: {
        "Content-Type": `application/json`,
        // Authorization: `Bearer ${doc.payload.accessToken}`
      },
      data: JSON.stringify({
        id: id,
        password: password,
      }),
    })
      .then((doc) => {
        console.log(doc);
        // const accessToken = doc.data.token;
        // console.log(accessToken)
        // axios.defaults.headers.common['Authorization'] = `Bearer ${doc.data.token}`
        const accessToken = doc.data.token;
        // // 쿠키에 토큰 저장
        setCookie("is_login", `${accessToken}`);

        dispatch(setUser(id, password));
				// localStorage.setItem('is_login', doc.data.token);
        // document.location.href = "/main";
        history.push('/main');
      })
      .catch((error) => {
        console.log('로그인 실패', error);
      });
  };
};

const signupAction = (id, password, passwordCheck) => {
  console.log(id, password, passwordCheck)
  return function (dispatch) {
    axios({
      method:'post',
      url: "http://3.38.253.146/api/user/users", //테스트 api id : eve.holt@reqres.in / pw : pistol
      headers: {
        "Content-Type": `application/json`,
      },
      data: JSON.stringify({
        id: id,
        password: password,
        passwordCheck: passwordCheck,
      })
    })
    .then(doc =>{
      dispatch(setUser(id, password, passwordCheck)) //
      console.log(doc)
      document.location.href = "/main"
    })
    .catch(error =>{
      console.log('에러가 났어여,,,', error)
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