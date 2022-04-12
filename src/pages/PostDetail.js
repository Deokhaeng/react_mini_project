import React from "react";
import Post from "../components/Post";
import { Box, Grid } from "../elements";
import { createAction as postActions } from "redux-actions";

import { useDispatch, useSelector } from "react-redux";
//db 임포트

const Detail = (props) => {
  const postNum = props.match.params.id;
  console.log(postNum);

  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);
  const post_idx = post_list.findIndex((p) => p.id === postNum);
  console.log(post_idx);
  const post = post_list[post_idx];
  console.log(post);

  return (
    <React.Fragment>
      <Post
        {...post}
      />
    </React.Fragment>
  );
};

export default Detail;