import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';


const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://animalworld-web.onrender.com/api/users/login/', formData);
      
      localStorage.setItem('access', response.data.token);
      onLogin(response.data); 
      navigate('/'); 
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <FaEnvelope />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <FaLock />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
