import React, { useState } from 'react';
import './NavBar.css';
import { Nav, Button, Navbar, Form, FormControl, DropdownButton, Dropdown, Modal, } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const NavigationBar = (props) => {
  const history = useHistory();

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const logout = () => {
    window.sessionStorage.removeItem('authToken');
    window.sessionStorage.removeItem('companyName')
    history.push('/login')
  }

  if(props.isLoggedIn === 'false'){
    return (
      <Navbar className = "color-nav" variant="dark">
        <Navbar.Brand className="title" href="/">Hierarchy Heroes</Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>
      </Navbar>
    );
  }

  else if(props.isLoggedIn === 'true'){
    return (
      <Navbar className = "color-nav" variant="dark">
        <Navbar.Brand className="title" href="/">Hierarchy Heroes</Navbar.Brand>
        <Nav className="mr-auto"></Nav>

        <DropdownButton className="account-btn" noCaret variant="outline-light" title=
          {<div className="user-icon">
          <i class="fas fa-user-circle" id="profile-icon"></i>
          <i class="fas fa-caret-down" id="dropdown-icon"></i>
          </div>} 
          alignRight id="dropdown-menu-align-right">
          <Dropdown.Item className="dropdown-items" eventKey="2">Name</Dropdown.Item>
          <Dropdown.Item className="dropdown-items" eventKey="3">Job Title</Dropdown.Item>
          <Dropdown.Item className="dropdown-items" eventKey="4">Project</Dropdown.Item>
          <Dropdown.Item className="dropdown-items" eventKey="5">ID#</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="/login" className="dropdown-items" eventKey="6" onClick={() => {logout()}}>Logout<i className="fas fa-sign-out-alt"></i></Dropdown.Item>
        </DropdownButton>
        
        <DropdownButton className="settings-btn" noCaret varient="outline-light" title = 
          {<div className="user-icon">
          <i class="fas fa-cog" id="profile-icon"></i>
          <i class="fas fa-caret-down" id="dropdown-icon"></i>
          </div>}
          alignRight id="dropdown-menu-align-right">
            <Dropdown.Item className="dropdown-items" eventKey="1" onClick={handleShow}>Import tree...</Dropdown.Item>
          </DropdownButton>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Import Tree</Modal.Title>
          </Modal.Header>
        <Modal.Body>Placeholder for file upload form</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close </Button>
          <Button variant="primary" onClick={handleClose}>Upload</Button>
        </Modal.Footer>
        </Modal>
      </Navbar>
    );
  }

  else {
    return null;
  }

};


export default NavigationBar;