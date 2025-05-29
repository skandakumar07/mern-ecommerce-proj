import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/AdminDashboard.css'; // optional: add for custom styling
import { toast } from 'react-toastify';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get('http://localhost:5000/api/orders', config);
      setOrders(data);
    } catch (err) {
      toast.error('Failed to load orders');
      console.error(err);
    }
  };

  const handleDeliver = async (orderId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.put(`http://localhost:5000/api/orders/${orderId}/deliver`, {}, config);
      toast.success('Order marked as delivered');
      fetchOrders(); // refresh
    } catch (err) {
      toast.error('Delivery update failed');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>📦 Admin Dashboard – All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total Price</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user?.name}</td>
                <td>₹{order.totalPrice}</td>
                <td>{order.isPaid ? '✅' : '❌'}</td>
                <td>{order.isDelivered ? '✅' : '❌'}</td>
                <td>
                  {!order.isDelivered && (
                    <button onClick={() => handleDeliver(order._id)}>
                      Mark Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
