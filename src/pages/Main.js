import React from "react";
// import Post from "../components/Post";
import Header from "../components/Header";
import Post from "../components/Post";
import { history } from "../redux/configureStore";

import { Grid, Button } from "../elements";

const Main = () => {
  return (
    <>
      <Grid>
        <Header />
        <Post />
      </Grid>
      <Button
        is_float
        text="+"
        _onClick={() => {
          history.push("/write");
        }}
      ></Button>
    </>
  );
};

export default Main;
