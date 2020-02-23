import React from 'react';
import {withAuthorization} from "./SessionIndex";

const HomePage= ()=> (
    <div>
        <h1>Home</h1>
        <p>Home page accessible to all signed in users</p>
    </div>  
)
const condition =authUser => !!authUser;

export default withAuthorization(condition)(HomePage);