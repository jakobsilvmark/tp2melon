import React, { Fragment } from 'react';
import styled from "styled-components";
import LandingAPI from '../APIs/LandingAPI.js';
import Landing2 from '../APIs/Landing2.js';


const Nav = styled.div`
  background-color:#F7DC6F;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;
const NavHeader = styled.div`
  max-width: 1010px;
  padding: 26px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;
const NavLeft = styled.div`
  width: 33.333%;
  text-align: left;
  font-family: "VT323";
  Font-size: 56px;
  color:black ;
`;
const NavCenter = styled.div`
  width: 33.333%;
  text-align: center;
`;
const Input = styled.input`
  font-size: 16px;
  border: solid 1px #dbdbdb;
  color: #262626;
  padding: 7px 33px;
  border-radius: 10px;
  color: #999;
  cursor: text;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  background: #fafafa;
  &:active,
  &:focus {
    text-align: left;
  }
`;
const NavRight = styled.div`
  width: 33.333%;
  text-align: right;
  svg {
    margin-right: 20px;
  }
`;
const MenuLink = styled.a``;

function Landing() {
    return (
        <div>
            <Nav>
                <NavHeader>
                    <NavLeft>FinActual</NavLeft>
                    <NavCenter>
                    <Input type="text" placeholder="Search" />
                    </NavCenter>
                    <NavRight>
                    <MenuLink href="#">
                    
                    </MenuLink>
                    <MenuLink href="#">
                        
                    </MenuLink>
                    <MenuLink href="#">
                        
                    </MenuLink>
                    </NavRight>
                </NavHeader>
            </Nav>
          <div>
          <LandingAPI/>
          </div>

          <div>
          <Landing2/>
          </div>
  
        </div>
        
    )
}

export default Landing
