import { useState, useEffect } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

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

  const [submissionResultRePass, setSubmissionResultRePass] = useState(null);
  const [emailExists, setEmailExists] = useState(false);
  const [validation, setValidation] = useState({
    email: false,
    password: false,
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const usernameFromEmailRegex = /([^@]+)@/;
  const emailValidationRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const { authToken, setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    validateForm();
  }, [formData]);

  useEffect(() => {
    const isValid = validateUser(authToken);

    if (isValid) {
      navigate('/');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    isFormValid();
    // Reset validation status when the user types
    setValidation((prevValidation) => {
      if (name === 'rePass') {
        // If it is "rePass", skip adding it to the state
        return prevValidation;
      }

      // For other names, update the state
      return {
        ...prevValidation,
        [name]: false,
      };
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmissionResultRePass(null);
    setEmailExists(false);
    setIsFormSubmitted(true);

    validateForm();
    if (isFormValid()) {
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
        console.log(err);
      }
    } else {
      console.log('Form validation failed');
    }
  };

  const validateForm = () => {
    const newValidation = { ...validation };

    // Add your validation logic here
    newValidation.email = emailValidationRegex.test(formData.email);
    newValidation.password =
      formData.password.trim() !== '' && !(formData.password.trim().length < 4);

    setValidation(newValidation);
  };

  const isFormValid = () => {
    // Check if all fields are valid
    return Object.values(validation).every((isValid) => isValid);
  };

  const validateUser = (token) => {
    if (token) {
      return true;
    }
    return false;
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className={`mb-4 ${
            isFormSubmitted && !validation.email ? 'invalid' : ''
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

        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className={`mb-3 ${
            isFormSubmitted && !validation.password ? 'invalid' : ''
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

        <FloatingLabel
          controlId="floatingRepeatPassword"
          label="Repeat Password"
          className={`mb-3 ${
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
        <p className="mt-3">
          Already have an account? <Link to="/users/login">Login here</Link>.
        </p>
        {emailExists && <EmailExistsNotification userEmail={formData.email} />}
      </div>
    </div>
  );
};

export default Register;
