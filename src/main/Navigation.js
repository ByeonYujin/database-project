import React from "react";

import Styles from "./css/nav.module.scss";

const LOGO = process.env.PUBLIC_URL + "/cbnu128.png";

export default class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ""
        }
    }

    submitSearch = (event) => {
        event.preventDefault();
        if (this.state.search.length === 0) {
            console.log("None")
        }
        else {
            console.log(this.state.search);
            this.setState({ search: "" });
        }
    }

    updateSearch = (event) => {
        this.setState({ search: event.target.value });
    }

    render() {
        return <React.Fragment>

        <nav id={ Styles.main_nav }
             className="d-flex flex-row align-items-center p-3 no-select">
            
            <div id={ Styles.brand } className="d-flex flex-row align-items-center ml-3">
                <img src={ LOGO } alt="Logo"/>
                <h3 className="ml-2 my-0">CBNU Market</h3>
            </div>
            
            <form onSubmit={ this.submitSearch } className="mx-5 d-flex flex-row align-items-center">
                <i className="fas fa-search mx-2"></i>
                <input onChange={ this.updateSearch } placeholder="Search.."></input>
            </form>
            
            <div id={ Styles.menu } className="d-flex flex-row-reverse mr-3">
                <a href="/#">LOG OUT</a>
                <a href="/#">MY PAGE</a>
            </div>
        </nav>

        </React.Fragment>
    }
}