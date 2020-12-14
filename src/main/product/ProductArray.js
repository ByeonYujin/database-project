import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { request } from "../../Axios";
import QS from "query-string";

import Thumbnail from "./ProductThumbnail";
import Spinner from "../Spinner";
import Pagination from "../Pagination";

import Styles from "./css/array.module.scss";

export default function ProductArray(props) {
    const [ products, setProducts ] = useState([])
    const [ page, setPage ] = useState(props.page)
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        if (loading) {
            const params = QS.parse( props.search )
            params.page = page

            request("get", `post/page?${ QS.stringify(params) }`, { page: page })
            .then(res => {
                setProducts(res.data.payload)
            })
            .catch(err => {
                console.log(err)
                alert("서버에 접속하는데 실패하였습니다. 잠시 후에 다시 시도해주세요.")
            })
            .finally(() => {
                setLoading(false)
            })
        }
    }, [loading, page, props])

    return (
        <React.Fragment>
            <div className="d-flex justify-content-between align-items-end no-select">
                <h2 className="ml-3">상품 목록</h2>
                {
                    localStorage.getItem('token') ? 
                    <Link to="/edit">
                        <button id={ Styles.upload } className={ `${Styles.btn_upload} btn-md mr-3`}><i className="fas fa-plus-circle mr-2"></i>상품 등록</button>
                    </Link>
                    : null
                }
            </div>
            <hr/>
            {
                loading ? 
                    <Spinner/>
                    :
                    <React.Fragment>
                        <div id={ Styles.array }>
                        {
                            Object.keys(products).map(i => 
                                <NavLink key={i} style={{ textDecoration: "none", color: "black" }} to={`/product/${products[i].link}`}>
                                    <Thumbnail { ...products[i] }/>
                                </NavLink>
                            )
                        }
                        </div>
                    <br/>
                    <hr/>
                    <Pagination/>
                    </React.Fragment>
            }
        </React.Fragment>
    ); 
}