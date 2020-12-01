import React, { Component } from "react";
import { VALID, ERROR, EMAIL_RULE, NOT_EMPTY_RULE } from "./ValidationRules"

const EMAIL = "email"
const PASSWORD = "password"

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

export const SignInInputs = [ EMAIL, PASSWORD ]

export default class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            [EMAIL]: "",
            [PASSWORD]: "",
            valid : {},
            err : ""
        }
        for (const key of SignInInputs) {
            this.state.valid[key] = true;
        }

        this.emailRef = React.createRef()
        this.pwRef = React.createRef()
    }

    updateInfo = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            valid: {
                ...this.state.valid,
                [event.target.name]: true
            },
            err : ""
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

        // Validation phase 1: Email
        result = EMAIL_RULE(this.state[EMAIL])
        if (result !== VALID) {
            this.setValidity(EMAIL, false)
            this.emailRef.current.focus()

            return ERR_MSG[EMAIL][result] 
        }

        // Validation phase 2: Password
        result = NOT_EMPTY_RULE(this.state[PASSWORD])
        if (result !== VALID) {
            this.setValidity(PASSWORD, false)
            this.pwRef.current.focus()
            
            return ERR_MSG[PASSWORD][result]
        }

        return result
    }

    submit = (event) => {
        event.preventDefault()

        const msg = this.checkValidity()
        if (msg !== VALID) {
            this.setState({ err: msg })
            return false
        }
        
        // Login action dispatched
        // Axios AJAX
        // Retrieve a result (login or failed)

        // if success -> save session info to global store and history push to main page 
        // else -> login failed error 
        console.log(this.state)

        return true
    }

    render() {
        const handleFocus = this.props.handleFocus

        return <form className="form-group holder" onSubmit={ this.submit } noValidate>
            <h1>Sign in</h1>
            <p>Please fill in your account info</p>
            <div className={ this.props.getInputDivClasses(EMAIL, this.state[EMAIL], this.state.valid[EMAIL]) }>
                <i className="fas fa-user"></i>
                <div>
                    <h5>email</h5>
                    <input  type={ EMAIL }
                            name={ EMAIL }
                            ref={ this.emailRef } 
                            onFocus={ handleFocus }
                            onBlur={ handleFocus }
                            onChange={ this.updateInfo }
                            required
                    />
                </div>
            </div>
            <br/>
            <div className={ this.props.getInputDivClasses(PASSWORD, this.state[PASSWORD], this.state.valid[PASSWORD]) }>
                <i className="fas fa-lock"></i>
                <div>
                    <h5>password</h5>
                    <input  type={ PASSWORD }
                            name={ PASSWORD }
                            ref={ this.pwRef }
                            onFocus={ handleFocus }
                            onBlur = { handleFocus }
                            onChange={ this.updateInfo }
                            required
                    />
                </div>
            </div>
            <p className="errmsg" style={ { visibility: this.state.err ? 'visible' : 'hidden' } }> {this.state.err} </p>
            <button type="submit">Login</button>
        </form>
    }
}