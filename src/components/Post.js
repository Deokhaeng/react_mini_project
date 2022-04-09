import React from "react";
import { Grid, Image, Text, Box} from "../elements/index";
// import Grid from "../elements/Grid";
// import Image from "../elements/Image";
// import Text from "../elements/Text";

const Post = (props) => {
  return (
    <React.Fragment>
      {/* Box:전체를 감싸는 카드박스 */}
      <Box>
        <Grid padding="3px" is_flex>
          <Text bold="700">{props.user_name}</Text>
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
  user_name: "yoo",
  image_url:
    "https://recipe1.ezmember.co.kr/cache/recipe/2016/10/07/f43063e718c49d85ddce4880e4a41fcd1.jpg",
  title: "떡볶이 이름",
  createdAt: "2022-04-08",
  content:
    "같이 인생에 보배를 아니더면, 할지라도 만천하의 낙원을 얼마나 원대하고, 힘있다. 심장은 희망의 얼음과 천하를 때문이다. 무엇이 청춘을 같이, 가슴이 그들을 발휘하기 설레는 살았으며, 생명을 이것이다. 영원히 커다란 쓸쓸한 사막이다. 실로 없으면, 풀이 꽃이 이상의 품으며, 기쁘며, 하는 생생하며, 이것이다. 이것이야말로 무엇을 꽃이 뛰노는 인간의 있는 싹이 무엇을 피부가 것이다. 위하여서, 옷을 살 있으랴?",
};

export default Post;
