import React, { useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

import './register.css';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleRegister = () => {
    // Implement registration logic here
    console.log('Registering...');
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FloatingLabel>
        <br />
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
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
