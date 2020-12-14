import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { request } from "../../Axios";
import QS from "query-string";

import Thumbnail from "./ProductThumbnail"

import Styles from "./css/array.module.scss";
import Spinner from "./css/spinner.module.scss";

export default class ProductArray extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            page: props.page,
            loading: true
        }
    }

    getPage = () => {
        const params = QS.parse( this.props.search )
        params.page = this.state.page

        request("get", `post/page?${ QS.stringify(params) }`, { page: this.state.page })
        .then(res => {
            this.setState({ products: res.data.payload })
        })
        .catch(err => {
            console.log(err)
            alert("서버에 접속하는데 실패하였습니다. 잠시 후 다시 시도해주세요.")
        })
        .finally(() => {
            this.setState({ loading: false })
        })
    }

    componentDidMount() {
        this.getPage()
    }

    componentDidUpdate() {
        if (this.state.loading) {
            this.getPage()
        }
    }
    
    render() {
        return (
            <div id={ Styles.container }>
                <br/><br/>
                <div className="d-flex justify-content-between align-items-end no-select">
                    <h2 className="ml-3">상품 목록</h2>
                    <Link to="/test/editor">
                        <button id={ Styles.upload } className={ `${Styles.btn_upload} btn-md mr-3`}><i className="fas fa-plus-circle mr-2"></i>상품 등록</button>
                    </Link>
                </div>
                <hr/>
                {
                    this.state.loading ? 
                        <React.Fragment>
                            <div className={ Spinner.loader }>Loading...</div>
                            <h3 className={ Spinner.text }>Loading...</h3>
                        </React.Fragment>
                        :
                        <div id={ Styles.array }>
                        {
                            Object.keys(this.state.products).map(i => 
                                <NavLink key={i} style={{ textDecoration: "none", color: "black" }} to={`/product/${this.state.products[i].link}`}>
                                    <Thumbnail { ...this.state.products[i] }/>
                                </NavLink>
                            )
                        }
                        </div>
                }
            </div>
        ); 
    }
}