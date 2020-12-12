import React from "react";
import {Route, Link, Switch} from "react-router-dom";
import Home from './Home'
import Write from './Write'

import "./css/main.css"

// const LOGO = process.env.PUBLIC_URL + "/cbnu128.png";
export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    
    render() {
        return <React.Fragment>

       <div className='Mains'> 
          <div id='Mains-left'>
            <h3> Left Side </h3>
          </div>

          <div>
            {/* <Route path='/' component={Home} exact/>
            <Route path='/write' component={Write} /> */}
          </div>

          <div id='Mains-right'>
            <h3> Right Side </h3>
          </div>
        </div>

        </React.Fragment>
    }
}