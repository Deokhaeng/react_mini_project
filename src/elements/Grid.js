import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex,
    margin_left,
    margin_right,
    width,
    padding,
    margin,
    bg,
    children,
  } = props;
  const styles = { is_flex, width, padding, margin, bg, margin_left, margin_right};
  return (
    <React.Fragment>
      <GridBox {...styles}>{children}</GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  margin_left: false,
  margin_right: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
};
//그리드
//width, padding, margin, bg-color, is_flex(가로정렬), margin_left(왼쪽 오토 마진) value지정 가능
const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;

  ${(props) => (props.padding ? `padding:${props.padding}` : "")}
  ${(props) => (props.margin ? `margin:${props.margin}` : "")}
  ${(props) => (props.bg ? `background-color:${props.bg}` : "")}

  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content:space-between;`
      : ""}

  ${(props) => (props.margin_left ? `margin-left:auto;` : "")}
  ${(props) => (props.margin_right ? `margin-right:auto;` : "")}
`;

export default Grid;
