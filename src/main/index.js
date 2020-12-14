import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import ProductArray from "./product/ProductArray";

import "./css/main.css";

export default function Main(props) {
    const params = props.match.params
    const page = params.page > 0 ? params.page : 1

    return (
        <Navigation>
            <div className="main-container">
                <br/><br/>
                <ProductArray page={ page } search={ props.location.search }/>
            </div>
        </Navigation>
    );
}