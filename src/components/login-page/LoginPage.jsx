import React from 'react';
import './LoginPage.css';
import { Button, Form, } from 'react-bootstrap';


export const LoginPage = (props) => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    // resquest = server + port + auth/login
    const url = 'http://deniz-pc:3000/auth/login';
    const body = {
      'email': form.email.value,
      'companyName': form.company.value,
      'password': form.password.value
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
        window.sessionStorage.setItem('authToken', text);
        window.sessionStorage.setItem('companyName', form.company.value.replace(/\s/g, ''));
      } else {
        alert(text);
      }
    } catch (err) {
      console.error(err);
      console.log(JSON.stringify(body));
    }
  }

  return (
    <Form className="login-container" onSubmit={handleSubmit}>
      <Form.Group className="mx-auto">
        <Form.Label>Company</Form.Label>
        <Form.Control as="select" name="company">
          <option>Cyclone Aviation</option>
          <option>Nightwell Enterprises</option>
          <option>Tiger Microsystems</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="user mx-auto">
        <Form.Label>E-mail</Form.Label>
        <Form.Control type="user" placeholder="Enter E-mail" name="email" />
      </Form.Group>
      <Form.Group className="password mx-auto">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" name="password" />
      </Form.Group>

      <div class="buttons">
        <Button className="loginButtons" id="leftBtn" type="submit" variant="btn-outline-*">Log In</Button>
        <Button className="loginButtons" type="btn" variant="outline-primary-*">Forgot password?</Button>
      </div>

    </Form >
  );
};