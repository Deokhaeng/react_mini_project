import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

import { getCookie, setCookie, deleteCookie } from "../../shared/Cookie";
//Action
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

//Action creator
const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));

//initialStatef
const initialState = {
  //리덕스가 사용할 initialState
  ok: false,
  result: [{
    // id: id,
    title: '만두만두만만세',
    contents: "만두는 옆에서 코골면서 자는 중 ",
    image_url: "https://ifh.cc/g/AOA4Wq.jpg",
  }], //post_list가 아닌 이유? 이미 state.post.list로 가져올 거기 때문에 post는 생략!
  is_loading: false, //지금 로딩 중이니?(가지고 오는 중이니?)??
};

//Middleware
const getpost = (id, title, contents, image_url) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "get",
      url: '/user/main',
      data: {
          id: id,
          title: title,
          contents: contents,
          image_url: image_url,
        }
    })
      .then((res) => {
        console.log(res);
        dispatch(setPost());

        const accessToken = res.data.token;
        // 쿠키에 토큰 저장
        getCookie("is_login", `${accessToken}`);
        document.location.href = "/main";
      })
      .catch((error) => {
        console.log(error);
      });
}};

const addpost = (title, contents) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "post",
      url: "https://reqres.in/api/users",
      data: {
        name: title,
        job: contents,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(addPost());

        const accessToken = res.data.token;
        // 쿠키에 토큰 저장
        getCookie("is_login", `${accessToken}`);
        document.location.href = "/main";
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const editpost = (post) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "post",
      url: "https://reqres.in/api/users/2",
      data: {
        name: post,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(editPost());

        const accessToken = res.data.token;
        // 쿠키에 토큰 저장
        getCookie("is_login", `${accessToken}`);
        document.location.href = "/main";
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const deletepost = (post) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "delete",
      url: "https://reqres.in/api/users/2",
      data: {
        name: post,
      }
    })
      .then((res) => {
        console.log(res);
        dispatch(deletePost());

        const accessToken = res.data.token;
        // 쿠키에 토큰 저장
        getCookie("is_login", `${accessToken}`);
        document.location.href = "/main";
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//Reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list); //원래 리스트를 post_list로 갈아끼울거야~~

        //추가된 아이디를 같이 넣어서 넘어올 수 도 있기 때문에 중복제거를 해주자!
        draft.list = draft.list.reduce((acc, cur) => {
          //포스트 하나의 아이디가 현재 가지고 있는 포스트의 아이디니?
          if (acc.findIndex((a) => a.id == cur.id) === -1) {
            //중복됐어
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.id == cur.id)] = cur; //최근걸로 덮어씌우자!
            return acc;
          }
        }, []);

        if (action.payload.paging) {
          //기본값 필요없음
          draft.paging = action.payload.paging;
        }

        draft.is_loading = false;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post); //배열의 맨 앞에 붙이기
        console.log(draft);
        console.log(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id); //인덱스 반환 => 딱 위치만 찾는 함수
        console.log(action);

        draft.list[idx] = { ...draft.list[idx], ...action.payload.post }; //갈아끼워줘라
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((p) => p.id !== action.payload.post_id); //배열을 반환
      }),
  },
  initialState
);

//action export
const actionCreators = {
  getpost,
  addpost,
  editpost,
  deletepost,
};

export { actionCreators };
