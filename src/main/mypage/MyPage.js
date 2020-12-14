import React, { Component } from "react";
import Styles from "./css/mypage.module.scss";

const NO_IMAGE = process.env.PUBLIC_URL + "/no-image.png"

export default class MyPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
    render() {
        return (
            <React.Fragment>
                <h3 id={ Styles.editorTitle }>마이페이지</h3>
                <div>

                </div>
                <img src={ NO_IMAGE } alt="ProfileImage"></img>
            </React.Fragment>
            );
    }
}