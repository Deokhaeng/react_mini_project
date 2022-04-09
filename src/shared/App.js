import "./App.css";
import React from "react";

import { BrowserRouter, Route } from "react-router-dom";

import Detail from "../pages/postDetail";
import Grid from "../elements/Grid";

import Header from "../components/Header";

function App() {
  return (
    <React.Fragment>
      {/* 헤더그리드 */}
      <Grid padding="1px">
        <Header />
      </Grid>
      <Grid top='10px'>
        <BrowserRouter>
          <Route path="/detail" exact component={Detail} />
        </BrowserRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
