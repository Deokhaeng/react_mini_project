import React from "react";
import styled from "styled-components";

const Image = (props) => {
    const {src, size} = props;
    const styles = {
        src: src,
        size: size,
    }
    return (
        <React.Fragment>
            <AspectOutter>
                <AspectInner {...styles}></AspectInner>
            </AspectOutter>
        </React.Fragment>
    )
}

Image.defaultProps = {
    src : "https://recipe1.ezmember.co.kr/cache/recipe/2016/10/07/f43063e718c49d85ddce4880e4a41fcd1.jpg",
    size : 120, 
}
//url 지정 가능
const AspectOutter = styled.div`
    background-image: url('${(props)=>props.src}');
    background-size:cover;
`

const AspectInner = styled.div`
    position:relative;
    padding-top:75%;
    overflow: hidden;
    background-image: url('${(props)=>props.src}');
    background-size:cover;
`

export default Image;