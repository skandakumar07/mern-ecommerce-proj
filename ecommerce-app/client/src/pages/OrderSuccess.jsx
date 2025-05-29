import React from 'react';
import { Link } from 'react-router-dom';
import './styles/OrderSuccess.css';

export default function OrderSuccess() {
  return (
    <div className="order-success-container">
      <div className="success-icon">✅</div>
      <h2>Order Placed Successfully!</h2>
      <p>Thank you for shopping with us. Your order has been received and is being processed.</p>
      <Link to="/" className="back-home-btn">Continue Shopping</Link>
    </div>
  );
}
