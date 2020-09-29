import React from 'react';

import {Button, Card, ListGroup} from "react-bootstrap";

const Sidebar = ({ node, onClickClose }) => {
  return node && (
    <>
      <Button className="mb-4" onClick={onClickClose}>Close</Button>
      <Card className="mb-4">
        <Card.Img variant="top" src="/logo512.png" />
        <Card.Body>
          <Card.Title>{node.name}</Card.Title>
          <Card.Text>{node.title}</Card.Text>
        </Card.Body>
      </Card>
      {/* probably gonna need to change these */}
      <ListGroup>
        <ListGroup.Item action>Promote</ListGroup.Item>
        <ListGroup.Item action>Demote</ListGroup.Item>
        <ListGroup.Item action>Delete</ListGroup.Item>
        <ListGroup.Item action>Change manager...</ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default Sidebar;