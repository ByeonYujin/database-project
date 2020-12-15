import React, { useEffect, useState } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { request } from "../../Axios";
import Spinner from "../Spinner";

import Styles from "./css/thumbnail.module.scss";
import Styles2 from "./css/post.module.scss";

const NO_IMAGE = process.env.PUBLIC_URL + "/no-image.png"
const IMAGE_HEAD = "https://res.cloudinary.com/"

const DIRECT = process.env.PUBLIC_URL + "/dtrade128.png"
const INDIRECT = process.env.PUBLIC_URL + "/itrade128.png"

const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

function Post(props) {
    const [ payload, setPayload ] = useState({})
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        request("post", `post/content/${props.match.params.id}`)
        .then(res => {
            setPayload(res.data.payload)
            console.log(payload)
        })
        .catch(err => {
            console.log(err)
            alert("서버에 접속하는데 실패하였습니다. 잠시 후에 다시 시도해주세요.")
        })
        .finally(() => {
            setLoading(true)
        })
    }, [props])

    return (
        <React.Fragment>
            <div className="d-flex justify-content-between align-items-end no-select">
                <h2 className="ml-3">상품 정보</h2>
            </div>
            <hr/>
            {
                !loading ? 
                    <Spinner/>
                    :
                    <div id={ Styles2.product }>
                        <img src={ IMAGE_HEAD + payload.images[0] } alt="preview"/>
                        <p>{ payload.parentCat } &gt; { payload.childCat }</p>
                        <h2>{ payload.title }</h2>
                        <hr/>
                        <div id={Styles.meta}>
                            <img src={ payload.profile ? payload.profile : NO_IMAGE } alt="profile"/>
                            <p>{ payload.writer }<br/>
                            { payload.province } { payload.city } { payload.town }
                            <br/></p>
                            <h4>가격 : { numberWithCommas( payload.price) } 원</h4>
                        </div>
                        <hr/>
                        {/* <h4>상세</h4> */}
                        <div id={Styles.meta2}>
                        <h4>상세</h4>
                        <p>{ payload.created }</p>
                         </div>
                         <text>{ payload.context }</text>
                        {/* <text>{ payload.context }</text>
                        <p>{ payload.created }</p> */}
                        <div id={ Styles.meta3 }>
                            <div name="direct" className={`${ Styles.trade_btn } ${ payload.direct ? Styles.selected : "" } text-center`}>
                                <img src={ DIRECT } alt="Direct" width="35" height="35"></img>
                                <br/>
                                <label htmlFor="trade-d">직거래</label>
                            </div>
                            <div name="indirect" className={`${ Styles.trade_btn } ${ payload.indirect ? Styles.selected : "" } text-center`}>
                                <img src={ INDIRECT } className="no-drag" alt="Indirect" width="35" height="35"></img>
                                <br/>
                                <label htmlFor="trade-i">배송</label>
                            </div>
                        </div>

                    </div>
            }
        </React.Fragment>
    ); 
}

export default withRouter(Post);