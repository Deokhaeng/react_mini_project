import React from "react";
import styled from "styled-components";

const Box = (props) => {
    const {padding, margin, children} = props;
    const styles = {
        padding:padding,
        margin:margin,
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
}

//카드박스전체를 감싸는 박스 
const BoxDiv = styled.div`
max-width: 350px;
min-height: 60vh;
background-color: #FDF6EC;
padding: ${(props)=>props.padding};
margin: ${(props)=>props.margin};
border-radius: 5px;
border: 1px solid #ddd;
`

export default Box;


