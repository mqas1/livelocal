import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from '../SignupForm';
import LoginForm from '../LoginForm';
import styled from 'styled-components';

import Auth from '../../utils/auth';

const StyledBrand = styled(Navbar.Brand)`
  font-size: 2rem;
  text-decoration: none;
  color: #7881D4;
  display: flex;
  font-family: 'Yellowtail', cursive;
  position: relative;
  transform: skewY(-15deg);
  margin-left: .5rem;
  flex-direction: row;
  margin-right: 1rem;

  &:hover {
    color: #838af3;
  }
  
  &::after {
    content: 'Local';
    padding-top: 1.75rem;
    padding-bottom: .5rem;
    margin-left: -3.5rem; 
`;

const StyledNavbar = styled(Navbar.Collapse)`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
`;

const StyledToggle = styled(Navbar.Toggle)`
  color: #EEF8FF;
  background-color: #838af3;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  font-weight: 700;
  font-size: 28px;
`;

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  const [color, setColor] = useState(
    {
      one: 'rgba(255, 255, 255, 0.55)',
      two: 'rgba(255, 255, 255, 0.55)',
      three: 'rgba(255, 255, 255, 0.55)',
      four: 'rgba(255, 255, 255, 0.55)',
      five: 'rgba(255, 255, 255, 0.55)',
    },
  );

  const styles = {
    linkOne: {
      color: color.one,
    },
    linkTwo: {
      color: color.two,
    },
    linkThree: {
      color: color.three,
    },
    linkFour: {
      color: color.four,
    },
    linkFive: { 
      color: color.five,
    }
  };

  return (
    <>
      <Navbar collapseOnSelect bg='dark' expand='lg' variant='dark'>
        <Container fluid>
          <StyledBrand as={Link} to='/search'>
            Live
          </StyledBrand>
          {Auth.loggedIn() ? (
            <>
              <StyledToggle aria-controls='responsive-navbar-nav'> {Auth.getProfile().data.username.split("")[0].toUpperCase()} </StyledToggle>
            </>
          ) : (
            <>
              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            </>
          )}
          
          <StyledNavbar id='responsive-navbar-nav'>
            <Nav className='ml-auto d-flex'>
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link 
                    as={Link} to='/me'
                    style={styles.linkOne}
                    onMouseEnter={() => setColor(prevColor => ({
                      ...prevColor,
                      one: '#838af3'}))}
                    onMouseLeave={() => setColor(prevColor => ({
                      ...prevColor,
                      one: 'rgba(255, 255, 255, 0.55)'}))}>
                    Profile
                  </Nav.Link>
                  <Nav.Link 
                  as={Link} to='/search'
                  style={styles.linkTwo}
                  onMouseEnter={() => setColor(prevColor => ({
                    ...prevColor,
                    two: '#838af3'}))}
                  onMouseLeave={() => setColor(prevColor => ({
                    ...prevColor,
                    two: 'rgba(255, 255, 255, 0.55)'}))}>
                    <div>
                    Search The Site
                    </div>
                  </Nav.Link>
                  <Nav.Link 
                  onClick={Auth.logout}
                  style={styles.linkThree}
                  onMouseEnter={() => setColor(prevColor => ({
                    ...prevColor,
                    three: '#838af3'}))}
                  onMouseLeave={() => setColor(prevColor => ({
                    ...prevColor,
                    three: 'rgba(255, 255, 255, 0.55)'}))}>Logout</Nav.Link>
                </>
              ) : ( 
                <>
                  <Nav.Link 
                  as={Link} to='/search'
                  style={styles.linkFour}
                  onMouseEnter={() => setColor(prevColor => ({
                    ...prevColor,
                    four: '#838af3'}))}
                  onMouseLeave={() => setColor(prevColor => ({
                    ...prevColor,
                    four: 'rgba(255, 255, 255, 0.55)'}))}>
                    Search The Site
                  </Nav.Link>
                  <Nav.Link 
                  onClick={() => setShowModal(true)}
                  style={styles.linkFive}
                  onMouseEnter={() => setColor(prevColor => ({
                    ...prevColor,
                    five: '#838af3'}))}
                  onMouseLeave={() => setColor(prevColor => ({
                    ...prevColor,
                    five: 'rgba(255, 255, 255, 0.55)'}))}>
                    Login/Sign Up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </StyledNavbar>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;