import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

import { request } from "../Axios";

const getPageNumbers = (current, count) => {
    if (count < 4) {
        return [ ...Array(count + 1).keys() ].slice(1)
    }
    else if (current <= 4) {
        return [1, 2, 3, 4, 5]
    }
    else if (current > count - 4) {
        return [ ...Array(5).keys() ].reverse().map(i => count - i)
    }
    else {
        return [ ...Array(5).keys() ].reverse().map(i => current + 2 - i)
    }
}

const getPageLink = (path, search, idx) => {
    return path.substring(0, 6) + `${idx}/${search}` 
}

function PaginationButton(props) {
    const current = parseInt(props.match.params.page) || 1
    const [ count, setCount ] = useState(0)

    useEffect(() => {
        request("get", "post/count")
        .then(res => {
            setCount(res.data.pageCount)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const pagination = getPageNumbers(current, count)

    const path = props.match.path
    const search = props.location.search

    const prev = current > 1 ? current - 1 : 1
    const next = current < count ? current + 1 : count

    return (<React.Fragment>
        <ul className="pagination justify-content-center no-select">
            <li className={`page-item ${ current <= 1 ? "disabled" : "" }`}>
                <Link className="page-link" tabIndex="-1" to={ getPageLink(path, search, prev) }>&laquo;</Link>
            </li>
            {
                pagination.map(i => <li key={i} className="page-item"><Link className="page-link" to={ getPageLink(path, search, i) }>{ i }</Link></li>)
            }
            <li className={`page-item ${ current >= count ? "disabled": "" }`}>
                <Link className="page-link" to={ getPageLink(path, search, next) }>&raquo;</Link>
            </li>
        </ul>
    </React.Fragment>);
}

export default withRouter(PaginationButton);