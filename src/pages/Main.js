import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";

import { Grid, Button } from "../elements";
import OutDiv from "../elements/OutDiv";

const Main = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);

  const is_login = useSelector((state) => state.user.is_login);

  React.useEffect(() => {
    if (post_list.length < 2) {
      //리스트에 길이가 있으면 getPost를 하지 않는다. => 이미 있던 리덕스 맨 앞에 추가가 됌.
      dispatch(postActions.getPostDB());
    }

    dispatch(userActions.getUserDB());
  }, []);

  if (is_login) {
    return (
      <>
        <Header />
        <OutDiv>
                  {post_list.map((p, idx) => {
          return <Post key={p._id} {...p} />;
        })}

        <Button
          is_float
          text="+"
          _onClick={() => {
            history.push("/write");
          }}
        ></Button>
        </OutDiv>
      </>
    );
  }
  return (
    <>
      <Header />
        <OutDiv>
                  {post_list.map((p, idx) => {
          return <Post key={p._id} {...p} />;
        })}
      </OutDiv>
    </>
  );
};

export default Main;