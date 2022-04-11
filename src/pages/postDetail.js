import React from "react";
import Post from "../components/Post";
import { Box, Grid } from "../elements";

import { useSelector } from "react-redux";

const Detail = (props) => {
  const post_id = props.match.params.id;

  const user_info = useSelector((state) => state.user.user);
  console.log(user_info);
  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);
  const post_idx = post_list.findIndex((p) => p.id === post_id);
  const post = post_list[post_idx];

  return (
    <React.Fragment>
      <Grid>
        <Post 
        // {...post} is_login={post.user_info.user_id === user_info.uid} 
        />
        {/* <Button is_delete text='삭제' width='40px' height='30px' _onClick={()=>{Delete()}} /> */}
      </Grid>
    </React.Fragment>
  );
};

export default Detail;