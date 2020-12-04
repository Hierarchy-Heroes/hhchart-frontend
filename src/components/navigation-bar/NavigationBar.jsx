import React, { useEffect, useState } from 'react';
import './NavBar.css';
import { Nav, Navbar, Button, DropdownButton, Dropdown, Form, Modal } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import AddEmployeeForm from '../add-employee-form/AddEmployeeForm';

const NavigationBar = (props) => {
  const [addEmployeeVisible, setAddEmployeeVisible] = useState(false);
  const history = useHistory();
  const location = useLocation();

  // state management for the employee's info, and if the get request has already been complete.
  // const [employeeInfo, setEmployeeInfo] = useState(null);
  const [requestComplete, setRequestComplete] = useState(false);

  useEffect(() => {
    getEmployeeInfo();
  }, [location])

  // GET request for the currently logged-in employee's information
  const getEmployeeInfo = async () => {
    if (!requestComplete) {
      const authToken = window.sessionStorage.getItem('authToken');
      if (authToken === null) return;
      // const companyName = window.sessionStorage.getItem('companyName');
      const url = `http://localhost:3000/employees/usr`;
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'auth-token': authToken,
          },
        });
        if (response.ok) {
          console.log("made it here")
          const json = await response.json();
          props.setCurrentUser(json);
        }
        else {
          console.log("error");
        }
      } catch (err) {
        console.error(err);
      }
      setRequestComplete(true);
    }
  }

  const onClickOpen = () => setAddEmployeeVisible(true);
  const onClickClose = () => setAddEmployeeVisible(false);

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const logout = () => {
    window.sessionStorage.removeItem('authToken');
    //window.sessionStorage.removeItem('companyName')
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

  else if (props.currentUser) {
    // getEmployeeInfo();
    //set variables to the state(employee's info)
    const employeeName = `${props.currentUser.firstName} ${props.currentUser.lastName}`;
    const companyName = `${props.currentUser.companyName}`;
    const jobTitle = `${props.currentUser.positionTitle}`;
    const id = `${props.currentUser.employeeId}`;
    const isManager = props.currentUser.isManager;

    return (
      <Navbar className="color-nav" variant="dark">
        <Navbar.Brand className="title" href="/">{companyName}</Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>
        {isManager && <div>
          <AddEmployeeForm currentUser={props.currentUser} visible={addEmployeeVisible} onClickClose={onClickClose}></AddEmployeeForm>
          <Button variant="outline-light" className="mr-sm-2" onClick={onClickOpen}>Add Employee</Button>
        </div>}
        <DropdownButton className="account-btn" noCaret variant="outline-light" title=
          {<div className="user-icon">
            <i class="fas fa-user-circle" id="profile-icon"></i>
            <i class="fas fa-caret-down" id="dropdown-icon"></i>
          </div>}
          alignRight id="dropdown-menu-align-right">
          <Dropdown.Item className="dropdown-items" eventKey="2">{employeeName}</Dropdown.Item>
          <Dropdown.Item className="dropdown-items" eventKey="3">{jobTitle}</Dropdown.Item>
          <Dropdown.Item className="dropdown-items" eventKey="4">Project</Dropdown.Item>
          <Dropdown.Item className="dropdown-items" eventKey="5">ID# {id}</Dropdown.Item>
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