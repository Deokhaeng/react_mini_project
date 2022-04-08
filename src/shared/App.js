import logo from '../logo.svg';
import './App.css';
import React from 'react';

import {BrowserRouter, Route} from "react-router-dom";

import Detail from '../pages/postDetail';

import Header from '../components/Header';

function App() {
  return (
    <React.Fragment>
      <Header/>
      <BrowserRouter>
        <Route path="/detail" exact component={Detail} />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
