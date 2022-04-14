import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { src, size, width, height, is_contents } = props;
  const styles = {
    src: src,
    size: size,
    width,
    height,
    is_contents,
  };

  return (
    <React.Fragment>
      <AspectOutter {...styles}>
        <AspectInner></AspectInner>
      </AspectOutter>
    </React.Fragment>
  );
};

//url 지정 가능
const AspectOutter = styled.div`
  background-image: url("${(props) => props.src}");
  background-size: cover;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 100%;//padding (세로/가로*100)% 
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

export default Image;