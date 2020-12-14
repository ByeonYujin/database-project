import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import history from "../history";
import QS from "query-string";

import Styles from "./css/nav.module.scss";

const LOGO = process.env.PUBLIC_URL + "/cbnu128.png";

class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ""
        }
    }

    submitSearch = (event) => {
        event.preventDefault();
        if (this.state.search.length > 0) {
            history.push(`/main?keyword=${ this.state.search }`)
        }
    }

    updateSearch = (event) => {
        this.setState({ search: event.target.value });
    }

    logout = () => {
        history.push('/');
        localStorage.removeItem('token');
    }

    render() {
        const params = QS.parse(this.props.location.search)
        const searchHolder = params.keyword || null 

        return (<React.Fragment>
        <nav id={ Styles.main_nav } className="d-flex flex-row align-items-center p-3 no-select">
            <div id={ Styles.brand } className="d-flex flex-row align-items-center ml-3" onClick={ () => history.push("/main") } >
                <img src={ LOGO } alt="Logo"/>
                <h3 className="ml-2 my-0">CBNU Market</h3>
            </div>
            
            <form onSubmit={ this.submitSearch } className="mx-5 d-flex flex-row align-items-center">
                <i className="fas fa-search mx-2"></i>
                <input onChange={ this.updateSearch } placeholder="Search.." defaultValue={ searchHolder }></input>
            </form>
            
            <div id={ Styles.menu } className="d-flex flex-row-reverse mr-3">
                {
                    !localStorage.getItem('token') ? 
                        <NavLink to="/login" style={{textDecoration: "none", color: "black" }}>LOG IN / REGISTER</NavLink>
                        :
                        <React.Fragment>
                            <NavLink to="/main" onClick={ this.logout } style={{textDecoration: "none", color: "black" }}>LOG OUT</NavLink>
                            <NavLink to="/mypage" style={{textDecoration: "none", color: "black" }}>MY PAGE</NavLink>
                        </React.Fragment>
                }
            </div>
        </nav>
        { this.props.children }
        </React.Fragment>
        
        );
    }
}

export default withRouter(Navigation)