import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { src, size } = props;
  const styles = {
    src: src,
    size: size,
  };
  return (
    <React.Fragment>
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    </React.Fragment>
  );
};

Image.defaultProps = {
  src: "https://recipe1.ezmember.co.kr/cache/recipe/2016/10/07/f43063e718c49d85ddce4880e4a41fcd1.jpg",
  size: 120,
};
//url 지정 가능
const AspectOutter = styled.div`
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

export default Image;

// import styled from "styled-components";
// import React from "react";

// const Image = (props) => {
//   const { shape, src, size } = props;

//   const styles = {
//     src: src,
//     size: size,
//   };

//   if (shape === "circle") {
//     return <ImageCircle {...styles}></ImageCircle>;
//   }

//   if (shape === "rectangle") {
//     return (
//       <AspectOutter>
//         <AspectInner {...styles}></AspectInner>
//       </AspectOutter>
//     );
//   }

//   return (
//     //padding-top 으로 반응형 이미지 비율을 맞추기 위해 외부div에 최대 넓이와 최소 넓이를 설정해준다!
//     <React.Fragment>
//       <ImageDefault {...styles}></ImageDefault>
//     </React.Fragment>
//   );
// };

// Image.defaultProps = {
//   shape: "circle",
//   src: "https://ifh.cc/g/AOA4Wq.jpg",
//   size: 36,
// };

// const ImageCircle = styled.div`
//   --size: ${(props) => props.size}px; //여러개 표기할때,
//   width: var(--size);
//   height: var(--size);
//   border-radius: var(--size);
//   background-image: url("${(props) => props.src}");
//   background-size: cover;
//   margin: 8px;
// `;

// const AspectOutter = styled.div`
//   width: 100%;
//   min-width: 250px;
// `;

// const AspectInner = styled.div`
//   position: relative;
//   padding-top: 100%; //padding (세로/가로*100)%
//   overflow: hidden;
//   background-image: url("${(props) => props.src}");
//   background-size: cover;
// `;
// const ImageDefault = styled.div`
//   size: ${(props) => props.size}px;
//   width: var(--size);
//   height: var(--size);
//   background-image: url("${(props) => props.src}");
//   background-size: cover;
// `;

// export default Image;
