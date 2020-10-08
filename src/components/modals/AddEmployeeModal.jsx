import React, {useState} from 'react';

import {Modal, Button, Form} from "react-bootstrap";

const AddEmployeeModal = ({isOpen, onClickClose}) => {
  const [show, setShow] = useState(isOpen);

  const handleClose = () => {
    onClickClose();
    setShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId = "formAddFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="addemployeefirstname" placeholder="Enter first name" />
          </Form.Group>
          <Form.Group controlId = "formAddLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="addemployeelastname" placeholder="Enter last name" />
          </Form.Group>
          <Form.Group controlId = "formAddPositionTitle">
            <Form.Label>Position Title</Form.Label>
            <Form.Control type="addemployeepositiontitle" placeholder="Enter position title" />
          </Form.Group>
          <Form.Group controlId = "formAddEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="addemployeeemail" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId = "formAddManager">
            <Form.Check type="addemployeemanager" label="Manager" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleClose}>Add Employee</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEmployeeModal;