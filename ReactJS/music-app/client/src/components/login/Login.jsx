import { useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import './login.css'; // Import the CSS file for custom styling

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
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
          <Form.Control
            type="email"
            name="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
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
      </div>
    </div>
  );
};

export default Login;
