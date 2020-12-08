import React, { Component } from "react";
import Styles from "./css/Input.module.scss";

export const ForwardInput = React.forwardRef((props, ref) => {
    return <AccountInput {...props} inheritedRef={ ref }/>
});

class AccountInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            focused: false,
            data: "",
            err: ""
        }

        this.inputProps = {}
        for (const key in this.props.inputProps) {
            if (typeof(this.props.inputProps[key]) === 'function') {
                this.inputProps[key] = (event) => this.props.inputProps[key](event, this)
            }
            else {
                this.inputProps[key] = this.props.inputProps[key]
            }
        }
    }

    componentDidMount() {
        this.checkRules() // for initial state
    }

    updateData = (event) => {
        this.setState({ data: event.target.value }, this.checkRules)
    }

    checkRules = () => {
        let msg = ""
        const rules = Array.isArray(this.props.rules) ? this.props.rules : [ this.props.rules ]
        for (const rule of rules) {
            msg = rule(this.state.data)
            msg = (typeof(msg) === 'string') ? msg : ""
            if (msg.length > 0) {
                break
            }
        }
        
        this.setState({ err: msg }, () => {
            this.props.onUpdate(this.props.name, this.state.data, this.state.err)
        })
    }

    isValid = () => {
        return this.state.err.length <= 0
    }

    getClasses = () => {
        const classes = [ Styles.input_div ]
    
        if (this.state.focused || this.state.data.length > 0) {
            classes.push( Styles.text_up )
        }
        if (this.props.submitted && (this.props.failed || !this.isValid())) {
            classes.push( Styles.invalid )
        }

        return classes.join(' ')
    }

    handleFocus = (event) => {
        this.setState({ focused: true })
    }
    handleBlur = (event) => {
        this.setState({ focused: false })
    }

    render() {
        return (
            <div className={ this.getClasses() }>
                <i className={`fas fa-${ this.props.icon }`}></i>
                <div>
                    { !this.props.small ? <h5>{ this.props.children }</h5> : <h6>{ this.props.children }</h6> }
                    <input  type={ this.props.type }
                            name={ this.props.name }
                            ref={ this.props.inheritedRef } 
                            onFocus={ this.handleFocus }
                            onBlur={ this.handleBlur }
                            onChange={ this.updateData }
                            { ...this.inputProps }
                    />
                </div>
            </div>
        );
    }

}