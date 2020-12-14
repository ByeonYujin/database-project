import React from "react";
import Navigation from "./Navigation";
import ProductArray from "./product/ProductArray";

export default function Main(props) {
    const params = props.match.params

    const page = params.page > 0 ? params.page : 1

    return (
        <React.Fragment>
            <Navigation/>
            <ProductArray page={ page } search={ props.location.search }/>
        </React.Fragment>
    );
}