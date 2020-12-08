import React, { Component } from "react";
import { VALID, ERROR, EMAIL_RULE, NOT_EMPTY_RULE } from "./ValidationRules";
import { ForwardInput as Input } from "./Input";
import { request } from "../Axios";
import history from "../history";

import Styles from "./css/Form.module.scss";
import ContainerStyles from "./css/Container.module.scss";

const EMAIL = "email"
const PASSWORD = "password"

const ERR_MSG = {
    [EMAIL] : {
        [ERROR.EMPTY]: "이메일을 입력해주세요.",
        [ERROR.NOT_EMAIL]: "이메일을 정확히 입력해주세요."
    },
    [PASSWORD] : {
        [ERROR.EMPTY] : "비밀번호를 입력해주세요."
    },
    LOGIN_FAILED : "이메일과 비밀번호를 다시 확인해주세요."
}

const URL = "auth/login";

export default class SignInForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            [EMAIL]: "",
            [PASSWORD]: "",
            
            valid: false,
            submitted: false,
            err : {},
            msg : ""
        }

        this.rulePriority = [ EMAIL, PASSWORD ]
        this.innerRef = {}
        for (let rule of this.rulePriority) {
            this.innerRef[rule] = React.createRef()
        }
    }

    updateCallback = (caller, data, err) => {
        this.setState((state) => ({
            [caller]: data,
            err: {
                ...state.err,
                [caller]: err
            },
            msg: "",
            submitted: false
        }), () => {
            let check = true
            for (let type in this.state.err) {
                check &= this.state.err[type] ? false : true
            }
            this.setState({ valid: check })
        })
    }

    focusError = () => {
        for (let rule of this.rulePriority) {
            let code = this.state.err[rule]
            if (code !== VALID) {
                this.innerRef[rule].current.focus()
                this.setState({ msg: ERR_MSG[rule][code] }) 
                break
            }
        }
    }

    submit = (event) => {
        event.preventDefault()
 
        this.setState({ submitted: true })

        if (this.state.valid) {
            // Axios AJAX
            request("post", URL, {
                email: this.state[EMAIL],
                password: this.state[PASSWORD]
            }) 
            // Retrieve a result (login or failed)
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem("token", res.data.accessToken)
                    history.push("/test") // To main page
    
                    request("get", "auth/test")
                    .then(res => console.log(res.data)) // 토큰 인증 테스트 (회원 기반 서비스에 사용)
                    .catch(console.log)
                }
            })
            .catch(err => {
                const res = err.response

                if (res.status === 401) {
                    this.setState({ msg: ERR_MSG.LOGIN_FAILED, valid: false })
                    this.innerRef[EMAIL].current.focus()
                }
                else {
                    alert("로그인에 실패하였습니다. 잠시 후에 다시 시도해주세요.")
                }
            })
        }
        else {
            this.focusError()
        }

        return true
    }

    render() {
        const update = { submitted: this.state.submitted, failed: this.state.msg === ERR_MSG.LOGIN_FAILED, onUpdate: this.updateCallback }

        return (
            <form className={ `form-group ${ Styles.holder } ${ ContainerStyles.holder }` } onSubmit={ this.submit } noValidate>
                <h1>Sign in</h1>
                <p>Please fill in your account info</p>

                <Input { ...update } type="email" icon="user" name={ EMAIL } rules={ EMAIL_RULE } ref={ this.innerRef[EMAIL] }>
                    EMAIL
                </Input>
                <br/>
                <Input { ...update } type="password" icon="lock" name={ PASSWORD } rules={ NOT_EMPTY_RULE } ref={ this.innerRef[PASSWORD] }>
                    PASSWORD
                </Input>
                {
                    (!this.state.valid && this.state.submitted) ?
                    <p className={ Styles.errmsg }>
                        { this.state.msg }
                    </p>
                    : 
                    <p className={ Styles.errmsg } style={{ visibility: "hidden" }}>.</p>
                }
                <button type="submit">Login</button>
            </form>
        );
    }
}