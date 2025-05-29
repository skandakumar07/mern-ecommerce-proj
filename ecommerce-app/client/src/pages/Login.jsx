import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './styles/Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate(from, { replace: true });
    } catch (err) {
      alert('Login failed. Check credentials.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-overlay"></div>
      <div className="auth-box">
        <h2>Welcome Back 👋</h2>
        <p>Login to continue shopping</p>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
          <p className="switch-text">Don't have an account? <Link to="/register">Register</Link></p>
          <p className="switch-text">Just exploring? <Link to="/">Continue without login</Link></p>
        </form>
      </div>
    </div>
  );
}