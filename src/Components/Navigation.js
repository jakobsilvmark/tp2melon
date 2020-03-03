import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "./SignOut.js";
import * as routes from "../Constants/Routes";
import { AuthUserContext } from "./SessionIndex.js";
import * as Roles from "../Constants/Roles.js";
import styled from "styled-components";

const Div1 = styled.div`
  background-color: #d0d3d4;
`;
const Div2 = styled.div`
  background-color: #f7dc6f;
`;
const Ul = styled.ul`
  background-color: #f7dc6f;
  display: flex;
  justify-content: center;
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin: 0 100px;
  padding: 0;
`;
const Li = styled.li`
  background-color: #d0d3d4;
  padding: 5px 15px;
  margin: 30px 40px;
  border-radius: 10px;
  font-family: "VT323";
  font-size: 24px;
`;

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = ({ authUser }) => {
  return (
    <Div1>
      <Div2>
        <Ul>
          <Li>
            <Link to={routes.landing}>Landing</Link>{" "}
          </Li>
          <Li>
            <Link to={routes.home}>Home</Link>{" "}
          </Li>
          <Li>
            <Link to={routes.users}>Users</Link>{" "}
          </Li>
          {!!authUser.roles[Roles.admin] && (
            <Li>
              <Link to={routes.admin}>Admin</Link>{" "}
            </Li>
          )}
          <Li>
            {" "}
            <SignOutButton />
          </Li>
        </Ul>
      </Div2>
    </Div1>
  );
};
const NavigationNonAuth = () => {
  return (
    <Div1>
      <Div2>
        <Ul>
          <Li>
            <Link to={routes.signIn}>Sign In</Link>{" "}
          </Li>
          <Li>
            <Link to={routes.landing}>Landing</Link>{" "}
          </Li>
        </Ul>
      </Div2>
    </Div1>
  );
};
export default Navigation;
