import React from 'react';
import {PasswordForgotForm} from "./PwordForgot.js";
import PasswordChangeForm from "./PwordChange.js";
import {AuthUserContext, withAuthorization} from "./SessionIndex.js";

const User= () =>(
    <AuthUserContext.Consumer>
    {authUser=>(
        <div>
            <h1> User Account: {authUser.email}</h1>
            <PasswordForgotForm/>
            <PasswordChangeForm/>
        </div>
    )}
    </AuthUserContext.Consumer>
);
const condition = authUser=> !!authUser;
export default withAuthorization(condition)(User);
