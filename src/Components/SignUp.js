import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "./FirebaseIndex.js";
import * as routes from "../Constants/Routes.js";
import * as Roles from "../Constants/Roles.js";

import styled from "styled-components";

const Div = styled.div`
  background-color:#F7DC6F;
  margin 40px;
  align-text: centre;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
`;
const H1 = styled.h1`
  text-align: center;
  font-family: "VT323";
`;
const Form = styled.form`
  font-size: 18px;
  margin: 0 30%;
`;
const Button = styled.button`
  background-color: white;
  font-family: "VT323";
  border-radius: 5px;
  margin: 10px 42%;
  width: 100px;
  padding: 5px;
`;
const Input = styled.input`
  text-align: center;
  font-family: "VT323";
  border-radius: 5px;
  width: 200px;
  margin: 5px 30%;
  padding: 8px;
`;

function SignUp() {
  return (
    <Div>
      <H1> Sign Up</H1>
      <SignUpForm />}
    </Div>
  );
}
const initialState = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  isAdmin: false,
  error: null
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }
  onSubmit = e => {
    const { username, email, passwordOne, isAdmin } = this.state;
    /*         const roles = [];

        if (isAdmin){
            roles.push(Roles.admin);
        } */
    const roles = {};
    if (isAdmin) {
      roles[Roles.admin] = Roles.admin;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({ username, email, roles });
      })
      .then(() => {
        this.setState({ ...initialState });
        this.props.history.push(routes.home);
      })
      .catch(error => {
        this.setState({ error });
      });
    e.preventDefault();
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onChangeCheckbox = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <Form onSubmit={this.onSubmit}>
        <Input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <Input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email"
        />
        <Input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <Input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Cornfirm Password"
        />
        <label>
          Admin:
          <Input
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </label>
        <Button disabled={isInvalid} type="submit">
          Sign Up
        </Button>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}
const SignUpLink = () => (
  <p>
    {" "}
    To create an account{" "}
    <Link to={routes.signUp}>Sign up by clicking the link</Link>{" "}
  </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUp;
export { SignUpForm, SignUpLink };
