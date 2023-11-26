import React, { useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

import './register.css';
const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rePass: '',
  });
  console.log(formData);
  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = () => {
    // Implement registration logic here
    console.log('Registering... ', formData);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FloatingLabel>
        <br />
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FloatingLabel>
        <br />
        <FloatingLabel
          controlId="floatingRepeatPassword"
          label="Repeat Password"
        >
          <Form.Control
            type="password"
            placeholder="Repeat Password"
            name="rePass"
            value={formData.rePass}
            onChange={handleChange}
          />
        </FloatingLabel>
        <Button
          variant="primary"
          type="button"
          onClick={handleRegister}
          className="mt-3"
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default Register;
