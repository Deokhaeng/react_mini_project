import React, { useCallback, useEffect, useState } from "react";
import "../shared/Chat.css";
import io from "socket.io-client";
import { Box, Button, Grid, Input } from "../elements";

import { useSelector, useDispatch } from "react-redux";

import { actionCreators as userActions } from "../redux/modules/user";

const socket = io.connect("ws://3.38.253.146:80");

socket.emit("init", { name: "jaehoon" });

const Chat = (props) => {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.user.user_id);
  console.log(user_id);
  const [chatArr, setChatArr] = useState([]);
  const [chat, setChat] = useState({ name: "", message: "" });

  React.useEffect(() => {
    dispatch(userActions.getUserDB());
  }, []);

  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.on("receive message", (message) => {
      setChatArr((chatArr) => chatArr.concat(message));
    }); //receive message이벤트에 대한 콜백을 등록해줌
  }, []);

  const buttonHandler = useCallback(() => {
    socket.emit("send message", { name: chat.name, message: chat.message });
    //버튼을 클릭했을 때 send message이벤트 발생
  }, [chat]);

  const changeMessage = useCallback(
    (e) => {
      setChat({ name: chat.name, message: e.target.value });
    },
    [chat]
  );

  return (
    <Box>
      <Grid className="Box">
        <Grid>
          {chatArr.map((ele, idx) => (
            <div className="Chat" key={idx}>
              <div>{user_id}</div>
              <div className="ChatLog">{ele.message}</div>
            </div>
          ))}
        </Grid>
        <Grid is_flex>
          <Input placeholder="  내용" _onChange={changeMessage}></Input>
          <Button _onClick={buttonHandler} width="130px">
            등록
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
