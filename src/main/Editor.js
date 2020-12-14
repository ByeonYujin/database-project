import React, { useEffect, useState } from "react";

import Navigation from "./Navigation";
import ProductEditor from "./product/ProductEditor";
import Spinner from "./Spinner";

import "./css/main.css";
import { request } from "../Axios";
import history from "../history";

export default function Editor(props) {

    const [ member, setMember ] = useState(false)

    useEffect(() => {
        request("get", "auth/member")
        .then(res => {
            setMember(true)
        })
        .catch(err => {
            console.log(err)
            
            alert("로그인이 필요한 서비스입니다.")
            history.push("/main")
        })
    }, [])

    return (
        <Navigation>
            <div className="main-container">
                <br/><br/>
                {
                    member ? 
                    <ProductEditor/> : <Spinner/>
                }
            </div>
        </Navigation>
    );
}