import { useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './register.css';
import * as userService from '../../services/userService.js';
import { useAuth } from '../../contexts/authContext.jsx';
import EmailExistsNotification from '../emailExists/EmailExistsNotification.jsx';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rePass: '',
  });

  const [submissionResult, setSubmissionResult] = useState(null);
  const [submissionResultRePass, setSubmissionResultRePass] = useState(null);
  const [emailExists, setEmailExists] = useState(false);
  const usernameFromEmailRegex = /([^@]+)@/;

  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmissionResult(null);
    setSubmissionResultRePass(null);
    setEmailExists(false);
    try {
      if (formData.email === '' || formData.password === '') {
        throw new Error('Lol');
      }
      if (formData.password !== formData.rePass) {
        setSubmissionResultRePass(false);
        return;
      }
      const token = await userService.register(
        formData.email,
        formData.password
      );
      if (token.alreadyExists) {
        setEmailExists(true);
        return;
      }
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
      console.log(err);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className={`mb-3 ${
            submissionResult === false ? 'form-control-failed' : ''
          }`}
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
        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className={`${
            submissionResult === false ? 'form-control-failed' : ''
          }`}
        >
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
          className={`${
            submissionResultRePass === false ? 'form-control-failed' : ''
          }`}
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
        {emailExists && <EmailExistsNotification userEmail={formData.email} />}
      </div>
    </div>
  );
};

export default Register;
