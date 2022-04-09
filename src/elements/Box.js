import React from "react";
import styled from "styled-components";

const Box = (props) => {
    const {padding, margin, children, width} = props;
    const styles = {
        padding:padding,
        margin:margin,
        width: width,
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
    width:'500px',
    children:null,
    padding:'16px',
    margin:'20px auto',
}

//카드박스전체를 감싸는 박스 
const BoxDiv = styled.div`
width: ${(props)=> props.width};
min-height: 60vh;
background-color: #FDF6EC;
padding: ${(props)=>props.padding};
margin: ${(props)=>props.margin};
border-radius: 5px;
border: 1px solid #ddd;
`

export default Box;

