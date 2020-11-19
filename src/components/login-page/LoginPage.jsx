import React from 'react';
import './LoginPage.css';
import { Button, Form, } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


export const LoginPage = (props) => {
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    // resquest = server + port + auth/login
    const url = 'http://localhost:3000/auth/login';
    const body = {
      'email': form.email.value,
      //'companyName': form.company.value,
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
        //window.sessionStorage.setItem('companyName', form.company.value.replace(/\s/g, ''));
        history.push('/');
        return true;
      } else {
        alert(text);
        return false;
      }
    } catch (err) {
      console.error(err);
      console.log(JSON.stringify(body));
      return false;
    }
  }

  return (
    <Form className="login-container" onSubmit={handleSubmit}>
      <Form.Group id="email-space"className="user mx-auto">
        <Form.Label>E-mail</Form.Label>
        <Form.Control type="email" placeholder="Enter e-mail" name="email" />
      </Form.Group>
      <Form.Group className="password mx-auto">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" name="password" />
      </Form.Group>

      <div class="buttons">
        <Button className="loginButtons" id="leftBtn" type="submit">Log In</Button>
        <Button className="loginButtons" type="btn" variant="outline-primary-*">Forgot password?</Button>
      </div>

    </Form >
  );
};