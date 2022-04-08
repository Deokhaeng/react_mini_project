import React from "react";

import {BrowserRouter, Route} from "react-router-dom";
// import { history } from '../redux/configureStore';
import PostWrite from "../pages/PostWrite";
import PostList from "../pages/PostList";
import {Grid} from '../elements';

function App() {

  return (
    <React.Fragment>
      <Grid isRoot>
        <BrowserRouter>
        {/* <ConnectedRouter history={history}> */}
          <Route path='/' exact component={PostList}/>
          <Route path="/write" exact component={PostWrite}/>
          <Route path="/modify/:id" exact component={PostWrite}/>
        {/* </ConnectedRouter > */}
        </BrowserRouter>
      </Grid> 
    </React.Fragment>
  );
}

export default App;