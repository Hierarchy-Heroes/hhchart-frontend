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

  /*
  const importTree = async (e) => {
    e.preventDefault();
    const authToken = window.sessionStorage.getItem('authToken');
    const form = e.currentTarget;
    const url = `http://localhost:3000/employees/import`;
    const body = {
      'uploadedFile': form.uploadTree.value,
    }
    console.log(body)
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'auth-token': authToken,
          'Content-Type': 'application/json',
          'Content-Length': JSON.stringify(body).length
        },
        body: JSON.stringify(body)
      });
      const text = await response.text();
      if (response.ok) {
        console.log(text);
      } else {
        alert(text);
      }
    } catch (err) {
      console.error(err);
      console.log(JSON.stringify(body));
    }
  }
  */

  function importTree(upload) {
    const oOutput = document.querySelector("div");
    const oData = new FormData(upload);
    const oReq = new XMLHttpRequest();

    oReq.open("POST", "http://localhost:3000/employees/import", true);
    oReq.onload = function(oEvent) {
      if (oReq.statue = 200) {
        oOutput.innerHTML = "Uploaded!";
      } else {
        oOutput.innerHTML = "Error " + oReq.statue + " occurred when trying to upload your file.<br \/>";
      }
    }

    oReq.send(oData);
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
          <Dropdown.Item href="/login" className="dropdown-items" eventKey="6" onClick={() => {logout()}}>Logout<i className="fas fa-sign-out-alt"></i></Dropdown.Item>
        </DropdownButton>

        <DropdownButton className="settings-btn" title = 
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
            <form enctype="multipart/form-data" name="fileinfo">
              <input type="file" name="employeeJSON" />
              <input type="submit" value="Upload a file" />
            </form>
          </Modal.Body>
        </Modal>

        <script src="ImportTree.jsx" async></script>
        <script>var form = document.forms.namedItem("fileinfo");</script>
        <script>form.addEventListener('submit', importTree(form), false);</script>

      </Navbar>
    );
  }

  else {
    return null;
  }

};


export default NavigationBar;