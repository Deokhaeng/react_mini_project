import React from "react";
import { useEffect } from "react";
import io from "socket.io-client";
import { Grid, Input } from "../elements/index"

const socket = io.connect("http://localhost:3000");
socket.emit("inti", { name: "yoo" });

const Chat = () => {
    useEffect(() => {
        return () => {
            socket.close();
        }
    }, []);

    return (
        <Grid>
            <Input></Input>
        </Grid>
    )
}

export default Chat;