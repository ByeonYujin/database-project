import React from "react";

import './Font.css';
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import AccountContainer from "./account/Container";

import Main from "./main";
import EditorTest from "./main/product/ProductEditor";
import MyPage from "./main/mypage/MyPage";
import SendMessage from "./main/message/SendMessage";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/main/:page?" component={ Main }/>
          <Route path="/login" component={ AccountContainer }/>
          <Route path="/test/editor" component={ EditorTest }/>
          <Route path="/mypage" component={ MyPage }></Route>
          <Route path="/test/message" component={ SendMessage }></Route>
          <Redirect to="/main"/>
        </Switch>
      </Router>
    </React.Fragment>
    // 
  );
}

export default App;
