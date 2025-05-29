import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Home.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const categories = ['Electronics', 'Fitness', 'Home', 'Clothing', 'Accessories'];

  return (
    <div className="home-container">
      {/* 🔥 Banner */}
      <div className="hero-banner">
        <img
          src="https://images.unsplash.com/photo-1542831371-d531d36971e6"
          alt="Sale Banner"
          className="banner-img"
        />
        <div className="banner-text">
          <h1>🔥 Limited Stock Sale</h1>
          <p>Grab your favorite items before they're gone!</p>
        </div>
      </div>

      {/* 🧭 Category Buttons (navigate to /category/:name) */}
      <div className="categories">
        {categories.map(cat => (
          <button key={cat} onClick={() => navigate(`/category/${cat}`)}>
            {cat}
          </button>
        ))}
      </div>

      {/* 🛍 Featured Products */}
      <h2 className="section-title">Featured Products</h2>
      <div className="product-grid">
        {products.slice(0, 6).map(product => (
          <div className="product-card" key={product._id}>
            <Link to={`/product/${product._id}`}>
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className="view-all">
        <Link to="/products">View All Products →</Link>
      </div>
    </div>
  );
}
