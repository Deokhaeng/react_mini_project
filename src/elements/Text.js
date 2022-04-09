import React from "react";
import styled from "styled-components";

const Text = (props) => {

    const {bold, color, size, children} = props;
    const styles = {bold, color, size,}
    return ( 
        <React.Fragment>
            <Textbox {...styles}>
                {children}
            </Textbox>
        </React.Fragment>
    )
}

Text.defaultProps = {
    bold : false,
    color : '#222831',
    size:'16px',
}
//텍스트박스:color, font-size, bold value 지정 가능
const Textbox = styled.p`
color : ${(props)=>props.color};
font-size:${(props)=>props.size};
font-weight: ${(props)=>props.bold};
`

export default Text;