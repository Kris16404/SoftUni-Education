import React, { useState } from 'react';
import { Container, Form, Button, FloatingLabel } from 'react-bootstrap';
import './login.css'; // Import the CSS file for custom styling

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login form submitted:', formData);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control type="email" placeholder="name@example.com" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>
        <Button variant="primary" type="submit" className="mt-3">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
