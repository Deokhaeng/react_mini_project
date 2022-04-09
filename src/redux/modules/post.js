import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//Action
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";

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

//initialStatef
const initialState = {
  //리덕스가 사용할 initialState
  list: [], //post_list가 아닌 이유? 이미 state.post.list로 가져올 거기 때문에 post는 생략!
  is_loading: false, //지금 로딩 중이니?(가지고 오는 중이니?)
  img_url: "https://ifh.cc/g/AOA4Wq.jpg",
  contents: "",
};

//Reducer
export default handleActions(
  {
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
  },
  initialState
);

//action export
const actionCreators = {
  setPost,
  addPost,
  editPost,
};

export { actionCreators };
