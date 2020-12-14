import React from "react";

import Styles from "./css/thumbnail.module.scss";

const NO_IMAGE = process.env.PUBLIC_URL + "/no-image.png"
const IMAGE_HEAD = "https://res.cloudinary.com/"

const DIRECT = process.env.PUBLIC_URL + "/dtrade128.png"
const INDIRECT = process.env.PUBLIC_URL + "/itrade128.png"

const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export default function ProductThumbnail(props) {

    const image = props.thumbnail ? IMAGE_HEAD + props.thumbnail : NO_IMAGE
    const title = props.title || "제품"
    const price = props.price || 0

    const province = props.province || "OO시"
    const city = props.city || "OO구"
    const town = props.town || "OO동"

    const chatNum = props.chatNum || 0
    const likeNum = props.likeNum || 0

    const direct = props.direct || false
    const indirect = props.indirect || false

    return (
        <div id={ Styles.product } className="no-select no-drag">
            <img src={ image } alt="ProductImage" width="200" height="200"></img>
            <h4 id={ Styles.title }>{ title }</h4>
            <div className="d-flex">
                { props.price > 0 ? 
                    <React.Fragment>
                        <h4 id={ Styles.price }>{numberWithCommas(price)}</h4><h4 id={ Styles.unit }>원</h4>
                    </React.Fragment> 
                    : <h4 id={ Styles.price }>무료 나눔</h4>
                }
            </div>
            <p>{ province } { city } { town }</p>
            <div id={ Styles.meta }>
                <span>채팅 { numberWithCommas(chatNum) } | 찜 { numberWithCommas(likeNum) }</span>
                <img src={ DIRECT } className={ direct ? "" : Styles.disable } alt="direct"></img>
                <img src={ INDIRECT } className={ indirect ? "" : Styles.disable } alt="indirect"></img>
            </div>
            
            <div></div>
        </div>
    );
}