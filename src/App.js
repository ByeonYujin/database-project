import React from "react";

import './Font.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "./main/Navigation";
import AccountContainer from "./account/Container";

import Product from "./main/product/ProductThumbnail";
import EditorTest from "./main/product/ProductEditor";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact={ true } component={ Navigation }/>
          <Route path="/login" component={ AccountContainer }/>
          <Route path="/main" component={ Product }/>
          <Route path="/test/editor" component={ EditorTest }/>
        </Switch>
      </Router>
    </React.Fragment>
    // 
  );
}

export default App;
