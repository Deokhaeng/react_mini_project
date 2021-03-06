import React from "react";
import styled from "styled-components";
import '../shared/App.css';

const Box = (props) => {
  const { padding, margin, float, _onClick, children } = props;
  const styles = {
    padding: padding,
    margin: margin,
    float,
    _onClick,
  };
  return (
    <React.Fragment>
      <BoxDiv {...styles} onClick={_onClick}>
        {children}
      </BoxDiv>
    </React.Fragment>
  );
};

Box.defaultProps = {
  children: null,
  padding: "16px",
  margin: "20px auto",
  float: false,
  _onClick: () => {},
};

//카드박스전체를 감싸는 박스
const BoxDiv = styled.div`
  max-width: 1000px;
  width:400px;
  height: 60vh;
  background-color: white;
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 10px 0px gray;
  flex-wrap: wrap;
  flex-direction: row;
  ${(props) => (props.float ? `float:left;` : "")}
  font-family: 'Cafe24Ohsquareair';
`;

export default Box;
