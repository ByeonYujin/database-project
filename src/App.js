import React from "react";

import './App.css';
<<<<<<< Updated upstream
import Navigation from "./main/Navigation";
import AccountContainer from "./account/Container";
import Main from "./main/Main";
import Write from "./main/Write";
=======
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "./main/Navigation";
import AccountContainer from "./account/Container";
import Product from "./main/ProductThumbnail";
import ImageTest from "./main/ImageUpload";
import EditorTest from "./main/PostEditor";
>>>>>>> Stashed changes

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact={ true } component={ Navigation }/>
          <Route path="/login" component={ AccountContainer }/>
          <Route path="/main" component={ Product }/>
          <Route path="/test/image" component={ ImageTest }/>
          <Route path="/test/editor" component={ EditorTest }/>
        </Switch>
      </Router>
    </React.Fragment>
    // 
  );
}

export default App;
