import React, {Component} from 'react';
import {withFirebase} from "./FirebaseIndex.js";
import styled from "styled-components";


const Form = styled.form`
font-size:18px;
margin: 0 30%;
`;
const Button = styled.button`
  background-color:white;
  font-family: "VT323";
  border-radius: 5px;
  margin: 10px 38%;
  width: 150px;
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


const initialState={
    passwordOne: "",
    passwordTwo: "",
    error: null
};

class PwordChangeForm extends Component {
    constructor(props){
        super(props);

        this.state={...initialState};
    }

    onSubmit = (e)=>{
        const {passwordOne}=this.state;

        this.props.firebase.doPasswordUpdate(passwordOne)
            .then(()=>{
                this.setState({...initialState});
            })
            .catch(error=>{
                this.setState({error});
            });
        e.preventDefault();
    };

    onChange = (e)=>{
        this.setState({[e.target.name]: e.target.value});

    };

    render(){
        const {passwordOne, passwordTwo, error} = this.state;
        const isInvalid = passwordOne !== passwordTwo || 
        passwordOne ==="";

        return (
            <Form onSubmit = {this.onSubmit}>
                <Input 
                  name="passwordOne"
                  value={passwordOne}
                  onChange={this.onChange}
                  type="password"
                  placeholder="New Password"/>

                <Input 
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Confirm New Password"/>

                <Button disabled={isInvalid} type="submit">
                    Reset My Password
                </Button>

                {error && <p> {error.message}</p>}

            </Form>
        );
    }
}

export default withFirebase(PwordChangeForm);
