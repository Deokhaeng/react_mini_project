import React from "react";

import {Route} from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';
import PostList from '../pages/PostList';
import PostWrite from "../pages/PostWrite";
import {Grid, Button} from '../elements'; 


function App() {
  return (
    <React.Fragment>
      <Grid>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/write" exact component={PostWrite}/>
          <Route path="/modify/:id" exact component={PostWrite}/>
        </ConnectedRouter >
      </Grid>
         <Button is_float text="+" _onClick={() => {history.push('/write');}}></Button>
    </React.Fragment>
  );
}

export default App;