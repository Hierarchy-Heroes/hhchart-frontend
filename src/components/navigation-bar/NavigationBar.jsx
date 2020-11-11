import React, {useState} from 'react';
import './NavBar.css';
import { Nav, Navbar, DropdownButton, Dropdown, } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const NavigationBar = (props) => {
  const history = useHistory();

  //state management for the employee's info, and if the get request has already been complete.
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [requestComplete, setRequestComplete] = useState(false);

  //GET request for the currently logged-in employee's information
  const getEmployeeInfo = async () => {
    if(!requestComplete){
      const authToken = window.sessionStorage.getItem('authToken');
      //const companyName = window.sessionStorage.getItem('companyName');
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
          setEmployeeInfo(json);
        }
        else{
          console.log("error");
        }
      } catch (err) {
        console.error(err);
      }
      setRequestComplete(true);
    }
  }



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
    getEmployeeInfo();
    //set variables to the state(employee's info)
    const employeeName = employeeInfo ? `${employeeInfo.firstName} ${employeeInfo.lastName}`: 'Employee';
    const companyName = employeeInfo ? `${employeeInfo.companyName}` : 'Hierarchy Heroes';
    const jobTitle = employeeInfo ? `${employeeInfo.positionTitle}`: 'Job Title';
    const id = employeeInfo ? `${employeeInfo.employeeId}`: 'ID';
    
    return (
      <Navbar className = "color-nav" variant="dark">
        <Navbar.Brand className="title" href="/">{companyName}</Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>
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
          <Dropdown.Item href="/login" className="dropdown-items" eventKey="6" onClick={() => {logout()}}>Logout<i className="fas fa-sign-out-alt"></i></Dropdown.Item>
        </DropdownButton>
      </Navbar>
    );
  }

  else {
    return null;
  }

};


export default NavigationBar;