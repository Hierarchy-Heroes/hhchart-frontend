import React, { useState } from 'react';
import './NavBar.css';
import { Nav, Button, Navbar, Form, DropdownButton, Dropdown, Modal } from 'react-bootstrap';
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

  const importTree = async (e) => {
    e.preventDefault();
    const authToken = window.sessionStorage.getItem('authToken');
    const form = e.currentTarget;
    const url = `http://localhost:3000/employees/import`;
    const formData = new FormData();
    formData.append('employeeJSON', form.employeeJSON.files[0]);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'auth-token': authToken,
        },
        body: formData
      });
      const text = await response.text();
      if (response.ok) {
        console.log(text);
      } else {
        alert(text);
      }
    } catch (err) {
      console.error(err);
      console.log(formData.get('employeeJSON'));
    }
  }

  if (props.isLoggedIn === 'false') {
    return (
      <Navbar className="color-nav" variant="dark">
        <Navbar.Brand className="title" href="/">Hierarchy Heroes</Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>
      </Navbar>
    );
  }

  else if (props.isLoggedIn === 'true') {
    return (
      <Navbar className="color-nav" variant="dark">
        <Navbar.Brand className="title" href="/">Hierarchy Heroes</Navbar.Brand>
        <Nav className="mr-auto"></Nav>

        <DropdownButton className="account-btn" title=
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
          <Dropdown.Item href="/login" className="dropdown-items" eventKey="6" onClick={() => { logout() }}>Logout<i className="fas fa-sign-out-alt"></i></Dropdown.Item>
        </DropdownButton>

        <DropdownButton className="settings-btn" title=
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
          <Modal.Body>
            <Form encType="multipart/form-data" onSubmit={importTree} className="form-body">
              <Form.File name="employeeJSON" accept="application/json" required />
              <Button className="upload" variant="primary" type="submit">Upload</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Navbar>
    );
  }

  else {
    return null;
  }

};


export default NavigationBar;