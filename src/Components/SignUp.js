import React, {Component} from 'react'
import {Link, withRouter} from "react-router-dom";
import{compose} from "recompose";
import {withFirebase} from "./FirebaseIndex.js";
import * as routes from "../Constants/Routes.js";
import * as Roles from "../Constants/Roles.js";

function SignUp() {
    return (
        <div>
            <h1> Sign Up</h1> 
            <SignUpForm />}
       </div>
    )};
    const initialState={
        username:"",
        email:"",
        passwordOne:"",
        passwordTwo:"",
        isAdmin: false,
        error: null,
    };

class SignUpFormBase extends Component{
    constructor(props){
        super(props);
        this.state={...initialState};
    }
    onSubmit=(e)=>{
        const {username, email, passwordOne, isAdmin}=this.state;
        const roles = [];

        if (isAdmin){
            roles.push(Roles.admin);
        }
        this.props.firebase
         .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser=> {

            return this.props.firebase.user(authUser.user.id)
            .set({username, email, roles});
        })
        .then (()=> {
            this.setState({...initialState});
            this.props.history.push(routes.home);
        })
        .catch(error=>{
            this.setState({error});
        });
        e.preventDefault();

    };
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    };
    onChangeCheckbox= (e)=>{
        this.setState({[e.target.name]: e.target.checked});
    }
    render(){
        const {username, 
               email, 
               passwordOne, 
               passwordTwo, 
               isAdmin, 
               error,} =this.state;
               
        const isInvalid=
            passwordOne !== passwordTwo || passwordOne === "" ||
            email === "" || username ==="";
        
        return(
            <form onSubmit={this.onSubmit}>
                <input name="username" 
                        value={username}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Full Name"/>
                <input name="email" 
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email"/>
                <input name="passwordOne" 
                        value={passwordOne}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Password"/>
                <input name="passwordTwo" 
                        value={passwordTwo}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Cornfirm Password"/>
                <label>
                    Admin:
                    <input
                     name="isAdmin"
                     type="checkbox"
                     checked={isAdmin}
                     onChange={this.onChangeCheckbox}
                     />
                    
                </label>
                <button disabled={isInvalid}type="submit">Sign Up</button>
                {error && <p>{error.message}</p>}
                
            </form>
        );
    }
}
const SignUpLink=()=> (
    <p> To create an account <Link to={routes.signUp}> 
    Sign up by clicking the link</Link> </p>
)

const SignUpForm = compose(withRouter,withFirebase,)(SignUpFormBase);

export default SignUp;
export {SignUpForm, SignUpLink};
