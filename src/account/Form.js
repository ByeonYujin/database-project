import React, { Component } from "react";
import "./css/Form.css";
import "./css/Input.css"

const getKeyFocused = (key) => `${key}Focused`

export default function Form(ChildComponent) {
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = {}

            if (props.inputs) {
                let { inputs, ...childProps } = props
                this.childProps = childProps
                if (typeof(props.inputs) === 'string') inputs = [ inputs ];
                
                for (const input of inputs) {
                    this.state[getKeyFocused(input)] = false
                }
            }
        }
    
        handleFocus = (event) => {
            this.setState({
                [getKeyFocused(event.target.name)]: event.type === 'focus'
            })
        }
    
        getInputDivClasses = (key, value, valid = true) => {
            const classes = ['input-div']
    
            if (this.state[getKeyFocused(key)] || value.length > 0) {
                classes.push('text-up')
            }
            if (!valid) {
                classes.push('invalid')
            }
    
            return classes.join(' ')
        }

        render() {
            return <ChildComponent 
                { ...this.childProps }
                handleFocus={ this.handleFocus }
                getInputDivClasses = { this.getInputDivClasses }
            />
        }
    }
}