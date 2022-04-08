import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import { actionCreators as imageActions } from "./image";

// //Action
// const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
// const DELETE_POST = "DELETE_POST";
// const LOADING = "LOADING";

// //Action creator
// const setPost = createAction(SET_POST, (post_list, paging) => ({post_list,paging,}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({post_id, post}));

// //initialState
const initialState = {
  //리덕스가 사용할 initialState
  is_login: false,
  ok: true,
  result: [
    {
      title: "신전떡볶이",
      image: "https://ifh.cc/g/AOA4Wq.jpg",
      content: "존맛탱구리",
      post_id: "aaaaaaa",
    },
    {
      title: "엽떡",
      image: "https://ifh.cc/g/AOA4Wq.jpg",
      content: "난 엽떡은 별로,,,",
      post_id: "bbbbbb",
    },
  ],
};

//Middleware

//Reducer
export default handleActions(
  {
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        // draft.post.unshift(action.payload.post);
        console.log(action)
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.post.findIndex((p) => p.id === action.payload.post_id); //인덱스 반환 => 딱 위치만 찾는 함수
        console.log(action);

        draft.list[idx] = { ...draft.list[idx], ...action.payload.post }; //갈아끼워줘라
      }),
  },
  initialState
);

//action export
const actionCreators = {
  addPost,
  editPost,
};

export { actionCreators };
