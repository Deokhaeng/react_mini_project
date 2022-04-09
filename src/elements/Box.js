import React from "react";
import styled from "styled-components";

const Box = (props) => {
    const {padding, margin, float, children} = props;
    const styles = {
        padding:padding,
        margin:margin,
        float,
    }
    return (
        <React.Fragment>
            <BoxDiv {...styles}>
                {children}
            </BoxDiv>
        </React.Fragment>
    )
}

Box.defaultProps = {
    children:null,
    padding:'16px',
    margin:'20px auto',
    float:false,
}

//카드박스전체를 감싸는 박스 
const BoxDiv = styled.div`
max-width: 350px;
min-height: 60vh;
background-color: #2B2B2B;
padding: ${(props)=>props.padding};
margin: ${(props)=>props.margin};
border-radius: 5px;
border: 1px solid #FFE05D;
box-shadow: #FFE05D  2.5px 2.5px 2.5px;


${(props) => (props.float ? `float:left;` : "")}
`

export default Box;


