import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {withFirebase} from "./FirebaseIndex.js";
import { fromRenderProps } from 'recompose';
import * as routes from "../Constants/Routes.js";


const PwordForgot = ()=> {
    return (
        <div>
            <h1> Forgot Password?</h1>
            <PasswordForgotForm/>            
        </div>
    )
}
const initialState={
    email:"",
    error: null,
};
class PasswordForgotFormBase extends Component{
    constructor(props){
        super(props);

        this.state ={...initialState};
    }
    onSubmit = (e)=>{
        const {email}=this.state;
        this.props.firebase
        .doPasswordreset(email)
        .then(()=>
        {
            this.setState({...initialState});
        })
        .catch(error=>{
            this.setState({error});
        });
        e.preventDefault();
    };
    onChange = (e)=>{
        this.setState({[e.target.name]:e.target.value});
    };
    render(){
        const {email, error}=this.state;
        const isInvalid = email==="";
        return(
            <form onSubmit ={this.onSubmit}>
                <input
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                type="text"
                placeholder="Email" />

                <button disabled={isInvalid} type ="submit">
                    Reset my Password
                </button>
                {error && <p>{error.message}</p>}           
            </form>
        )
    }
}
const PasswordForgotLink =() =>(
    <p>
        <Link to={routes.pwforgot}> Forgot Password</Link>
    </p>
);

export default PwordForgot;
const PasswordForgotForm = withFirebase(PasswordForgotFormBase);
export {PasswordForgotForm, PasswordForgotLink};
