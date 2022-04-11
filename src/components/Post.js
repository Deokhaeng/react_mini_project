import React from "react";
import { Grid, Image, Text, Button, Box } from "../elements";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as deleteActions } from "../redux/modules/post";

const Post = (props) => {
  const dispatch = useDispatch();

  const onClick = (e) => {
    e.stopPropagation();
    history.push(`/modify/${props.id}`);
  };

  const Delete = (e) => {
    e.stopPropagation();
    dispatch(deleteActions.deletePostFB(props.id));
  };

  return (
    <React.Fragment>
      {/* <Grid padding="20px">
        <Grid is_flex width="auto">
          <Image shape="circle" src={props.src} />
          <Text bold>{props.user_info.user_name}</Text>
          <Text>{props.insert_dt}</Text>
        </Grid>

        <Grid is_flex width="auto" margin="0% 0% 0% 48%">
          {props.is_me && (
            <Button
              width="40px"
              padding="5px 0px"
              margin="0% 3px 0% 70%"
              text="수정"
              _onClick={onClick}
            />
          )}
          {props.is_me && (
            <Button
              width="40px"
              padding="5px 0px"
              text="제거"
              _onClick={Delete}
            />
          )}
        </Grid>
        <Grid padding="16px" width="auto">
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.image_url} />
        </Grid>
        <Grid padding="16px">
          <Text bold>댓글 {props.comment_cnt}개</Text>
        </Grid>
      </Grid> */}
      <Box>
        <Grid padding="3px" is_flex>
          <Text bold="700">{props.id}</Text>
          <Grid is_flex width="auto" margin="0% 0% 0% 48%">
            {props.is_me && (
              <Button
                width="40px"
                padding="5px 0px"
                margin="0% 3px 0% 70%"
                text="수정"
                _onClick={onClick}
              />
            )}
            {props.is_me && (
              <Button
                width="40px"
                padding="5px 0px"
                text="제거"
                _onClick={Delete}
              />
            )}
          </Grid>
          <Text>{props.createdAt}</Text>
        </Grid>
        <Grid>
          <Image src={props.src} />
        </Grid>
        <Grid>
          <Text bold="700">{props.title}</Text>
          <Text>{props.content}</Text>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

Post.defaultProps = {
  id: "yoo",
  image_url:
    "https://recipe1.ezmember.co.kr/cache/recipe/2016/10/07/f43063e718c49d85ddce4880e4a41fcd1.jpg",
  title: "떡볶이 이름",
  createdAt: "2022-04-08",
  content:
    "같이 인생에 보배를 아니더면, 할지라도 만천하의 낙원을 얼마나 원대하고, 힘있다. 심장은 희망의 얼음과 천하를 때문이다. 무엇이 청춘을 같이, 가슴이 그들을 발휘하기 설레는 살았으며, 생명을 이것이다. 영원히 커다란 쓸쓸한 사막이다. 실로 없으면, 풀이 꽃이 이상의 품으며, 기쁘며, 하는 생생하며, 이것이다. 이것이야말로 무엇을 꽃이 뛰노는 인간의 있는 싹이 무엇을 피부가 것이다. 위하여서, 옷을 살 있으랴?",
};

export default Post;
