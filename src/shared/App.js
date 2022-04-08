import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import Entrance from "../pages/Entrance";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../components/Header";

import Grid from "../elements/Grid";

function App() {
  return (
    <>
      <Grid>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Entrance} />

          <Route path="/main">
            <Main />
          </Route>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        </ConnectedRouter>
      </Grid>
    </>
  );
}

export default App;
