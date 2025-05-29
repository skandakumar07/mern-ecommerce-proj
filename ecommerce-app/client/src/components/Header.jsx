import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">ShopEase</Link>
      </div>

      <div className="header-center">
        <input
          type="text"
          placeholder="Search for products..."
          className="search-bar"
        />
      </div>

      <div className="header-right">
        <Link to="/cart">🛒 Cart</Link>
        <Link to="/orders">📦 Orders</Link>

        {user ? (
          <div className="profile-container">
            <button onClick={() => setShowDropdown(!showDropdown)} className="profile-btn">👤 Profile</button>
            {showDropdown && (
              <div className="profile-dropdown">
                <p><strong>{user.name}</strong></p>
                <p>{user.email}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">🔑 Login</Link>
            <Link to="/register">📝 Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
