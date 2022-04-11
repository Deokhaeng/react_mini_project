import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { actionCreators as imageActions } from "./image";
import moment from "moment";
import { history } from "../configureStore";

import { getCookie, setCookie, deleteCookie } from "../../shared/Cookie";

//Action
const SET_POST = "SET_POST";
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
// const LOADING = "LOADING";

//Action creator
const setPost = createAction(SET_POST, (_post) => ({ _post }));
// const getPost = createAction(GET_POST, (post) => ({ post }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
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
  return function (dispatch, getState, {history}) {
    let post_list = [];
    axios({
      method: "get",
      // url: "https://6252ffae7f7fa1b1ddec36b3.mockapi.io/users/1/addpost",
      url: "http://3.38.253.146/write_modify/user/main",
    })
      .then((doc) => {
        // console.log(doc)
        const _post = doc.data.board;
        // const _image = doc.data.board[0].image;
        
        console.log(_post)
        // console.log(_image)

        // dispatch(loading(true));
        dispatch(setPost(_post));
        // console.log(res);
        // console.log(post_list)
      })
      .catch((error) => {
        console.log('에러났다!', error);
      });
  };
};

const addPostDB = (title, content, createAt) => {
  return function (dispatch) {
    let _post = {
      ...initialPost,
      title: title,
      content: content,
      createdAt: createAt,
    };
    axios({
      method: "post",
      // url: "https://6252ffae7f7fa1b1ddec36b3.mockapi.io/users/1/addpost",
      url: "http://3.38.253.146/write_modify/user/postadd",
      data: _post,
    })
      .then((doc) => {
        let post = { ..._post, id: doc.data.length + 1};
        console.log(doc);
        dispatch(addPost(_post));
        dispatch(imageActions.setPreview(null));

        history.push('/main')
      })
      .catch((error) => {
        console.log('포스트 작성 실패!', error);
      });
  };
};

const getOnePostDB = (id) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "get",
      url: "",
    }).then((doc) => {
      console.log(doc);
      if (!doc.data) {
        return;
      }
      dispatch(setPost(id));
    });
  };
};

const editPostDB = (title, contents) => {
  return function (dispatch) {
    axios({
      method: "patch",
      url: "http://3.38.253.146/write_modify/user/postedit",
      data: {
        name: title,
        job: contents,
      },
    })
      .then((res) => {
        console.log(res);
        // const post = {...initialPost, title: title, contents: contents}
        dispatch(editPost(title, contents));

        // history.push('/main')
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const deletePostDB = (post) => {
  return function (dispatch) {
    axios({
      method: "delete",
      url: "https://reqres.in/api/users/2",
      data: {},
    })
      .then((res) => {
        console.log(res);
        dispatch(deletePost());

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
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        // console.log(action.payload.post);
        draft.post = action.payload.post;
      }),
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
  getOnePostDB
};

export { actionCreators };
