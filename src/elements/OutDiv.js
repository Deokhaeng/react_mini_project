import React from "react";
import styled from "styled-components";

const OutDiv = (props) => {
  const { padding, margin, float, _onClick, children } = props;
  const styles = {
    padding: padding,
    margin: margin,
    float,
    _onClick,
  };
  return (
    <React.Fragment>
      <Out {...styles} onClick={_onClick}>
        {children}
      </Out>
    </React.Fragment>
  );
};

OutDiv.defaultProps = {
  children: null,
  padding: "16px",
  margin: "20px auto",
  float: false,
  _onClick: () => {},
};

//카드박스전체를 감싸는 박스
const Out = styled.div`
  padding: 2%;
  margin: 5%;
  border-radius: 5px;
  display:grid;
  grid-template-columns:1fr 1fr 1fr;
`;

export default OutDiv;
