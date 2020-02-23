import React, {Component} from 'react';
import {BrowserRouter as Router, Route, } from "react-router-dom";
import {withFirebase} from "./FirebaseIndex.js"
import Navigation from "./Navigation.js";
import Landing from "./Landing.js";
import SignUp from "./SignUp.js";
import SignIn from "./SignIn.js";
import Home from "./Home.js";
import User from "./User.js";
import Admin from "./Admin.js";
import PwordForgot from "./PwordForgot.js";
import {withAuthentication} from "./SessionIndex";
import * as routes from "../Constants/Routes.js";






const App = () =>{
  
  
    return (
      
        <Router>
          <div>
            <Navigation/>
            <hr />
            
              <Route exact path="/" component = {Landing}/>
              <Route  path="/signin" component = {SignIn}/>
              <Route  path="/home" component = {Home}/>
              <Route path="/signup" component={SignUp}/>
              <Route path="/users" component ={User}/>
              <Route path="/admin" component ={Admin}/>
              <Route path ="/pwforgot" component={PwordForgot}/>

          </div>
        </Router>
      
    )

  };
  
  


export default withAuthentication(App);
