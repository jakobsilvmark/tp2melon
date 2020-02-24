import React from 'react';
import {PasswordForgotForm} from "./PwordForgot.js";
import PasswordChangeForm from "./PwordChange.js";
import {AuthUserContext, withAuthorization} from "./SessionIndex.js";
import styled from "styled-components";


const Div1 = styled.div`
    background-color:#F7DC6F;
    margin 40px;
    align-text: centre;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 5px;
    text-align: center;
`;
const Div2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px;

  `;
const H1 = styled.h1`
  text-align: left;
  margin : 20px;
  font-family: "VT323";
`;




const User= () =>(
    <AuthUserContext.Consumer>
    {authUser=>(
        <Div1>
            <H1> User Account: {authUser.username}</H1>
            <Div2>
            <PasswordForgotForm/> 
            <br></br>
            <PasswordChangeForm/>
            <br></br>
            </Div2>
        </Div1>
    )}
    </AuthUserContext.Consumer>
);
const condition = authUser=> !!authUser;
export default withAuthorization(condition)(User);
