import React from 'react';
import { Modal, Button, Form } from "react-bootstrap";

const AddEmployeeForm = ({ visible, onClickClose }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const url = 'http://localhost:3000/employees';
    const companyName = window.sessionStorage.getItem('companyName');
    var companyId = 0;
    switch (companyName) {
      case 'Cyclone Aviation':
        companyId = 1;
        break;
      case 'Nightwell Enterprises':
        companyId = 3;
        break;
      case 'Tiger Microsystems':
        companyId = 2;
        break;
      default:
        companyId = 0;
    }
    const body = {
      'firstName': form.firstName.value,
      'lastName': form.lastName.value,
      'companyId': companyId,
      'password': 'password',
      'positionTitle': form.positionTitle.value,
      'companyName': companyName,
      'isManager': false,
      'employeeId': 99999,
      'email': form.email.value,
      'startDate': '10/20/2020'
      //managerId
      //teamId
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
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
          <Form.Group controlId="formAddPositionTitle">
            <Form.Label>Position Title</Form.Label>
            <Form.Control type="text" placeholder="Enter position title" name="positionTitle" />
          </Form.Group>
          <Form.Group controlId="formAddEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" />
          </Form.Group>
          <Form.Group controlId="formAddManager">
            <Form.Check type="checkbox" label="Manager" name="isManager" />
          </Form.Group>

          <div>
            <Button className="mr-sm-2" variant="primary" type="submit">Add Employee</Button>
            <Button variant="secondary" onClick={onClickClose}>Cancel</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEmployeeForm;