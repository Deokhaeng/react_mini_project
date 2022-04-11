import React from "react";
import styled from "styled-components";

const Box = (props) => {
    const {padding, margin, float, _onClick, children} = props;
    const styles = {
        padding:padding,
        margin:margin,
        float,
        _onClick,
    }
    return (
        <React.Fragment>
            <BoxDiv {...styles} onClick={_onClick}>
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
    _onClick:()=>{},
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
flex-wrap:wrap;
flex-direction: row;


${(props) => (props.float ? `float:left;` : "")}
`

export default Box;


