import React, { Component } from "react";
import Data from "./PostData";

import Styles from "./css/editor.module.scss";

const PLACEHOLDER = "placeholder";

const SUPPORTED_TYPE = [ "image/x-png", "image/png", "image/jpg", "image/jpeg", "image/webp" ]
const MAX_COUNT = 10
const MAX_SIZE = 5 * 1024 * 1024

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
            comment: "",

            // Trade options
            direct: true,
            indirect: false,
        }

        this.uploadRef = React.createRef()
    }

    componentDidMount() {
        this.data = new Data(this.props.productId, this.props.productData, this.retrieveData)
    }

    retrieveData = () => {
        if (this.data.success) {
            this.setState({
                categories: this.data.categories,
                data: this.data.payload.test
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

    forwardUpload = (event) => {
        event.preventDefault()

        this.uploadRef.current.click()
        event.stopPropagation()
    }

    handleImageChange = (event) => {
        event.preventDefault()

        if (this.state.images.length + event.target.files.length >= MAX_COUNT + 1) {
            alert(`최대로 올릴 수 있는 이미지 개수는 ${MAX_COUNT}개입니다.`)
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
        event.target.form.reset()
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
    }

    render() {
        return (
        <React.Fragment>
            <h3 id={ Styles.editorTitle }>상품 등록</h3>
            <form id={ Styles.editor } className="no-select" onSubmit={ this.submitPost }>

                <div id={ Styles.categories } className="d-flex">
                    <select className={ `form-inline ${Styles.cat}` } name="parent-cat" value={ this.state.parentCat } onChange={ this.selectCategory }>
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
                    <input type="text" placeholder="제목을 입력하세요. " name="subject" className="form-control" required ></input>
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
                    
                    <textarea id={Styles.context} cols="10" rows="3" placeholder="상품을 소개해주세요. " name="content" className="form-control"></textarea>
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
                        <input type="text" placeholder="가격" name="subject" className="form-control" onKeyPress={ isNumberKey } required ></input>
                    </div>
                </div>
                
                
                <hr className={ Styles.separator }/>
                <div id={ Styles.submit }>
                    <button className="btn btn-success" type="submit">Submit</button>
                    <button className="btn btn-secondary" type="button">Cancel</button>
                </div>
            </form>
        </React.Fragment>
        );
    }
}