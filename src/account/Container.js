import React, { Component } from "react";

import SignIn from './SignInForm';
import SignUp from './SignUpForm';

import Styles from "./css/Container.module.scss";

const LEFT = 'left'
const RIGHT = 'right'

export default class LoginContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slided: RIGHT,
            loaded: false
        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({ loaded: true }), 1000)
    }

    moveSlide = (direction) => {
        if (direction === LEFT || direction === RIGHT) {
            this.setState({ slided: direction })
        } 
    }

    getClasses = () => {
        switch(this.state.slided) {
            case LEFT:
                return Styles.slideLeft
            case RIGHT:
                return Styles.slideRight
            default:
                break
        }
        return
    }

    render() {
        return <div id={ Styles.slideBox } className={ this.state.loaded ? "" : Styles.preload }>
            <div id={ Styles.slideOverlay } className={ this.getClasses() }>
                <div id={ Styles.innerOverlay } className={ this.getClasses() }>
                    <div id={ Styles.signUp }>
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us pelase login with your personal info.</p>
                        <button disabled={ !this.state.loaded } onClick={ () => this.moveSlide(RIGHT) }>Sign In</button>
                    </div>
                    <div id={ Styles.signIn }>
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start your journey with us.</p>
                        <button disabled={ !this.state.loaded } onClick={ () => this.moveSlide(LEFT) }>Sign Up</button>
                    </div>
                </div>
            </div>
            <div id={ Styles.accountForms }>
                <div id={ Styles.signInForm } className={ this.getClasses() }>
                    <SignIn/>
                </div>
                <div id={ Styles.signUpForm } className={ this.getClasses() }>
                    <SignUp/>
                </div>
            </div>
        </div>
         
    }
}