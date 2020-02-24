import React from 'react';
import {withAuthorization} from "./SessionIndex";
import styled from "styled-components";

const Div = styled.div`
  background-color:#F7DC6F;
  margin 40px;
  align-text: centre;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  text-align: center;
`;
const H1 = styled.h1`
  text-align: center;
  font-family: "VT323";
`;

const HomePage= ()=> (
    <Div>
        <H1>Home</H1>
        <p>Home page accessible to all signed in users</p>
    </Div>  
)
const condition =authUser => !!authUser;

export default withAuthorization(condition)(HomePage);