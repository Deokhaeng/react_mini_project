import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { bold, color, size, children, textIndent, _onClick } = props;
  const styles = { bold, color, size, textIndent, _onClick };
  return (
    <React.Fragment>
      <Textbox {...styles}>{children}</Textbox>
    </React.Fragment>
  );
};

Text.defaultProps = {
  bold: false,
  color: "#222831",
  size: "16px",
  textIndent: false,
  _onClick: () => {},
};
//텍스트박스:color, font-size, bold value 지정 가능
const Textbox = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.bold};
  text-indent: ${(props) => props.textIndent};
`;

export default Text;

// import React from "react";
// import styled from "styled-components";

// const Text = (props) => {
//   const { bold, color, size, children, margin } = props;

//   const styles = { bold: bold, color: color, size: size, margin };
//   return <P {...styles}>{children}</P>;
// };

// Text.defaultProps = {
//   children: null,
//   bold: false,
//   color: "#222831",
//   size: "14px",
//   margin: false,
// };

// const P = styled.p`
//   color: ${(props) => props.color};
//   font-size: ${(props) => props.size};
//   font-weight: ${(props) => (props.bold ? "600" : "400")};
//   ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
// `;

// export default Text;
