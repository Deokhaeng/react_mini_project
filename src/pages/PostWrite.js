import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  // console.log(params.id) //수정 중이면 id값 나옴

  const preview = useSelector((state) => state.image.preview);
  // console.log(preview) //추가페이지에서 리덕스값 초기화!! 
  const post_list = useSelector((state) => state.post.list); //최종 리스트

  const post_id = props.match.params.id;

  const is_edit = post_id ? true : false;
  // console.log(is_edit)

  let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;
  console.log(_post)  
  const [contents, setContents] = React.useState(_post ? _post.contents : "");
  // console.log(contents)

  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트 정보가 없어요!");
      history.goBack();

      return;
    }

    if (is_edit) { 
      //setPreview 링크 가져오자
      dispatch(imageActions.setPreview(_post.image_url));
    }else{
      dispatch(imageActions.setPreview(null));
    }
    
  }, []);


  const addPost = () => {
    dispatch(postActions.addPost(contents));
  };

  const editPost = () => {
    dispatch(postActions.editPost(post_id, { contents: contents }));
  };

  // if (!is_login) {
  //   return (  
  //     <Grid margin="100px 0px" padding="16px" center>
  //       <Text size="32px" bold>
  //         앗 잠깐!
  //       </Text>
  //       <Text size="16px">로그인 후에 글을 쓸 수 있슴당!</Text>
  //       <Button
  //         bg="#6A568B"
  //         _onClick={() => {
  //           history.replace("/login");
  //         }}
  //         text="로그인 하러 가기"
  //       ></Button>
  //     </Grid>
  //   );
  // }

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Grid is_flex>
          <Text margin="0px" size="36px" bold>
            {is_edit ? "게시글 수정" : "게시글 작성"}
          </Text>
        </Grid>

        <Upload />
      </Grid>
    
      <Grid>
        <Grid padding="16px">
          <Text margin="0px" size="24px" bold>
            미리보기
          </Text>
        </Grid>

        <Image
          shape="rectangle"
          src={preview ? preview : "https://ifh.cc/g/yY4z3M.png"}
        />
      </Grid>
      <Grid padding="16px">
        <Input
          value={contents}
          label="게시글 내용"
          placeholder="게시글 작성"
          multiLine
          _onChange={(e) => {
            console.log("!!");
            setContents(e.target.value);
          }}
        />
      </Grid>
  
      <Grid padding="16px">
        {is_edit ? (
          <Button text="게시글 수정" _onClick={editPost}></Button>
        ) : (
          <Button text="게시글 작성" _onClick={addPost}></Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
