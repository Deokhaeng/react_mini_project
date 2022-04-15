import React from "react";
import { MdClear } from "react-icons/md";
import { Grid, Text, Button, Image, Input, Box } from "../elements";
import Upload from "../shared/Upload";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostEdit = (props) => {
  const fileInput = React.useRef();
  const uploading = useSelector((state) => state.image.uploading);
  const is_postEdit = useSelector((state) => state.image.is_postEdit);
  console.log(is_postEdit);

  const { history } = props;
  const dispatch = useDispatch();
  // console.log(params.id) //수정 중이면 id값 나옴
  // const is_login= useSelector((state)=> state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  // console.log(preview) //추가페이지에서 리덕스값 초기화!! //확인완료
  const post_list = useSelector((state) => state.post.list); //최종 리스트
  console.log(post_list);

  const post_list_2 = useSelector((state) => state.post.list);
  console.log(post_list_2);
  const post_id = props.match.params.post_id;
  console.log(post_id); //확인완료

  const is_edit = post_id ? true : false;
  console.log(is_edit); //확인완료

  let _post = is_edit ? post_list.find((p) => p.post_id == post_id) : null;
  console.log(_post); //확인완료

  const [title, setTitle] = React.useState(_post ? _post.title : "");
  console.log(title);
  const [content, setContent] = React.useState(_post ? _post.content : "");
  // console.log(contents)

  React.useEffect(() => {
    //리렌더링 체크 issue
    dispatch(imageActions.setPreview(_post.image));
  }, []);

  const selectFile = (e) => {
    const reader = new FileReader(); //사진이 인풋에 들어갔을 때 가져올 것이라서 selectFile안에 써준다.
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file); //어떤걸 넣고 싶은 지

    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const editPost = () => {
    const file = fileInput.current.files[0];
    console.log(file);

    const formData = new FormData();

    formData.append("image", file);
    formData.append("title", title);
    formData.append("content", content);
    console.log("formData", formData);

    dispatch(postActions.editPostDB(formData, post_id));
    // history.push('/main')
  };

  console.log(post_list);
  return (
    <React.Fragment>
      <Box>
        <Grid padding="16px">
          <Grid margin="0% 0% 0% 95%">
            <MdClear
              size={30}
              onClick={() => {
                history.push("/main");
              }}
            />
          </Grid>

          <Grid is_flex>
            <Text size="30px" bold>
              {"게시글 수정"}
            </Text>
          </Grid>

          <input
            type="file"
            onChange={selectFile}
            ref={fileInput}
            disabled={uploading}
          />
        </Grid>

        <Grid>
          <Grid padding="16px">
            <Text margin="0px" size="24px" bold>
              미리보기
            </Text>
          </Grid>

          <Image shape="rectangle" src={preview}></Image>
        </Grid>
        <Grid padding="16px">
          <Input
            value={title}
            label="게시글 제목"
            multiLine
            placeholder="제목을 작성해 주세요."
            _onChange={(e) => {
              console.log("!!");
              setTitle(e.target.value);
            }}
          />
          <Input
            value={content}
            label="게시글 내용"
            placeholder="내용을 작성해 주세요."
            multiLine
            _onChange={(e) => {
              console.log("!!");
              setContent(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px">
          <Button text="게시글 수정" _onClick={editPost}></Button>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default PostEdit;
