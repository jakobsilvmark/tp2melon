import React from 'react';
import {withFirebase} from "./FirebaseIndex.js";

import styled from "styled-components";

const Button = styled.button`
  background-color:white;
  font-family: "VT323";
  border-radius: 5px;
  
  padding: 5px;
`;


const SignOutButton=({firebase})=>(
    <Button type ="button" onClick={firebase.doSignOut}>
        Sign Out
    </Button>
)


export default withFirebase(SignOutButton);
