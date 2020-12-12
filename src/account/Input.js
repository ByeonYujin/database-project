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
            data: ""
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
        this.forceHighlight = Array.isArray(this.props.forceHighlight) ? this.props.forceHighlight : [ this.props.forceHighlight ]
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

        return msg
    }

    notifyChangesToParent = () => {
        this.props.onUpdate(this.props.name, this.state.data, this.checkRules())
    }

    componentDidMount() {
        // for initial state, notify initial error to parent
        this.notifyChangesToParent()
    }

    updateData = (event) => {
        this.setState({ data: event.target.value }, this.notifyChangesToParent)
    }

    isValid = () => {
        return typeof(this.props.err[this.props.name]) === 'undefined' || this.props.err[this.props.name].length <= 0
    }

    getClasses = (p) => {
        const classes = [ Styles.input_div ]
    
        if (this.state.focused || this.state.data.length > 0) {
            classes.push( Styles.text_up )
        }

        const fh = this.forceHighlight.includes(this.props.err[this.props.name])
        if ( (this.props.submitted || fh) && !this.isValid() ) {
            classes.push( Styles.invalid )
        }

        return classes.join(' ')
    }

    handleFocus = () => this.setState({ focused: true })
    handleBlur = () => this.setState({ focused: false })

    render() {
        const icon = (typeof(this.props.icon) === 'function') ? this.props.icon(this) : this.props.icon 

        return (
            <div className={ this.getClasses() }>
                <i className={`fas fa-${ icon }`}></i>
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