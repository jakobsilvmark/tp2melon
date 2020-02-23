import React from 'react';
import {Link} from "react-router-dom";
import SignOutButton from "./SignOut.js";
import * as routes from "../Constants/Routes";
import {AuthUserContext} from "./SessionIndex.js";

const Navigation=()=>(
    <div>
        <AuthUserContext.Consumer>
        {authUser => authUser? <NavigationAuth /> : <NavigationNonAuth/>}
        </AuthUserContext.Consumer>
    </div>
)

const NavigationAuth=() =>{
    return (
        <div>
            <div> 
                <ul>
                
                <li><Link to={routes.landing}>Landing</Link> </li>
                <li><Link to={routes.home}>Home</Link> </li>
                <li><Link to={routes.users}>Users</Link> </li>
                <li><Link to={routes.admin}>Admin</Link> </li>
                <li> <SignOutButton/></li>
                </ul>
            </div>
            
        </div>
    );
}
const NavigationNonAuth= () =>{
    return (
        <div>
            <div> 
                <ul>
                <li><Link to={routes.signIn}>Sign In</Link> </li>
                <li><Link to={routes.landing}>Landing</Link> </li>
                </ul>
            </div>
            
        </div>
    );
}
export default (Navigation);
