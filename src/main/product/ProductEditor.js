import React, { Component } from "react";
import CategoryFetch from "./CategoryData";
import { request } from "../../Axios"

import Styles from "./css/editor.module.scss";
import history from "../../history";

const PLACEHOLDER = "placeholder";

const SUPPORTED_TYPE = [ "image/x-png", "image/png", "image/jpg", "image/jpeg", "image/webp" ]
const MAX_COUNT = 10
const MAX_FILESIZE = 5 * 1024 * 1024

const DIRECT_LOGO = process.env.PUBLIC_URL + "/dtrade128.png";
const INDIRECT_LOGO = process.env.PUBLIC_URL + "/itrade128.png";

function isNumberKey (event) {
    const key = String.fromCharCode(event.keyCode || event.which)  
    if(!(/^\d$/.test(key))) {
        event.preventDefault()
    }
}

export default class PostEditor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // Category
            categories: {},
            parentCat: PLACEHOLDER,
            childCat: PLACEHOLDER,

            // Title
            title: "",

            // Product Image
            images: [],

            // Comment
            context: "",

            // Trade options
            direct: true,
            indirect: false,

            // Price
            price: -1
        }

        this.catRef = React.createRef()
        this.uploadRef = React.createRef()
    }

    componentDidMount() {
        this.data = new CategoryFetch(this.retrieveData)
    }

    retrieveData = () => {
        if (this.data.success) {
            this.setState({
                categories: this.data.categories
            })
        }
    }
    
    selectCategory = (event) => {
        if (event.target.name === "parent-cat") {
            this.setState({ parentCat: event.target.value })
        }
        else {
            this.setState({ childCat: event.target.value })
        }
    }

    updateInfo = (event) => {
        if (event.target.name in this.state) {
            this.setState({ [event.target.name]: event.target.value })
        }
    }

    forwardUpload = (event) => {
        event.preventDefault()

        this.uploadRef.current.click()
        event.stopPropagation()
    }

    handleImageChange = (event) => {
        event.preventDefault()

        let oversize = false
        for (const file of event.target.files) {
            oversize |= file.size > MAX_FILESIZE
        }

        if (this.state.images.length + event.target.files.length >= MAX_COUNT + 1) {
            alert(`최대로 올릴 수 있는 이미지 개수는 ${MAX_COUNT}개입니다.`)
        }
        else if (oversize) {
            alert(`파일은 최대 ${parseInt(MAX_FILESIZE / (1024 * 1024))}MB까지만 허용됩니다.`)
        }
        else {
            let not_supported = 0

            for (const file of event.target.files) {
                if (!SUPPORTED_TYPE.includes(file.type)) {
                    ++not_supported
                    continue
                }

                const reader = new FileReader()
                reader.onloadend = () => {
                    this.setState(state => ({
                        images: state.images.concat({
                            file: file,
                            preview: reader.result 
                        })
                    }))
                }
                reader.readAsDataURL(file)
            }

            if (not_supported === 1) {
                alert("지원되지 않는 파일이나 이미지입니다.")
            }
            else if (not_supported > 1) {
                alert("지원되지 않는 파일이나 이미지가 있습니다. 해당 파일은 업로드 목록에서 제외됩니다.")
            }
        }
    }

    selectOption = (event) => {
        event.preventDefault()

        const name = event.currentTarget.getAttribute("name")
        const new_value = !this.state[name]
        const adjacent = (name === 'direct') ? this.state['indirect'] : this.state['direct']

        if (new_value || adjacent) {
            this.setState({ [name]: new_value })
        }
    }

    submitPost = (event) => {
        event.preventDefault()
        if (this.state.parentCat === PLACEHOLDER || this.state.childCat === PLACEHOLDER) {
            alert("분류를 선택해주세요.")
            this.catRef.current.focus()
            return
        }
        if (this.state.images.length < 1) {
            alert("상품을 등록하시려면 상품 이미지가 적어도 하나 있어야 합니다.")
            return
        }
        
        const formData = new FormData()

        formData.append("parentCategory", this.state.parentCat)
        formData.append("childCategory", this.state.childCat)

        formData.append("title", this.state.title)
        formData.append("context", this.state.context)

        formData.append("price", parseInt(this.state.price))

        formData.append("direct", this.state.direct)
        formData.append("indirect", this.state.indirect)

        for (const image of this.state.images) {
            formData.append("images", image.file)
        }
    
        request("post", "post/upload", formData, { 'Content-Type': 'multipart/form-data' } )
        .then(res => {
            window.location.replace(`/product?id=${res.data.linkTo}`)
        }) 
        .catch(err => {
            if (err.response) {
                switch(err.response.status) {
                    case 401:
                        alert("로그인하셔야 이용 가능합니다.")
                        break
                    default:
                        alert("서버에 접속 실패하였습니다. 잠시 후에 다시 시도해주세요.")
                        console.log(err.response)
                }
            }
        })
    }

    render() {
        return (
        <React.Fragment>
            <h2 id={ Styles.editorTitle }>상품 등록</h2>
            <form id={ Styles.editor } className="no-select" onSubmit={ this.submitPost }>

                <div id={ Styles.categories } className="d-flex">
                    <select className={ `form-inline ${Styles.cat}` } name="parent-cat" value={ this.state.parentCat } onChange={ this.selectCategory } ref={ this.catRef }>
                        <option value={ PLACEHOLDER } disabled>대분류</option>
                        { 
                            Object
                            .entries(this.state.categories)
                            .map(cat => {
                                return <option values={cat[0]} key={cat[0]}>{ cat[0] }</option>
                            })
                        }
                    </select>
                    <h5> &gt; </h5>
                    <select className={ `form-inline ${Styles.cat}` } name="child-cat" value={ this.state.childCat } onChange={ this.selectCategory }>
                        <option value={ PLACEHOLDER } disabled>소분류</option>
                        {
                            (this.state.parentCat !== PLACEHOLDER)
                            &&
                            this.state.categories[this.state.parentCat]
                            .map(child => {
                                return <option values={child} key={child}>{ child }</option>
                            })
                        }
                    </select>
                </div>

                <div id={ Styles.title }>
                    <p>제목</p>
                    <input type="text" placeholder="제목을 입력하세요. " name="title" className="form-control" required onChange={ this.updateInfo } ></input>
                </div>

                <React.Fragment key="Image container">
                    <input type='file' multiple accept={ SUPPORTED_TYPE.join(",") } onChange={ this.handleImageChange } ref={ this.uploadRef } style={{ display: "none" }}/>
                    { 
                        this.state.images.length > 0 
                        && 
                        <React.Fragment>
                            <hr className={ Styles.separator } />
                            <div id={ Styles.images }>
                            {
                                Array.from(this.state.images.keys())
                                .map(i => 
                                    <img key={`Preview-${i}`} src={ this.state.images[i].preview } alt={`Preview ${i}`} width="300" height="300"/>
                                )
                            }
                            </div>
                        </React.Fragment>
                        
                    }
                </React.Fragment>

                <hr className={ Styles.separator }/>
                <React.Fragment key="Context container">
                    <div id={ Styles.context_header }>
                        <p>내용</p>
                        <button id={ Styles.upload } className="btn btn-primary" onClick={ this.forwardUpload } type="button">Upload Image</button>
                    </div>
                    
                    <textarea id={Styles.context} cols="10" rows="3" placeholder="상품을 소개해주세요. " name="context" className="form-control" onChange={ this.updateInfo }></textarea>
                </React.Fragment>
                
                <div id={ Styles.metaInfo }>
                    <div name="direct" className={`${ Styles.trade_btn } ${ this.state.direct ? Styles.selected : "" } text-center`} onClickCapture={ this.selectOption }>
                        <img src={ DIRECT_LOGO } alt="Direct" width="35" height="35"></img>
                        <br/>
                        <label htmlFor="trade-d">직거래</label>
                    </div>
                    <div name="indirect" className={`${ Styles.trade_btn } ${ this.state.indirect ? Styles.selected : "" } text-center`} onClickCapture={ this.selectOption }>
                        <img src={ INDIRECT_LOGO } className="no-drag" alt="Indirect" width="35" height="35"></img>
                        <br/>
                        <label htmlFor="trade-i">배송</label>
                    </div>

                    <div id={ Styles.price }>
                        <p>￦</p>
                        <input type="text" placeholder="가격" name="price" className="form-control" onKeyPress={ isNumberKey } onChange={ this.updateInfo } required ></input>
                    </div>
                </div>
                
                
                <hr className={ Styles.separator }/>
                <div id={ Styles.submit }>
                    <button className="btn btn-success" type="submit">Submit</button>
                    <button className="btn btn-secondary" type="button" onClick={ () => history.goBack() }>Cancel</button>
                </div>
            </form>
        </React.Fragment>
        );
    }
}