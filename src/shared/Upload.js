import React,{ useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";


const Upload = (props) => {
    const fileInput = useRef();
    const dispatch = useDispatch();
    const uploading = useSelector((state) => state.image.uploading);
    console.log(uploading)

    const selectFile = (e) =>{

        const reader = new FileReader(); //사진이 인풋에 들어갔을 때 가져올 것이라서 selectFile안에 써준다. 
        const file = fileInput.current.files[0];

        reader.readAsDataURL(file)  //어떤걸 넣고 싶은 지 

        reader.onloadend = () =>{ //읽기가 끝나면 발생하는 이벤트 핸들러  
            // console.log(reader.result); //result; 내용물 // 얘네를 이미지로 넣어주고 싶어! => PostWrite.js
            dispatch(imageActions.setPreview(reader.result));
        }
    }

    return (
        <React.Fragment>
            <input type="file" onChange={selectFile} ref={fileInput} disabled={uploading}/>
        </React.Fragment>
    )
}

export default Upload;