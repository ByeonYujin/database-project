import React from "react";
import Styles from "./css/thumbnail.module.scss";

const NO_IMAGE = process.env.PUBLIC_URL + "/no-image.png"

const DIRECT = process.env.PUBLIC_URL + "/dtrade128.png"
const INDIRECT = process.env.PUBLIC_URL + "/itrade128.png"

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function ProductThumbnail(props) {

    return (

        <div id={ Styles.product } className="no-select" >
            <img src={ NO_IMAGE } alt="ProductImage"></img>
            <h4 id={ Styles.title }>Very Very Long Product Name</h4>
            <div className="d-flex">
                <h4 id={ Styles.price }>{numberWithCommas(100000)}</h4><h4 id={ Styles.unit }>원</h4>
            </div>
            <p>OO시 OO구 OO동</p>
            <div id={ Styles.meta }>
                <span>채팅 3 | 찜 {numberWithCommas(5)}</span>
                <img src={ DIRECT } alt="direct"></img>
                <img src={ INDIRECT } alt="indirect"></img>
            </div>
            
            <div></div>
        </div>
    );
}