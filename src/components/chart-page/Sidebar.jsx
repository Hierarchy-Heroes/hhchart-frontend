import React, { useState } from 'react';
import { useEffect } from 'react';

import { Button, Card, Col, Accordion, Form } from "react-bootstrap";

const Sidebar = ({ node, onClickClose }) => {
  const [nodeState, setNodeState] = useState(null);
  const setNodeStateParams = (params) => {
    setNodeState({
      ...nodeState,
      ...params,
    })
  }

  useEffect(() => {
    setNodeState(node);
  }, [node])

  const handleSubmitEdit = async (e) => {
    // add: onClickClose
    e.preventDefault();
    const authToken = window.sessionStorage.getItem('authToken');
    const companyName = window.sessionStorage.getItem('companyName');
    // const form = e.currentTarget;
    const url = `http://localhost:3000/employees/${companyName}/update`;
    const body = {
      _id: node._id,
      update: {
        firstName: nodeState.firstName,
        lastName: nodeState.lastName,
        email: nodeState.email,
        positionTitle: nodeState.positionTitle,
      }
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
        // modify org chart accordingly
      } else {
        alert(text);
      }
    } catch (err) {
      console.error(err);
      console.log(JSON.stringify(body));
    }
  }

  const handleSubmitMove = async (e) => {
    // add: onClickClose
    e.preventDefault();
    const form = e.currentTarget;
    const url = 'move employee endpoint placeholder';
    const body = {
      'newManager': form.moveManager.value
    }
    console.log(body.newManager)
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': JSON.stringify(body).length
        },
        body: JSON.stringify(body)
      });
      const text = await response.text();
      if (response.ok) {
        console.log(text);
        // modify org chart accordingly
      } else {
        alert(text);
      }
    } catch (err) {
      console.error(err);
      console.log(JSON.stringify(body));
    }
  }

  const handleSubmitDelete = async (e) => {
    // add: onClickClose
    e.preventDefault();
    let conf = window.confirm(`Are you sure you want to remove ${node.firstName} ${node.lastName}?`)
    if (!conf) {
      return;
    }
    const authToken = window.sessionStorage.getItem('authToken');
    const companyName = window.sessionStorage.getItem('companyName');
    const form = e.currentTarget;
    const url = `http://localhost:3000/employees/${companyName}/remove`;
    const body = {
      '_id': node._id,
    }
    console.log(body.newManager)
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
        // modify org chart accordingly
      } else {
        alert(text);
      }
    } catch (err) {
      console.error(err);
      console.log(JSON.stringify(body));
    }
  }

  return (nodeState && node) && (
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
                <Form className="form-body" onSubmit={handleSubmitEdit}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="editName" className="placeholder-text" type="text" placeholder="New Name"
                      value={nodeState.firstName + " " + nodeState.lastName}
                      onChange={(e) => setNodeStateParams({ firstName: e.target.value.split(' ')[0], lastName: e.target.value.split(' ')[1] })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="editTitle" className="placeholder-text" type="text" placeholder="New Title"
                      value={nodeState.positionTitle}
                      onChange={(e) => setNodeStateParams({ positionTitle: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="editEmail" className="placeholder-text" type="text" placeholder="New Email"
                      value={nodeState.email}
                      onChange={(e) => setNodeStateParams({ email: e.target.value })}
                    />
                  </Form.Group>
                  <Col className="text-center">
                    <Button variant="primary" className="mb" type="submit">Update</Button>
                  </Col>
                </Form>
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
                <Form className="form-body" onSubmit={handleSubmitMove}>
                  <Form.Group>
                    <Form.Label>Enter New Manager</Form.Label>
                    <Form.Control className="placeholder-text" type="text" placeholder="New Manager" name="moveManager" />
                  </Form.Group>
                  <Col className="text-center">
                    <Button variant="primary" className="mb" type="submit">Request Move</Button>
                  </Col>
                </Form>
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
                <Form className="form-body" onSubmit={handleSubmitDelete}>
                  <Form.Group>
                    <Form.Label>Enter Current Manager</Form.Label>
                    <Form.Control className="placeholder-text" type="text" placeholder="Manager" name="deleteManager" />
                  </Form.Group>
                  <Col className="text-center">
                    <Button variant="primary" className="mb" type="submit">Request Deletion</Button>
                  </Col>
                </Form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Card>
    </div>
  );
};

export default Sidebar;