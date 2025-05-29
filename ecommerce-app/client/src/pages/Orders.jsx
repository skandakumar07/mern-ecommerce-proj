import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/Orders.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        if (!userInfo || !userInfo.token) return;

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const res = await axios.get('http://localhost:5000/api/orders/myorders', config);
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="order-card">
            <h4>Order ID: {order._id}</h4>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Total:</strong> ₹{order.totalPrice}</p>
            <p><strong>Status:</strong> {order.status || "Processing"}</p>
            <div className="order-items">
              {order.orderItems.map((item, idx) => (
                <div key={idx} className="order-item">
                  <p>{item.name} × {item.quantity}</p>
                  <p>₹{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
