import React from "react";

import './Font.css';
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import AccountContainer from "./account/Container";

import Main from "./main";
import Editor from "./main/Editor";

import Post from "./main/Post";

import MyPage from "./main/mypage/MyPage";
import SendMessage from "./main/message/SendMessage";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/login" component={ AccountContainer }/>

          <Route path="/main/:page?" component={ Main }/>
          <Route path="/edit/:page?" component={ Editor }/>
          <Route path="/product/:id" component={ Post }/>

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
