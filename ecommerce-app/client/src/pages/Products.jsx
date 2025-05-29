import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="product-page">
      <h2>All Products 🛍️</h2>
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product._id}>
            <Link to={`/product/${product._id}`}>
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
