import React from 'react';

import { Nav, Button, Navbar, Form, FormControl,  } from 'react-bootstrap';

export const NavigationBar = props => (
  <Navbar bg="light" variant="light">
    <Navbar.Brand href="">Hierarchy Heroes</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-primary" className="mr-sm-2">Search</Button>
    </Form>
    <Form inline>
      <Button variant="primary" href="/login">Log In</Button>
    </Form>
  </Navbar>
);
