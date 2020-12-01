import React, { Component } from "react";

import AccountForm from "./Form";
import SignIn, { SignInInputs } from './SignIn';
import SignUp, { SignUpInputs } from './SignUp';

import "./css/Container.css";

export const LEFT = 'left'
export const RIGHT = 'right'

const SignInForm = AccountForm(SignIn)
const SignUpForm = AccountForm(SignUp)

export default class LoginContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slided: LEFT
        }
    }

    moveSlide = (direction) => {
        if (direction === LEFT || direction === RIGHT) {
            this.setState({ slided: direction })
        } 
    }

    getClasses = () => {
        switch(this.state.slided) {
            case LEFT:
                return "slideLeft"
            case RIGHT:
                return "slideRight"
        }
    }

    render() {
        return <div id="slideBox">
            <div id="slideOverlay" className={ this.getClasses() }>
                <div id="innerOverlay" className={ this.getClasses() }>
                    <div id="signUp">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us pelase login with your personal info.</p>
                        <button onClick={ () => this.moveSlide(RIGHT) }>Sign In</button>
                    </div>
                    <div id="signIn">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start your journey with us.</p>
                        <button onClick={ () => this.moveSlide(LEFT) }>Sign Up</button>
                    </div>
                </div>
            </div>
            <div id="accountForms">
                <div id="signInForm" className={ this.getClasses() }>
                    <SignInForm inputs={ SignInInputs }/>
                </div>
                <div id="signUpForm" className={ this.getClasses() }>
                    <SignUpForm inputs={ SignUpInputs }/>
                </div>
            </div>
        </div>
         
    }
}