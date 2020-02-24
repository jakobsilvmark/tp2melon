import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {withFirebase} from "./FirebaseIndex.js";
import { fromRenderProps } from 'recompose';
import * as routes from "../Constants/Routes.js";
import styled from "styled-components";


const Form = styled.form`
font-size:18px;
margin: 0 30%;
`;
const Button = styled.button`
  background-color:white;
  font-family: "VT323";
  border-radius: 5px;
  margin: 10px 34%;
  width: 150px;
  padding: 5px;
`;
const Input = styled.input`
  text-align: center;
  font-family: "VT323";
  border-radius: 5px;
  width:200px;
  margin: 5px 24%;
  padding:8px;
 `;


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
            <Form onSubmit ={this.onSubmit}>
                <Input
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                type="text"
                placeholder="Email" />

                <Button disabled={isInvalid} type ="submit">
                    Reset my Password
                </Button>
                {error && <p>{error.message}</p>}           
            </Form>
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
