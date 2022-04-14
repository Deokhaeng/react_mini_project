import React from "react";
import Post from "../components/Post";
import { Box, Grid } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
//db 임포트
const Detail = (props) => {
  const dispatch = useDispatch();

  const postNum = props.match.params.post_id;

  console.log(postNum);

  const post_list = useSelector((state) => state.post.list);

  console.log(post_list);

  const post_idx = post_list.findIndex((p) => p.post_id == postNum);

  console.log(post_idx);

  const post = post_list[post_idx];

  console.log(post);

  React.useEffect(() => {
    dispatch(postActions.getPostDB(postNum));
  }, []);
  return (
    <React.Fragment>
      <Grid padding='50px' _onClick={()=>{history.push('/main')}}>
        {post && (
        <Post 
          {...post}
          // is_me={post.user_info.user_id === user_info?.uid}
        />
      )}
      </Grid>
      
    </React.Fragment>
  );
};
export default Detail;