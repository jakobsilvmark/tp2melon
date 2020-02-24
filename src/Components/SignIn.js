import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {compose} from "recompose";
import {SignUpLink} from "./SignUp";
import {PasswordForgotLink} from "./PwordForgot.js";
import {withFirebase} from "./FirebaseIndex";
import * as routes from "../Constants/Routes";
import styled from "styled-components";

const Div = styled.div`
  background-color:#F7DC6F;
  margin 40px;
  align-text: centre;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
`;
const H1 = styled.h1`
  text-align: center;
  font-family: "VT323";
`;
const Form = styled.form`
font-size:18px;
margin: 0 30%;

`;
const Button = styled.button`
  background-color:white;
  font-family: "VT323";
  border-radius: 5px;
  margin: 10px 42%;
  width: 100px;
  padding: 5px;

`;
const Input = styled.input`
  text-align: center;
  font-family: "VT323";
  border-radius: 5px;
  width:200px;
  margin: 5px 30%;
  padding:8px;
 `;
 const Div2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px;
  `;

function SignIn() {
    return (
        <Div>
            <H1>Sign In</H1>
            <SignInForm/>
            <Div2><PasswordForgotLink/>
            <br></br>
            <SignUpLink/></Div2>
        </Div>
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
                <Form onSubmit={this.onSubmit}>
                    <Input 
                    name="email"
                    value = {email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email"/>

                    <Input 
                    name="password"
                    value = {password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"/>

                    <Button disabled ={isInvalid} type ="submit">
                        Sign In
                    </Button>
                    {error && <p> {error.message}</p>}


                </Form>
            );
        };
    };
    const SignInForm =compose(
        withRouter,withFirebase,)(SignInFormBase);



export default SignIn;
export {SignInForm};
