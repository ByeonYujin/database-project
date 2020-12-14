import React, { Component } from "react";
import { VALID, ERROR, EMAIL_RULE, NOT_EMPTY_RULE, EQUAL_RULE, NUMBER_RULE, PASSWORD_RULE, DIGIT_RULE } from "./ValidationRules";
import { ForwardInput as Input } from "./Input";

import Styles from "./css/Form.module.scss";
import ContainerStyles from "./css/Container.module.scss";
import { request } from "../Axios";

const EMAIL = "email"
const PASSWORD = "password"
const CONFIRM = "confirm"

const ZIPCODE = "zipcode"
const SI = "si", GUN = "gun", GU = "gu"

const ALREADY_SIGNED = "already signed"

const ERR_MSG = {
    [EMAIL] : {
        [ERROR.EMPTY] : "이메일을 입력해주세요.",
        [ERROR.NOT_EMAIL] : "이메일을 정확히 입력해주세요.",
        [ALREADY_SIGNED] : "이메일 중복 여부를 확인해주세요."
    },
    [PASSWORD] : {
        [ERROR.EMPTY] : "비밀번호를 입력해주세요.",
        [ERROR.WEAK_PW] : "비밀번호를 양식에 맞게 작성해주세요."
    },
    [CONFIRM] : {
        [ERROR.EMPTY] : "비밀번호를 다시 한 번 입력해주세요.",
        [ERROR.NOT_EQUAL] : "확인란을 올바르게 작성해주세요."
    },
    [SI] : {
        [ERROR.EMPTY] : "시/도를 입력해주세요."
    },
    [GUN] : {
        [ERROR.EMPTY] : "시/군/구를 입력해주세요."
    },
    [GU] : {
        [ERROR.EMPTY] : "동/읍/면을 입력해주세요."
    },
    [ZIPCODE] : {
        [ERROR.EMPTY] : "우편번호를 입력해주세요.",
        [ERROR.NOT_NUM] : "올바른 우편번호를 입력해주세요.",
        [ERROR.DIGIT] : "우편번호는 5자리여야 합니다."
    }
}

const isNumberKey = (event) => {
    const key = String.fromCharCode(event.keyCode || event.which)  
    if(!(/^\d$/.test(key))) {
        event.preventDefault()
    }
}

const URL = "auth/register";
const AJAX = "auth/signed";

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

            submitted: false,
            err: {},
            msg: ""
        }

        this.rulePriority = [ EMAIL, PASSWORD, CONFIRM, SI, GUN, GU, ZIPCODE ]
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
            submitted: false
        }), () => this.checkCollaborativeRules(caller))
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

    checkCollaborativeRules = (caller) => {
        if (caller === PASSWORD || caller === CONFIRM) {
            if (EQUAL_RULE(this.state[PASSWORD], this.state[CONFIRM]) !== VALID) {
                this.setState((state) => ({
                    err: {
                        ...state.err,
                        [CONFIRM]: ERROR.NOT_EQUAL
                    }
                }))
            }
        }
    }

    isValid = () => {
        for (let type in this.state.err) {
            if (this.state.err[type]) return false
        }
        return true
    }

    submit = (event) => {
        event.preventDefault()
        
        this.setState({ submitted: true })

        if (this.isValid()) {
            // Register action dispatched
            request("post", URL, {
                email: this.state[EMAIL],
                password: this.state[PASSWORD],

                zipcode: this.state[ZIPCODE],
                province: this.state[SI],
                city: this.state[GUN],
                town: this.state[GU]
            })
            .then(res => {
                console.log(res.data)

                alert("성공적으로 회원가입되셨습니다. 로그인해주시기 바랍니다.")
                window.location.reload() // Reload the login page
            })
            .catch(err => {
                console.log(err)
                alert("회원가입에 실패하였습니다. 나중에 다시 시도해주세요.")
            })
        }
        else {
            this.focusError()
        }

        return true
    }

    render() {
        const update = { submitted: this.state.submitted, err: this.state.err, onUpdate: this.updateCallback }
        const emailCallback = (event, self) => {
            self.handleBlur(event)

            if (self.isValid()) {
                request("post", AJAX, { email: self.state.data })
                .catch(err => {
                    this.setState(state => ({ err: { ...state.err, [EMAIL]: ALREADY_SIGNED } }))
                })
            }
        }

        return (
        <form className={ `form-group ${ Styles.holder } ${ ContainerStyles.holder }` } onSubmit={ this.submit } noValidate>
            <h1>Sign up</h1>
            <p>Write your information for registration</p>
            <Input { ...update } 
                type="email" icon="user" name={ EMAIL } rules={ EMAIL_RULE } ref={ this.innerRef[EMAIL] }
                forceHighlight={ ALREADY_SIGNED }
                inputProps={{ onBlur: emailCallback }}>
                    EMAIL
            </Input>
            { this.state.err[EMAIL] === ALREADY_SIGNED ? <p className={ Styles.errmsg }>이미 가입된 이메일입니다.</p> : <br/> }
            <Input { ...update } 
                type="password" icon="lock" name={ PASSWORD } rules={ [NOT_EMPTY_RULE, PASSWORD_RULE] } ref={ this.innerRef[PASSWORD] }
                forceHighlight={ ERROR.WEAK_PW }
                inputProps={{maxLength: "50"}}>
                    PASSWORD
            </Input>
            { this.state.err[PASSWORD] === ERROR.WEAK_PW ? 
                <p className={ Styles.errmsg }>6글자 이상, 숫자와 특수문자를 포함해야 합니다.</p> : <br/> }
            <Input { ...update } 
                type="password" 
                name={ CONFIRM } 
                icon={ (self) => (this.state.err[CONFIRM] === ERROR.NOT_EQUAL) ? "times" : "check" }
                rules={ [NOT_EMPTY_RULE] } 
                forceHighlight={ ERROR.NOT_EQUAL }
                ref={ this.innerRef[CONFIRM] }>
                    PASSWORD CONFIRM
            </Input>
            <br/>
            <div id={ Styles.address_wrapper }>
                <Input { ...update } type="text" icon="city" name={ SI } rules={ NOT_EMPTY_RULE } ref={ this.innerRef[SI] } small={ true }>
                    시/도
                </Input>
                <Input { ...update } type="text" icon="building" name={ GUN } rules={ NOT_EMPTY_RULE } ref={ this.innerRef[GUN] } small={ true }>
                    시/군/구
                </Input>
                <Input { ...update } type="text" icon="home" name={ GU } rules={ NOT_EMPTY_RULE } ref={ this.innerRef[GU] } small={ true }>
                    동/읍/면
                </Input>
            </div>
            <br/>
            <Input { ...update } 
                type="text" icon="map-marker-alt" name={ ZIPCODE } 
                rules={ [NOT_EMPTY_RULE, NUMBER_RULE, DIGIT_RULE(5)] } 
                ref={ this.innerRef[ZIPCODE] }
                inputProps={{ onKeyPress: isNumberKey, maxLength: "5" }}>
                    ZIPCODE
            </Input>
            {
                (!this.isValid() && this.state.submitted) ?
                <p className={ Styles.errmsg }>
                    { this.state.msg }
                </p>
                : 
                <p className={ Styles.errmsg } style={{ visibility: "hidden" }}>.</p>
            }
            <button type="submit">Sign up</button>
        </form>
        );
    }
}