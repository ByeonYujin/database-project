import React from "react";

import Styles from "./css/spinner.module.scss";

export default function Spinner(props) {
    return (
        <React.Fragment>
            <div className={ Styles.loader }>Loading...</div>
            <h3 className={ Styles.text }>Loading...</h3>
        </React.Fragment>
    );
}