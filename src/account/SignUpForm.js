import React, { Component } from "react";
import { VALID, ERROR, EMAIL_RULE, NOT_EMPTY_RULE, EQUAL_RULE, NUMBER_RULE } from "./ValidationRules";
import { ForwardInput as Input } from "./Input";

import Styles from "./css/Form.module.scss";
import ContainerStyles from "./css/Container.module.scss";
import { request } from "../Axios";

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
        [ERROR.EMPTY] : "비밀번호를 입력해주세요."
    },
    [CONFIRM] : {
        [ERROR.EMPTY] : "비밀번호를 다시 한 번 입력해주세요.",
        [ERROR.NOT_EQUAL] : "비밀번호가 확인란과 일치하지 않습니다."
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
        [ERROR.NOT_NUM] : "올바른 우편번호를 입력해주세요."
    }
}

const isNumberKey = (event) => {
    const key = String.fromCharCode(event.keyCode || event.which)  
    if(!(/^[0-9]$/.test(key))) {
        event.preventDefault()
    }
}

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

            valid: false,
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
            // Register action dispatched
            request("post", "auth/register", {
                email: this.state[EMAIL],
                password: this.state[PASSWORD],

                zipcode: this.state[ZIPCODE],
                province: this.state[SI],
                city: this.state[GUN],
                town: this.state[GU]
            })
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response))
        }
        else {
            this.focusError()
        }

        return true
    }

    render() {
        const update = { submitted: this.state.submitted, onUpdate: this.updateCallback }
        const emailCallback = (event, self) => {
            self.handleBlur(event)
        }

        return (
        <form className={ `form-group ${ Styles.holder } ${ ContainerStyles.holder }` } onSubmit={ this.submit } noValidate>
            <h1>Sign up</h1>
            <p>Write your information for registration</p>
            <Input { ...update } 
                type="email" icon="user" name={ EMAIL } rules={ EMAIL_RULE } ref={ this.innerRef[EMAIL] }
                inputProps={{ onBlur: emailCallback }}>
                    EMAIL
            </Input>
            <br/>
            <Input { ...update } 
                type="password" icon="lock" name={ PASSWORD } rules={ NOT_EMPTY_RULE } ref={ this.innerRef[PASSWORD] }
                inputProps={{maxLength: "50"}}>
                    PASSWORD
            </Input>
            <br/>
            <Input { ...update } 
                type="password" icon="check" name={ CONFIRM } 
                rules={ [NOT_EMPTY_RULE, EQUAL_RULE(this.state[PASSWORD])] } 
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
                rules={ [NOT_EMPTY_RULE, NUMBER_RULE] } 
                ref={ this.innerRef[ZIPCODE] }
                inputProps={{ onKeyPress: isNumberKey, maxLength: "5" }}>
                    ZIPCODE
            </Input>
            {
                (!this.state.valid && this.state.submitted) ?
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