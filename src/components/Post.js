
import React from "react";
import { Grid, Image, Text, Button, Box } from "../elements";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as deleteActions } from "../redux/modules/post";
import user, { actionCreators as userActions } from "../redux/modules/user";
import styled from 'styled-components';

const Post = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  // console.log(post_list)
  console.log(props.id);
  const user_id = useSelector((state) => state.user.user_id);
  console.log(user_id);
  React.useEffect(() => {
    dispatch(userActions.getUserDB());
  }, []);
  const onClick = (e) => {
    e.stopPropagation();
    history.push(`/modify/${props.post_id}`);
  };
  const Delete = (e) => {
    e.stopPropagation();
    dispatch(deleteActions.deletePostDB(props.post_id));
    console.log(props.post_id)
  };
  return (
    <React.Fragment>
      <Box padding='30px' >
        <Grid
        _onClick={() => {
          history.push(`/detail/${props.post_id}`);
        }}
      >
        <Grid is_flex width="auto">
          <Image shape="circle" src={props.src} />
          <Text bold='700' margin='0px 40px 15px 0px'>ID : {props.id}</Text>
          <Text>{props.createdAt}</Text>
        </Grid>
        {user_id===props.id && (
          <Grid is_flex width="auto" margin="0% 0% 0% 48%">
            <Button
              width="40px"
              padding="5px 0px"
              margin="0% 3px 0% 70%"
              text="수정"
              _onClick={onClick}
            />
            <Button
              width="40px"
              padding="5px 0px"
              text="제거"
              _onClick={Delete}
            />
          </Grid>
        )}
        <Grid padding="16px" width="auto">
          <Text bold>제목 : {props.title}</Text>
          <Text>내용 : {props.content}</Text>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.image} />
        </Grid>
      </Grid>
      </Box>
    </React.Fragment>
  );
};

  
export default Post;