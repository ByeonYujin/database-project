import React, { Component } from "react";
import { VALID, ERROR, EMAIL_RULE, NOT_EMPTY_RULE } from "./ValidationRules"

const NORMAL = "text"

const EMAIL = "email"
const PASSWORD = "password"
const CONFIRM = "confirm"

const ZIPCODE = "zipcode"
const SI = "si", GUN = "gun", GU = "gu"

const ERR_MSG = {
    [EMAIL] : {
        [ERROR.EMPTY]: "이메일을 입력해주세요.",
        [ERROR.NOT_EMAIL]: "이메일을 정확히 입력해주세요."
    },
    [PASSWORD] : {
        [ERROR.EMPTY] : "패스워드를 입력해주세요."
    },
    LOGIN_FAILED : "이메일과 비밀번호를 다시 확인해주세요."
}

export const SignUpInputs = [ EMAIL, PASSWORD, CONFIRM, ZIPCODE, SI, GUN, GU ]

export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // Account
            [EMAIL]: "",
            [PASSWORD]: "",
            [CONFIRM]: "",

            // Address
            [ZIPCODE]: "",
            [SI]: "",
            [GUN]: "",
            [GU]: "",

            valid: {},
            err: ""
        }
    }

    updateInfo = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    
    setValidity = (name, value) => {
        this.setState({
            valid: {
                ...this.state.valid,
                [name]: value
            }
        })
    }

    checkValidity = () => {
        let result = ""
        
        result = EMAIL_RULE(this.state[EMAIL])
        if (result !== VALID) {
            this.setValidity(EMAIL, false)
            this.emailRef.current.focus()

            return ERR_MSG[EMAIL][result]
        }
        result = NOT_EMPTY_RULE(this.state[PASSWORD])
        if (result !== VALID) {
            this.setValidity(PASSWORD, false)
            this.pwRef.current.focus()

            return ERR_MSG[PASSWORD][result]
        }
        return result
    }


    submit = () => {
        const msg = this.checkValidity()
        if (msg !== VALID) {
            this.setState({ err : msg })
            return
        }

        console.log(this.state)
    }

    render() {
        const handleFocus = this.props.handleFocus

        return <form className="form-group holder" onSubmit={ this.submit } noValidate>
            <h1>Sign up</h1>
            <p>Write your information for registration</p>
            <div className={ this.props.getInputDivClasses(EMAIL, this.state[EMAIL]) }>
                <i className="fas fa-user"></i>
                <div>
                    <h5>email</h5>
                    <input  type={ EMAIL }
                            name={ EMAIL }
                            onFocus={ handleFocus }
                            onBlur={ handleFocus }
                            onChange={ this.updateInfo }
                    />
                </div>
            </div>
            <br/>
            <div className={ this.props.getInputDivClasses(PASSWORD, this.state[PASSWORD]) }>
                <i className="fas fa-lock"></i>
                <div>
                    <h5>password</h5>
                    <input  type={ PASSWORD }
                            name={ PASSWORD }
                            onFocus={ handleFocus }
                            onBlur = { handleFocus }
                            onChange={ this.updateInfo }/>
                </div>
            </div>
            <br/>
            <div className={ this.props.getInputDivClasses(CONFIRM, this.state[CONFIRM]) }>
                <i className="fas fa-check"></i>
                <div>
                    <h5>confirm password</h5>
                    <input  type={ PASSWORD }
                            name={ CONFIRM }
                            onFocus={ handleFocus }
                            onBlur = { handleFocus }
                            onChange={ this.updateInfo }/>
                </div>
            </div>
            <br/>
            <div id="address-wrapper">
                <div className={ this.props.getInputDivClasses(SI, this.state[SI]) }>
                    <i className="fas fa-city"></i>
                    <div>
                        <h6>시/도</h6>
                        <input  type={ NORMAL }
                                name={ SI }
                                onFocus={ handleFocus }
                                onBlur = { handleFocus }
                                onChange={ this.updateInfo }/>
                    </div>
                </div>
                <div className={ this.props.getInputDivClasses(GUN, this.state[GUN]) }>
                    <i className="fas fa-building"></i>
                    <div>
                        <h6>시/군/구</h6>
                        <input  type={ NORMAL }
                                name={ GUN }
                                onFocus={ handleFocus }
                                onBlur = { handleFocus }
                                onChange={ this.updateInfo }/>
                    </div>
                </div>
                <div className={ this.props.getInputDivClasses(GU, this.state[GU]) }>
                    <i className="fas fa-home"></i>
                    <div>
                        <h6>읍/면/동</h6>
                        <input  type={ NORMAL }
                                name={ GU }
                                onFocus={ handleFocus }
                                onBlur = { handleFocus }
                                onChange={ this.updateInfo }/>
                    </div>
                </div>
            </div>
            <br/>
            <div className={ this.props.getInputDivClasses(ZIPCODE, this.state[ZIPCODE]) }>
                <i className="fas fa-map-marker-alt"></i>
                <div>
                    <h5>zipcode</h5>
                    <input  type={ NORMAL }
                            name={ ZIPCODE }
                            onFocus={ handleFocus }
                            onBlur = { handleFocus }
                            onChange={ this.updateInfo }/>
                </div>
            </div>
            <p className="errmsg" style={ { visibility: this.state.err ? 'visible' : 'hidden' } }> {this.state.err} </p>
            <button type="submit">Sign up</button>
        </form>
    }
}