import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import Entrance from "../pages/Entrance";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";
import Chat from "../pages/Chat";

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
          <Route path="/write" exact component={PostWrite} />
          <Route path="/modify/:post_id" exact component={PostWrite} />
          <Route path="/detail/:post_id" exact component={PostDetail} />
          <Route path="/Chat" exact component={Chat} />
        </ConnectedRouter>
      </Grid>
    </>
  );
}

export default App;
