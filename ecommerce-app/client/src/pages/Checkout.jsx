import React, { useContext, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './styles/Checkout.css';

export default function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    phone: '',
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

const handleOrder = async () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem('user'));

    if (!userInfo || !userInfo.token) {
      alert('You must be logged in to place an order.');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const orderItems = cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      product: item._id,
    }));

    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await axios.post(
      'http://localhost:5000/api/orders',
      {
        orderItems,
        shippingInfo,
        totalPrice,
      },
      config
    );

    clearCart();
    navigate('/order-success');
  } catch (err) {
    console.log('Order failed', err);
    alert('Failed to place order');
  }
};

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <input
        type="text"
        name="address"
        placeholder="Address"
        onChange={handleChange}
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
      />

      <h3>Total: ₹
        {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
      </h3>

      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
}
