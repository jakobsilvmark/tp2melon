import React, {Component} from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import {withFirebase} from "./FirebaseIndex.js";
import*as Roles from "../Constants/Roles.js";
import {compose} from "recompose";
import {withAuthorization} from "./SessionIndex";
import * as routes from "../Constants/Routes.js";
import styled from "styled-components";

const Div = styled.div`
  background-color:#F7DC6F;
  margin 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
`;
const H1 = styled.h1`
  text-align: center;
  font-family: "VT323";
`;
const H2 = styled.h2`
  text-align: center;
  font-family: "VT323";
`;
const Ul = styled.ul`
  text-align: left;
  font-family: "VT323";
  font-size: 28px;
`;
const AdminPage = () => (
    <Div>
      <H1>Admin</H1>
      <p>The Admin Page is accessible by every signed in admin user.</p>
  
      <Switch>
        <Route exact path={routes.admindetails} component={UserItem} />
        <Route exact path={routes.admin} component={UserList} />
      </Switch>
    </Div>
  );

class UserListBase extends Component{
    constructor(props){
        super(props);

        this.state = {
            loading: false,
            users: [],
        };
    }

    componentDidMount(){
        this.setState({loading: true});

        this.props.firebase.users().on("value", snapshot => {
            const usersObject = snapshot.val();

            const usersList= Object.keys(usersObject).map(key=>({
                ...usersObject[key],
                uid: key,
            }));
            this.setState({
                users: usersList,
                loading: false,
            });
        });
    }
    componentWillUnmount(){
        this.props.firebase.users().off();
    }

    render(){
        const {users, loading}=this.state;
        return(
            <Div>
        <H2>Users</H2>
        {loading && <div>Loading ...</div>}
        <Ul>
          {users.map(user => (
            <li key={user.uid}>
              <span><strong>ID:</strong> {user.uid}</span>
              <span><strong>E-Mail:</strong> {user.email}</span>
              <span><strong>Username:</strong> {user.username}</span>
              <span>
                <Link
                  to={{
                    pathname: `${routes.admin}/${user.uid}`,
                    state: { user },
                  }}
                >
                  Details
                </Link>
              </span>
            </li>
          ))}
        </Ul>
      </Div>
            
        );
    }
}
class UserItemBase extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        loading: false,
        user: null,
        ...props.location.state,
      };
    }
  
    componentDidMount() {
      if (this.state.user) {
        return;
      }
  
      this.setState({ loading: true });
  
      this.props.firebase
        .user(this.props.match.params.id)
        .on('value', snapshot => {
          this.setState({
            user: snapshot.val(),
            loading: false,
          });
        });
    }
  
    componentWillUnmount() {
      this.props.firebase.user(this.props.match.params.id).off();
    }
  
    onSendPasswordResetEmail = () => {
      this.props.firebase.doPasswordReset(this.state.user.email);
    };
  
    render() {
      const { user, loading } = this.state;
  
      return (
        <div>
          <h2>User ({this.props.match.params.id})</h2>
          {loading && <div>Loading ...</div>}
  
          {user && (
            <div>
              <span>
                <strong>ID:</strong> {user.uid}
              </span>
              <span>
                <strong>E-Mail:</strong> {user.email}
              </span>
              <span>
                <strong>Username:</strong> {user.username}
              </span>
              <span>
                <button
                  type="button"
                  onClick={this.onSendPasswordResetEmail}
                >
                  Send Password Reset
                </button>
              </span>
            </div>
          )}
        </div>
      );
    }
  }
  
  const UserList = withFirebase(UserListBase);
  const UserItem = withFirebase(UserItemBase);
  
  const condition = authUser =>
    authUser && authUser.roles.includes(Roles.admin);
  
  export default compose(withAuthorization(condition),
  )(AdminPage);