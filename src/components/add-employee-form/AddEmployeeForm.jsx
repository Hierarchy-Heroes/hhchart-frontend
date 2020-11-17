import React from 'react';
import { Modal, Button, Form } from "react-bootstrap";

const AddEmployeeForm = ({ visible, onClickClose }) => {
  var isManager = false;

  const handleManagerCheck = () => {
    isManager = !isManager;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const authToken = window.sessionStorage.getItem('authToken');
    const companyName = window.sessionStorage.getItem('companyName');
    const url = `http://localhost:3000/employees/add`;
    var companyId = 0;
    switch (companyName) {
      case 'CycloneAviation':
        companyId = 1;
        break;
      case 'NightwellEnterprises':
        companyId = 3;
        break;
      case 'TigerMicrosystems':
        companyId = 2;
        break;
      default:
        companyId = 0;
    }
    const body = {
      'firstName': form.firstName.value,
      'lastName': form.lastName.value,
      'companyId': companyId, //"OPTIONAL"
      'password': 'password',
      'positionTitle': form.positionTitle.value, //OPTIONAL
      'companyName': companyName,
      'isManager': isManager,
      'employeeId': form.employeeId.value, //implement
      'managerId': form.employeeId.value, //implement
      'email': form.email.value,
      'startDate': form.startDate.value //OPTIONAL
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'auth-token': authToken,
          'Content-Type': 'application/json',
          'Content-Length': JSON.stringify(body).length,
        },
        body: JSON.stringify(body),
      });
      const text = await response.text();
      if (response.ok) {
        console.log(text);
        onClickClose();
      } else {
        alert(text);
      }
    } catch (err) {
      console.error(err);
      console.log(JSON.stringify(body));
    }
  }

  return (
    <Modal
      show={visible}
      onHide={onClickClose}
      size="lg"
      backdrop="static"
      centered={true}
      keyboard={false}
      animation={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formAddFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" name="firstName" />
          </Form.Group>
          <Form.Group controlId="formAddLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" name="lastName" />
          </Form.Group>
          <Form.Group controlId="formAddEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="email" placeholder="Enter e-mail" name="email" />
          </Form.Group>
          <Form.Group controlId="formAddPositionTitle">
            <Form.Label>Position Title</Form.Label>
            <Form.Control type="text" placeholder="Enter position title" name="positionTitle" />
          </Form.Group>
          <Form.Group controlId="formAddStartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="text" placeholder="YYYY-MM-DD" name="startDate" />
          </Form.Group>
          <Form.Group controlId="formAddEmployeeId">
            <Form.Label>Employee ID</Form.Label>
            <Form.Control type="text" placeholder="Enter employee id" name="employeeId" />
          </Form.Group>
          <Form.Group controlId="formAddManagerId">
            <Form.Label>Manager ID</Form.Label>
            <Form.Control type="text" placeholder="Enter manager id" name="managerId" />
          </Form.Group>
          <Form.Group controlId="formAddIsManager">
            <Form.Check type="checkbox" label="Manager" onChange={handleManagerCheck} />
          </Form.Group>

          <div>
            <Button className="float-right" variant="secondary" onClick={onClickClose}>Cancel</Button>
            <Button className="float-right mr-sm-2" variant="primary" type="submit">Add Employee</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEmployeeForm;