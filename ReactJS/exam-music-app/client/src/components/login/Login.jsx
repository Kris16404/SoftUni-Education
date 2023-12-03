import { useState, useEffect } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import * as userService from '../../services/userService.js';
import { useAuth } from '../../contexts/authContext.jsx';
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [submissionResult, setSubmissionResult] = useState(null);

  const { authToken, setToken } = useAuth();
  const navigate = useNavigate();
  const usernameFromEmailRegex = /([^@]+)@/;
  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const isValid = validateUser(authToken);

    if (isValid) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.email === '' || formData.password === '') {
        throw new Error('Lol');
      }
      const token = await userService.login(formData.email, formData.password);
      const userInfo = {
        userEmail: token.email,
        userUsername: token.email.match(usernameFromEmailRegex)[1],
        userId: token._id,
        accessToken: token.accessToken,
      };

      setToken(userInfo);
      navigate('/');
    } catch (err) {
      setSubmissionResult(false);
    }
  };

  const validateUser = (token) => {
    if (token) {
      return true;
    }
    return false;
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className={`mb-3 ${
            submissionResult === false ? 'form-control-failed' : ''
          }`}
        >
          <Form.Control
            type="email"
            name="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className={`${
            submissionResult === false ? 'form-control-failed' : ''
          }`}
        >
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </FloatingLabel>
        <Button
          variant="primary"
          type="submit"
          className="mt-3"
          onClick={handleSubmit}
        >
          Login
        </Button>
        <p className="mt-3">
          Don't have an account? <Link to="/users/register">Register here</Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
