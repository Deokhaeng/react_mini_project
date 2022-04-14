import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { actionCreators as imageActions } from "./image";
import moment from "moment";
import { history } from "../configureStore";

import { getCookie, setCookie, deleteCookie } from "../../shared/Cookie";

//Action
const SET_POST = "SET_POST";
// const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
// const LOADING = "LOADING";

//Action creator
const setPost = createAction(SET_POST, (_post) => ({ _post }));
// const getPost = createAction(GET_POST, (post) => ({ post }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, formData) => ({
  post_id,
  formData,
}));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));
// const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

//initialStatef
const initialState = {
  //리덕스가 사용할 initialState
  list: [], //post_list가 아닌 이유? 이미 state.post.list로 가져올 거기 때문에 post는 생략!
  // paging: { start: null, next: null, size: 3 }, //size: 몇 개 가져올거니?
  is_loading: false, //지금 로딩 중이니?(가지고 오는 중이니?)
};

const initialPost = {
  //게시글 하나당 기본적으로 들어갈 내용
  title: "ㅁㄴㅇㄹ",
  content: "점심머먹지",
  image: "https://ifh.cc/g/AOA4Wq.jpg",
  createdAt: moment().format("YYYY-MM-DD"), //알아서 이러한 형식으로 보여줌
};

//Middleware
const getPostDB = () => {
  return function (dispatch, getState, { history }) {
    //form타입
    axios({
      method: "get",
      // url: "https://6252ffae7f7fa1b1ddec36b3.mockapi.io/users/1/addpost",
      url: "http://3.38.253.146/write_modify/user/main",
    })
      .then((doc) => {
        const _post = doc.data.board;

        console.log(_post);

        dispatch(setPost(_post));
      })
      .catch((error) => {
        console.log("에러났다!", error);
      });
  };
};

const addPostDB = (formData) => {
  return function (dispatch, getState, { history }) {
    let _post = {
      ...initialPost,
      formData,
      createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
    console.log(_post);

    axios({
      method: "post",
      // url: "https://6252ffae7f7fa1b1ddec36b3.mockapi.io/users/1/addpost",
      url: "http://3.38.253.146/write_modify/user/postadd",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getCookie("is_login")}`,
      },
    })
      .then((doc) => {
        // let post = { ..._post, id: doc.data.length + 1};
        console.log(doc);
        dispatch(addPost(_post));
        // dispatch(imageActions.setPreview(null));

        history.push("/main");
      })
      .catch((error) => {
        console.log("포스트 작성 실패!", error);
      });
  };
};

const getOnePostDB = (_id) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "get",
      url: `http://3.38.253.146/write_modify/user/detail/${_id}`,
    }).then((doc) => {
      console.log(doc);
      if (!doc.data) {
        return;
      }
      const post = doc.data;
      dispatch(setPost(post));
    });
  };
};

const editPostDB = (formData, post_id) => {
  return function (dispatch, getState) {
    // console.log(image)
    // if (!post_id) {
    //   console.log("게시물 정보가 없어요!");
    //   return;
    // const _image = getState().image.preview;
    // .findIndex((p) => p.id === post_id);
    console.log(post_id);
    const _post_idx = getState().post.list.findIndex(
      (p) => p.post_id == post_id
    );
    console.log(_post_idx);
    const _post = getState().post.list[_post_idx];
    console.log(_post_idx);

    console.log(_post);

    let post = {
      ..._post,
      formData, //patch 안됌
    };
    // `multipart/form-data; boundary=${formData._boundary}`
    console.log(post);
    axios({
      method: "post",
      url: `http://3.38.253.146/write_modify/user/postmodify/${post_id}`,
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: `Bearer ${getCookie("is_login")}`,
      },
    })
      .then((res) => {
        console.log(res);

        dispatch(editPost(post, post_id));

        history.push("/main");
      })
      .catch((error) => {
        console.log("에러났어", error);
      });
  };
};

const deletePostDB = (post_id) => {
  return function (dispatch) {
    axios({
      method: "delete",
      url: `http://3.38.253.146/write_modify/user/delete/${post_id}`,
      data: { post_id },
      headers: { Authorization: `Bearer ${getCookie("is_login")}` },
    })
      .then((res) => {
        console.log(res);

        dispatch(deletePost(post_id));

        // document.location.href = "/main";
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
        draft.list = action.payload._post; //원래 리스트를 post_list로 갈아끼울거야~~

        // //추가된 아이디를 같이 넣어서 넘어올 수 도 있기 때문에 중복제거를 해주자!
        // draft.list = draft.list.reduce((acc, cur) => {
        //   //포스트 하나의 아이디가 현재 가지고 있는 포스트의 아이디니?
        //   if (acc.findIndex((a) => a.id == cur.id) === -1) {
        //     //중복됐어
        //     return [...acc, cur];
        //   } else {
        //     acc[acc.findIndex((a) => a.id == cur.id)] = cur; //최근걸로 덮어씌우자!
        //     return acc;
        //   }
        // }, []);

        // draft.is_loading = false;
      }),
    // [GET_POST]: (state, action) =>
    //   produce(state, (draft) => {
    //     // console.log(action.payload.post);
    //     draft.post = action.payload.post;
    //   }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        //
        draft.list.unshift(action.payload.post); //배열의 맨 앞에 붙이기
        // console.log(draft);
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
    // [LOADING]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.is_loading = action.payload.is_loading;
    //   }),
  },
  initialState
);

//action export
const actionCreators = {
  addPost,
  getPostDB,
  addPostDB,
  editPostDB,
  deletePostDB,
  getOnePostDB,
};

export { actionCreators };
