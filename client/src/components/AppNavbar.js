import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Button
} from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const toggle = () => setIsOpen(!isOpen);
  const logoutHandler = () => {
    dispatch(logoutUser());
    setShowLogin(true);
  };

  return (
    <>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">
            SHOPPING LIST
            {isAuthenticated && user ? (
              <span className="navbar-welcome"> — Welcome, {user.name}</span>
            ) : ''}
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="https://github.com/SanskritiUniyal/ShoppingListApp" target="_blank">
                  GitHub
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/dashboard">Dashboard</NavLink>
              </NavItem>
              {isAuthenticated ? (
                <>
                  <NavItem>
                    <span className="navbar-text mr-3">
                      {user ? `Welcome, ${user.name}` : ''}
                    </span>
                  </NavItem>
                  <NavItem>
                    <Button color="danger" onClick={logoutHandler}>Logout</Button>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem><LoginModal /></NavItem>
                  <NavItem><RegisterModal /></NavItem>
                </>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>

      {showLogin && <LoginModal isOpen={showLogin} toggle={() => setShowLogin(false)} />}
    </>
  );
};

export default AppNavbar;
