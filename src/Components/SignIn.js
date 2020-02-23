import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {compose} from "recompose";
import {SignUpLink} from "./SignUp";
import {PasswordForgotLink} from "./PwordForgot.js";
import {withFirebase} from "./FirebaseIndex";
import * as routes from "../Constants/Routes";

function SignIn() {
    return (
        <div>
            <h1>Sign In</h1>
            <SignInForm/>
            <PasswordForgotLink/>
            <SignUpLink/>
        </div>
    )};

const initialState={
        email: "",
        password:"",
        error:null,
    };

    class SignInFormBase extends Component {
        constructor(props){
            super(props);
            this.state={...initialState};
        }
        onSubmit =(e)=>{
            const {email, password} =this.state;
            this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(()=> {
                this.setState({...initialState});
                this.props.history.push(routes.home);
            })
            .catch(error=> {
                this.setState({error});
            });
            e.preventDefault();
            };
        onChange =(e)=>{
            this.setState({[e.target.name]: e.target.value});
        };
        render(){
            const {email, password, error} = this.state;
            const isInvalid = password==="" || email === "";
            return(
                <form onSubmit={this.onSubmit}>
                    <input 
                    name="email"
                    value = {email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email"/>

                    <input 
                    name="password"
                    value = {password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"/>

                    <button disabled ={isInvalid} type ="submit">
                        Sign In
                    </button>
                    {error && <p> {error.message}</p>}


                </form>
            );
        };
    };
    const SignInForm =compose(
        withRouter,withFirebase,)(SignInFormBase);



export default SignIn;
export {SignInForm};
