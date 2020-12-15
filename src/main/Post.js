import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";

import "./css/main.css";
import ProductPost from "./product/ProductPost";

export default function Main(props) {
    const params = props.match.params
    const id = params.id
    console.log(props.match)

    return (
        <Navigation>
            <div className="main-container">
                <br/><br/>
                <ProductPost id={ id } />
            </div>
        </Navigation>
    );
}