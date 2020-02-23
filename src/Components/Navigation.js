import React from 'react';
import {Link} from "react-router-dom";
import SignOutButton from "./SignOut.js";
import * as routes from "../Constants/Routes";
import {AuthUserContext} from "./SessionIndex.js";
import * as Roles from "../Constants/Roles.js";

const Navigation=()=>(
    <div>
        <AuthUserContext.Consumer>
        {authUser => 
        authUser ? (<NavigationAuth authUser={authUser} />) 
        : (<NavigationNonAuth/>)}
        </AuthUserContext.Consumer>
    </div>
)

const NavigationAuth=({authUser}) =>{
    return (
        <div>
            <div> 
                <ul>
                
                <li><Link to={routes.landing}>Landing</Link> </li>
                <li><Link to={routes.home}>Home</Link> </li>
                <li><Link to={routes.users}>Users</Link> </li>
                {authUser.roles.includes(Roles.admin) && (
                <li><Link to={routes.admin}>Admin</Link> </li>)}
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
