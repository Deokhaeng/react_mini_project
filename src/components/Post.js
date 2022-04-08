import React from "react";
import Grid from "../elements/Grid";
import Image from "../elements/Image";
import Text from "../elements/Text";

const Post = (props) => {
  return (
    <React.Fragment>
      <Grid padding="18px">
          <Text bold>{props.user_name}</Text>
          <Text bold>{props.insert_dt}</Text>
        {/* <div>user name / insert_dt / is_me (edit btn)</div> */}
      </Grid>
      <Grid padding="20px">
          <Image src={props.src}/>
      </Grid>
      <Grid>title / contents</Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_name: "yoo",
  image_url:
    "https://recipe1.ezmember.co.kr/cache/recipe/2016/10/07/f43063e718c49d85ddce4880e4a41fcd1.jpg",
  title: "랜선떡볶이단",
  insert_dt: "2022-04-08",
  contents:
    "같이 인생에 보배를 아니더면, 할지라도 만천하의 낙원을 얼마나 원대하고, 힘있다. 심장은 희망의 얼음과 천하를 때문이다. 무엇이 청춘을 같이, 가슴이 그들을 발휘하기 설레는 살았으며, 생명을 이것이다. 영원히 커다란 쓸쓸한 사막이다. 실로 없으면, 풀이 꽃이 이상의 품으며, 기쁘며, 하는 생생하며, 이것이다. 이것이야말로 무엇을 꽃이 뛰노는 인간의 있는 싹이 무엇을 피부가 것이다. 위하여서, 옷을 살 있으랴? 인생을 것이 때까지 얼마나 있는 것이다. 공자는 몸이 든 창공에 위하여서, 별과 품었기 이것이다. 갑 이상 보는 이 위하여서. 전인 싶이 옷을 때문이다. 천지는 시들어 들어 싸인 눈이 고행을 대중을 것이다. 주며, 두기 얼음이 인간은 황금시대의 없으면 봄바람을 있는 피다. 거선의 같이, 용기가 것이다. 보이는 평화스러운 가는 어디 인간에 인생을 그리하였는가? 것은 밥을 것이다.보라, 대중을 얼음에 눈에 그것을 그들은 불러 아름다우냐? 위하여서 위하여 봄바람을 인생의 아니다. 끝까지 실현에 관현악이며, 지혜는 몸이 바이며, 광야에서 있다. 내는 있는 그러므로 일월과 원대하고, 밝은 할지니, 꽃이 이상의 끓는다. 것은 설산에서 그러므로 찾아다녀도, 석가는 위하여서 가장 부패뿐이다. 심장은 눈이 가지에 가는 것이다. 날카로우나 뭇 같이, 대한 못할 얼음과 온갖 교향악이다. 영원히 품에 기관과 노년에게서 청춘의 끓는다. 거선의 스며들어 크고 방황하였으며, 과실이 설산에서 바이며, 품었기 피어나는 듣는다. 뛰노는 장식하는 못하다 투명하되 긴지라 봄바람이다. 돋고, 날카로우나 봄바람을 피어나기 붙잡아 이것이다. 같으며, 청춘의 영락과 듣기만 피고, 봄바람을 그들을 피다. 그러므로 되는 되려니와, 꾸며 그들의 그들은 사랑의 주며, 생명을 봄바람이다. 가장 위하여서 천고에 그리하였는가?",
};

export default Post;
