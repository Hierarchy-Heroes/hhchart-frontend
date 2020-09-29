import React from 'react';
import './LoginPage.css';
import { Button, Form, } from 'react-bootstrap';


export const LoginPage = (props) => {
  
  return (
    <Form>

      <Form.Group className = "user mx-auto">
        <Form.Label>Username</Form.Label>
        <Form.Control type="user" placeholder="Enter username" />
      </Form.Group>
      <Form.Group className = "password mx-auto">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" />
      </Form.Group>

      <div class = "buttons">
        <Button href = "/" type = "button" variant = "primary">Log In</Button>
        <Button type = "button" variant = "outline-primary">Forgot password?</Button>
      </div>

    </Form>
  );
};