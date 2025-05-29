import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './styles/Auth.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
        phone,
        address
      });
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert('Registration failed. Try again.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-overlay"></div>
      <div className="auth-box">
        <h2>Create Account 🛒</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="text" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required />
          <input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Register</button>
          <p className="switch-text">Already have an account? <Link to="/login">Login</Link></p>
          <p className="switch-text">Just exploring? <Link to="/">Continue without registering</Link></p>
        </form>
      </div>
    </div>
  );
}