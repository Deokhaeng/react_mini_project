import React, { useRef, useState} from "react";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";
import axios from "axios";


const Upload = (props) => {
  const fileInput = useRef();
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.image.uploading); 
//   console.log(uploading);

  const selectFile = (e) => {
    const reader = new FileReader(); //사진이 인풋에 들어갔을 때 가져올 것이라서 selectFile안에 써준다.
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file); //어떤걸 넣고 싶은 지 

    reader.onloadend = () => { //
      //읽기가 끝나면 발생하는 이벤트 핸들러 
      // console.log(reader.result); //result; 내용물 // 얘네를 이미지로 넣어주고 싶어! => PostWrite.js
      // if (file === undefined) {
      //   dispatch(setPreview(null));
      // } else {
      //    reader.readAsDataURL(file);
      //    reader.onloadend = () => {
      //      //  console.log(reader.result);
      //     dispatch(setPreview(reader.result));
      //   };
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const fileUploadHandler = (title, content) => {
    if (!fileInput.current || fileInput.current.files.length === 0) {
          window.alert("파일을 선택해주세요!");
          return;
    }
    const file = fileInput.current.files[0];

    const formData = new FormData();

    formData.append('image', file);
    formData.append('title', title);
    formData.append('content', content);
    console.log('formData', formData);

    return(
      axios({
      method: "post",
      url: 'http://3.38.253.146/write_modify/user/postadd',
      data: formData,
      headers: { "Content-Type": "multipart/form-data", Authorization: localStorage.getItem("access_token") } //Bearer
    })
    )
  };
  console.log(fileUploadHandler)

  return (
    <React.Fragment>
      <input
        type="file"
        onChange={selectFile}
        ref={fileInput}
        disabled={uploading}
      />
      {/* <button type="button" onClick={fileUploadHandler}/> */}
      {/* <FileUploader handleChange={fileUploadHandler} name="file" types={fileTypes} /> */}
    </React.Fragment>
  );
};

export default Upload;