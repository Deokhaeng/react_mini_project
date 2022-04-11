import React from "react";
// import Post from "../components/Post";
import Header from "../components/Header";
import Post from "../components/Post";

import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";

import { Grid, Button } from "../elements";

import { actionCreators as postActions } from "../redux/modules/post";

const Main = () => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);

  React.useEffect(() => {
    if (post_list.length < 2) {
      //리스트에 길이가 있으면 getPost를 하지 않는다. => 이미 있던 리덕스 맨 앞에 추가가 됌.
      dispatch(postActions.setPostDB());
    }
  }, []);

  return (
    <>
      <Grid padding="1px">
        {/* <Post /> */}
        <Grid is_flex>
        {post_list.map((post, idx) => {
          return <Post key={post._id} {...post} />;
        })}

        {/* {post_list} */}
      </Grid>
      </Grid>
      <Button
        is_float
        text="+"
        _onClick={() => {
          history.push("/write");
        }}
      ></Button>
    </>
  );
};

export default Main;