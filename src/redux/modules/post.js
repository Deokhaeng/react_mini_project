import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// import instance from "../../common/axios";
import axios from "axios";

//Action
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";

//Action creator
// const setPost = createAction(SET_POST, (post_list, paging) => ({
//   post_list,
//   paging,
// }));
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));

//initialState
const initialState = {
  //리덕스가 사용할 initialState
  list: [
    {
      id: "yoo",
      image_url:
        "https://recipe1.ezmember.co.kr/cache/recipe/2016/10/07/f43063e718c49d85ddce4880e4a41fcd1.jpg",
      title: "떡볶이 이름",
      createdAt: "2022-04-08",
      content:
        "같이 인생에 보배를 아니더면, 할지라도 만천하의 낙원을 얼마나 원대하고, 힘있다. 심장은 희망의 얼음과 천하를 때문이다. 무엇이 청춘을 같이, 가슴이 그들을 발휘하기 설레는 살았으며, 생명을 이것이다. 영원히 커다란 쓸쓸한 사막이다. 실로 없으면, 풀이 꽃이 이상의 품으며, 기쁘며, 하는 생생하며, 이것이다. 이것이야말로 무엇을 꽃이 뛰노는 인간의 있는 싹이 무엇을 피부가 것이다. 위하여서, 옷을 살 있으랴?",
    },
  ],
  //post_list가 아닌 이유? 이미 state.post.list로 가져올 거기 때문에 post는 생략!
  // is_loading: false, //지금 로딩 중이니?(가지고 오는 중이니?)
  // img_url: "https://ifh.cc/g/AOA4Wq.jpg",
  // contents: "",

  // user_name: "yoo",
  // image_url:
  //   "https://recipe1.ezmember.co.kr/cache/recipe/2016/10/07/f43063e718c49d85ddce4880e4a41fcd1.jpg",
  // title: "떡볶이 이름",
  // createdAt: "2022-04-08",
  // content:
  //   "같이 인생에 보배를 아니더면, 할지라도 만천하의 낙원을 얼마나 원대하고, 힘있다. 심장은 희망의 얼음과 천하를 때문이다. 무엇이 청춘을 같이, 가슴이 그들을 발휘하기 설레는 살았으며, 생명을 이것이다. 영원히 커다란 쓸쓸한 사막이다. 실로 없으면, 풀이 꽃이 이상의 품으며, 기쁘며, 하는 생생하며, 이것이다. 이것이야말로 무엇을 꽃이 뛰노는 인간의 있는 싹이 무엇을 피부가 것이다. 위하여서, 옷을 살 있으랴?",
};

// Middleware Actions(미들웨어 액션)
// const setPostDB = () => {
//   return function (dispatch) {
//     instance
//       .get("/user/main")
//       .then((res) => {
//         console.log(res);
//         // if (res.data.result.length < limit + 1) {
//         //   dispatch(setPostList(res.data.result, null));
//         //   return;
//         // }

//         // if (res.data.result.length >= limit + 1) res.data.result.pop();

//         dispatch(setPost(res));
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//     // dispatch();
//   };
// };

const setPostDB = () => {
  return function (dispatch) {
    // let post_list = [];
    axios({
      method: "get",
      // url: "https://6252ffae7f7fa1b1ddec36b3.mockapi.io/users/1/addpost",
      url: "http://3.38.253.146/write_modify/user/main",
    })
      .then((doc) => {
        console.log(doc);
        const _post = doc.data.board;
        const image = doc.data.board.image;
        const image_url = `http://3.38.253.146/${image}`;
        console.log(image);
        console.log(image_url);
        console.log(_post);
        // dispatch(loading(true));
        dispatch(setPost(_post));
        // console.log(res);
        // console.log(post_list)
      })
      .catch((error) => {
        console.log("에러났다!", error);
      });
  };
};

//Reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
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
  },
  initialState
);

//action export
const actionCreators = {
  setPost,
  addPost,
  editPost,
  setPostDB,
};

export { actionCreators };
