import React, { Component } from "react";
import Styles from "./css/test.module.scss";

import { request } from "../Axios";

const supported_type = [ "image/x-png", "image/png", "image/jpg", "image/jpeg", "image/webp" ]
const max_count = 10

export default class ImageUpload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            images: []
        }

        this.uploadRef = React.createRef()
    } 

    handleSubmit = (event) => {
        event.preventDefault()
        
        const formData = new FormData()
        for (const image of this.state.images) {
            formData.append("images", image.file)
        }
        
        request("post", "post/test", formData, { 'Content-Type': 'multipart/form-data' } )
        .then(res => {
            console.log(res)
        }) 
        .catch(console.log)
    }

    forwardUpload = (event) => {
        event.preventDefault()

        this.uploadRef.current.click()
        event.stopPropagation()
    }

    handleImageChange = (event) => {
        event.preventDefault()

        if (this.state.images.length + event.target.files.length >= max_count + 1) {
            alert(`최대로 올릴 수 있는 이미지 개수는 ${max_count}개입니다.`)
        }
        else {
            let not_supported = 0

            for (const file of event.target.files) {
                if (!supported_type.includes(file.type)) {
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

    render() {
        return (
            <form id={ Styles.form } onSubmit={ this.handleSubmit } runat="server">
                <input type='file' multiple accept={ supported_type.join(",") } onChange={ this.handleImageChange } ref={ this.uploadRef } style={{ display: "none" }}/>
                <br/>
                <div id={ Styles.images }>
                { 
                    this.state.images.length > 0 
                    && 
                    Array.from(this.state.images.keys())
                    .map(i => 
                        <img key={`Preview-${i}`} src={ this.state.images[i].preview } alt={`Preview ${i}`} width="300" height="300"/>
                    )
                }
                </div>
                <button className="btn btn-secondary" onClick={ this.forwardUpload }>Upload</button>
                <button className="btn btn-primary" type='submit'>Submit!</button>
            </form>
        );
    }
}