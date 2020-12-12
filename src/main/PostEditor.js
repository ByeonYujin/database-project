import React, { Component } from "react";
import Data from "./PostData";

const PLACEHOLDER = "placeholder";

export default class PostEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // Category
            categories: {},
            parentCat: PLACEHOLDER,
            childCat: PLACEHOLDER,

            data: ""
        }
    }

    componentDidMount() {
        this.data = new Data(10, null, this.retrieveData)
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

    submitPost = (event) => {
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={ this.submitPost }>
                <select className="form-control" name="parent-cat" value={ this.state.parentCat } onChange={ this.selectCategory }>
                    <option value={ PLACEHOLDER }>부모 카테고리</option>
                    {
                        Object.entries(this.state.categories).map(cat => 
                            <option values={cat[0]} key={cat[0]}>{ cat[0] }</option>)
                    }
                </select>
                <select className="form-control" name="child-cat" value={ this.state.childCat } onChange={ this.selectCategory }>
                    <option value={ PLACEHOLDER }>자식 카테고리</option>
                    {
                        (this.state.parentCat !== PLACEHOLDER) &&
                        this.state.categories[this.state.parentCat].map(child => 
                            <option values={child} key={child}>{ child }</option>)
                    }
                </select>
                <input type="text" placeholder="제목을 입력하세요. " name="subject" className="form-control" required />
                <textarea cols="10" rows="10" placeholder="내용을 입력하세요. " name="content" className="form-control"></textarea>
                <div>
                    <input type="checkbox" name="send" value="direct" /> 직거래
                    <br/>
                    <input type="checkbox" name="send" value="indirect" /> 배송
                </div>
            </form>
        );
    }
}