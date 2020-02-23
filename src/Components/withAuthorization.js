import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import {compose} from "recompose";
import {withFirebase} from "./FirebaseIndex.js";
import * as routes from "../Constants/Routes.js";
import AuthUserContext from "./Session.js";


const withAuthorization = condition => (Component) =>{
    class WithAuthorization extends React.Component{
        componentDidMount(){
            this.listener=this.props.firebase.onAuthUserListener(
               authUser=> {
                   
                           if (!condition(authUser)){
                            this.props.history.push(routes.signIn);
                            }
                       
                },
                ()=> this.props.history.push(routes.signIn),
            );
                   
              
        } 
        
        componentWillUnmount(){
            this.listener();
        }

        render(){
            return (
                <AuthUserContext.Consumer>
                    {authUser=> condition(authUser) ? <Component {...this.props}/>: null}
                </AuthUserContext.Consumer>
            )
        }
        
    }
    return compose (withRouter, withFirebase,) 
        (WithAuthorization);
};

export default withAuthorization;