import React from 'react';

import {Button, Card, Col, Accordion, Form} from "react-bootstrap";

const Sidebar = ({ node, onClickClose }) => {
  return node && (
    <div className="side-bar">
      {/*This is the close button*/}  
      <Col className="text-center">
        <Button id="close-btn" variant="btn" className="mb-3" onClick={onClickClose}>
          {<div className="user-icon">
          <i class="fas fa-times" id="profile-icon"></i>
          </div>}
        </Button>
      </Col>
      {/*This is the profile picture and employee information displayed*/}
      <Card className="mb-4">
        <Card.Img variant="top" src="/logo512.png" height="250px" />
        <Card.Body className="employee-display-info">
          <Card.Title>{node.firstName} {node.lastName}</Card.Title>
          <Card.Text>{node.positionTitle}</Card.Text>
          {/* <Card.Text>{node._id}</Card.Text> */}
          </Card.Body>
        </Card>
      {/*This is a card that contains an accordion.  Inside each accordion card, there is a nested form*/}
      <Card>
          <Accordion>
            {/*This is the 'edit employee' section button*/}
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="none" eventKey="0">
                  Edit Employee<i className="fas fa-edit"></i>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Form className="form-body">
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control className="placeholder-text" type="text" placeholder="New Name" />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control className="placeholder-text" type="text" placeholder="New Title" />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control className="placeholder-text" type="text" placeholder="New Email"/>
                    </Form.Group>
                  </Form>
                  <Col className="text-center">
                    <Button id="request-btn" variant="none" className="mb" onClick={onClickClose}>Update</Button>
                  </Col>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            {/*This is the 'move employee' section*/}
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="none" eventKey="1">
                Move Employee<i class="fas fa-exchange-alt"></i>
                </Accordion.Toggle>
              </Card.Header>

              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <Form className="form-body">
                    <Form.Group>
                      <Form.Label>Enter New Manager</Form.Label>
                      <Form.Control className="placeholder-text" type="text" placeholder="New Manager" />
                    </Form.Group>
                  </Form>
                  <Col className="text-center">
                    <Button id="request-btn" variant="none" className="mb" onClick={onClickClose}>Request Move</Button>
                  </Col>
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            {/*This is the 'delete employee' section*/}
            <Card>
              <Card.Header>
  <Accordion.Toggle as={Button} variant="none" eventKey="2">Delete Employee<i className="fas fa-user-minus"></i></Accordion.Toggle>
              </Card.Header>

              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <Form className="form-body">
                    <Form.Group>
                      <Form.Label>Enter Current Manager</Form.Label>
                      <Form.Control className="placeholder-text" type="text" placeholder="Manager" />
                    </Form.Group>
                  </Form>
                  <Col className="text-center">
                    <Button id="request-btn" variant="none" className="mb" onClick={onClickClose}>Request Deletion</Button>
                  </Col>
                </Card.Body>
              </Accordion.Collapse>

          </Card>
          
          </Accordion>
        </Card>
    </div>
  );
};

export default Sidebar;